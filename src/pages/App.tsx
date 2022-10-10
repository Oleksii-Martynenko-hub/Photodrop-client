import { Provider } from 'react-redux'
import { HistoryRouter } from 'redux-first-history/rr6'
import { Container, CssBaseline, SxProps, Theme, ThemeProvider } from '@mui/material'
import { Slide, ToastContainer } from 'react-toastify'

import { theme } from 'themes/palette'
import { GlobalStyles } from 'themes/global'

import { store, history } from 'store'

import { AppBar } from 'components/AppBar'
import AnimatedRoutes from 'containers/AnimatedRoutes'

import 'react-toastify/dist/ReactToastify.css'

export enum ERoutes {
  NOT_EXIST = '*',
  ROOT = '/',
  SIGN_UP = '/sign-up',
  CONFIRM = '/confirm',
  USER = 'user',
  USER_SELFIE = 'selfie',
  USER_EDIT_NAME = 'edit-name',
  USER_SETTINGS = 'settings',
  USER_SETTINGS_PHONE = 'phone',
  USER_SETTINGS_EMAIL = 'email',
  USER_NOTIFICATIONS = 'notifications',
  MAIN = '/main',
  ALBUMS_ID = 'album-:id',
  TERMS = '/terms',
  PRIVACY = '/privacy',
}

const containerStyles: SxProps<Theme> = {
  paddingTop: { xs: 2, md: 4 },
  paddingX: { xs: 2, md: 4 },
  marginTop: { xs: 0 },
  paddingBottom: { xs: 4 },
  flex: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'start',
  position: 'relative',
}

const App = () => {
  return (
    <>
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />

            <ToastContainer transition={Slide} />

            <AppBar />

            <Container sx={{ ...containerStyles }}>
              <AnimatedRoutes />
            </Container>
          </ThemeProvider>
        </HistoryRouter>
      </Provider>
    </>
  )
}

export default App
