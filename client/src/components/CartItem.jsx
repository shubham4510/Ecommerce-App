import { useContext } from 'react'
import {assets} from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'

const CartItem = ({id,name,image,price,size,quantity}) => {
    const {updateQuantity,removeFromCart} = useContext(ShopContext)


  return (
    <div className=' w-full h-[20vh] flex items-center justify-between  border-b border-gray-400'>

       <div className=" w-1/2 flex gap-6">
         {/* image  */}
         <img className=' h-full w-[5vw]' src={image} alt={name} />
         <div className="flex flex-col gap-3">
            <p className=' font-semibold text-lg'>{name}</p>
            <div className="flex items-center gap-5">
            <p className='text-lg text-gray-600'>{price}$</p>
            <p className='text-lg text-gray-600 border border-gray-400 px-2 py-1'>{size}</p>
            </div>
         </div>
        </div> 

        <input onChange={(e)=>updateQuantity(id,e.target.value)} className=' w-20 outline-none border border-gray-400 px-3 py-2' onKeyDown={(e)=>e.preventDefault()} type="number" value={quantity} />

        <img onClick={()=>removeFromCart(id)} className=' w-5 h-5 cursor-pointer' src={assets.bin_icon} alt="delete_icon" />
        
    </div>
  )
}

export default CartItem