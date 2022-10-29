import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'

import { selectIsFullPageLoading } from 'store/sign-up/selectors'

import ProtectedRoute from 'containers/ProtectedRoute'
import { ERoutes } from 'pages/App'
import Terms from 'pages/Terms'
import SignUp from 'pages/SignUp'
import Privacy from 'pages/Privacy'
import UserPage from 'pages/UserPage'
import Settings from 'pages/Settings'
import Dashboard from 'pages/Dashboard'
import EditName from 'pages/UserPage/EditName'
import AddSelfiePage from 'pages/AddSelfiePage'
import ConfirmSignUp from 'pages/ConfirmSignUp'
import EditPhone from 'pages/Settings/EditPhone'
import EditEmail from 'pages/Settings/EditEmail'
import ConfirmPhone from 'pages/Settings/ConfirmPhone'
import CurrentAlbum from 'pages/Dashboard/CurrentAlbum'
import Notifications from 'pages/UserPage/Notifications'
import SuccessfullyPaid from 'pages/Dashboard/SuccessfullyPaid'
import FullPageLoader from 'components/common/FullPageLoader'

const AnimatedRoutes: FC = () => {
  const isFullPageLoading = useSelector(selectIsFullPageLoading)
  return (
    <AnimatePresence>
      {isFullPageLoading && <FullPageLoader key='loader' />}

      <Routes>
        <Route path={ERoutes.ROOT} element={<Navigate to={ERoutes.SIGN_UP} replace />} />

        <Route path={ERoutes.SIGN_UP} element={<SignUp />} />

        <Route path={ERoutes.CONFIRM} element={<ConfirmSignUp />} />

        <Route path={ERoutes.TERMS} element={<Terms />} />

        <Route path={ERoutes.PRIVACY} element={<Privacy />} />

        <Route path={ERoutes.ADD_SELFIE} element={<ProtectedRoute element={AddSelfiePage} />} />

        <Route path={ERoutes.DASHBOARD} element={<ProtectedRoute element={Dashboard} />}>
          <Route path={ERoutes.ALBUMS_ID} element={<CurrentAlbum />} />

          <Route path={ERoutes.SUCCESSFULLY_PAID} element={<SuccessfullyPaid />} />

          <Route path={ERoutes.USER} element={<UserPage />}>
            <Route path={ERoutes.USER_EDIT_NAME} element={<EditName />} />

            <Route path={ERoutes.USER_SETTINGS} element={<Settings />}>
              <Route path={ERoutes.USER_SETTINGS_PHONE} element={<EditPhone />}>
                <Route path={ERoutes.USER_EDIT_PHONE_CONFIRM} element={<ConfirmPhone />} />
              </Route>

              <Route path={ERoutes.USER_SETTINGS_EMAIL} element={<EditEmail />} />
            </Route>

            <Route path={ERoutes.USER_NOTIFICATIONS} element={<Notifications />} />
          </Route>
        </Route>

        <Route path={ERoutes.NOT_EXIST} element={<Navigate to={ERoutes.ROOT} replace />} />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
