import React from 'react'
import LandingPage from '../Pages/LandingPage'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <div className='container mx-auto'>
        <Navbar />
        <LandingPage />
    </div>
  )
}

export default Layout