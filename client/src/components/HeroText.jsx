import React from 'react'

const HeroText = ({text1,text2}) => {
  return (
    <div className=' w-full flex flex-col gap-4 items-center justify-center'>
        <div className='flex justify-center items-center gap-3 text-4xl font-semibold'>
                 <p className=' text-gray-500'>{text1}</p>
                 <p>{text2}</p>
                 <div className=' mt-2 rounded-full h-[2px] w-10 bg-black'></div>
    </div>
      <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit eum ipsam officiis blanditiis tempora obcaecati.</p>
    </div>
  )
}

export default HeroText