import { Product, ProductImage } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { LocalConfig, Provider } from '../index'
import type { AppibaseProduct, AppibasePrice } from '../../types'

const normalizeProduct = (product: AppibaseProduct): Product => {
  return {
    id: product.id,
    name: product.attributes.name || "New name",
    description: product.attributes.description || "Description",
    images: product.attributes.image_urls.map(i => <ProductImage> { url: i }),
    variants: [],
    price: { value: 22.22 },
    options: []
  }
}

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {

    const { fetch } = commerce.getConfig(config)

    
    const { data: fetchedProducts} =  await fetch('/products?filter[is_parent_true]=true&filter[name_cont_all]=shirt,special');

    const products = fetchedProducts.map(p => <Product> normalizeProduct(p))
      
    return {
      products
    }
  }
  return getAllProducts
}
