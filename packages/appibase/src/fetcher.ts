import { Fetcher } from '@vercel/commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'
import { GetAccessToken } from './api/utils/access-token'
import Kitsu from "kitsu";

const fetcher: Fetcher = async ({
  method = 'GET',
  variables,
  query = '',
  body = {}
}) => {
  const { locale, ...vars } = variables ?? {}
  
  console.log('UI FETCHER', query);

  const api = new Kitsu({ baseURL: API_URL + '/api/v1' })
  api.headers.Authorization = `Bearer ${await GetAccessToken()}`

  if(method === 'GET') return await api.get(query)
  else if(method === 'POST') return await api.create(query, body)
}

export default fetcher

