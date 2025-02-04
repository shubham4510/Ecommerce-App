
import Title from '../components/Title'
import CartItem from '../components/CartItem'
import CartTotal from '../components/CartTotal'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const Cart = () => {

  const {cart} = useContext(ShopContext)
  if(!cart.length){
    return <div className="flex items-center justify-center w-full h-[70vh]">
<p className='text-5xl font-semibold text-gray-500'>
      Cart is empty...
    </p>
    </div> 
  }
  
  return ( 
    <div>
      <div className=" float-start font-semibold">
      <Title text1={"YOUR"} text2={"CART"}/>
      </div>
      <div className="">
      {
        cart.map((item)=>(
          <CartItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} size={item.size} quantity={item.quantity}/>
        ))
      }
      </div>

      <CartTotal/>
    </div>
  )
}

export default Cart