import { Product, ProductOption, ProductImage } from '@vercel/commerce/types/product'
import { Category } from '@vercel/commerce/types/site'
import type { AppibaseProduct, AppibaseCollection } from '../../types'


const NormalizeProduct = (product: AppibaseProduct): Product => {
  // console.log(JSON.stringify(product.variations, null , 4));

  const options: ProductOption[] = [];

  for(const variation of (product.variations?.data || [])) {
    const option : ProductOption | undefined = options.find(o => o.displayName === variation.name);
    if(!option) options.push({ id: `option-${variation.name.toLowerCase()}`, displayName : variation.name, values: variation.options?.map(o => ({ label: o.name  })) || [] });
  }

  console.log(options);

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.image_urls.map(i => <ProductImage> { url: i }),
    sku: product.sku,
    slug: product.sku,
    variants: product.variations?.data?.map(v => ({ 
      id: v.id,  
      options: [{ id: `${v.name.toLowerCase()}`, displayName: v.name, values: v.options?.map(o=>({ label: o.name })) || [] }]
    })) || [],
    price: { value: product.prices.data[0].amount.float, currencyCode: product.prices.data[0].currency },
    options
  }
}

const NormalizeCategory = (collection: AppibaseCollection): Category => {
  return {
    id: String(collection.id),
    name: collection.name,
    slug: collection.slug,
    path: '/' + collection.slug,
  }
}

export { NormalizeProduct, NormalizeCategory }