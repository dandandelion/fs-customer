import { useState } from 'react'
import CustomerPage from './pages/CustomerPage'
import { Toaster } from "react-hot-toast"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CustomerPage />
      <Toaster />
    </>
  )
}

export default App
