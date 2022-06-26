import { Logo } from '@components/ui'
import { ChannelLogo } from '@lib/api/channel.types'
import { isNull } from 'node:util'
import React from 'react'
import s from './Title.module.css'

interface Props {
  logo?: ChannelLogo
  storeName?: string | null
}
/**
 * Logo with store name
 */
const Title: React.FC<Props> = ({ logo, storeName }) => {
  return (
    <>
      {logo?.preview ? (
        <img className={s.logo} src={logo.preview} alt="channel logo" />
      ) : (
        <span className="rounded-full border border-accent-6 mr-2">
          <Logo />{' '}
        </span>
      )}
      <span className={s.name}>{storeName}</span>
    </>
  )
}

export default Title
