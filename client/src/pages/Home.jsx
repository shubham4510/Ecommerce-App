import React, { useContext } from 'react'
import { assets } from '../assets/frontend_assets/assets'
import HeroText from '../components/HeroText'
import ProductItem from '../components/ProductItem'
import Services from '../components/Services'
import Offer from '../components/Offer'
import { ShopContext } from '../context/ShopContext'

const Home = () => {
  const {products} = useContext(ShopContext)
  const latestCollectionProducts = products.slice(0,10);
  const bestSellerProducts = products.slice(11,16);

  return (
    <div className='w-full h-full flex flex-col gap-14 overflow-x-hidden'>
      {/* HERO SECTION 1 */}
      <div className="w-full h-[70vh] border border-gray-400 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="flex flex-col items-start gap-4">
            <div className='flex flex-row-reverse justify-center items-center gap-3 font-bold'>
              <p className='text-gray-500'>{"OUR BESTSELLERS"}</p>
              <div className='mt-2 rounded-full h-[2px] w-10 bg-black'></div>
            </div>
            <p className='text-4xl md:text-6xl'>Latest Arrivals</p>
            <div className='flex justify-center items-center gap-3 font-bold'>
              <p className='text-gray-500'>{"SHOP NOW"}</p>
              <div className='mt-2 rounded-full h-[2px] w-10 bg-black'></div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <img className='w-full h-full object-cover' src={assets.hero_img} alt="banner" />
        </div>
      </div>
  
      {/* HERO SECTION 2 */}
      <div className="w-full h-[110vh] flex flex-col gap-6">
        <HeroText text1={"LATEST"} text2={"COLLECTIONS"} />
        <div className="w-full gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:grid-rows-2">
          {
            latestCollectionProducts.map(({ _id, image, name, price }) => (
              <ProductItem key={_id} id={_id} image={image} name={name} price={price} />
            ))
          }
        </div>
      </div>
  
      {/* HERO SECTION 3 */}
      <div className="w-full h-[60vh] flex flex-col gap-6">
        <HeroText text1={"BEST"} text2={"SELLERS"} />
        <div className="w-full gap-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:grid-rows-1">
          {
            bestSellerProducts.map(({ _id, image, name, price }) => (
              <ProductItem key={_id} id={_id} image={image} name={name} price={price} />
            ))
          }
        </div>
      </div>
  
      {/* HERO SECTION 4 */}
      <div className="w-full h-[50vh] flex flex-col justify-between gap-6">
        <Services />
        <Offer />
      </div>
    </div>
  )
  
}

export default Home