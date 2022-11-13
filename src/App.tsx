import React, { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/authContext'
import router from './routes'
export default function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<h4>Loading...</h4>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  )
}
