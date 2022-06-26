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
      'vendure-token': 'v42hbha5v2y3mu2ygzu',
    }
  )
  const {
    activeChannel: { customFields },
  } = data
  return customFields
}
