import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import URI from 'urijs'
import type { LocalConfig } from '../index'
import fetch from './fetch'
import { API_URL } from '../../const'

const fetchApi: (getConfig: () => LocalConfig) => GraphQLFetcher =
  (getConfig) =>
  async (query: string, { variables, preview } = {}, fetchOptions) => {
    const config = getConfig()

    const uri = (new URI(API_URL).resource('/api/v1' + query)).toString();
    
    const headers = new Headers();
    headers.append("Authorization", "Bearer 4e8wTDm0lns6YD92eR0keClRL11aQDYE5t1wNKRBBgQ");
    headers.append("Content-Type", "application/json");


    const res = await fetch(uri, {
      method: 'GET',
      headers
    })
    
    const json = await res.json()
    
    if (json.errors) {
      throw new FetcherError({
        errors: json.errors ?? [{ message: 'Failed to fetch for API' }],
        status: res.status,
      })
    }

    return { data: json.data, res }
  }

export default fetchApi
