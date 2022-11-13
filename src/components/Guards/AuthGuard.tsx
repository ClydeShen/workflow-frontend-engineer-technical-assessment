import React, { Fragment, useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
const AuthGuard = () => {
  const [checked, setChecked] = useState(false)

  const { authState } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!authState.isInitialized) return
    if (!authState.isAuthenticated) {
      navigate('/login')
    } else {
      setChecked(true)
    }
  }, [location, authState])

  if (!checked) {
    return null
  }
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  )
}
export default AuthGuard
