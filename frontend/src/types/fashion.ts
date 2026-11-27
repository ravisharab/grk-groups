
export interface FashionCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

export interface FashionProduct {
  id: string;
  category_id: number;
  name: string;
  slug: string;
  sku: string;
  description: string | null;
  subcategory: string;
  wear_type: string | null;
  material: string | null;
  occasion: string | null;
  price: number;
  discount_price: number | null;
  currency: string;
  cover_image: string | null;
  is_featured: boolean;
  is_published: boolean;
  is_sample: boolean;
  created_at: string;
  updated_at: string;
}

export type FashionProductInput = Omit<
  FashionProduct,
  'id' | 'created_at' | 'updated_at'
>;

export interface FashionProductImage {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  view_type: string;
  display_order: number;
  created_at: string;
}

export interface FashionProductVariant {
  id: string;
  product_id: string;
  size: string;
  color: string;
  color_code: string | null;
  stock_quantity: number;
  is_available: boolean;
  created_at: string;
}

export type FashionVariantInput = Omit<
  FashionProductVariant,
  'id' | 'created_at'
>;

export type FashionImageInput = Omit<
  FashionProductImage,
  'id' | 'created_at'
>;
