import { Fetcher } from '@vercel/commerce/utils/types'
import { API_URL } from './const'
import { handleFetchResponse } from './utils'
import { GetAccessToken } from './api/utils/access-token'
import Kitsu from "kitsu";

const fetcher: Fetcher = async ({
  method = 'GET',
  variables,
  query = ''
}) => {
  const { locale, ...vars } = variables ?? {}
  
  console.log('UI FETCHER', query);

  const api = new Kitsu({ baseURL: API_URL + '/api/v1' })
  api.headers.Authorization = `Bearer ${await GetAccessToken()}`
  
  return await api.get(query)
}

export default fetcher

