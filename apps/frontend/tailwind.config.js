const fetch = require('sync-fetch')

const channelUrl = process.env.VENDURE_CHANNEL_REST_URL

if (!channelUrl) {
  throw new Error(
    'Missing VENDURE_CHANNEL_REST_URL environment variable. Needed to load color theme'
  )
}

const channelData = fetch(channelUrl, {
  method: 'get',
}).json()

const channel = channelData.find((c) => {
  return c.token === process.env.NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN
})

console.log('channel data: ', channel)

if (!channel) {
  throw new Error(
    `Can't find channel data for channel ${process.env.NEXT_PUBLIC_VENDURE_CHANNEL_TOKEN}`
  )
}

const {
  customFields: { primaryColor, secondaryColor },
} = channel

const colorOverrides = {}
if (primaryColor) colorOverrides.primary = primaryColor
if (secondaryColor) colorOverrides.secondary = secondaryColor

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: ['outline-none'],
  theme: {
    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      colors: {
        ...{
          primary: 'var(--primary)',
          'primary-2': 'var(--primary-2)',
          secondary: 'var(--secondary)',
          'secondary-2': 'var(--secondary-2)',
          hover: 'var(--hover)',
          'hover-1': 'var(--hover-1)',
          'hover-2': 'var(--hover-2)',
          'accent-0': 'var(--accent-0)',
          'accent-1': 'var(--accent-1)',
          'accent-2': 'var(--accent-2)',
          'accent-3': 'var(--accent-3)',
          'accent-4': 'var(--accent-4)',
          'accent-5': 'var(--accent-5)',
          'accent-6': 'var(--accent-6)',
          'accent-7': 'var(--accent-7)',
          'accent-8': 'var(--accent-8)',
          'accent-9': 'var(--accent-9)',
          violet: 'var(--violet)',
          'violet-light': 'var(--violet-light)',
          'violet-dark': 'var(--violet-dark)',
          pink: 'var(--pink)',
          'pink-light': 'var(--pink-light)',
          cyan: 'var(--cyan)',
          blue: 'var(--blue)',
          green: 'var(--green)',
          red: 'var(--red)',
        },
        ...colorOverrides,
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accent-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      scale: {
        120: '1.2',
      },
    },
  },
}
