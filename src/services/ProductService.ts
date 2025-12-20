import { supabase, Product } from '@/lib/supabase';

// Cache configuration - cache indefinitely until Supabase tells us to refresh
interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

class CacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private realtimeSubscription: any = null;

  constructor() {
    this.setupRealtimeSubscription();
  }

  // Listen to Supabase realtime changes and auto-clear cache
  private setupRealtimeSubscription() {
    console.log('Setting up Supabase realtime subscription for products...');
    
    this.realtimeSubscription = supabase
      .channel('products-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT, UPDATE, DELETE
          schema: 'public',
          table: 'products'
        },
        (payload) => {
          console.log('Product change detected via Supabase Realtime:', payload.eventType);
          this.clear();
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });
  }

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;
    return entry.data as T;
  }

  clear(): void {
    this.cache.clear();
    console.log('Product cache cleared due to Supabase update');
  }

  // Manual clear for Product Management page
  manualClear(): void {
    this.cache.clear();
    console.log('Product cache manually cleared');
  }
}

const cache = new CacheManager();

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    // Check cache first
    const cachedProducts = cache.get<Product[]>('all_products');
    if (cachedProducts) {
      console.log('✓ Using cached products');
      return cachedProducts;
    }

    try {
      console.log('→ Fetching products from Supabase');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Add cache-busting timestamp to image URLs
      const productsWithFreshImages = (data || []).map(product => ({
        ...product,
        image_url: product.image_url ? `${product.image_url}?t=${Date.now()}` : product.image_url
      }));
      
      // Store in cache indefinitely (will be cleared by realtime subscription)
      cache.set('all_products', productsWithFreshImages);
      
      return productsWithFreshImages;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  static async getCategories(): Promise<string[]> {
    // Check cache first
    const cachedCategories = cache.get<string[]>('categories');
    if (cachedCategories) {
      console.log('✓ Using cached categories');
      return cachedCategories;
    }

    try {
      console.log('→ Fetching categories from Supabase');
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (error) throw error;
      
      const categories = [...new Set(data?.map(item => item.category).filter(Boolean))];
      
      // Store in cache
      cache.set('categories', categories);
      
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    // Check cache first
    const cacheKey = `category_${category}`;
    const cachedProducts = cache.get<Product[]>(cacheKey);
    if (cachedProducts) {
      console.log(`✓ Using cached products for category: ${category}`);
      return cachedProducts;
    }

    try {
      console.log(`→ Fetching products for category ${category} from Supabase`);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const products = data || [];
      
      // Store in cache
      cache.set(cacheKey, products);
      
      return products;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }

  // Method to manually clear cache (useful for Product Management)
  static clearCache(): void {
    cache.manualClear();
  }
}
