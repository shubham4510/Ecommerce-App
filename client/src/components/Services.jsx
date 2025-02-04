import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Services = () => {
  return (
    <div className=' w-full md:h-[15vh]  flex justify-evenly '>
        <div className="   w-1/3 h-full flex flex-col items-center  justify-between">
        <img className=' h-[50%] w-full object-contain text-4xl  ' src={assets.exchange_icon} alt="exchange-img" />
        <div className=" text-center mt-5">
            <p className=' mb-2 text-sm font-bold'>Easy Exchange Policy</p>
            <p className=' text-gray-500 text-sm '>We offer hassle free exchange policy

</p>
        </div>
        </div>
        <div className="   w-1/3 h-full flex flex-col items-center  justify-between ">
        <img className=' h-[50%] w-full object-contain text-4xl  ' src={assets.quality_icon} alt="exchange-img" />
        <div className=" text-center mt-5">
            <p className=' mb-2 text-sm font-bold'>7 Days Return Policy

</p>
            <p className=' text-gray-500 text-sm '>We provide 7 days free return policy

</p>
        </div>
        </div>
        <div className="   w-1/3 h-full flex flex-col items-center  justify-between">
        <img className=' h-[50%] w-full object-contain text-4xl  ' src={assets.support_img} alt="exchange-img" />
        <div className=" text-center mt-5">
            <p className=' mb-2 text-sm font-bold'>Best customer support

</p>
            <p className=' text-gray-500 text-sm '>we provide 24/7 customer support

</p>
        </div>
        </div>

    </div>
  )
}

export default Services