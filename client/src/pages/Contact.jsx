import React from 'react'
import Title from '../components/Title'
import {assets} from '../assets/frontend_assets/assets'
import Offer from '../components/Offer'

const Contact = () => {
  return (
    <div className=' flex justify-center items-center   h-[calc(80vh-0px)]'>
      <div className=" h-full lg:w-[80%] sm:w-full mx-auto flex flex-col gap-10 items-center">
        <Title text1={"CONTACT"} text2={"US"}/>

      <div className="flex h-full w-full flex-col md:flex-row md:gap-3">
        <div className="sm:w-full md:w-[50%]">
          <img  className=' lg:w-[95%]  h-full' src={assets.contact_img} alt="" />
        </div>
        <div className="  md:w-[50%] sm:w-full w-1/2 flex justify-center items-center">
          <div className=" h-5/6 w-full flex gap-5 flex-col">
            <p className=' text-gray-700 font-semibold text-2xl'>Our Store</p>
            <p className=' text-gray-500'>54709 Willms Station <br />
            Suite 350, Washington, USA</p>
            <p className=' text-gray-500'>Tel: (415) 555-0132
            <br />
            Email: admin@forever.com
            </p>
            <p className=' text-gray-700 font-semibold text-2xl'>Careers at Forever</p>
            <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
            <button className=' sm:w-1/3 px-5 py-3 border border-black hover:bg-black hover:text-white transition-all duration-300 ease-in '>Explore Jobs</button>
          </div>
        </div>
      </div>
      </div>
     

    </div>
  )
}

export default Contact