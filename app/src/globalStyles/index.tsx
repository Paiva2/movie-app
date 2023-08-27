import { createGlobalStyle, styled } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #121214;
    -webkit-box-sizing: border-box; 
    -moz-box-sizing: border-box;   
    box-sizing: border-box;         
    font-family: 'Figtree', sans-serif;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    all: unset
  }

  h1, p {
    margin: 0
  }

  input:focus{
    outline: none;
  }
`

export const AppContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export default GlobalStyle
