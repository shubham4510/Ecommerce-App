import React from 'react';

const OrderItem = ({ id, name, price, image, size, status, quantity }) => {
  return (
    <div className='w-full h-[15%] border-b border-gray-300 flex justify-between items-center'>
      {/* LEFT DIV */}
      <div className="flex items-center gap-4 h-full">
        <img className='h-[60%] w-[25%] object-contain' src={image} alt={name} />
        <div className="flex flex-col gap-2">
          <p className='font-semibold'>{name}</p>
          <div className="flex items-center gap-3">
            <p className='font-semibold'>${price}</p>
            <p className='font-semibold'>Quantity: {quantity}</p>
            <p className='font-semibold'>Size: {size}</p>
          </div>
          <p className='font-semibold'>Payment: <span className='font-light'>COD</span></p>
        </div>
      </div>
      
      <div className="flex w-1/2 justify-between items-center">
        <p className='flex items-center gap-2 text-md text-gray-600'>
          <span className='inline-block w-3 h-3 rounded-full bg-green-500'></span>{status}
        </p>
        <button className='px-2 py-1 border border-gray-300 rounded-lg cursor-pointer'>Track Order</button>
      </div>
    </div>
  );
}

export default OrderItem;
