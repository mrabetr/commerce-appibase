import { MutationHook } from '@vercel/commerce/utils/types'
import { useCallback } from 'react'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    await fetch({
      query : `cart_items`,
      method: 'PATCH',
      body: { id: input.item.id, type: 'cart_item', quantity: String(input.quantity) }
    })
  },
  useHook:
    ({ fetch }) =>
    ({ item }) => {
      return useCallback(async function updateItem(input) {
        const data = await fetch({ input: { item, quantity: input.quantity } });
        return data;
      }, [fetch]);
    },
}
