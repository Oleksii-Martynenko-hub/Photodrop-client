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
  display: flex;
  flex-direction: column;
`

const TitleStyled = styled(Title)`
  line-height: 14px;
  margin-bottom: 19px;
`

const DescriptionStyled = styled(Text)`
  letter-spacing: 0px;
  padding-left: 30px;
  line-height: 18px;
  margin: 10px 0 39px;
`

const OptionTitle = styled(Text)`
  letter-spacing: 0.5px;
  line-height: 10px;
  cursor: pointer;
`

const TickIconStyled = styled.img`
  width: 13px;
  height: 10px;
`

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`

const OptionCheckbox = styled(Button)<{ active: boolean }>`
  width: 20px;
  height: 20px;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.styledPalette.primary : theme.styledPalette.checkboxDisabled};
  border-radius: 5px;
  padding: 4px 2px;
  margin-right: 10px;

  ${TickIconStyled} {
    display: ${({ active }) => (active ? 'block' : 'none')};
  }
`
