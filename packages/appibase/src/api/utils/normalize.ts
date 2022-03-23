import { Product, ProductImage } from '@vercel/commerce/types/product'
import type { AppibaseProduct } from '../../types'


const NormalizeProduct = (product: AppibaseProduct): Product => {
  return {
    id: product.id,
    name: product.name || "New name",
    description: product.description || "Description",
    images: product.image_urls.map(i => <ProductImage> { url: i }),
    sku: product.sku,
    slug: product.sku,
    variants: [],
    price: { value: product.prices.data[0].amount.float, currencyCode: product.prices.data[0].currency },
    options: []
  }
}

export { NormalizeProduct }