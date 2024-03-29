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
  CONFIRM = '/verification',
  USER = '/user-account',
  ADD_SELFIE = '/onboarding-selfie',
  USER_EDIT_NAME = 'edit-name',
  USER_SETTINGS = 'settings',
  USER_SETTINGS_PHONE = 'edit-phone',
  USER_EDIT_PHONE_CONFIRM = 'verification',
  USER_SETTINGS_EMAIL = 'edit-email',
  USER_NOTIFICATIONS = 'notifications',
  DASHBOARD = '/dashboard',
  ALBUMS_ID = '/albums/:id',
  SUCCESSFULLY_PAID = '/albums/success/:id',
  CANCEL = 'cancel',
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
