import { Product, ProductImage } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { LocalConfig, Provider } from '../index'
import type { AppibaseProduct, AppibasePrice } from '../../types'

const normalizeProduct = (product: AppibaseProduct): Product => {
  return {
    id: product.id,
    name: product.name || "New name",
    description: product.description || "Description",
    images: product.image_urls.map(i => <ProductImage> { url: i }),
    variants: [],
    price: { value: 22.22, retailPrice: 22.23, salePrice: 23.23, listPrice: 24.24, currencyCode: 'eur' },
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

    
    const { data: fetchedProducts }  =  await fetch('/products?filter[is_parent_true]=false&filter[name_cont_all]=shirt,special&include=prices');

    const products = fetchedProducts.map((p : AppibaseProduct) => <Product> normalizeProduct(p))
      
    return {
      products
    }
  }
  return getAllProducts
}
