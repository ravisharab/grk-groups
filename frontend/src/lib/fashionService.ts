
import { supabase } from './supabase';

import type {
  FashionCategory,
  FashionProduct,
  FashionProductInput,
  FashionProductImage,
  FashionProductVariant,
  FashionVariantInput,
  FashionImageInput,
} from '../types/fashion';

const IMAGE_BUCKET = 'fashion-images';

// ==========================================
// ADMIN AUTHORIZATION
// ==========================================

async function requireAdmin(): Promise<void> {
  const { data, error } =
    await supabase.rpc('is_fashion_admin');

  if (error) throw error;

  if (data !== true) {
    throw new Error('Administrator access required.');
  }
}

// ==========================================
// CATEGORIES
// ==========================================

export async function getCategories():
  Promise<FashionCategory[]> {

  const { data, error } = await supabase
    .from('fashion_categories')
    .select('*')
    .eq('is_active', true)
    .order('id');

  if (error) throw error;

  return data ?? [];
}

// ==========================================
// GET ALL ADMIN PRODUCTS
// ==========================================

export async function getAdminProducts():
  Promise<FashionProduct[]> {

  await requireAdmin();

  const { data, error } = await supabase
    .from('fashion_products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return data ?? [];
}

// ==========================================
// GET PUBLISHED PRODUCTS
// ==========================================

export async function getPublishedProducts(
  categoryId?: number
): Promise<FashionProduct[]> {

  let query = supabase
    .from('fashion_products')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  if (categoryId !== undefined) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data ?? [];
}

// ==========================================
// GET SINGLE PRODUCT
// ==========================================

export async function getProduct(
  productId: string
): Promise<FashionProduct> {

  const { data, error } = await supabase
    .from('fashion_products')
    .select('*')
    .eq('id', productId)
    .single();

  if (error) throw error;

  return data;
}

// ==========================================
// CREATE PRODUCT
// ==========================================

export async function createProduct(
  product: FashionProductInput
): Promise<FashionProduct> {

  await requireAdmin();

  const { data, error } = await supabase
    .from('fashion_products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ==========================================
// UPDATE PRODUCT
// ==========================================

export async function updateProduct(
  productId: string,
  product: Partial<FashionProductInput>
): Promise<FashionProduct> {

  await requireAdmin();

  const { data, error } = await supabase
    .from('fashion_products')
    .update({
      ...product,
      updated_at: new Date().toISOString(),
    })
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ==========================================
// DELETE PRODUCT
// ==========================================

export async function deleteProduct(
  productId: string
): Promise<void> {

  await requireAdmin();

  const { error } = await supabase
    .from('fashion_products')
    .delete()
    .eq('id', productId)
    .select('id')
    .single();

  if (error) throw error;
}

// ==========================================
// PUBLISH / UNPUBLISH PRODUCT
// ==========================================

export async function publishProduct(
  productId: string,
  published: boolean
): Promise<FashionProduct> {

  return updateProduct(productId, {
    is_published: published,
  });
}

// ==========================================
// UPLOAD PRODUCT IMAGE
// ==========================================

export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string> {

  await requireAdmin();

  const allowedTypes: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };

  const extension = allowedTypes[file.type];

  if (!extension) {
    throw new Error(
      'Only JPG, PNG and WEBP images are allowed.'
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error(
      'Image size must be less than 5 MB.'
    );
  }

  const fileName =
    `${productId}/${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(IMAGE_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      contentType: file.type,
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from(IMAGE_BUCKET)
    .getPublicUrl(fileName);

  return data.publicUrl;
}

// ==========================================
// GET PRODUCT IMAGES
// ==========================================

export async function getProductImages(
  productId: string
): Promise<FashionProductImage[]> {

  const { data, error } = await supabase
    .from('fashion_product_images')
    .select('*')
    .eq('product_id', productId)
    .order('display_order');

  if (error) throw error;

  return data ?? [];
}

// ==========================================
// SAVE PRODUCT IMAGE
// ==========================================

export async function addProductImage(
  image: FashionImageInput
): Promise<FashionProductImage> {

  await requireAdmin();

  const { data, error } = await supabase
    .from('fashion_product_images')
    .insert(image)
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ==========================================
// GET PRODUCT VARIANTS
// ==========================================

export async function getProductVariants(
  productId: string
): Promise<FashionProductVariant[]> {

  await requireAdmin();

  const { data, error } = await supabase
    .from('fashion_product_variants')
    .select('*')
    .eq('product_id', productId)
    .order('size');

  if (error) throw error;

  return data ?? [];
}

// ==========================================
// SAVE PRODUCT VARIANT
// ==========================================

export async function saveProductVariant(
  variant: FashionVariantInput
): Promise<FashionProductVariant> {

  await requireAdmin();

  const { data, error } = await supabase
    .from('fashion_product_variants')
    .upsert(variant, {
      onConflict: 'product_id,size,color',
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

// ==========================================
// DELETE PRODUCT VARIANT
// ==========================================

export async function deleteProductVariant(
  variantId: string
): Promise<void> {

  await requireAdmin();

  const { error } = await supabase
    .from('fashion_product_variants')
    .delete()
    .eq('id', variantId)
    .select('id')
    .single();

  if (error) throw error;
}

// ==========================================
// GENERATE PRODUCT SLUG
// ==========================================

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
