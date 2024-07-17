import React from 'react'
import LandingPage from '../Pages/LandingPage'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div className='px-16 bg-yellow-200 font-jost'>
        <Navbar />
        <LandingPage />
    </div>
  )
}

export default Layout