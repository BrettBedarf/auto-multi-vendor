import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import commerce from '@lib/api/commerce'
import { getChannel } from './api/channel'

export async function getSearchStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const channelPromise = getChannel()
  const channel = await channelPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  return {
    props: {
      pages,
      categories,
      brands,
      channel,
    },
    revalidate: 1,
  }
}

export type SearchPropsType = InferGetStaticPropsType<
  typeof getSearchStaticProps
>
