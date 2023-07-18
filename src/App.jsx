import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainPage from './pages/MainPage';
import Authbutton from './components/Authbutton';
import { Toaster } from 'react-hot-toast';
function App() {
  const [count, setCount] = useState(0)

  return (
    < div className='app'>
      <Authbutton />
      < MainPage />
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}

      />
    </div>
  )
}

export default App
