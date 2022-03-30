import { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/cart/use-remove-item'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: item, options, fetch }) {
    await fetch({
      query : `cart_items`,
      method: 'DELETE',
      body: item.id
    })
  },
  useHook:
    ({ fetch }) =>
    () => {
      return useCallback(async function removeItem(input) {
        const data = await fetch({ input });
        return data;
      }, [fetch]);
    },
}
