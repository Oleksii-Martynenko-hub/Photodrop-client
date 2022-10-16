import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { AnimatePresence } from 'framer-motion'

import ProtectedRoute from 'containers/ProtectedRoute'
import { ERoutes } from 'pages/App'
import SignUp from 'pages/SignUp'
import Main from 'pages/Main'
import CurrentAlbum from 'pages/Main/CurrentAlbum'
import ConfirmSignUp from 'pages/ConfirmSignUp'
import Terms from 'pages/Terms'
import Privacy from 'pages/Privacy'
import UserPage from 'pages/UserPage'
import AddSelfiePage from 'pages/AddSelfiePage'
import EditName from 'pages/UserPage/EditName'
import Settings from 'pages/Settings'
import EditPhone from 'pages/Settings/EditPhone'
import EditEmail from 'pages/Settings/EditEmail'
import Notifications from 'pages/UserPage/Notifications'

const AnimatedRoutes: FC = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path={ERoutes.ROOT} element={<Navigate to={ERoutes.SIGN_UP} replace />} />

        <Route path={ERoutes.SIGN_UP} element={<SignUp />} />

        <Route path={ERoutes.CONFIRM} element={<ConfirmSignUp />} />

        <Route path={ERoutes.TERMS} element={<Terms />} />

        <Route path={ERoutes.PRIVACY} element={<Privacy />} />

        <Route path={ERoutes.ADD_SELFIE} element={<ProtectedRoute element={AddSelfiePage} />} />

        <Route path={ERoutes.MAIN} element={<ProtectedRoute element={Main} />}>
          <Route path={ERoutes.ALBUMS_ID} element={<CurrentAlbum />} />

          <Route path={ERoutes.USER} element={<UserPage />}>
            <Route path={ERoutes.USER_EDIT_NAME} element={<EditName />} />

            <Route path={ERoutes.USER_SETTINGS} element={<Settings />}>
              <Route path={ERoutes.USER_SETTINGS_PHONE} element={<EditPhone />} />

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
