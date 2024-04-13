
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './pages/Navbar'

import Footer from './pages/Footer'
import Job from './pages/Jobs'

function App() {
  

  return (
   <>
  <Navbar/>
  <Job/>
  <Footer/>
   </>
  )
}

export default App
