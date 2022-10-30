const sizes = {
  xs: '375px',
  md: '1024px',
  lg: '1280px',
  xl: '1440px',
} as const

export const devices = {
  mobile: `(min-width: ${sizes.xs})`,
  desktop: `(min-width: ${sizes.md})`,
  desktopLg: `(min-width: ${sizes.lg})`,
  desktopXl: `(min-width: ${sizes.xl})`,
} as const
