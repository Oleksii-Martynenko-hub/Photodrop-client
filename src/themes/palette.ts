import { createTheme, PaletteColor } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    white: string
  }
  interface PaletteOptions {
    white: PaletteColor
  }
}

const defaultTheme = createTheme()
export const theme = createTheme({
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
