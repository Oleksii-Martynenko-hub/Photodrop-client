import { HTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { getCountries, getCountryCallingCode, Country } from 'react-phone-number-input/input'
import countryNames from 'react-phone-number-input/locale/en.json'
import ReactCountryFlag from 'react-country-flag'
import {
  AppBar,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface Props extends HTMLAttributes<HTMLDivElement> {
  countryCode: Country
  setCountryCode: React.Dispatch<React.SetStateAction<Country>>
  isCountryDialogOpen: boolean
  setCountryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CountryCodeSelect = ({
  countryCode,
  setCountryCode,
  isCountryDialogOpen,
  setCountryDialogOpen,
  ...props
}: Props) => {
  const [countryFilter, setCountryFilter] = useState('')

  const handleOnClickCountryItem = (country: Country) => () => {
    setCountryCode(country)
    setCountryDialogOpen(false)
  }

  const handleOnClickSelect = () => setCountryDialogOpen(true)

  return (
    <CountryCodeWrapperStyled {...props}>
      <Dialog
        scroll='body'
        fullScreen
        open={isCountryDialogOpen}
        onClose={() => setCountryDialogOpen(false)}
      >
        <DialogTitle>
          <AppBar
            position='fixed'
            sx={{
              background: '#fff',
              boxShadow: 'none',
              borderBottom: '1px solid #ddd',
            }}
          >
            <Toolbar
              sx={{
                maxWidth: '420px',
                width: '100%',
                margin: '0 auto',
                pr: '0 !important',
              }}
            >
              <IconButton
                edge='start'
                onClick={() => setCountryDialogOpen(false)}
                aria-label='close'
                sx={{ '&:hover': { backgroundColor: '#d9d1ef' } }}
              >
                <CloseIcon />
              </IconButton>

              <InputStyled
                autoFocus
                fullWidth
                value={countryFilter}
                onChange={({ target }) => setCountryFilter(target.value)}
                placeholder='Search'
              />
            </Toolbar>
          </AppBar>
        </DialogTitle>

        <List sx={{ maxWidth: '420px', width: '100%', margin: '0 auto', pt: '45px' }}>
          {getCountries()
            .filter((c) => countryNames[c].toLowerCase().includes(countryFilter.toLowerCase()))
            .map((country) => (
              <li key={country}>
                <ListItem button onClick={handleOnClickCountryItem(country)}>
                  <ListItemAvatar>
                    <img
                      width={28}
                      height={22}
                      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                      alt={countryNames[country]}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={countryNames[country]}
                    secondary={'+ ' + getCountryCallingCode(country)}
                  />
                </ListItem>
                <Divider />
              </li>
            ))}
        </List>
      </Dialog>

      <CountryCodeSelectStyled
        id='country-code-select'
        name='country-code-select'
        value={countryCode}
        disabled
      />

      <CountryCodeStyled onClick={handleOnClickSelect}>
        <FlagIconStyled countryCode={countryCode} alt={countryNames[countryCode]} />

        <ArrowIconStyled src='bottom-arrow.svg' alt='bottom-arrow' />
      </CountryCodeStyled>
    </CountryCodeWrapperStyled>
  )
}

const CountryCodeWrapperStyled = styled.div`
  width: 70px;
  height: 40px;
  flex: 0 0 70px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.styledPalette.border};
  background: ${({ theme }) => theme.styledPalette.background};
  margin-right: 10px;
  cursor: pointer;
  position: relative;
`

const CountryCodeStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CountryCodeSelectStyled = styled.select`
  position: absolute;
  opacity: 0;
  visibility: hidden;
  width: 100%;
`

const FlagIconStyled = styled(ReactCountryFlag)`
  font-size: 30px;
  line-height: 30px;
  margin-right: 7px;
`

const ArrowIconStyled = styled.img`
  width: 15px;
  height: 8px;
`

const InputStyled = styled(Input)`
  /* color: #fff; */
  margin-left: 20px;

  /* &::before {
    border-color: #5936c3;
  }

  &:hover:not(.Mui-disabled)::before {
    border-color: #6342c4;
  }

  &::after {
    border-color: #9a7feb;
  } */
`
