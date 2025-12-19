import { supabase, Product } from '@/lib/supabase';

export class ProductService {
  static async getAllProducts(): Promise<Product[]> {
    try {
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
      
      return productsWithFreshImages;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  static async getCategories(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('category');

      if (error) throw error;
      
      const categories = [...new Set(data?.map(item => item.category).filter(Boolean))];
      return categories;
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  static async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }
}
