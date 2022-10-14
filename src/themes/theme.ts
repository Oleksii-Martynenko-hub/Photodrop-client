import { createTheme, PaletteColor } from '@mui/material'
import { devices } from './media-queries'

declare module '@mui/material/styles' {
  interface Palette {
    white: string
  }
  interface PaletteOptions {
    white: PaletteColor
  }
}

const defaultTheme = createTheme()
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#3300cc',
      light: '#763dff',
      dark: '#000099',
    },
    secondary: {
      main: '#262626',
      light: '#4e4e4e',
      dark: '#000000',
    },
    white: defaultTheme.palette.augmentColor({
      color: { main: '#ffffff' },
      name: 'white',
    }),
  },
})

export const theme = {
  styledPalette: {
    primary: '#3300CC',
    primaryDisabled: '#916CFF',
    secondary: '#ffffff',
    success: '#015B08',
    error: '#FE5F55',
    border: '#EEEEEE',
    secondaryBorder: '#CECCB5',
    appbarBorder: '#F1F0EC',
    background: '#F4F4F4',
    mainText: '#262626',
    secondaryText: '#6d6d6d',
  },
  fonts: {
    futuraPT: '"Futura PT", Helvetica, sans-serif', // 400, 500, 700
    termina: 'Termina, Helvetica, sans-serif',
  },
  media: devices,
} as const
