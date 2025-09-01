import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className='w-screen flex justify-center items-center'><h1 className='text-amber-600'>Hello world </h1>
        <button className='bg-blue-600'>click ici</button>
     </div>
    </>
  )
}

export default App
