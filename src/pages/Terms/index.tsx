/* eslint-disable react/no-unescaped-entities */
import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useMediaQuery } from '@mui/material'

import Text from 'components/common/Text'
import Title from 'components/common/Title'
import { Link } from 'react-router-dom'

const Terms: FC = () => {
  const md = useMediaQuery('(min-width:1024px)')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <MotionContainerStyled initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <TitleStyled size={Title.size.small}>
        {md ? 'Terms of Use & Privacy Policy' : 'Terms of service'}
      </TitleStyled>

      <TextWrapper>
        <p className='photodrop-futura' style={{ marginTop: 0 }}>
          By registering to use and access the FOM Online, Inc. (“PhotoDrop”) websites located at
          photodrop.me and frameology.com, the PhotoDrop photo matching service, and texting bot
          (together, the “Service”), you are agreeing to be bound by these Terms of Use (the
          “Terms”). The Terms and our Privacy Policy (photodrop.me/terms) govern your use of our
          Service. By agreeing to these Terms, you represent that you are not a resident of the
          state of Illinois and will not upload photos to PhotoDrop taken in the state of Illinois.{' '}
          <span style={{ fontWeight: '700' }}>
            Please read these Terms carefully. Unless you opt out of arbitration in accordance with
            the instructions below within 30 days of first agreeing to these Terms, you are agreeing
            that we will resolve certain disputes between us in binding arbitration on an individual
            basis rather than in jury trials or class actions.
          </span>
        </p>
        <p className='photodrop-futura'>
          If you do not agree with any of these terms, you are prohibited from using or accessing
          the Service. If you are accessing and using the Service on behalf of a company (such as
          your employer) or other legal entity, you represent and warrant that you have the
          authority to bind that company or other legal entity to these Terms. In that case, “you”
          and “your” will refer to that company or other legal entity.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Privacy Policy</span>
        </div>
        <p className='photodrop-futura'>
          Please refer to our{' '}
          <Link to='/privacy' style={{ color: '#3300CC' }}>
            Privacy Policy
          </Link>{' '}
          for information on how we collect, use and disclose information from our users. You
          acknowledge and agree that your use of the Service is subject to our Privacy Policy.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Facial Recognition Technology</span>
        </div>
        <p className='photodrop-futura'>
          You agree that we may use facial recognition technology to allow us to identify photos on
          the Service in which you appear when you add a reference photo to the Service. For
          example, our facial recognition technology will compare your reference image with albums
          of photos to locate photos of you. In addition, your responses to potential photo matches
          may improve the accuracy of the facial recognition technology. By using the Service and
          adding a reference image, you consent to the use of facial recognition technology to
          identify photos on the Service in which you appear. You represent that the reference image
          photo added by you to the Service is you (or a family member for whom you are the legal
          guardian or have their consent) and that you are not impersonating or misrepresenting
          yourself as any other person or entity. For more information on our use of facial
          recognition technology, please see our{' '}
          <span style={{ fontWeight: '700' }}>Privacy Policy.</span>
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Changes to Terms of Service</span>
        </div>
        <p className='photodrop-futura'>
          We may modify the Terms at any time, at our sole discretion. If we do so, we’ll let you
          know either by posting the modified Terms on the Site or through other communications.
          It’s important that you review the Terms whenever we modify them because if you continue
          to use the Service after we have posted modified Terms on the Site, you are indicating to
          us that you agree to be bound by the modified Terms. If you don’t agree to be bound by the
          modified Terms, then you may not use the Service anymore. Because our Service is evolving
          over time we may change or discontinue all or any part of the Service, at any time and
          without notice, at our sole discretion.
        </p>
        <p className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Who May Use the Service</span>
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Eligibility</span>
        </div>
        <p className='photodrop-futura'>
          You may use the Service only if you are 13 years of age or older and are not barred from
          using the Service under applicable law.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Registration and Your Information</span>
        </div>
        <p className='photodrop-futura'>
          If you want to use certain features of the Service you’ll have to create an account (“
          <span style={{ fontWeight: '700' }}>Account</span>”). It’s important that you provide us
          with accurate, complete and up-to-date information for your Account and you agree to
          update such information, as needed, to keep it accurate, complete and up-to-date. If you
          don’t, we might have to suspend or terminate your Account. You agree that you won’t
          disclose your Account password to anyone and you’ll notify us immediately of any
          unauthorized use of your Account. You’re responsible for all activities that occur under
          your Account, whether or not you know about them.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Twilio Short & Long Code Terms of Service</span>
        </div>
        <div className='photodrop-futura'>
          <ol>
            <li>
              When you provide your phone number opt-in to the service, we will send you an SMS
              message to confirm your signup.
            </li>
            <li>
              By providing your phone number, you agree that we may send you SMS messages in
              response to SMS messages you send to us, such as when you send a reference image or
              code to us by SMS. In addition, by registering to use the service, you agree to
              receive SMS messages sent using an automatic telephone dialing system to inform you of
              the following: opportunities to join or create albums relevant to you; new photos
              added to your albums; comments, or reactions added to your photos; new matching photos
              or links to them based on a code you sent us, your location and proximity to photos
              taken; or invitations from other users of the Service
            </li>
            <li>
              You can cancel the SMS service at any time. Just text “
              <span style={{ fontWeight: '700' }}>STOP</span>” to [+1 (929) 332-2697]. After you
              send the SMS message <span style={{ fontWeight: '700' }}>STOP</span> to us, we will
              send you an SMS message to confirm that you have been unsubscribed. After this, you
              will no longer receive SMS messages from us.
            </li>
            <li>
              If you want to join again, just sign up as you did the first time and we will start
              sending SMS messages to you again.
            </li>
            <li>
              If at any time you forget what keywords are supported, just text "
              <span style={{ fontWeight: '700' }}>HELP</span>" to [+1 (929) 332-2697]. After you
              send the SMS message "<span style={{ fontWeight: '700' }}>HELP</span>" to us, we will
              respond with instructions on how to use our service as well as how to unsubscribe.
            </li>
            <li>
              We are able to deliver messages to the following mobile phone carriers: Major
              carriers: AT&T, Verizon Wireless, Sprint, T-Mobile, U.S. Cellular, Alltel, Boost
              Mobile, Nextel, and Virgin Mobile. Minor carriers: Alaska Communications Systems
              (ACS), Appalachian Wireless (EKN), Bluegrass Cellular, Cellular One of East Central IL
              (ECIT), Cellular One of Northeast Pennsylvania, Cincinnati Bell Wireless, Cricket,
              Coral Wireless (Mobi PCS), COX, Cross, Element Mobile (Flat Wireless), Epic Touch
              (Elkhart Telephone), GCI, Golden State, Hawkeye (Chat Mobility), Hawkeye (NW
              Missouri), Illinois Valley Cellular, Inland Cellular, iWireless (Iowa Wireless),
              Keystone Wireless (Immix Wireless/PC Man), Mosaic (Consolidated or CTC Telecom),
              Nex-Tech Wireless, NTelos, Panhandle Communications, Pioneer, Plateau (Texas RSA 3
              Ltd), Revol, RINA, Simmetry (TMP Corporation), Thumb Cellular, Union Wireless, United
              Wireless, Viaero Wireless, and West Central (WCC or 5 Star Wireless).
            </li>
            <li>
              As always, message and data rates may apply for any messages sent to you from us and
              to us from you. You will receive periodic messages. If you have any questions about
              your text plan or data plan, it is best to contact your wireless provider.
            </li>
          </ol>
        </div>
        <p className='photodrop-futura'>
          For all questions about the services provided by this short code, you can send an email to{' '}
          <a href='mailto:hello@photodrop.me' style={{ color: '#3300CC' }}>
            hello@photodrop.me
          </a>
          .
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Feedback</span>
        </div>
        <p className='photodrop-futura'>
          We welcome feedback, comments and suggestions for improvements to the Service (“
          <span style={{ fontWeight: '700' }}>Feedback</span>”). You can submit Feedback by emailing
          us at{' '}
          <a href='mailto:feedback@photodrop.me' style={{ color: '#3300CC' }}>
            feedback@photodrop.me
          </a>
          . Any Feedback you provide which is incorporated into the Service, you agree is subject to
          a non-exclusive, worldwide, perpetual, irrevocable, fully-paid, royalty-free,
          sublicensable and transferable license to the Company.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Content and Content Rights</span>
        </div>
        <p className='photodrop-futura'>
          For purposes of these Terms: (a) “<span style={{ fontWeight: '700' }}>Content</span>”
          means text, graphics, photos (including reference images), data (including feedback on
          proposed photo matches), images, music, software, audio, video, works of authorship of any
          kind, personally identifiable information, and information or other materials that are
          posted, generated, provided or otherwise made available through the Service; and (b) “
          <span style={{ fontWeight: '700' }}>User Content</span>” means any Content that Account
          holders (including you) provide to be made available through the Service. Content includes
          without limitation User Content.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Content Ownership, Responsibility and Removal</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop does not claim any ownership rights in any User Content and nothing in these
          Terms will be deemed to restrict any rights that you may have to use and exploit your User
          Content. Subject to the foregoing, PhotoDrop and its licensors exclusively own all right,
          title and interest in and to the Service and Content, including all associated
          intellectual property rights. You acknowledge that the Service and Content are protected
          by copyright, trademark, and other laws of the United States and foreign countries. You
          agree not to remove, alter or obscure any copyright, trademark, service mark or other
          proprietary rights notices incorporated in or accompanying the Service or Content.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Rights in User Content Granted by You</span>
        </div>
        <p className='photodrop-futura'>
          By making any User Content available through the Service you hereby grant to PhotoDrop and
          the Owner of any gallery you submit your User Content to a non-exclusive, transferable,
          sublicensable, worldwide, royalty-free license to use, copy, modify, create derivative
          works based upon, distribute, publicly display, publicly perform and distribute your User
          Content in connection with operating, marketing, and providing the Service. We do not
          claim ownership of your content, but you grant us a license to use it. Nothing is changing
          about your rights in your content. We do not claim ownership of your content that you post
          on or through the Service and you are free to share your content with anyone else,
          wherever you want.
        </p>
        <p className='photodrop-futura'>
          You are solely responsible for all your User Content. You represent and warrant that you
          own all your User Content or you have all rights that are necessary to grant us the
          license rights in your User Content under these Terms. You also represent and warrant that
          neither your User Content, nor your use and provision of your User Content to be made
          available through the Service, nor any use of your User Content by PhotoDrop on or through
          the Service will infringe, misappropriate or violate a third party’s intellectual property
          rights, or rights of publicity or privacy, or result in the violation of any applicable
          law or regulation.
        </p>
        <p className='photodrop-futura'>
          You can remove your User Content by specifically deleting it. However, in certain
          instances, some of your User Content (such as photos, posts or comments you make) may not
          be completely removed and copies of your User Content may continue to exist on the
          Service. We are not responsible or liable for the removal or deletion of (or the failure
          to remove or delete) any of your User Content.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Rights in Content Granted by PhotoDrop</span>
        </div>
        <p className='photodrop-futura'>
          Subject to your compliance with these Terms, PhotoDrop grants you a limited,
          non-exclusive, non-transferable, non-sublicensable license to download, view, copy, print,
          and display one copy of the Content solely in connection with your permitted use of the
          Service and solely for your personal, non-commercial purposes.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Fees for Services</span>
        </div>
        <p className='photodrop-futura'>
          You agree to pay PhotoDrop any fees for each Service you purchase or use (including any
          overage fees), in accordance with the pricing and payment terms presented to you for that
          Service. Where applicable, you will be billed using the billing method you select through
          our checkout. Fees paid by you are non-refundable, except as provided in these Terms or
          when required by law.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Services Terms</span>
        </div>
        <p className='photodrop-futura'>
          These Terms of Use apply to your access to and use of the Site, the Professional Services
          (as defined below) and any other apps and online services provided by PhotoDrop (the
          “Services”). These Terms of Use also apply to your use of the Services to purchase
          photographic prints or other related merchandise and products (“Products”) through
          PhotoDrop’s approved third party vendors and retailers (“PhotoDrop Vendors”).
        </p>
        <p className='photodrop-futura'>
          Your use of the Services and your purchase of Products is expressly conditioned upon your
          agreement to these Terms of Use. If you do not consent to these Terms of Use, you are not
          permitted to use PhotoDrop or any PhotoDrop Services. If you access the Services on behalf
          of a company or other entity, you warrant that you are an authorized representative of
          such company or entity with the right to bind such company or entity to these Terms of
          Use.
        </p>
        <p className='photodrop-futura'>
          The Services are not targeted towards, nor intended for use by, anyone under the age of
          13. If you are between the ages of 13 and 18, you may use the Services only under the
          supervision of a parent or legal guardian who agrees to be bound by these Terms of Use.
        </p>
        <p className='photodrop-futura'>
          These Terms of Use contain provisions that govern how claims that you and PhotoDrop have
          against each other are resolved (see Section 15 — Dispute Resolution). These Terms of Use
          also contain provisions requiring you to resolve certain disputes or claims relating to
          your use of the Services by binding arbitration, rather than in court. If you do not
          consent to such terms, you are not permitted to use the PhotoDrop Services.
        </p>
        <p className='photodrop-futura'>
          PhotoDrop reserves the right to change, modify, revise or otherwise amend any provision of
          these Terms of Use, and any other terms, policies or guidelines governing your use of the
          Services, at any time at its sole discretion by providing notice that the Terms of Use
          have been modified. Such notice may be provided by sending an email, or by posting a
          notice on the Site, or by posting the revised Terms of Use on the Site and revising the
          date at the top of these Terms of Use or by such other form of notice as determined by
          PhotoDrop. Your continued use of the Services, or your purchase of any Products or the
          Services following the posting of the revised Terms of Use or other notice will constitute
          your acceptance of such changes or modifications. Otherwise, any changes or modifications
          will be effective within thirty (30) days of the posting of the revisions on the Site
          unless you notify PhotoDrop within such thirty (30) days that you do not agree to the
          changes and stop using the Services. Therefore, you should review these Terms of Use
          whenever you access the Services and at least every thirty (30) days to make sure that you
          understand the terms and conditions that will apply to your use of the Services.
        </p>
        <p className='photodrop-futura'>
          Our Privacy Policy provides information on how PhotoDrop collects, uses and discloses
          information from all users of the Services and/or information obtained through your
          purchase of Products through the Services.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Taxes</span>
        </div>
        <p className='photodrop-futura'>
          Unless otherwise stated, you are responsible for any taxes or duties associated with the
          sale of the Services, including any related penalties or interest (collectively, “Taxes”).
          You will pay PhotoDrop for the Services without any reduction for Taxes. If PhotoDrop is
          obliged to collect or pay Taxes, the Taxes will be invoiced to you, unless you provide
          PhotoDrop with a valid tax exemption certificate authorized by the appropriate taxing
          authority or other documentation providing evidence that no tax should be charged. If you
          are required by law to withhold any Taxes from your payments to PhotoDrop, you must
          provide PhotoDrop with an official tax receipt or other appropriate documentation to
          support such payments. If you use the Services to sell photographs or other services and
          are obligated, or elect, to collect Taxes from customers, including sales and use tax, on
          the PhotoDrop platform you are responsible for all requirements, including registration,
          filing, and remittance to all applicable taxing authorities.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Price Changes</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop may change the fees charged for the Services at any time, provided that, for
          Services billed on a subscription basis, the change will become effective only at the end
          of the then-current billing cycle of your Subscription. PhotoDrop will provide you with
          reasonable prior written notice of any change in fees to give you an opportunity to cancel
          your Subscription before the change becomes effective.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Overage Fees</span>
        </div>
        <p className='photodrop-futura'>
          For Services with attendee limits, if the number of users which join an album exceed the
          limit for the Service initially purchased, PhotoDrop will bill you, and you will owe, the
          amount for the appropriate package in which the total users who joined the album does not
          exceed the package attendee limit (“Overage fees”). The amount paid for the Service
          initially purchased will be credited against the cost of the appropriate package. Unless
          otherwise stated, any overage fees incurred by you will be billed in arrears. Overage fees
          which remain unpaid for 30 days after being billed are considered overdue. Failure to pay
          overage fees when due may result in the applicable Service being limited, suspended, or
          terminated (subject to applicable legal requirements), which may result in a loss of your
          data associated with that Service. Any outstanding overage fees not paid will have late
          fees added, at a rate up to the statutory maximum.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>General Prohibitions and Enforcement Rights</span>
        </div>
        <div className='photodrop-futura'>You agree not to do any of the following:</div>
        <div className='photodrop-futura'>
          <ul>
            <li>
              Post, upload, publish, submit or transmit any Content that: (a) infringes,
              misappropriates or violates a third party’s patent, copyright, trademark, trade
              secret, moral rights or other intellectual property rights, or rights of publicity or
              privacy; (b) violates, or encourages any conduct that would violate, any applicable
              law or regulation or would give rise to civil liability; (c) is fraudulent, false,
              misleading or deceptive; (d) is defamatory, obscene, pornographic, vulgar or
              offensive; (e) promotes discrimination, bigotry, racism, hatred, harassment or harm
              against any individual or group; (f) is violent or threatening or promotes violence or
              actions that are threatening to any person or entity; or (g) promotes illegal or
              harmful activities or substances.
            </li>
            <li>
              Use, display, mirror or frame the Service or any individual element within the
              Service, PhotoDrop’s name, any PhotoDrop trademark, logo or other proprietary
              information, or the layout and design of any page or form contained on a page, without
              PhotoDrop’s express written consent;
            </li>
            <li>
              Access, tamper with, or use non-public areas of the Service, PhotoDrop’s computer
              systems, or the technical delivery systems of PhotoDrop’s providers;
            </li>
            <li>
              Attempt to probe, scan or test the vulnerability of any PhotoDrop system or network or
              breach any security or authentication measures;
            </li>
            <li>
              Avoid, bypass, remove, deactivate, impair, descramble or otherwise circumvent any
              technological measure implemented by PhotoDrop or any of PhotoDrop’s providers or any
              other third party (including another user) to protect the Service or Content;
            </li>
            <li>
              Attempt to access or search the Service or Content or download Content from the
              Service through the use of any engine, software, tool, agent, device or mechanism
              (including spiders, robots, crawlers, data mining tools or the like) other than the
              software and/or search agents provided by PhotoDrop or other generally available
              third-party web browsers;
            </li>
            <li>
              Send any unsolicited or unauthorized advertising, promotional materials, email, junk
              mail, spam, chain letters or other form of solicitation;
            </li>
            <li>
              Use any meta tags or other hidden text or metadata utilizing a PhotoDrop trademark,
              logo URL or product name without PhotoDrop express written consent;
            </li>
            <li>
              Use the Service or Content, or any portion thereof, for any commercial purpose or for
              the benefit of any third party or in any manner not permitted by these Terms;
            </li>
            <li>
              Forge any TCP/IP packet header or any part of the header information in any email or
              newsgroup posting, or in any way use the Service or Content to send altered, deceptive
              or false source-identifying information;
            </li>
            <li>
              Attempt to decipher, decompile, disassemble or reverse engineer any of the software
              used to provide the Service or Content;
            </li>
            <li>
              Interfere with, or attempt to interfere with, the access of any user, host or network,
              including, without limitation, sending a virus, overloading, flooding, spamming, or
              mail-bombing the Service;
            </li>
            <li>
              Collect or store any personally identifiable information from the Service from other
              users of the Service without their express permission;
            </li>
            <li>
              Impersonate or misrepresent your affiliation with any person or entity; specifically,
              you shall not submit a reference image which is not you and if you are a parent or
              legal guardian of a minor and choose to add reference images or photos in the Child
              Profile section of the app you shall only add faces which are your minor children or
              minors for whom you are their parent or legal guardian;
            </li>
            <li>Violate any applicable law or regulation; or</li>
            <li>Encourage or enable any other individual to do any of the foregoing.</li>
          </ul>
        </div>
        <p className='photodrop-futura'>
          Although we’re not obligated to monitor access to or use of the Service or Content or to
          review or edit any Content, we have the right to do so for the purpose of operating the
          Service, to ensure compliance with these Terms, and to comply with applicable law or other
          legal requirements. We reserve the right, but are not obligated, to remove or disable
          access to any Content, at any time and without notice, including, but not limited to, if
          we, at our sole discretion, consider any Content to be objectionable or in violation of
          these Terms. We have the right to investigate violations of these Terms or conduct that
          affects the Service. We may also consult and cooperate with law enforcement authorities to
          prosecute users who violate the law.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>DMCA/Copyright Policy</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop respects copyright law and expects its users to do the same. It is PhotoDrop’s
          policy to terminate in appropriate circumstances Account holders who repeatedly infringe
          or are believed to be repeatedly infringing the rights of copyright holders. Please see
          PhotoDrop’s Copyright Policy for further information.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Termination</span>
        </div>
        <p className='photodrop-futura'>
          We may terminate your access to and use of the Service, at our sole discretion, at any
          time and without notice to you. You may cancel your Account at any time by sending an
          email to us at feedback@photoprop.me. Upon any termination, discontinuation or
          cancellation of the Service or your Account, the following provisions will survive:
          Feedback, Rights in User Content Granted by You, General Prohibitions and PhotoDrop’s
          Enforcement Rights, Termination, Warranty Disclaimers, Indemnity, Limitation of Liability,
          and Dispute Resolution.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Warranty Disclaimers</span>
        </div>
        <p className='photodrop-futura'>
          THE SERVICE AND CONTENT ARE PROVIDED “AS IS,” WITHOUT WARRANTY OF ANY KIND. WITHOUT
          LIMITING THE FOREGOING, PHOTODROP EXPLICITLY DISCLAIMS ANY WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE, QUIET ENJOYMENT OR NON-INFRINGEMENT, AND ANY WARRANTIES
          ARISING OUT OF COURSE OF DEALING OR USAGE OF TRADE. Further, PhotoDrop does not warrant
          that the Service will meet your requirements or be available on an uninterrupted, secure
          or error-free basis. PhotoDrop makes no warranty concerning the quality, accuracy,
          timeliness, truthfulness, completeness, likely results, or reliability of the Service or
          Content.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Indemnity</span>
        </div>
        <p className='photodrop-futura'>
          You will indemnify and hold harmless PhotoDrop and its officers, directors, employee and
          agents, from and against any claims, disputes, demands, liabilities, damages, losses, and
          costs and expenses, including, without limitation, reasonable legal and accounting fees
          arising out of or in any way connected with (a) your access to or use of the Service or
          Content, (b) your User Content, or (c) your violation of these Terms.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Limitation of Liability</span>
        </div>
        <p className='photodrop-futura'>
          IN NO EVENT SHALL PHOTODROP OR ANY OTHER PARTY INVOLVED IN CREATING, PRODUCING OR
          DELIVERING THE SERVICE OR CONTENT BE LIABLE FOR ANY INCIDENTAL, SPECIAL, EXEMPLARY OR
          CONSEQUENTIAL DAMAGES, INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF DATA OR
          GOODWILL, LOST PROFITS, COMPUTER DAMAGE, SERVICE INTERRUPTION, SYSTEM FAILURE OR THE COST
          OF SUBSTITUTE SERVICES ARISING OUT OF THE USE OR INABILITY TO USE THE SERVICE OR CONTENT,
          WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), PRODUCT LIABILITY OR ANY
          OTHER LEGAL THEORY, AND WHETHER OR NOT PHOTODROP HAS BEEN NOTIFIED ORALLY OR IN WRITING OF
          THE POSSIBILITY OF SUCH DAMAGE, EVEN IF A LIMITED REMEDY SET FORTH HEREIN IS FOUND TO HAVE
          FAILED OF ITS ESSENTIAL PURPOSE. BECAUSE SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR
          LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, THESE LIMITATIONS MAY NOT
          APPLY TO YOU.
        </p>
        <p className='photodrop-futura'>
          IN NO EVENT WILL PHOTODROP’S TOTAL LIABILITY ARISING OUT OF OR IN CONNECTION WITH THESE
          TERMS OR FROM THE USE OF OR INABILITY TO USE THE SERVICE OR CONTENT EXCEED THE AMOUNTS YOU
          HAVE PAID TO PHOTODROP FOR USE OF THE SERVICE.
        </p>
        <p className='photodrop-futura'>
          THE EXCLUSIONS AND LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF THE
          BASIS OF THE BARGAIN BETWEEN PHOTODROP AND YOU.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Links to Third Party Websites or Resources</span>
        </div>
        <p className='photodrop-futura'>
          The Service and App may contain links to third party websites or resources. We provide
          these links only as a convenience and are not responsible for the content, products or
          services on or available from those websites or resources or links displayed on such
          websites. PhotoDrop has not reviewed all of the sites linked to the Service and is not
          responsible for the contents of any such linked site. The inclusion of any link does not
          imply endorsement by PhotoDrop of the site. You acknowledge sole responsibility for and
          assume all risk arising from your use of any third party websites or resources.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Mobile and Other Devices</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop currently provides our App and Service for free, but please be aware that your
          carrier’s normal rates and fees, such as text messaging and data charges, will still
          apply. In the event you change or deactivate your mobile telephone number, you will update
          your Account information on PhotoDrop within 48 hours to ensure that your messages are not
          sent to the person who acquires your old number.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Dispute Resolution</span>
        </div>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Governing Law</span>
        </div>
        <p className='photodrop-futura'>
          Interpretation of these Terms and any claim relating thereto shall be governed by the laws
          of the State of New York without regard to its conflict of law provisions. This Dispute
          Resolution section shall be governed by the Federal Arbitration Act, 9 U.S.C. §§ 1-16.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Agreement to Arbitrate</span>
        </div>
        <p className='photodrop-futura'>
          You and PhotoDrop agree that any dispute, claim or controversy arising out of or relating
          to these Terms or the breach, termination, enforcement, interpretation or validity thereof
          or the use of the Service or Content (collectively, “
          <span style={{ fontWeight: '700' }}>Disputes</span>”) will be settled by binding
          arbitration, except that each party retains the right: (a) to bring an individual action
          in small claims court and (b) to seek injunctive or other equitable relief in a court of
          competent jurisdiction to prevent the actual or threatened infringement, misappropriation
          or violation of a party’s copyrights, trademarks, trade secrets, patents or other
          intellectual property rights (the action described in the foregoing clause (b), an “
          <span style={{ fontWeight: '700' }}>IP Protection Action</span>”). Without limiting the
          preceding sentence, you will also have the right to litigate any other Dispute if you
          provide PhotoDrop with written notice of your desire to do so by email at{' '}
          <a href='mailto:feedback@photodrop.me' style={{ color: '#3300CC' }}>
            feedback@photodrop.me
          </a>{' '}
          within thirty (30) days following the date you first accept these Terms (such notice, an “
          <span style={{ fontWeight: '700' }}>Arbitration Opt-out Notice</span>
          ”). If you don’t provide PhotoDrop with an Arbitration Opt-out Notice within the thirty
          (30) day period, you will be deemed to have knowingly and intentionally waived your right
          to litigate any Dispute except as expressly set forth in clauses (a) and (b) above. The
          exclusive jurisdiction and venue of any IP Protection Action or, if you timely provide
          PhotoDrop with an Arbitration Opt-out Notice, will be the state and federal courts located
          in the Western District of Texas and each of the parties hereto waives any objection to
          jurisdiction and venue in such courts. Unless you timely provide PhotoDrop with an
          Arbitration Opt-out Notice,{' '}
          <span style={{ fontWeight: '700' }}>
            you acknowledge and agree that you and PhotoDrop are each waiving the right to a trial
            by jury or to participate as a plaintiff or class member in any purported class action,
            representative, or private attorney general proceeding
          </span>
          . Further, unless both you and PhotoDrop otherwise agree in writing, the arbitrator may
          not consolidate more than one person’s claims, and may not otherwise preside over any form
          of any class, representative, or private attorney general proceeding. In addition, the
          arbitrator may award declaratory or injunctive relief only in favor of the individual
          party seeking relief and cannot award relief that would affect other users. If this
          specific limitation on class, representative, private attorney general, or
          non-individualized declaratory and injunctive relief is held unenforceable as to a
          particular claim for relief, then that particular claim (and only that claim) shall be
          severed from arbitration and resolved in court. Except as provided in the preceding
          sentence, this “Dispute Resolution” section will survive any termination of these Terms.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Arbitration Rules</span>
        </div>
        <p className='photodrop-futura'>
          The arbitration will be administered by the American Arbitration Association (“
          <span style={{ fontWeight: '700' }}>AAA</span>”) in accordance with the Consumer
          Arbitration Rules (the “<span style={{ fontWeight: '700' }}>AAA Rules</span>”) then in
          effect, except as modified by this “Dispute Resolution” section. (The AAA Rules are
          available at{' '}
          <a href='www.adr.org/arb_med' target='_blank' style={{ color: '#3300CC' }}>
            www.adr.org/arb_med
          </a>{' '}
          or by calling the AAA at 1-800-778-7879.) The Federal Arbitration Act will govern the
          interpretation and enforcement of this Section.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Arbitration Process</span>
        </div>
        <p className='photodrop-futura'>
          A party who desires to initiate arbitration must provide the other party with a written
          Demand for Arbitration as specified in the AAA Rules. (The AAA provides a general{' '}
          <span style={{ fontWeight: '700' }}>Demand for Arbitration</span> and a separate{' '}
          <span style={{ fontWeight: '700' }}>Demand for Arbitration for California residents</span>
          ) The arbitrator will be either a retired judge or an attorney licensed to practice law
          and will be selected by the parties from the AAA’s roster of arbitrators. If the parties
          are unable to agree upon an arbitrator within seven (7) days of delivery of the Demand for
          Arbitration, then the AAA will appoint the arbitrator in accordance with the AAA Rules.
          The arbitrator will decide all issues, except that issues regarding the arbitrability of
          claims, including disputes over the interpretation or enforceability of the limitation on
          class, representative, private attorney general, or non-individualized declaratory and
          injunctive relief, shall be for the court to decide.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Arbitration Location and Procedure</span>
        </div>
        <p className='photodrop-futura'>
          Unless you and PhotoDrop otherwise agree, the arbitration will be conducted in the county
          where you reside. If your claim does not exceed $10,000, then the arbitration will be
          conducted solely on the basis of the documents that you and PhotoDrop submit to the
          arbitrator, unless you request a hearing or the arbitrator determines that a hearing is
          necessary. If your claim exceeds $10,000, your right to a hearing will be determined by
          the AAA Rules. Subject to the AAA Rules, the arbitrator will have the discretion to direct
          a reasonable exchange of information by the parties, consistent with the expedited nature
          of the arbitration.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Arbitrator’s Decision</span>
        </div>
        <p className='photodrop-futura'>
          The arbitrator will render an award within the time frame specified in the AAA Rules. The
          arbitrator’s decision will include the essential findings and conclusions upon which the
          arbitrator based the award. Judgment on the arbitration award may be entered in any court
          having jurisdiction thereof. The arbitrator’s award of damages must be consistent with the
          terms of the “Limitation of Liability” section above as to the types and amounts of
          damages for which a party may be held liable. If you prevail in arbitration you will be
          entitled to an award of attorneys’ fees and expenses, to the extent provided under
          applicable law. PhotoDrop will not seek, and hereby waives all rights it may have under
          applicable law to recover, attorneys’ fees and expenses if it prevails in arbitration,
          unless the arbitrator determines that either the substance of your claim or the relief
          sought in your Demand for Arbitration is frivolous or was brought for an improper purpose
          (as measured by the standards set forth in Federal Rule of Civil Procedure 11(b)).
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Fees</span>
        </div>
        <p className='photodrop-futura'>
          Notwithstanding the provisions of the “Modification” section above, if PhotoDrop changes
          this “Dispute Resolution” section after the date you first accepted these Terms (or
          accepted any subsequent changes to these Terms), you may reject any such change by sending
          us written notice (including by email to feedback@photodrop.me) within 30 days of the date
          such change became effective, as indicated in the “Last Updated” date above or in the date
          of PhotoDrop’s email to you notifying you of such change. By rejecting any change, you are
          agreeing that you will arbitrate any Dispute between you and PhotoDrop in accordance with
          the provisions of this “Dispute Resolution” section as of the date you first accepted
          these Terms (or accepted any subsequent changes to these Terms).
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>General Terms</span>
        </div>
        <p className='photodrop-futura'>
          These Terms constitute the entire and exclusive understanding and agreement between
          PhotoDrop and you regarding the Service and Content, and these Terms supersede and replace
          any and all prior oral or written understandings or agreements between PhotoDrop and you
          regarding the Service and Content. If any provision of these Terms is held invalid or
          unenforceable (either by an arbitrator appointed pursuant to the terms of the
          “Arbitration” section above or by court of competent jurisdiction, but only if you timely
          opt out of arbitration by sending us an Arbitration Opt-out Notice in accordance with the
          terms set forth above), that provision will be enforced to the maximum extent permissible
          and the other provisions of these Terms will remain in full force and effect. You may not
          assign or transfer these Terms, by operation of law or otherwise, without PhotoDrop’s
          prior written consent. Any attempt by you to assign or transfer these Terms, without such
          consent, will be null. PhotoDrop may freely assign or transfer these Terms without
          restriction. Subject to the foregoing, these Terms will bind and inure to the benefit of
          the parties, their successors and permitted assigns.
        </p>
        <p className='photodrop-futura'>
          Any notices or other communications provided by PhotoDrop under these Terms, including
          those regarding modifications to these Terms, will be given: (a) via email; or (b) by
          posting to the Service. For notices made by e-mail, the date of receipt will be deemed the
          date on which such notice is transmitted.
        </p>
        <p className='photodrop-futura'>
          PhotoDrop’s failure to enforce any right or provision of these Terms will not be
          considered a waiver of such right or provision. The waiver of any such right or provision
          will be effective only if in writing and signed by a duly authorized representative of
          PhotoDrop. Except as expressly set forth in these Terms, the exercise by either party of
          any of its remedies under these Terms will be without prejudice to its other remedies
          under these Terms or otherwise.
        </p>
        <p className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>A. GENERAL TERMS</span>
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Professional Services Terms</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop’s professional services (“Professional Services”) provide an online platform
          that enables our users to upload and share photographs (“Photos”) using the Services.
          Photos may collectively be referred to herein as “Media”. By subscribing to or using any
          Professional Services, you agree to be bound by and accept the Professional Services Terms
          set forth in Section B below.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Terms of Sale</span>
        </div>
        <p className='photodrop-futura'>
          Our Terms of Sale set forth contain additional terms, conditions and policies applicable
          to your purchase of Products through the Services. By ordering Products through the
          Services, you agree to be bound by and accept the Terms of Sale.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>License Agreements</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop enables certain users who own or otherwise have the right to license Media (the
          “Content Owner”) to use PhotoDrop to facilitate the license of their Media to other
          PhotoDrop users. Please refer to the terms of your Professional Plan to determine whether
          you are a Content Owner with the right to license your Media through PhotoDrop. All such
          licenses are made directly between the user and the Content Owner and are merely
          facilitated by PhotoDrop. The scope of the license rights granted by the Content Owner to
          the PhotoDrop user under any license will vary depending on the type of license that the
          Content Owner designates to such Media.
        </p>
        <p className='photodrop-futura'>
          By uploading Media to the PhotoDrop Services and indicating that the Media may be licensed
          by other PhotoDrop users, Content Owners agree to be bound by and accept the terms and
          conditions set forth in Section D below. By licensing any Media from a Content Owner
          through the Services, you agree to the terms of the applicable end user license agreement
          that has been chosen by the Content Owner (either the Commercial Use License or Personal
          Use License).
        </p>
        <p className='photodrop-futura'>
          Please note that if you download Media from the Services, you are not automatically
          granted any license rights by the Content Owner to such Media. Any Media license will be
          expressly communicated by the Content Owner at the time such Media is downloaded or
          purchased. If you have any questions regarding Media licenses, please contact us at
          hello@photodrop.me.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Restrictions</span>
        </div>
        <p className='photodrop-futura'>
          You agree that you will not (i) modify or alter the PhotoDrop Materials; (ii) create
          derivative works of the PhotoDrop Materials; (iii) decompile, disassemble, decode or
          reverse engineer the PhotoDrop Materials, translate the PhotoDrop Materials or otherwise
          attempt to learn the source code, structure, algorithms or internal ideas underlying the
          PhotoDrop Materials or reduce the PhotoDrop Materials by any other means to a
          human-perceivable form; or (iv) bypass, delete or disable any copy protection mechanisms
          or any security mechanisms in the PhotoDrop Materials.
        </p>
        <p className='photodrop-futura'>
          Except as otherwise expressly permitted herein, you may not use the Services or the
          PhotoDrop Materials to engage in any of the following prohibited activities:
        </p>
        <div className='photodrop-futura'>
          <ul>
            <li>
              the collection, copying or distribution of any portion of the PhotoDrop Materials;
            </li>
            <li>
              any resale, commercial use, commercial exploitation, distribution, public performance
              or public display of the Services or the PhotoDrop Materials;
            </li>
            <li>
              modifying or otherwise making any derivative uses of the Services or the PhotoDrop
              Materials;
            </li>
            <li>
              scraping or otherwise using any data mining, robots or similar data gathering or
              extraction methods on or in connection with the Services;
            </li>
            <li>
              with the exception of Media made available by users for download, the downloading of
              any portion of the PhotoDrop Materials or any information contained therein; or
            </li>
            <li>
              any use of the Services or the PhotoDrop Materials other than for their intended
              purposes.
            </li>
          </ul>
        </div>
        <p className='photodrop-futura'>
          Any use of the Services or of any PhotoDrop Materials other than as specifically
          authorized herein, without the express prior written permission of PhotoDrop, the
          applicable PhotoDrop user or the Content Owner, is strictly prohibited. Any such
          unauthorized use will result in the immediate termination of your rights under these Terms
          of Use and will constitute a breach of the license granted herein.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Hyperlinks</span>
        </div>
        <p className='photodrop-futura'>
          You may create a text hyperlink to the Site, provided such link does not portray PhotoDrop
          or any of its Products or Services in a false, misleading, derogatory or otherwise
          defamatory manner. This limited right may be revoked by PhotoDrop at any time. You may not
          frame the Site or utilize framing techniques to enclose the Site, PhotoDrop Materials,
          PhotoDrop Marks or other proprietary information without PhotoDrop’s express prior written
          consent.
        </p>
        <p className='photodrop-futura'>
          As a part of the Services, we may provide you with access to and use of certain
          personalized pages and corresponding web addresses (“URLs”) that you may customize.
          PhotoDrop does not guarantee the availability of any particular web page or URL and
          reserves the right, at any time and at our sole discretion, to reclaim, suspend, terminate
          and/or transfer any such web page or URL.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>User Content</span>
        </div>
        <p className='photodrop-futura'>
          The Services may enable you to upload, post and transmit Photos or Videos to the Site or
          other portions of the Services (including to your galleries) and also provide you with
          access to discussion forums, blogs and other interactive areas in which you or other users
          may post or transmit Photos, text, messages, information or other content or materials
          (collectively, including Media, the “User Content”).
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Acceptable Use; Disclaimer</span>
        </div>
        <p className='photodrop-futura'>
          You are solely responsible for the User Content that you post or transmit using the
          Services and you agree not to post, transmit or otherwise publish through the Services any
          of the following:
        </p>
        <div className='photodrop-futura'>
          <ul>
            <li>
              User Content that is unlawful, defamatory, obscene, pornographic, indecent, lewd,
              sexually suggestive, hateful, harassing, threatening, invasive of privacy or publicity
              rights, abusive, inflammatory, fraudulent or otherwise objectionable or harmful,
              including without limitation: Photos or other User Content containing nudity that
              would be unacceptable in a public museum where minors visit;
            </li>
            <li>
              User Content that would constitute, encourage or provide instructions for a criminal
              offense, violate the rights of any party, endanger national security, or that would
              otherwise create liability or violate any local, state, national or international law;
            </li>
            <li>
              User Content that may infringe or violate any patent, trademark, trade secret,
              copyright or other intellectual or other proprietary right of any party;
            </li>
            <li>
              User Content that impersonates any person or entity or otherwise misrepresents your
              affiliation with a person or entity;
            </li>
            <li>unsolicited promotions, political campaigning, advertising or solicitations;</li>
            <li>
              private information of any third party, including, without limitation: addresses,
              phone numbers, email addresses, social security numbers and credit card numbers;
            </li>
            <li>viruses, corrupted data or other harmful, disruptive or destructive files; and</li>
            <li>
              User Content that, in the sole judgment of PhotoDrop, is objectionable, harmful or
              which restricts or inhibits any other person from using or enjoying the Services, or
              which may expose PhotoDrop or its users to any harm or liability of any nature.
            </li>
          </ul>
        </div>
        <p className='photodrop-futura'>
          Although we prohibit certain activities in these Terms of Use, PhotoDrop does not make any
          representation or warranty that the User Content you may encounter through your use of the
          Services complies with these acceptable use provisions or the Terms of Use. YOUR USE OF
          THE SERVICES IS SOLELY AT YOUR OWN RISK. These Terms of Use do not create any private
          right of action on the part of any third party or any reasonable expectation that the
          Services will not contain any content that is prohibited by these acceptable use
          provisions.
        </p>
        <p className='photodrop-futura'>
          PhotoDrop reserves the right (but is not obligated) to (i) review or screen any User
          Content submitted to the Site or otherwise submitted through the Services; (ii) edit any
          User Content posted on the Services; and/or (iii) remove any User Content from the
          Services for any reason, at any time, without prior notice, at our sole discretion.
          PhotoDrop will have no liability or responsibility to users of the PhotoDrop Services or
          any other person or entity for performance or nonperformance of such activities.
          PhotoDrop’s enforcement of the acceptable use provisions set forth in these Terms of Use
          with respect to User Content in some instances does not constitute a waiver of our right
          to enforce such provisions in.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Account Security</span>
        </div>
        <p className='photodrop-futura'>
          You are solely responsible for maintaining the confidentiality of the passwords associated
          with your account and for restricting access to your passwords and physical access to your
          computer while logged into the Services. You accept responsibility for all activities that
          occur under your user account.
        </p>
        <p className='photodrop-futura'>
          User Content that you post, upload or otherwise make available via the Services may be
          accessed, used and downloaded by other PhotoDrop users. You understand and acknowledge
          that any User Content contained in public areas of the Services, including any user
          galleries or other portions of the Services, is accessible to the public and could be
          accessed, downloaded, indexed, archived, linked to and republished by others including,
          without limitation, appearing on other websites and in search engine results. PhotoDrop
          provides security options and settings for your content available in the settings section
          of your applicable user account (the “Account Settings”), including the ability for you to
          designate certain portions of your account as unlisted, private, hidden or
          password-protected.
        </p>
        <p className='photodrop-futura'>
          We use commercially reasonable security measures to protect your account and User Content
          consistent with your Account Settings. We cannot, however, guarantee absolute security of
          your account, your User Content or the Registration Data we collect, and we cannot promise
          that our security measures will prevent third party “hackers” from illegally accessing the
          Services or their contents. PhotoDrop is not responsible or liable for any third party
          access to or use of the User Content you post or your Registration Data. You are
          encouraged to read, understand and use the security settings and mechanisms in your
          Account Settings to manage how your User Content is accessed and used by the public and
          other users of the Services. You agree to immediately notify PhotoDrop of any unauthorized
          use of your account or passwords or any other breach of security, and you accept all risks
          of unauthorized access to the Registration Data, User Content and any other information
          you provide to PhotoDrop.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Third Party Services</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop may make third party content and services available on or through the Services
          (“Third Party Services”) solely as a convenience to its users (for example, links to third
          party websites, software and other services). When you leave the PhotoDrop Services, you
          should be aware that these Terms of Use and all other PhotoDrop policies no longer govern
          your use of such websites and services or any content contained thereon.
        </p>
        <p className='photodrop-futura'>
          PhotoDrop does not imply affiliation, approval, or control of any Third Party Services by
          making such Third Party Services available via the PhotoDrop Services. PhotoDrop makes no
          claim or representation regarding, and accepts no responsibility for, the quality,
          accuracy, nature, ownership or reliability of Third Party Services. YOUR USE OF ANY SUCH
          THIRD PARTY SERVICES IS SOLELY AT YOUR OWN RISK AND SUBJECT TO THE APPLICABLE TERMS AND
          CONDITIONS AND PRIVACY POLICIES APPLICABLE TO SUCH THIRD PARTY SERVICES.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Advertisements and Promotions</span>
        </div>
        <p className='photodrop-futura'>
          The Services may contain third party advertisements and promotions generated or posted by
          PhotoDrop users, PhotoDrop Vendors or other third party service providers.
        </p>
        <p className='photodrop-futura'>
          Your business dealings or interactions with any third parties, including the PhotoDrop
          users or PhotoDrop Vendors, and any terms, conditions, warranties or representations
          associated with such dealings, are solely between you and such third party. PhotoDrop does
          not endorse, approve, or control any such products, services, advertising or promotions
          posted to the Services by its users or the PhotoDrop Vendors. PhotoDrop is not responsible
          or liable for any loss or damage of any kind incurred as the result of your direct
          dealings with PhotoDrop users or a PhotoDrop Vendor or otherwise resulting from the
          presence of advertisements for third party products and services included on the Services.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>DISCLAIMER OF WARRANTIES</span>
        </div>
        <p className='photodrop-futura'>
          THE SITE, SERVICES, THE PHOTODROP MATERIALS, AND THE PRODUCTS ARE PROVIDED ON AN “AS IS”
          AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. TO THE FULL
          EXTENT PERMISSIBLE BY APPLICABLE LAW, PHOTODROP DISCLAIMS ALL WARRANTIES, EXPRESS OR
          IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
          A PARTICULAR PURPOSE, TITLE AND NONINFRINGEMENT AS TO THE SITE, THE SERVICES, THE
          PHOTODROP MATERIALS, AND THE PRODUCTS.
        </p>
        <p className='photodrop-futura'>
          PHOTODROP DOES NOT REPRESENT OR WARRANT THAT THE PHOTODROP MATERIALS OR THE SERVICES ARE
          ACCURATE, COMPLETE, RELIABLE, CURRENT OR ERROR-FREE OR THAT THE SERVICES, ITS SERVERS OR
          EMAIL SENT FROM PHOTODROP OR THE SERVICES ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
          PHOTODROP IS NOT RESPONSIBLE FOR TYPOGRAPHICAL ERRORS OR OMISSIONS RELATING TO PRICING,
          TEXT, OR PHOTOS. PHOTODROP ALSO MAKES NO REPRESENTATION OR WARRANTY REGARDING THE
          AVAILABILITY, RELIABILITY OR SECURITY OF THE SERVICES AND WILL NOT BE LIABLE FOR ANY
          UNAUTHORIZED ACCESS TO OR ANY MODIFICATION, SUSPENSION, UNAVAILABILITY, OR DISCONTINUANCE
          OF THE SERVICES OR THE PRODUCTS PROVIDED THEREON.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Assignment</span>
        </div>
        div
        <p className='photodrop-futura'>
          These Terms of Use are binding upon and inure to the benefit of the parties hereto and
          their permitted successors and assigns. Notwithstanding the foregoing, you may not assign
          your rights under these Terms of Use without PhotoDrop’s prior written consent. PhotoDrop
          will be permitted to assign its rights under these Terms of Use at its sole discretion.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>International Users</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop is located in the State of New York in the United States of America. If you
          access the Services from a country other than the United States, you agree that your
          transactions with PhotoDrop occur in the United States. You are responsible for compliance
          with all applicable laws, rules and regulations applicable to your use of the Services.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Severability</span>
        </div>
        <p className='photodrop-futura'>
          If any provision of these Terms of Use is held invalid or unenforceable by any court of
          competent jurisdiction, the other provisions of these Terms of Use will remain in full
          force and effect, and, if legally permitted, such offending provision will be replaced
          with an enforceable provision that as nearly as possible effects the parties’ intent.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Survival</span>
        </div>
        <p className='photodrop-futura'>
          The terms and conditions of these Terms of Use which by their nature are intended to
          survive termination or expiration of Services (including, but not limited to,
          Indemnification, Warranty Disclaimer, Dispute Resolution and the Limitation of Liability)
          will survive any expiration or termination of these Terms of Use.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Questions or Comments</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop is committed to keeping our users happy and satisfied with their use of the
          Services. If you have any questions, concerns, complaints or comments in any way related
          to your use of the Services, please contact us at{' '}
          <a href='mailto:hello@photodrop.me' style={{ color: '#3300CC' }}>
            hello@photodrop.me
          </a>
          .
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>
            B. ADDITIONAL TERMS APPLICABLE TO PROFESSIONAL SERVICES (“PROFESSIONAL SERVICES TERMS”)
          </span>
        </div>
        <p className='photodrop-futura'>
          You may use the Professional Services only in accordance with these Professional Services
          Terms (and the Terms of Use of which they are a part). In the event of any conflict
          between these Professional Services Terms and the other provisions of the Terms of Use,
          these Professional Services Terms will control.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Transactional Plan</span>
        </div>
        <p className='photodrop-futura'>
          The Transactional Plan is available to users (i) who register for a free trial (when
          available) and (ii) who pay Platform Fees comprising 20% of the Gross Profits (defined as
          gross revenue less merchant services, shipping and handling, taxes, and 3rd party print
          costs) collected from customers. This percentage of Gross Profits collected from customers
          can be changed at the sole discretion of PhotoDrop. The Gross Profits can either be
          collected fully by PhotoDrop and distributed to users (less of Platform Fees) within
          thirty (30) days of a transaction, or PhotoDrop can collect the Platform Fees as each
          transaction occurs.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Subscriptions</span>
        </div>
        <p className='photodrop-futura'>
          The Subscription Services may become available to users (i) who register for a free trial
          (when available) or for a subscription to the Subscription Services (“Subscription”) and
          (ii) who pay in full the Subscription fees (“Subscription Fees”) applicable to the level
          of Subscription selected by such user (the “Subscription Plan”).
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Payment Information</span>
        </div>
        <p className='photodrop-futura'>
          If you wish to purchase a Subscription or other products or services on the Platform, we
          will ask you to provide certain information in order to facilitate such transactions,
          including your credit card number, billing address and any related payment information as
          required by PhotoDrop (collectively, “Payment Information”). PhotoDrop may use a third
          party payment processor (e.g., Stripe or PayPal) to facilitate your payment of any
          Professional Fees (as defined below). Any Payment Information that you provide will be
          governed by the terms of our Privacy Policy. By submitting Payment Information via the
          Services, you warrant that you have the legal right to use any such credit card or other
          payment mechanism that you provide to facilitate the transaction.
        </p>
        <p className='photodrop-futura'>
          PHOTODROP WILL HAVE NO LIABILITY TO YOU FOR ANY INTERRUPTION, SUSPENSION, DISCONTINUANCE
          OR UNAVAILABILITY OF THE SUBSCRIPTION SERVICES FOR ANY REASON, OR FOR ANY LOSS OR
          INABILITY TO ACCESS ANY MEDIA OR MATERIALS ON THE SERVICES.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Termination of Services</span>
        </div>
        <p className='photodrop-futura'>
          You may request the termination of your account at any time by canceling your account by
          sending an email to hello@photodrop.me providing clear written notice of such request.
          When PhotoDrop receives your termination request, PhotoDrop will proceed with the
          termination and notify you of such termination via email. Your account is not terminated
          until you receive confirmation of such termination from PhotoDrop.
        </p>
        <p className='photodrop-futura'>
          PhotoDrop may terminate a Subscription or account, or any user’s access to and use of the
          Professional Services, at any time for any reason at its sole discretion, which such
          termination will be effective immediately. If you violate the Terms of Use, PhotoDrop at
          its sole discretion may (i) require you to remedy any violation thereof and/or (ii) take
          any other actions that PhotoDrop deems appropriate to enforce its rights and pursue
          available remedies.
        </p>
        <p className='photodrop-futura'>
          All Professional Fees are nonrefundable. Upon termination, cancellation or discontinuation
          of your account for any reason, you will not be entitled to receive a refund for any
          Professional Fees or other amounts previously charged to you, or for any unused portion of
          any Professional Fees.
        </p>
        <p className='photodrop-futura'>
          You may change your email, credit card information or other Payment Information for your
          account by using the Account Settings available in your user profile. It is solely your
          responsibility to keep your account information and Payment Information accurate and
          up-to-date. If the Payment Information for your account is invalid and cannot be billed
          for the Professional Fees at the time such Professional Fees are payable and due, then
          PhotoDrop may terminate your account for nonpayment. If PhotoDrop does not have a current,
          working email address for your user account, then you may not receive important notices
          from us regarding your account, including notices regarding termination. PhotoDrop cannot
          guarantee that you will receive notice of the termination of your account.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Backup Policy</span>
        </div>
        <p className='photodrop-futura'>
          YOU ARE SOLELY RESPONSIBLE FOR CREATING AND MAINTAINING BACKUP COPIES OF ANY USER CONTENT
          YOU UPLOAD, POST OR MAKE AVAILABLE THROUGH THE SERVICES DURING ANY APPLICABLE SUBSCRIPTION
          TERM AT YOUR SOLE COST AND EXPENSE. YOU MAINTAIN RESPONSIBILITY AND LIABILITY FOR ANY
          LOSSES OR DAMAGES YOU INCUR FOR FAILURE TO MAINTAIN BACKUP COPIES OF YOUR USER CONTENT.
          PHOTODROP IS NOT LIABLE TO YOU FOR ANY DAMAGES OR LOSSES THAT RESULT FROM THE LOSS OR
          BREACH OF YOUR USER CONTENT IN CONNECTION WITH YOUR USE OF THE PHOTODROP SERVICES.
        </p>
        <p className='photodrop-futura'>
          PhotoDrop uses third party vendors to host and store any Media that you upload to
          PhotoDrop through your use of the Professional Services. We may require our vendors to
          maintain certain standards with respect to your User Content, but PhotoDrop does not
          guarantee that your User Content will be secure and/or available at all times during the
          Subscription Term. PhotoDrop does not guarantee that your User Content will be available
          on the Services after the termination of your Subscription, irrespective of the reason for
          such termination. It is your sole responsibility to create and maintain backup copies of
          any such User Content on a regular basis.
        </p>
        <p className='photodrop-futura'>
          Please note that when User Content or other files are deleted (or your account is
          canceled), those files will be deleted as soon as reasonable pursuant to PhotoDrop’s data
          destruction policies and cannot be recovered by PhotoDrop or any third party vendor
          following deletion (including Amazon S3).
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Use of User Information</span>
        </div>
        <p className='photodrop-futura'>
          In the event that you obtain access to any PhotoDrop user information, whether directly
          from PhotoDrop or otherwise, including user names and emails (e.g., through the purchase
          of your Products by a PhotoDrop user) (collectively the “User Information”), you agree
          that you may not use any such User Information in any manner except as may be specifically
          authorized by PhotoDrop to carry out the purpose for which such User Information was
          provided. Without limiting the foregoing, you may not share such User Information with any
          third parties. Further, you agree not to use such User Information in any manner that
          would be in violation of PhotoDrop’s Privacy Policy. In no event will PhotoDrop be
          obligated to provide you with any such User Information. You agree that this provision
          will apply both during and after the term of your Subscription.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Independent Contractors</span>
        </div>
        <p className='photodrop-futura'>
          Use of the PhotoDrop Professional Services does not create a partnership, agency, joint
          venture or any employee-employer relationship between you and PhotoDrop. At all times the
          relationship between you and PhotoDrop will be that of independent contractors. You are
          responsible for all state, local, federal or other taxes that you are obligated to pay in
          connection with your use of the Subscription Services.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>
            C. ADDITIONAL TERMS APPLICABLE TO SALES OF PRODUCTS (“TERMS OF SALE”)
          </span>
        </div>
        <p className='photodrop-futura'>
          These Terms of Sale form a part of the Terms of Use applicable to your purchase of any
          Photos or other Products through the PhotoDrop Services. Other than as specifically
          provided in any separate written agreement between you and PhotoDrop, these Terms of Sale
          may not be altered, supplemented, or amended by the use of any document, such as purchase
          orders, and all sales are expressly conditioned upon your agreement to these Terms of
          Sale. In the event of any conflict between these Terms of Sale and the other provisions of
          the Terms of Use, these Terms of Sale will control.
        </p>
        <p className='photodrop-futura'>
          PhotoDrop facilitates your purchase of Photos or Products through the PhotoDrop Services
          through its relationships with the PhotoDrop Vendors. If you purchase Photos or other
          Products through the PhotoDrop Services, you acknowledge that the printing of any Photos
          or creation of other physical medium Products is performed by such PhotoDrop Vendors and
          PhotoDrop’s role is to assist, facilitate and support such order process pursuant to these
          Terms of Sale.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Pricing; Payment Terms</span>
        </div>
        <p className='photodrop-futura'>
          In order to purchase Products through the PhotoDrop Services, you are required to provide
          valid Payment Information as required by PhotoDrop. PhotoDrop may terminate your order for
          Products and take such other action as appropriate if we are unable to process your
          Payment Information and you do not provide an alternative form of payment upon PhotoDrop’s
          request. You agree to reimburse PhotoDrop for any and all costs incurred in collecting
          amounts owed by you to PhotoDrop or a PhotoDrop Vendor, including, without limitation,
          attorneys’ fees and costs of collection agencies.
        </p>
        <p className='photodrop-futura'>
          You are responsible for any taxes that you are obligated to pay or that PhotoDrop may
          collect from you in connection with your purchase of Products. If you do not pay the sales
          or other taxes or fees on a transaction, you will be responsible for the taxes or fees in
          the event they are later determined to be payable on the sale, and PhotoDrop reserves the
          right to collect the taxes or other related fees from you at any time. In certain
          jurisdictions, PhotoDrop may be required to collect and remit sales tax in connection with
          your purchase of Products. Any such taxes will be added to the purchase price and
          reflected on your invoice or receipt.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Product Downloads; Shipping Terms and Policies</span>
        </div>
        <p className='photodrop-futura'>
          If you purchase a Photo download, such download will be made available to you through the
          Services upon PhotoDrop’s receipt of your valid Payment Information.
        </p>
        <p className='photodrop-futura'>
          If you purchase Photo prints or other physical medium Products (i.e., photo books or other
          photo merchandise), PhotoDrop will use its commercially reasonable efforts (and our
          PhotoDrop Vendors will use commercially reasonable efforts) to ship all orders for such
          Products within the estimated delivery time applicable to various methods of shipping
          available at the time you place your order. PhotoDrop is not responsible for any delays in
          shipping. PhotoDrop or the PhotoDrop Vendors reserve the right to substitute another
          carrier of equal or lesser cost to deliver your order at our discretion. All shipping
          charges are your responsibility. Please see our Shipping Charges for additional detail.
          Shipping charges will be included in your shopping cart and can be viewed on a summary
          screen prior to finalizing your order. The shipping charge shown during the Product
          checkout process is subject to verification and to correction or change without notice,
          provided that if the actual shipping charge is more than the amount shown in your shopping
          cart, we will contact you with the correct shipping costs before processing your order,
          and you will have an opportunity to cancel your order. All orders are shipped FOB shipping
          point. Title to the physical medium of the Products passes from PhotoDrop to you upon
          shipment. If an item in your order is temporarily out of stock, we may hold your order
          until it is complete prior to shipment.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Return Policy</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop unconditionally guarantees your satisfaction with any Products that you purchase
          through the Services. If you are unsatisfied with any Photos or other Products you have
          purchased from PhotoDrop, we will gladly accept the return of any Product you have ordered
          for any reason within thirty (30) days of your receipt of the Product. Upon completion of
          the return procedure and receipt of the returned Product, we will resend you the Product
          or issue you a full refund of the purchase price paid for such Product, whichever you
          prefer. We do not provide refunds for your original shipping cost unless your order is
          physically defective in some manner. If you are unsatisfied with a Product that is not in
          a physical medium form (i.e., a Photo download), then upon your request, we may issue you
          a full refund of the purchase price paid for such Product at our discretion depending on
          the circumstances. To request a refund or replacement for any Product, please contact
          PhotoDrop at hello@photodrop.me. Please do not contact your credit card company to dispute
          a charge before contacting PhotoDrop.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Product Availability and Pricing</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop or the PhotoDrop Vendors may revise or discontinue Product options at any time
          without prior notice, and Products may become unavailable even after an order is placed.
          All prices are subject to change without notice.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Product Descriptions; Pricing; Errors</span>
        </div>
        <p className='photodrop-futura'>
          PhotoDrop strives to maintain accurate information in the Services and to eliminate any
          errors. However, we do not warrant that Product descriptions, Photos, pricing or other
          PhotoDrop Materials are accurate, complete, reliable, current, or error-free. In addition,
          all weights and size dimensions are approximate. While we make reasonable efforts to
          accurately display all details of our Product offerings, including the applicable color,
          please note that the actual color you will see for a Photo depends on the settings of your
          computer screen and we cannot guarantee that your computer will accurately display all
          Photo colors. PhotoDrop or a PhotoDrop Vendor reserves the right to format, manipulate or
          otherwise modify Photos as may be required to satisfy a particular order. If a Product
          offered by PhotoDrop is not as described or pictured, your sole remedy is to return the
          Product in unused condition for a refund within thirty (30) days of receipt. In the event
          of an error, whether contained in the Services, in an order confirmation, in processing an
          order or otherwise, we reserve the right to correct such error and charge the correct
          price or cancel the order, and your sole remedy in the event of such error is to cancel
          your order.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Disclaimer of Warranties</span>
        </div>
        <p className='photodrop-futura'>
          THE FOREGOING RIGHT TO RETURN ANY ORDER WITHIN THIRTY (30) DAYS IS YOUR SOLE AND EXCLUSIVE
          REMEDY, AND PHOTODROP’S SOLE AND EXCLUSIVE LIABILITY, WITH RESPECT TO THE PURCHASE OF ANY
          PRODUCTS USING THE SERVICES, AND PHOTODROP EXPRESSLY DISCLAIMS AND EXCLUDES ALL
          WARRANTIES, EXPRESS OR IMPLIED, REGARDING THE PURCHASE OF ANY PRODUCTS.
        </p>
        <p className='photodrop-futura'>
          CERTAIN STATE LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR
          LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE
          DISCLAIMERS, EXCLUSIONS, OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MIGHT HAVE
          ADDITIONAL RIGHTS.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>D. LICENSE AGREEMENT</span>
        </div>
        <p className='photodrop-futura'>
          These License Agreement terms apply to Content Owners who have registered for a
          Professional Plan granting such Content Owner the ability to license Media through the use
          of the Services. Certain PhotoDrop Pro users may be entitled to license digital versions
          of such user’s Photos to other PhotoDrop users for an applicable license fee under the
          terms of such user’s Professional Plan.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Rights Granted by Content Owner</span>
        </div>
        <p className='photodrop-futura'>
          By uploading or posting Photos to be licensed to PhotoDrop users, Content Owner hereby
          grants to PhotoDrop the right to facilitate the licensing by Content Owner of Photos
          posted on PhotoDrop to a licensee according to the licensing designation (a Commercial Use
          License or Personal Use License) identified by the Content Owner upon submission of the
          Photos.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Content Owner Responsibilities</span>
        </div>
        <p className='photodrop-futura'>
          Content Owner is responsible for all Photos posted to PhotoDrop through the Services,
          including without limitation the designation of Photo license types (either personal or
          commercial) and the setting of license fees (if applicable) through the tools available in
          Content Owner’s Account Settings.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Media Submission and Licensing</span>
        </div>
        <p className='photodrop-futura'>
          As set forth in the Terms of Use, Photos submitted to PhotoDrop through the Services may
          be rejected or removed from the Services at any time for any reason or for no reason at
          PhotoDrop’s sole discretion.
        </p>
        <p className='photodrop-futura'>
          Photos designated for commercial license should be free from any distinguishable third
          party names, trademarks, logos, copyright designs, works of art, architecture, or any
          other depictions requiring additional rights. Content Owner understands and agrees that
          all Photos are licensed directly by the Content Owner subject to the license and the
          license type and the license fees (if applicable) for Photos or as chosen by Content
          Owner. PhotoDrop merely facilitates and enables such license and does not maintain any
          responsibility or liability for the Photos.
        </p>
        <p className='photodrop-futura'>
          So long as Content Owner has agreed to make the Photos available through the Services
          there will not be any restraint on the licensing of such Photos through the Services to
          any PhotoDrop users to the fullest extent possible, according to the type of license
          provided by the Content Owner.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Representations and Warranties of Content Owner</span>
        </div>
        <p className='photodrop-futura'>Content Owner represents and warrants to PhotoDrop that:</p>
        <div className='photodrop-futura'>
          <ul>
            <li>
              Content Owner owns (or has legal right to represent and license) all intellectual
              property rights, title and interest in and to all Photos, including applicable
              copyrights, submitted through the Services and has the right to grant all licenses
              granted herein without violating the rights of any third party;
            </li>
            <li>
              If the Content Owner who is agreeing to these Terms of Use is an agent of the
              copyright owner(s), then the Content Owner has been granted full authority of the
              copyright owner(s) to enter into this agreement;
            </li>
            <li>
              All information concerning all Photos provided by Content Owner to PhotoDrop through
              the use of the Services is, to the best of Content Owner’s knowledge, true and
              accurate; and
            </li>
            <li>
              All Photos submitted or posted by Content Owner have all necessary releases, consents
              and permissions required to grant the licenses granted under the applicable license,
              including, without limitation, valid Model Releases and Property Releases for Photos
              depicting recognizable people (living or dead) and private properties, permissions
              regarding posting Photos containing individuals under the age of 18, and all written
              permission regarding all distinguishable trademarks.
            </li>
          </ul>
        </div>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>Definitions</span>
        </div>
        <p className='photodrop-futura'>
          Capitalized terms used but not defined in these Terms of Use above will have the following
          meanings:
        </p>
        <p className='photodrop-futura'>
          “Commercial Use License” means a licensing type in which the licensee is entitled to use
          the Photos subject to the commercial use license.
        </p>
        <p className='photodrop-futura'>
          “Model Release” means a written release signed by or on behalf of any living person or the
          estate of a deceased person who is depicted in whole or in part in any Photos.
        </p>
        <p className='photodrop-futura'>
          “Personal Use License” means a licensing type in which the licensee is entitled to use the
          Photos subject to the personal use license.
        </p>
        <p className='photodrop-futura'>
          “Property Release” means a written release from the owner and/or occupier of any property
          that is depicted in whole or in part in any Photos.
        </p>
        <div className='photodrop-futura'>
          <span style={{ fontWeight: '700' }}>E. COPYRIGHT POLICY</span>
        </div>
        <p className='photodrop-futura'>
          In accordance with the Digital Millennium Copyright Act of 1998 (“DMCA”), the text of
          which may be found on the U.S. Copyright Office website at
          http://www.copyright.gov/legislation/pl105-304.pdf, and other applicable laws, PhotoDrop
          has adopted a policy of terminating, in appropriate circumstances and at PhotoDrop’s sole
          discretion, the accounts of users who are deemed to be repeat infringers. PhotoDrop may
          also, at its sole discretion, limit access to PhotoDrop’s website and services and/or
          terminate the accounts of any users who infringe any intellectual property rights of
          others, whether or not there is any repeat infringement. PhotoDrop will respond to claims
          of copyright infringement committed using PhotoDrop that are reported to PhotoDrop’s
          Designated Copyright Agent, identified in the sample notice below.
        </p>
        <p className='photodrop-futura'>
          If you knowingly misrepresent in your notification that the material or activity is
          infringing, you will be liable for any damages, including costs and attorney’s’ fees,
          incurred by us or the alleged infringer as the result of our relying upon such
          misrepresentation in removing or disabling access to the material or activity claimed to
          be infringing.
        </p>
        <p className='photodrop-futura'>
          If you are a copyright owner, or are authorized to act on behalf of one, or authorized to
          act under any exclusive right under copyright, please report alleged copyright
          infringements taking place on or through the PhotoDrop Services by completing the
          following DMCA Notice of Alleged Infringement and delivering it to PhotoDrop’s Designated
          Copyright Agent.
        </p>
        <p className='photodrop-futura'>
          Upon receipt of the Notice as described below, PhotoDrop will take whatever action, at its
          sole discretion, it deems appropriate, including removal of the challenged material from
          the PhotoDrop Services.
        </p>
      </TextWrapper>
    </MotionContainerStyled>
  )
}

export default Terms

const MotionContainerStyled = styled(motion.div)`
  width: 100%;
  max-width: 450px;
  padding: 20px 15px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.media.desktop} {
    max-width: 780px;
    padding: 40px;
  }
`

const TitleStyled = styled(Title)`
  line-height: 13px;

  @media ${({ theme }) => theme.media.desktop} {
    line-height: 22px;
  }
`

const TextWrapper = styled(Text)`
  margin: 16px 0 0 0;
  line-height: 21px;
  letter-spacing: -0.31px;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 15px 0 0 0;
    font-size: 18px;
    line-height: 23px;
  }
`

const Paragraph = styled(TextWrapper)`
  margin: 0 0 21px 0;

  @media ${({ theme }) => theme.media.desktop} {
    margin: 0 0 23px 0;
  }
`

const ParagraphTitle = styled(TextWrapper)`
  display: block;
  margin: 0;
`

const BoldText = styled(ParagraphTitle)`
  display: inline;
  letter-spacing: -0.1px;
`
