import { Fetcher } from '@vercel/commerce/utils/types'
import { FetcherError } from '@vercel/commerce/utils/errors'

async function getText(res: Response) {
  try {
    return (await res.text()) || res.statusText
  } catch (error) {
    return res.statusText
  }
}

async function getError(res: Response) {
  if (res.headers.get('Content-Type')?.includes('application/json')) {
    const data = await res.json()
    return new FetcherError({ errors: data.errors, status: res.status })
  }
  return new FetcherError({ message: await getText(res), status: res.status })
}

export const fetcher: Fetcher = async ({
  url,
  method = 'POST',
  variables,
  query,
  body: bodyObj,
}) => {
  const shopApiUrl =
    process.env.NEXT_PUBLIC_VENDURE_LOCAL_URL ||
    process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL
  if (!shopApiUrl) {
    throw new Error(
      'The Vendure Shop API url has not been provided. Please define NEXT_PUBLIC_VENDURE_SHOP_API_URL in .env.local'
    )
  }
  // add vendure channel token to headers
  const channelToken = process.env.NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN
  if (!channelToken) {
    debugger

    throw new Error(
      'The Vendure Channel token has not been provided. Please define NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN in .env.local or production environment variables'
    )
  }

  const hasBody = Boolean(variables || query)

  const body = hasBody ? JSON.stringify({ query, variables }) : undefined
  const baseHeaders: Record<string, string> = hasBody
    ? { 'Content-Type': 'application/json' }
    : {}

  const headers: HeadersInit = {
    ...baseHeaders,
    ...{ 'vendure-token': channelToken },
  }
  const res = await fetch(shopApiUrl, {
    method,
    body,
    headers,
    credentials: 'include',
  })
  if (res.ok) {
    const { data, errors } = await res.json()
    if (errors) {
      throw await new FetcherError({ status: res.status, errors })
    }
    return data
  }

  throw await getError(res)
}
