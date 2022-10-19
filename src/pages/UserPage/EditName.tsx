import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { APIStatus } from 'api/MainApi'

import { editNameAsync } from 'store/user/actions'
import { selectUserStatus, selectUserName, selectUserIsOnboarding } from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import { useInput } from 'components/hooks/useInput'
import Title from 'components/common/Title'
import TextField from 'components/common/TextField'
import LoadingButton from 'components/common/LoadingButton'

const EditName: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectUserStatus)
  const userName = useSelector(selectUserName)
  const onboarding = useSelector(selectUserIsOnboarding)

  const [newUserName, setNewUserName] = useInput(userName || '')
  const [isEditNameLoading, setIsEditNameLoading] = useState(false)

  useEffect(() => {
    if (isEditNameLoading) {
      if (status === APIStatus.FULFILLED) {
        if (onboarding)
          navigate(
            `${ERoutes.MAIN}/${ERoutes.USER}/${ERoutes.USER_SETTINGS}/${ERoutes.USER_SETTINGS_EMAIL}`,
          )
        if (!onboarding) navigate(-1)
      }

      if (status === APIStatus.REJECTED) {
        toast.error('Something went wrong, please try again later.')
      }

      if (status !== APIStatus.PENDING) setIsEditNameLoading(false)
    }
  }, [status, isEditNameLoading])

  const handleOnClickSaveBtn = () => {
    if (!newUserName.length) {
      toast.error('Please enter your name.')
      return
    }

    if (newUserName === userName) {
      toast.error('You don`t need to update, if name hasn`t changed.')
      return
    }

    setIsEditNameLoading(true)
    dispatch(editNameAsync(newUserName))
  }

  return (
    <MotionContainerStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onboarding={onboarding}
    >
      <TitleStyled size={onboarding ? Title.size.normal : Title.size.small}>
        {onboarding ? 'Let’s get to know you' : 'Your name'}
      </TitleStyled>

      <TextFieldStyled
        placeholder={onboarding ? 'What’s your name?' : 'Enter your new name'}
        fullWidth
        value={newUserName}
        onChange={setNewUserName.onChange}
      />

      <LoadingButton
        loading={isEditNameLoading}
        disabled={!newUserName.length}
        fullWidth
        onClick={handleOnClickSaveBtn}
      >
        {onboarding ? 'Next' : 'Save'}
      </LoadingButton>
    </MotionContainerStyled>
  )
}

export default EditName

const TitleStyled = styled(Title)``

const TextFieldStyled = styled(TextField)``

const MotionContainerStyled = styled(motion.div)<{ onboarding: boolean }>`
  width: 100%;
  max-width: 450px;
  padding: ${({ onboarding }) => (onboarding ? '165px' : '167px')} 15px 15px;
  display: flex;
  flex-direction: column;

  ${TextFieldStyled} {
    margin: ${({ onboarding }) => (onboarding ? '21px 0' : '20px 0 21px')};
  }

  ${TitleStyled} {
    line-height: ${({ onboarding }) => (onboarding ? '14px' : '13px')};
  }
`
