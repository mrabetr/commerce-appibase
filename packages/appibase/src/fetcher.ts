import { Fetcher } from '@vercel/commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'
import URI from 'urijs'

const fetcher: Fetcher = async ({
  method = 'GET',
  variables,
  query
}) => {
  const { locale, ...vars } = variables ?? {}
  console.log('FETCHER Fetching');

  const url = new URI(API_URL).resource(query)
  console.log(url.toString());
  
  return handleFetchResponse(
    await fetch(url.toString(), {
      method,
      body: JSON.stringify({ query, variables: vars }),
      headers: {
        'Authorization': ``,
        'Content-Type': 'application/json',
      },
    })
  )
}

export default fetcher

// import { Fetcher } from '@vercel/commerce/utils/types'

// export const fetcher: Fetcher = async () => {
//   console.log('FETCHER')
//   const res = await fetch('./data.json')
//   if (res.ok) {
//     const { data } = await res.json()
//     return data
//   }
//   throw res
// }
