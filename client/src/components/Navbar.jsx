import React, {  useContext} from 'react'
import {  Link, NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = ({setIsSideBarOpen}) => {

    const {setShowSearchBar,user,logout,totalQuantity} = useContext(ShopContext)
    const navigate = useNavigate()
      

  return (
    <div className=' flex py-2 w-full  items-center justify-between font-semibold relative'>
            <img onClick={()=>navigate('/')} className=' w-[150px]' src={assets.logo} alt="" />
        <ul className={` items-center gap-4 hidden md:flex`}>
            <NavLink to={'/'}>
                <li>HOME</li>
            </NavLink>
            <NavLink to={'/collection'}>
                <li>COLLECTION</li>
            </NavLink>
            <NavLink to={'/about'}>
                <li>ABOUT</li>
            </NavLink>
            <NavLink to={'/contact'}>
                <li>CONTACT</li>
            </NavLink>
        </ul>
            <ul className={`flex items-center gap-5 `}>
            <Link onClick={()=>{setShowSearchBar(true)}} className='w-5 cursor-pointer hidden md:flex' to={'/collection'}>
                <li className=' '>
                    <img  src={assets.search_icon} alt="" />
                </li>
            </Link>
            <NavLink to={'/login'}>
                <li className=' w-5 cursor-pointer'>
                    {user ? <img className=' h-5' onClick={()=>logout()} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPoQIPVlmsvLftHdKlNP87lQwz6CYPDb3u3g&s' alt='logout_icon'/> : <img src={assets.profile_icon} alt="profile_icon" /> }
                </li>
            </NavLink>
            <Link to={'/cart'}>
                <li className=' relative w-5 cursor-pointer'>
                    <img src={assets.cart_icon} alt="" />
                    <div className="absolute -bottom-3 w-5 -right-2 border p-[0.6px] text-white bg-black rounded-full  flex items-center justify-center">
                        <p className=' text-[12px]'>{totalQuantity}</p>
                    </div>
                </li>
            </Link>
            <button className="md:hidden sm:flex w-5 cursor-pointer" onClick={()=>setIsSideBarOpen(true)}>
                <img src={assets.menu_icon} alt="" />
            </button>
        </ul>

       
        
    </div>
  )
}

export default Navbar