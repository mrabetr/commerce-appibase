import { Fetcher } from '@vercel/commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'

const fetcher: Fetcher = async ({
  method = 'GET',
  variables,
  query
}) => {
  const { locale, ...vars } = variables ?? {}
  
  const url = API_URL + "/api/v1" + query;
  console.log('UI FETCHER', query, url);
  
  return handleFetchResponse(
    await fetch(url.toString(), {
      method,
      //body: JSON.stringify({ query, variables: vars }),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
        'Access-Control-Expose-Headers': 'Authorization, Accept, Content-Type',
        'Authorization': ``,
        'Content-Type': 'application/json',
      },
    })
  )
}

export default fetcher

