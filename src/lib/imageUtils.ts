/**
 * Utility functions for handling image paths with correct base path for GitHub Pages
 */

export const getImagePath = (path: string): string => {
  const basePath = import.meta.env.PROD ? '/TWP' : '';
  return `${basePath}${path}`;
};

export const getSupabaseImageUrl = (path: string): string => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const basePath = import.meta.env.PROD ? '/TWP' : '';
  return `${supabaseUrl}/storage/v1/object/public/${path}${basePath ? '?basePath=' + basePath : ''}`;
};
