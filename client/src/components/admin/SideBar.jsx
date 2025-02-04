import React from 'react'
import {NavLink } from 'react-router-dom'
import { assets } from '../../assets/admin_assets/assets'

const SideBar = () => {
  return (
    <div className=' py-4 w-[15%] h-screen sticky border border-gray-300 top-0 left-0'>
        <div className="flex flex-col items-end gap-6 w-full font-semibold text-sm">
        <NavLink to={'/admin/add-product'} className={`flex items-center gap-2 cursor-pointer px-2 border border-gray-400 w-5/6 py-2`}>
        <img src={assets.add_icon} alt="add_icon" />
        Add items
        </NavLink>
        <NavLink to={'/admin/list-products'} className={`flex items-center gap-2 cursor-pointer px-2 border border-gray-400 w-5/6 py-2`}>
        <img src={assets.order_icon} alt="add_icon" />
        List items
        </NavLink>
        <NavLink to={'/admin/list-orders'} className={`flex items-center gap-2 cursor-pointer px-2 border border-gray-400 w-5/6 py-2`}>
        <img src={assets.add_icon} alt="add_icon" />
        List orders
        </NavLink>
        </div>
    </div>
  )
}

export default SideBar