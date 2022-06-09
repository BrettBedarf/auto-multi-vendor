import { FetcherError } from '@vercel/commerce/utils/errors'
import type { GraphQLFetcher } from '@vercel/commerce/api'
import { getCommerceApi } from '../'
import fetch from './fetch'
import { HeadersInit } from '@vercel/fetch'

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables, preview } = {},
  fetchOptions
) => {
  const config = getCommerceApi().getConfig()

  // @bb - vendure needs a special header to know the channel to filter by so
  // we inject if present in env to every request
  const headersBase: HeadersInit = {
    ...fetchOptions?.headers,
    'Content-Type': 'application/json',
  }
  const injectHeaders: { 'vendure-token'?: string } = {}
  const channelToken = process.env.NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN
  if (!channelToken) {
    debugger
    throw new Error(
      'The Vendure Channel token has not been provided. Please define NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN in .env.local or production environment variables'
    )
  }
  injectHeaders['vendure-token'] = channelToken

  const headers = { ...headersBase, ...injectHeaders }

  const res = await fetch(config.commerceUrl, {
    ...fetchOptions,
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()
  //   debugger
  if (json.errors) {
    throw new FetcherError({
      errors: json.errors ?? [{ message: 'Failed to fetch Vendure API' }],
      status: res.status,
    })
  }

  return { data: json.data, res }
}

export default fetchGraphqlApi
