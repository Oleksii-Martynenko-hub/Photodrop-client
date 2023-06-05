import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { ERoutes } from 'pages/App'
import { useMediaQueryMin } from 'components/hooks/useMediaQuery'
import Text from 'components/common/Text'
import Title from 'components/common/Title'
import Button from 'components/common/Button'

const Footer = () => {
  const location = useLocation()

  const md = useMediaQueryMin(1024)

  if (
    location.pathname !== ERoutes.DASHBOARD &&
    !location.pathname.includes(ERoutes.ALBUMS_ID.split(':')[0])
  )
    return null

  return (
    <FooterStyled>
      <ContentWrapper>
        <LeftSideContent>
          <TitleStyled size={Title.size.small}>PhotoDrop is brought to you by</TitleStyled>

          <FrameologyLogo src='/images/frameology-logo.svg' alt='frameology logo' />

          <DescriptionStyled>
            Our mission is to help people connect with their memories. If you framing some of the
            photos from your experience, please consider using Frameology. It supports the
            photographers and makes PhotoDrop possible.
          </DescriptionStyled>

          <FramePhotoButton disabled fullWidth btnTheme={Button.themes.outlined}>
            {md ? 'Order photos' : 'Frame a photo'}
          </FramePhotoButton>

          {md && <CopyStyled>© 2022 FOM Online Inc</CopyStyled>}
        </LeftSideContent>

        <RightSideContent>
          <ContactStyled>
            Questions? Get in touch -{' '}
            <EmailLink href='mailto:hello@photodrop.me'>hello@photodrop.me</EmailLink>{' '}
          </ContactStyled>

          <ClimateNeutralLogo src='/images/climate-neutral-logo.svg' alt='Climate Neutral Logo' />

          {!md && <CopyStyled>© 2022 FOM Online Inc</CopyStyled>}

          <TermsText>
            <TermsPrivacyLink to={ERoutes.TERMS}>Terms{md && ' of services'}</TermsPrivacyLink>
          </TermsText>

          <PrivacyText>
            <TermsPrivacyLink to={ERoutes.PRIVACY}>Privacy Party</TermsPrivacyLink>
          </PrivacyText>
        </RightSideContent>
      </ContentWrapper>
    </FooterStyled>
  )
}

export default Footer

const FooterStyled = styled.footer`
  background: ${({ theme }) => theme.styledPalette.mainText};
`

const LeftSideContent = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: column;
  margin: 0 0 60px 0;

  @media ${({ theme }) => theme.media.desktop} {
    flex: 0 0 422px;
    margin: 0 60px 0 0;
  }
`

const RightSideContent = styled(LeftSideContent)`
  margin: 0;

  @media ${({ theme }) => theme.media.desktop} {
    flex: 0 0 311px;
  }
`

const TitleStyled = styled(Title)`
  line-height: 13px;
  margin: 0 0 15px 0;
  text-align: left;

  @media ${({ theme }) => theme.media.desktop} {
    line-height: 17px;
  }
`

const FrameologyLogo = styled.img`
  width: 150px;
  height: 24px;

  @media ${({ theme }) => theme.media.desktop} {
    width: 185px;
    height: 30px;
  }
`

const ClimateNeutralLogo = styled.img`
  width: 100px;
  height: 40px;
  margin: 0 0 30px 0;
`

const DescriptionStyled = styled(Text)`
  margin: 23px 0 39px 0;
  line-height: 21px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 20px 0 29px 0;
    font-size: 18px;
    line-height: 23px;
  }
`

const ContactStyled = styled(Text)`
  margin: 0 0 30px 0;
  line-height: 13px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 0 0 20px 0;
    font-size: 18px;
    line-height: 12px;
  }
`

const CopyStyled = styled(Text)`
  margin: 0 0 19px 0;
  line-height: 13px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 0;
    font-size: 18px;
    line-height: 14px;
  }
`

const EmailLink = styled.a``

const TermsText = styled(Text)`
  line-height: 11px;
  margin: 0 0 20px 0;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 0 0 19px 0;
    font-size: 18px;
    line-height: 14px;
  }
`

const PrivacyText = styled(Text)`
  line-height: 12px;

  @media ${({ theme }) => theme.media.desktop} {
    font-size: 18px;
    line-height: 12px;
  }
`

const TermsPrivacyLink = styled(Link)``

const FramePhotoButton = styled(Button)`
  line-height: 23px;
  padding: 12px 13px 13px;
  margin: 0;

  @media ${({ theme }) => theme.media.desktop} {
    line-height: 15px;
    padding: 16px 13px 17px;
    max-width: 300px;
    margin: 0 0 60px 0;
  }
`

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 375px;
  padding: 60px 15px 134px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;

  @media ${({ theme }) => theme.media.desktop} {
    flex-flow: row nowrap;
    padding: 60px 40px 40px;
    max-width: 872px;
  }

  ${TitleStyled},
  ${DescriptionStyled},
  ${ContactStyled},
  ${CopyStyled},
  ${TermsText},
  ${PrivacyText},
  ${EmailLink},
  ${TermsPrivacyLink} {
    color: #fff;
    letter-spacing: -0.36px;
    text-decoration: none;
  }
`
