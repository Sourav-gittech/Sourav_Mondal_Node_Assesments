import React from 'react'
import Routing from './routes/Routing'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <>
      <Routing />
      <Toaster />
    </>
  )
}

export default App