import React, { createContext, useEffect, useReducer } from 'react'
import API from '../apis'

type Props = {
  children: React.ReactNode
}
type InitialState = {
  isAuthenticated: boolean
  isInitialized?: boolean
}
enum ActionType {
  INITIALIZE = 'INITIALIZE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT'
}
type Action = {
  payload?: InitialState
  type: ActionType
}
interface IAuthContextValue {
  authState: InitialState
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}
interface handlers {
  INITIALIZE: (state: InitialState, action: Action) => InitialState
  LOGIN: (state: InitialState) => InitialState
  LOGOUT: (state: InitialState) => InitialState
}

const initialState: InitialState = {
  isAuthenticated: false,
  isInitialized: false
}
const AuthContext = createContext({
  authState: initialState,
  login: (_username: string, _password: string) => Promise.resolve(false),
  logout: () => {}
})
const handlers: handlers = {
  INITIALIZE: (
    state: InitialState,
    action: Action
  ): { isAuthenticated: boolean; isInitialized: true } => {
    const { isAuthenticated } = action.payload!
    // console.log('INITIALIZE', isAuthenticated)
    return {
      ...state,
      isAuthenticated,
      isInitialized: true
    }
  },
  LOGIN: (state: InitialState) => {
    // console.log('LOGIN')
    return {
      ...state,
      isAuthenticated: true
    }
  },
  LOGOUT: (state: InitialState) => {
    // console.log('LOGOUT')
    return {
      ...state,
      isAuthenticated: false
    }
  }
}
const authReducer = (state: InitialState, action: Action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export const AuthProvider = (props: Props) => {
  const [authState, dispatch] = useReducer(authReducer, initialState)
  const login = async (username: string, password: string) => {
    const headers = new Headers()
    headers.set('Authorization', window.btoa(username + ':' + password))
    const response = await API.POST.login({ headers })
    console.log('response', response)
    const isSuccess = response === 204
    if (isSuccess) {
      dispatch({ type: ActionType.LOGIN })
    } else {
      const { errorMessage } = response
      alert(errorMessage)
    }
    return isSuccess
  }
  const logout = () => {
    dispatch({
      type: ActionType.LOGOUT
    })
  }
  const checkAuth = () => {
    const session = window.sessionStorage.getItem('session-token')
    dispatch({
      type: ActionType.INITIALIZE,
      payload: { isAuthenticated: !!session }
    })
  }
  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{ authState, login, logout } as IAuthContextValue}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext
