import React from 'react'

const Offer = () => {
  return (
    <div className=' w-full h-[20vh] '>
        <div className=" w-[60%]  flex flex-col gap-4 justify-center items-center mx-auto ">
        <p className=' font-semibold text-3xl'>Subscribe now & get 20% off</p>
        <p className=' text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti sit delectus deserunt error, dicta impedit</p>

        <form className='flex w-full'>
            <input className=' outline-none border border-gray-500 w-[75%] py-4 px-2' type="text" placeholder='Enter your email' />
            <button className=' w-[25%] py-4 px-2 bg-black text-white'>SUBSCRIBE</button>
        </form>
        </div>
    
        
    </div>
  )
}

export default Offer