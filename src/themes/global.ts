// import { GlobalStyles } from "@mui/material";

import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    min-height: 100vh;
    font-family: ${({ theme }) => theme.fonts.futuraPT};
  }

  #root {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }
`
