import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const UserLayout = ({children}) => {
  return (
    <div className=" w-full h-full overflow-x-hiddem">
        <div className=" w-5/6 mx-auto">
        <Navbar/>
        {children}
        <Footer/>
        </div>
    </div>
  )
}

export default UserLayout