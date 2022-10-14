import * as React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { CssBaseline, StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material'

import { theme, muiTheme } from 'themes/theme'

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const nextTheme = { ...theme, ...muiTheme }

  return (
    <StyledEngineProvider injectFirst={true}>
      <CssBaseline />
      <StyledThemeProvider theme={theme}>
        <MuiThemeProvider theme={nextTheme}>{children}</MuiThemeProvider>
      </StyledThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider
