import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

import { APIStatus } from 'api/MainApi'

import { editEmailAsync } from 'store/user/actions'
import {
  selectUserStatus,
  selectUserEmail,
  selectUserIsOnboarding,
  selectUserName,
} from 'store/user/selectors'

import { ERoutes } from 'pages/App'
import { useInput } from 'components/hooks/useInput'
import Text from 'components/common/Text'
import Title from 'components/common/Title'
import TextField from 'components/common/TextField'
import LoadingButton from 'components/common/LoadingButton'

const EditEmail: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectUserStatus)
  const userEmail = useSelector(selectUserEmail)
  const userName = useSelector(selectUserName)
  const onboarding = useSelector(selectUserIsOnboarding)

  const [newUserEmail, setNewUserEmail] = useInput(userEmail || '')
  const [isEditEmailLoading, setIsEditEmailLoading] = useState(false)

  useEffect(() => {
    if (!userName) {
      navigate(`${ERoutes.MAIN}/${ERoutes.USER}/${ERoutes.USER_EDIT_NAME}`)
    }
  }, [userName])

  useEffect(() => {
    if (isEditEmailLoading) {
      if (status === APIStatus.FULFILLED) {
        if (onboarding) navigate(`${ERoutes.MAIN}`)
        if (!onboarding) navigate(-1)
      }

      if (status === APIStatus.REJECTED) {
        toast.error('Something went wrong, please try again later.')
      }

      if (status !== APIStatus.PENDING) setIsEditEmailLoading(false)
    }
  }, [status, isEditEmailLoading])

  const handleOnClickSaveBtn = () => {
    if (!newUserEmail.length) {
      toast.error('Please enter your email.')
      return
    }

    if (newUserEmail === userEmail) {
      toast.error('You don`t need to update, if email hasn`t changed.')
      return
    }

    setIsEditEmailLoading(true)
    dispatch(editEmailAsync(newUserEmail))
  }

  return (
    <MotionContainerStyled
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onboarding={onboarding}
    >
      {onboarding ? (
        <TitleWrapper>
          <TitleStyled>Hey there,</TitleStyled>
          <TitleStyled>
            {userName}! <Emoji forwardedAs='span'>👋</Emoji>
          </TitleStyled>
        </TitleWrapper>
      ) : (
        <TitleStyled size={Title.size.small}>Your email</TitleStyled>
      )}

      <TextFieldStyled
        placeholder={onboarding ? 'What’s your email?' : 'Enter your new email'}
        fullWidth
        value={newUserEmail}
        onChange={setNewUserEmail.onChange}
      />

      <LoadingButton
        loading={isEditEmailLoading}
        disabled={!newUserEmail.length}
        fullWidth
        onClick={handleOnClickSaveBtn}
      >
        {onboarding ? 'See your photos!' : 'Save'}
      </LoadingButton>

      {onboarding && (
        <TermsPrivacyWrapperStyled size={Text.size.sm} color={Text.color.black}>
          By continuing, you indicate that you have read and agree to our{' '}
          <TermsPrivacyLinkStyled to={ERoutes.TERMS}>Terms of Use</TermsPrivacyLinkStyled>
          {' & '}
          <TermsPrivacyLinkStyled to={ERoutes.PRIVACY}>Privacy Policy</TermsPrivacyLinkStyled>
        </TermsPrivacyWrapperStyled>
      )}
    </MotionContainerStyled>
  )
}

export default EditEmail

const TitleStyled = styled(Title)``

const Emoji = styled(Title)`
  font-weight: 600;
  font-size: 28px;
  line-height: 14px;
`

const TitleWrapper = styled.div``

const TextFieldStyled = styled(TextField)``

const TermsPrivacyWrapperStyled = styled(Text)`
  letter-spacing: -0.32px;
  padding-left: 1px;
  line-height: 18px;
  margin-top: 213px;
`

const TermsPrivacyLinkStyled = styled(Link)`
  display: inline-block;
  color: inherit;
  line-height: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.styledPalette.primary};
  text-decoration: none;
`

const MotionContainerStyled = styled(motion.div)<{ onboarding: boolean }>`
  width: 100%;
  max-width: 450px;
  padding: ${({ onboarding }) => (onboarding ? '139px' : '166px')} 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  ${TextFieldStyled} {
    margin: ${({ onboarding }) => (onboarding ? '20px 0' : '19px 0 21px')};
  }

  ${TitleStyled} {
    line-height: ${({ onboarding }) => (onboarding ? '14px' : '13px')};

    ${({ onboarding }) =>
      onboarding &&
      css`
        &:not(:last-child) {
          margin-bottom: 14px;
        }
      `}
  }
`
