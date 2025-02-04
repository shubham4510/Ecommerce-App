import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import {assets} from '../assets/frontend_assets/assets'
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const [orderData,setOrderData] = useState({})
  const {placeOrder,totalQuantity,totalPrice,cart} = useContext(ShopContext)
  const navigate = useNavigate()

  const handleOrderDataChange = (e)=>{
    setOrderData((prev)=>(
      {...prev,[e.target.name]:e.target.value}
    ))
  }

  const handlePlaceOrder = async () => {
    try {
      if (!totalQuantity) {
        return toast.error("Add items to your cart", {
          duration: 3000,
          position: "bottom-right",
        });
      }
  
      // ✅ Create new order object
      const updatedOrderData = {
        ...orderData,
        totalQuantity,
        totalRevenue: totalPrice + 10,
        items: [...cart]
      };

  
      const data = await placeOrder(updatedOrderData);  // ✅ Sending updated data
      
      if (data && data.success) {
        setOrderData({}); // ✅ Reset after placing order
        navigate('/orders')
        return toast.success(data.message, {
          duration: 3000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      return toast.error(error.message, {
        duration: 3000,
        position: "bottom-right",
      });
    }
  };
  
  

  return (
<div className='w-full h-[90vh] flex items-center justify-center'>
      <div className="w-full h-[70vh] flex justify-between">
        <div className="w-[37%] h-full flex flex-col gap-4 items-start">
          <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input  onChange={handleOrderDataChange} name='firstName' required={true} className=' border border-gray-300 px-3 py-2 rounded-lg' type="text" placeholder='First name' />
              <input  onChange={handleOrderDataChange} name='lastName' required={true} className=' border border-gray-300 px-3 py-2 rounded-lg' type="text" placeholder='Last name' />
            </div>
            <input  onChange={handleOrderDataChange} name='email' required={true} className=' w-full border border-gray-300 px-3 py-2 rounded-lg' type="email" placeholder='Email address' />
            <input  onChange={handleOrderDataChange} name='street' required={true} className=' w-full border border-gray-300 px-3 py-2 rounded-lg' type="text" placeholder='Street' />
            <div className="flex gap-3">
              <input  onChange={handleOrderDataChange} name='city' required={true} className=' border border-gray-300 px-3 py-2 rounded-lg' type="text" placeholder='City' />
              <input  onChange={handleOrderDataChange} name='state' required={true} className=' border border-gray-300 px-3 py-2 rounded-lg' type="text" placeholder='State' />
            </div>
            <div className="flex gap-3">
              <input  onChange={handleOrderDataChange} name='zipcode' required={true} className=' border border-gray-300 px-3 py-2 rounded-lg' type="number" placeholder='Zipcode' />
              <input  onChange={handleOrderDataChange} name='country' required={true} className=' border border-gray-300 px-3 py-2 rounded-lg' type="text" placeholder='Country' />
            </div>
            <input  onChange={handleOrderDataChange} name='phone' required={true} className=' border border-gray-300 px-3 py-2 rounded-lg' type="number" max={10} placeholder='Phone' />
          </div>
        </div>
        
        <div className="w-full flex flex-col gap-5">
        <div className="">
       <CartTotal/>
        </div>

        
        <Title text1={"PAYMENT"} text2={"METHOD"}/>
        <div className="flex justify-end  w-full gap-4">
          <div onClick={()=>toast.error("STRIPE IS NOT AVAILABLE IN DEMO MOD",{duration:3000,position:'bottom-right'})} className=" cursor-pointer px-5 py-1 border border-gray-300">
            <img className=' w-16' src={assets.stripe_logo} alt="stripe_logo" />
          </div>
          <div onClick={()=>toast.error("RAZORPAY IS NOT AVAILABLE IN DEMO MOD",{duration:3000,position:"bottom-right"})} className=" cursor-pointer px-5 py-1 border border-gray-300">
            <img className=' h-7' src={assets.razorpay_logo} alt="stripe_logo" />
          </div>
          <div className=" cursor-pointer px-5 py-1 border border-gray-300">
            <p className='flex items-center gap-2 text-md text-gray-600'><span className=' inline-block w-4 h-4 border rounded-full bg-green-500'></span>CASH ON DELIVERY</p>
          </div>


        </div>
        <div className="flex justify-end">
          <button onClick={handlePlaceOrder} className=' w-[25%] py-3 bg-black text-white'>PLACE ORDER</button>
        </div>
        </div>
        
      </div>
    </div>  )
}

export default PlaceOrder