import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='flex justify-center items-center gap-3 text-2xl'>
                 <p className=' text-gray-500'>{text1}</p>
                 <p>{text2}</p>
                 <div className=' mt-2 rounded-full h-[2px] w-10 bg-black'></div>
    </div>
  )
}

export default Title