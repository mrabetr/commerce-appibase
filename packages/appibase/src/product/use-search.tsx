import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
export default useSearch as UseSearch<typeof handler>
import { API_URL } from '../const'

export type SearchProductsInput = {
  search?: string
  categoryId?: number | string
  brandId?: number
  sort?: string
  locale?: string
}

export const handler: SWRHook<any> = {
  fetchOptions: {
    url: '/products?filter[is_parent_true]=true',
    method: 'GET',
  },
  async fetcher({ input: { search, categoryId, brandId, sort }, options, fetch }) {
    console.log('*********** USE SEARCH FETCH');


    let url = options.url

    if (search) url += `&filter[name_cont_all]=${search}`
    // if (Number.isInteger(Number(categoryId)))
    //   url.searchParams.set('categoryId', String(categoryId))
    // if (Number.isInteger(brandId))
    //   url.searchParams.set('brandId', String(brandId))
    // if (sort) url.searchParams.set('sort', sort)

    console.log(url);
    
    return fetch({
      query: url,
      method: options.method,
    })
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      console.log('USE SEARCH HOOK', input);
      
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
