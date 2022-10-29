import { Provider } from 'react-redux'
import { HistoryRouter } from 'redux-first-history/rr6'
import { CssBaseline } from '@mui/material'
import { Slide, ToastContainer } from 'react-toastify'

import { GlobalStyles } from 'themes/global'

import { store, history } from 'store'
import { restoreAuthAsync } from 'store/sign-up/actions'

import ThemeProvider from 'containers/ThemeProvider'
import MainContainer from 'containers/MainContainer'
import AnimatedRoutes from 'containers/AnimatedRoutes'
import Footer from 'components/common/Footer'
import AppBar from 'components/AppBar'

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
  DASHBOARD = '/dashboard',
  ALBUMS_ID = 'album-id-:id',
  SUCCESSFULLY_PAID = 'success-:id',
  TERMS = '/terms',
  PRIVACY = '/privacy',
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

            <MainContainer>
              <AnimatedRoutes />
            </MainContainer>

            <Footer />
          </ThemeProvider>
        </HistoryRouter>
      </Provider>
    </>
  )
}

export default App
