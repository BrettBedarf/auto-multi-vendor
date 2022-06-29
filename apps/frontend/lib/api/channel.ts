import axios from 'axios'
import { VendureChannel, ActiveChannelQueryResponse } from './channel.types'
import { request, gql } from 'graphql-request'

const query = gql`
  {
    activeChannel {
      customFields {
        displayName
        logo {
          source
          preview
        }
      }
    }
  }
`

// channel data from vendure

export const getChannel = async () => {
  const data = await request<ActiveChannelQueryResponse>(
    process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL ?? 'localhost:3000/shop-api',
    query,
    {},
    {
      'vendure-token': `${process.env.NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN}`,
    }
  )
  const {
    activeChannel: { customFields },
  } = data
  return customFields
}
