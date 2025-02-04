import React, { useState ,useEffect, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import toast from 'react-hot-toast'




const Product = () => {
  const [size, setSize] = useState('')
  const [loading, setLoading] = useState(true);
  const [searchedProduct, setSearchedProduct] = useState({})
  const {getProductById,addToCart} = useContext(ShopContext)
  const {id} = useParams()

  useEffect(() => {
      const product = getProductById(id);
      setSearchedProduct(product);
      setLoading(false)
  }, [id,getProductById]);

  const handleSizeChange = (e)=>{
    setSize(e.target.value)
  }

  if (loading) {
    return <p>Loading product...</p>;
  }


  const {_id,name,image,price,description} = searchedProduct
  

  return (
    <div className=" mt-4 flex h-[100vh] flex-col justify-between">
 <div className='w-full h-[70vh] flex gap-3 items-center justify-between'>
        {/* Side images */}
        <div className=' w-1/2 flex gap-3 h-full'>
        <div className="">
          <img className=' h-1/4 cursor-pointer w-full' src={image} alt={name} />
        </div>
        <img src={searchedProduct?.image} alt={name} />
        </div>


        {/* Main content  */}
        <div className=' py-5 w-1/2 h-full flex flex-col justify-between'>
            <h4 className=' font-bold text-4xl'>{name}</h4>
            <p className=" font-semibold">⭐⭐⭐⭐⭐(122)</p>
            <p className='font-semibold text-4xl'>${price}</p>
            <p className=" text-gray-500 text-sm">{description}</p>
            <div className="flex flex-col gap-2">
              <p className=' font-semibold'>Select Size</p>
              <div className="flex gap-2">
                <button onClick={handleSizeChange} value={'S'}  className={` ${size === 'S'?'border-orange-500':''} border py-2 px-4 bg-gray-100`}>S</button>
                <button onClick={handleSizeChange} value={'M'} className={` ${size === 'M'?'border-orange-500':''} border py-2 px-4 bg-gray-100`}>M</button>
                <button onClick={handleSizeChange} value={'L'} className={` ${size === 'L'?'border-orange-500':''} border py-2 px-4 bg-gray-100`}>L</button>
                <button onClick={handleSizeChange} value={'XL'} className={` ${size === 'XL'?'border-orange-500':''} border py-2 px-4 bg-gray-100`}>XL</button>
                <button onClick={handleSizeChange} value={'XXL'} className={` ${size === 'XXL'?'border-orange-500':''} border py-2 px-4 bg-gray-100`}>XXL</button>
              </div>
            </div>
            <button onClick={()=>{
              if(!size){
                return toast.error('Select Product Size',{
                  duration:3000,
                  position:'bottom-right'
                })
              }
              addToCart({_id,name,image,price,size})
            }} className=' sm:w-1/4 px-4 py-3 bg-black text-white  '>ADD TO CART</button>
            <hr />
            <p className='text-gray-500 font-semibold text-sm w-1/2'>
            100% Original product.

Cash on delivery is available on this product.

Easy return and exchange policy within 7 days.
            </p>
        </div>
    </div>

    {/* DESCRIPTION  */}
    <div className="flex flex-col">
      <div className="flex">
        <p className=' font-bold border border-gray-300 px-5 py-2'>Description</p>
        <p className='  border border-gray-300 px-5 py-2'>Review(122)</p>
      </div>
      <p className=' text-sm border border-gray-300 px-5 py-6 text-gray-500'>
      An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.

E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
      </p>
    </div>
    </div>
   
  )
}

export default Product