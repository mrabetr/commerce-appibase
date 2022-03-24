import { Product, ProductImage } from '@vercel/commerce/types/product'
import { Category } from '@vercel/commerce/types/site'
import type { AppibaseProduct, AppibaseCollection } from '../../types'


const NormalizeProduct = (product: AppibaseProduct): Product => {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.image_urls.map(i => <ProductImage> { url: i }),
    sku: product.sku,
    slug: product.sku,
    variants: [],
    price: { value: product.prices.data[0].amount.float, currencyCode: product.prices.data[0].currency },
    options: []
  }
}

const NormalizeCategory = (collection: AppibaseCollection): Category => {
  return {
    id: collection.id,
    name: collection.name,
    slug: collection.slug,
    path: '/' + collection.slug,
  }
}

export { NormalizeProduct, NormalizeCategory }