import { Container, Stack, Typography } from '@mui/material'
import React from 'react'
import LoginForm from '../components/Login/LoginForm'
import Page from '../components/Page'
const Login = () => {
  return (
    <Page
      component='main'
      sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <Container maxWidth='sm' sx={{ mt: -15 }}>
        <Stack spacing={3}>
          <Typography variant='h3' align='center'>
            Clinical Portal
          </Typography>
          <Typography variant='h4' align='center'>
            Sign In
          </Typography>
          <LoginForm />
        </Stack>
      </Container>
    </Page>
  )
}
export default Login
