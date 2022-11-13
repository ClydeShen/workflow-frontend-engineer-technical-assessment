import { Button, FormLabel, Stack, TextField } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

const LoginForm = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })

  const onLogin = async (e: FormEvent) => {
    e.preventDefault()
    const { username, password } = loginForm
    if (!username || !password) return

    try {
      setLoading(true)
      const isSuccess = await login(username, password)
      setLoading(false)
      if (isSuccess) {
        navigate('/dashboard')
      }
    } catch (error: any) {
      setLoading(false)
      alert(error.message)
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm((_form) => ({
      ..._form,
      [e.target.name!]: e.target.value
    }))
  }
  return (
    <form onSubmit={onLogin}>
      <Stack spacing={2} alignItems='center' sx={{ maxWidth: 400, m: 'auto' }}>
        <Stack sx={{ width: '100%' }}>
          <FormLabel>Username</FormLabel>
          <TextField
            value={loginForm.username}
            name='username'
            onChange={handleChange}
            fullWidth
          ></TextField>
        </Stack>

        <Stack sx={{ width: '100%' }}>
          <FormLabel>Password</FormLabel>
          <TextField
            type='password'
            name='password'
            value={loginForm.password}
            onChange={handleChange}
            fullWidth
          ></TextField>
        </Stack>

        <Button
          type='submit'
          disabled={loading}
          variant='contained'
          color='primary'
          sx={{ minWidth: 200 }}
        >
          Login
        </Button>
      </Stack>
    </form>
  )
}

export default LoginForm
