import React, { useContext } from 'react'
import { assets } from '../../assets/admin_assets/assets'
import { ShopContext } from '../../context/ShopContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {logout} = useContext(ShopContext)
  const navigate = useNavigate()
  return (
    <nav className=' h-20 flex items-center px-8 py-3 justify-between border-b border-gray-300'>
      <img className=' h-full' src={assets.logo} alt="logo" />
      <button className=' px-4 py-2 rounded-lg text-white bg-gray-600' onClick={()=>{
        logout()
        navigate('/login')
      }}>Logout</button>
    </nav>
  )
}

export default Navbar