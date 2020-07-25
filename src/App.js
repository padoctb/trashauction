import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import bg from './img/bg.jpg'
import Header from './components/Header'

const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${bg});
    background-size: cover;
    background-attachment: fixed;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 24px;
    color: #fff;
    font-weight: 600;
  }
`

const App = () => {
  return (
    <>
      <GlobalStyle/>
      <Header/>
    </>
  )
}

export default App
