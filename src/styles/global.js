import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html, body, #root {
    height: 100%

  }
  body, body, #root {
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialiased !important;
    color: #FFF;
    background: #0b0a0d;
    font-family: 'Montserrat', san-serif;
  }
`;


export default GlobalStyle;
