import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartTotal = () => {
   const {totalPrice,user} = useContext(ShopContext)
   const navigate=useNavigate()
  
  return (
    <div className=" w-1/2 mt-10 flex float-end mb-3">
    <div className="w-full flex flex-col">
      <Title text1={"CART"} text2={"TOTALS"}/>
      <div className="flex flex-col">
        <div className="w-full flex items-center justify-between py-3 text-md text-gray-700 font-semibold border-b border-gray-400">
          <p>Subtotal</p>
          <p>${totalPrice}.00</p>
        </div>
        <div className="w-full flex items-center justify-between py-3 text-md text-gray-700 font-semibold border-b border-gray-400">
          <p>Shipping Fee</p>
          <p>${totalPrice? 10 : 0}.00</p>
        </div>
        <div className="w-full flex items-center justify-between py-3 text-md text-gray-700 font-bold border-b border-gray-400">
          <p>Total</p>
          <p>${totalPrice? totalPrice + 10 : 0}.00</p>
        </div>
        <div className="flex justify-end">
        <button onClick={()=>{
          if(!user){
            return toast.error("Please login first",{
              duration:3000,
              position:"bottom-right"
            })
          }
          navigate('/place-order')
        }} className=' w-1/3 mt-4 py-3 bg-black text-white'>PROCEED TO CHECKOUT</button>
        </div>

      </div>
    </div>
  </div>  )
}

export default CartTotal