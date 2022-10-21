import { Provider } from 'react-redux'
import { HistoryRouter } from 'redux-first-history/rr6'
import { Container, CssBaseline, SxProps, Theme } from '@mui/material'
import { Slide, ToastContainer } from 'react-toastify'

import { GlobalStyles } from 'themes/global'

import { store, history } from 'store'
import { restoreAuthAsync } from 'store/sign-up/actions'

import { AppBar } from 'components/AppBar'
import ThemeProvider from 'containers/ThemeProvider'
import AnimatedRoutes from 'containers/AnimatedRoutes'

import 'react-toastify/dist/ReactToastify.css'

export enum ERoutes {
  NOT_EXIST = '*',
  ROOT = '/',
  SIGN_UP = '/sign-up',
  CONFIRM = '/confirm',
  USER = 'user',
  ADD_SELFIE = '/add-selfie',
  USER_EDIT_NAME = 'edit-name',
  USER_SETTINGS = 'settings',
  USER_SETTINGS_PHONE = 'edit-phone',
  USER_EDIT_PHONE_CONFIRM = 'confirm-phone',
  USER_SETTINGS_EMAIL = 'edit-email',
  USER_NOTIFICATIONS = 'notifications',
  MAIN = '/main',
  ALBUMS_ID = 'album-:id',
  TERMS = '/terms',
  PRIVACY = '/privacy',
}

const containerStyles: SxProps<Theme> = {
  padding: { xs: 0 },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  flex: 'auto',
  position: 'relative',
}

store.dispatch(restoreAuthAsync())

const App = () => {
  return (
    <>
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ThemeProvider>
            <CssBaseline />
            <GlobalStyles />

            <ToastContainer
              transition={Slide}
              position='top-center'
              hideProgressBar
              closeOnClick
              draggable
              autoClose={3000}
              progressStyle={undefined}
            />

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
