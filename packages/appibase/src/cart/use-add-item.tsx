import { useCallback } from 'react';
import useAddItem, { UseAddItem } from '@vercel/commerce/cart/use-add-item'
import { MutationHook } from '@vercel/commerce/utils/types'
import Cookies from 'js-cookie'
import { NormalizeCart } from '../api/utils/normalize'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: item, options, fetch }) {
    console.log('item', item);
    
    // if (item.quantity && (!Number.isInteger(item.quantity) || item.quantity < 1)) {
    //   throw new Error('The item quantity has to be a valid integer greater than 0');
    // }

    const fromCookies = Cookies.get('cart_id');
    console.log('fromCookies', fromCookies);
    
    const { data } = await fetch({
      query : `/carts/${fromCookies}/cart_items`,
      method: 'POST',
      body: {
        quantity: 2,
        item: { 
          data : { 
            type: 'product', 
            id:  item.variantId
          }
        }
      }
    })
    
    return NormalizeCart(data)
  },
  useHook:
    ({ fetch }) =>
    () => {
      return useCallback(async function addItem(input) {
        const data = await fetch({
            input
        });
        // console.log('data', data, input);
        
        return data;
      }, [fetch]);
    },
}
