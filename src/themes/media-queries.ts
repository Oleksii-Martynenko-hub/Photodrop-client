const sizes = {
  xs: '375px',
  md: '1024px',
} as const

export const devices = {
  mobile: `(min-width: ${sizes.xs})`,
  desktop: `(min-width: ${sizes.md})`,
} as const
