import React from 'react'
import {Link} from 'react-router-dom'

const ProductItem = ({id,image,name,price}) => {
  return (
    <Link to={`/product/${id}`} >
     <div id={id} className=' cursor-pointer h-full w-full flex flex-col  overflow-hidden'>
        <div className="w-full  h-[80%] overflow-hidden">
        <img className='hover:scale-110 object-contain transition-all duration-100 ease-in ' src={image} alt="product-image" />
        </div>
        <div className=" h-[20%]">
        <p className=' text-sm'>{name}</p>
        <p className=' font-semibold'>${price}</p>
        </div>      
    </div>
    </Link>
   
  )
}

export default ProductItem