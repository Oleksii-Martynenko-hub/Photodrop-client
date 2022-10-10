// import { GlobalStyles } from "@mui/material";

import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "MuktaBold"; 
    src: local("MuktaBold"),
    url("fonts/Mukta/Mukta-Bold.ttf") format("truetype") /* Safari, Android, iOS */
  }
  @font-face {
    font-family: "NewsCycle";
    font-weight: normal;
    src: local("NewsCycleRegular"),
    url("fonts/News_Cycle/NewsCycle-Regular.ttf") format("truetype") /* Safari, Android, iOS */
  }
  @font-face {
    font-family: "NewsCycle";
    font-weight: bold;
    src: local("NewsCycleBold"),
    url("fonts/News_Cycle/NewsCycle-Bold.ttf") format("truetype") /* Safari, Android, iOS */
  }

  * {
    box-sizing: border-box;
    /* font-family: 'NewsCycleRegular'; */
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  #root {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`
