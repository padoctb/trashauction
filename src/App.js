import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import bg from './img/bg.jpg'
import { logoAnimate } from './style/keyframes';
import logo from './img/logo.png'
import Header from './components/Header'

const Logo = styled.div`
  width: 40px;
  height: 40px;
  background-color: #6D6D6D;
  margin-right: 16px;
  background-image: url(${logo});
  border-radius: 100%;
  background-size: cover;
  animation: ${logoAnimate} 2s linear infinite;
  border: 3px solid #6D6D6D;
  position: absolute;
  bottom: 10px;
  right: 0;
  cursor: pointer;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${bg});
    background-size: cover;
    background-attachment: fixed;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 24px;
    color: #fff;
    font-weight: 600;
    min-width: 600px;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle/>
      <Logo/>
      <Header/>
    </>
  )
}

export default App
