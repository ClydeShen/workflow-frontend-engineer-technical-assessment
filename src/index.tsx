import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import fetchMock from 'fetch-mock'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './apis'
import initFetchMock from './apis/mock-api-source'
import App from './App'
import theme from './theme'

initFetchMock(fetchMock)

const rootElement = document.getElementById('root')
const root = createRoot(rootElement!)

root.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>
)
