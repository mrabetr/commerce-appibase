import { Fetcher } from '@vercel/commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({
  method = 'GET',
  variables,
  query
}) => {
  const { locale, ...vars } = variables ?? {}

  const url = API_URL + query;
  
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

