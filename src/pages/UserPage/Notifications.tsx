import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

import { APIStatus } from 'api/MainApi'

import { editNotificationAsync } from 'store/user/actions'
import { UserNotifications } from 'store/user/reducers'
import { selectUserNotifications, selectUserStatus } from 'store/user/selectors'

import Text from 'components/common/Text'
import Title from 'components/common/Title'
import Button from 'components/common/Button'
import LoadingButton from 'components/common/LoadingButton'

const Notifications: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const status = useSelector(selectUserStatus)
  const notifications = useSelector(selectUserNotifications)

  const [newNotifications, setNewNotifications] = useState<UserNotifications>(notifications)
  const [isEditNotificationsLoading, setIsEditNotificationsLoading] = useState(false)

  const [options] = useState<{ key: keyof UserNotifications; title: string; checkboxId: string }[]>(
    [
      {
        checkboxId: 'checkbox-text-messages',
        key: 'textMessagesNotification',
        title: 'Text messages',
      },
      {
        checkboxId: 'checkbox-email-notification',
        key: 'emailNotification',
        title: 'Email',
      },
      {
        checkboxId: 'checkbox-unsubscribe',
        key: 'unsubscribe',
        title: 'Unsubscribe',
      },
    ],
  )

  useEffect(() => {
    if (notifications.emailNotification !== null) {
      setNewNotifications(notifications)
    }
  }, [notifications])

  useEffect(() => {
    if (isEditNotificationsLoading) {
      if (status === APIStatus.FULFILLED) {
        navigate(-1)
      }

      if (status === APIStatus.REJECTED) {
        toast.error('Something went wrong, please try again later.')
      }

      if (status !== APIStatus.PENDING) setIsEditNotificationsLoading(false)
    }
  }, [status, isEditNotificationsLoading])

  const handleChangeNotificationCheckbox = (key: keyof UserNotifications) => {
    return ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setNewNotifications((prev) => ({ ...prev, [key]: checked }))
    }
  }

  const handleOnClickSaveBtn = () => {
    if (
      notifications.textMessagesNotification === newNotifications.textMessagesNotification &&
      notifications.emailNotification === newNotifications.emailNotification &&
      notifications.unsubscribe === newNotifications.unsubscribe
    ) {
      toast.error('You don`t need to update, if nothing changed.')
      return
    }

    setIsEditNotificationsLoading(true)
    dispatch(editNotificationAsync(newNotifications))
  }

  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleStyled size={Title.size.small}>Notification settings</TitleStyled>

      {options.map(({ checkboxId, key, title }) => (
        <OptionWrapper key={key}>
          <OptionCheckbox
            forwardedAs='label'
            htmlFor={checkboxId}
            btnTheme={Button.themes.text}
            active={!!newNotifications[key]}
          >
            <TickIconStyled src='/images/tick-icon.svg' alt='tick icon' />
            <input
              style={{ display: 'none' }}
              id={checkboxId}
              name={checkboxId}
              type='checkbox'
              checked={!!newNotifications[key]}
              onChange={handleChangeNotificationCheckbox(key)}
            />
          </OptionCheckbox>

          <OptionTitle forwardedAs='label' htmlFor={checkboxId} weight={Text.weight.medium}>
            {title}
          </OptionTitle>
        </OptionWrapper>
      ))}

      <DescriptionStyled size={Text.size.sm} color={Text.color.black}>
        Stop marketing notifications. You will still receive transactional notifications for
        purchases and when new photos are available.
      </DescriptionStyled>

      <LoadingButton loading={isEditNotificationsLoading} fullWidth onClick={handleOnClickSaveBtn}>
        Save
      </LoadingButton>
    </MotionContainerStyled>
  )
}

export default Notifications

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 20px 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 500px;
    padding: 40px;
  }
`

const TitleStyled = styled(Title)`
  line-height: 14px;
  margin: 0 0 19px 0;

  @media ${({ theme }) => theme.media.desktop} {
    line-height: 12px;
    margin: 0 0 32px 0;
  }
`

const DescriptionStyled = styled(Text)`
  letter-spacing: 0px;
  padding: 0 0 0 30px;
  line-height: 18px;
  margin: 10px 0 39px;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.1px;
  }
`

const OptionTitle = styled(Text)`
  letter-spacing: 0.5px;
  line-height: 20px;
  cursor: pointer;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 18px;
  }
`

const TickIconStyled = styled.img`
  position: absolute;
  top: 5px;
  left: 3px;
  width: 13px;
  height: 10px;
  user-select: none;
`

const OptionWrapper = styled.div`
  display: flex;

  &:not(:last-of-type) {
    margin: 0 0 10px 0;
  }
`

const OptionCheckbox = styled(Button)<{ active: boolean }>`
  position: relative;
  width: 20px;
  height: 20px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.styledPalette.primary : theme.styledPalette.checkboxDisabled};
  border-radius: 5px;
  margin: 0 10px 0 0;

  ${TickIconStyled} {
    display: ${({ active }) => (active ? 'block' : 'none')};
  }
`
