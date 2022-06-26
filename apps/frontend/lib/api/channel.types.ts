import { CustomFieldsObject } from '../../../vendure/examples/vendure-source/packages/common/src/shared-types'
export interface VendureChannel {
  token: string
  createdAt: string
  updatedAt: string
  code: string
  defaultLanguageCode: string
  currencyCode: string
  pricesIncludeTax: boolean
  id: number
  customFields: CustomFields
  defaultShippingZone: DefaultShippingZone
  defaultTaxZone: DefaultTaxZone
}

export interface CustomFields {
  displayName: string | null
  subdomain: string | null
  deployedUrl: string | null
  primaryColor: string | null
  secondaryColor: string | null
  logo: string | null
}

export interface DefaultShippingZone {
  createdAt: string
  updatedAt: string
  name: string
  id: number
}

export interface DefaultTaxZone {
  createdAt: string
  updatedAt: string
  name: string
  id: number
}

export interface Channel {
  logo: ChannelLogo
  displayName: string | null
}

export type ChannelLogo = {
  source: string | null
  preview: string | null
}
export type ActiveChannelQueryResponse = {
  activeChannel: {
    customFields: Channel
  }
}
