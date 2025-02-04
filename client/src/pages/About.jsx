import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";

const About = () => {
  return (
    <>
      <div className="pt-6 text-center">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      
      <div className="flex justify-start items-center w-full h-[calc(80vh-0px)]">
        <div className="h-5/6 w-full flex flex-col gap-10 items-center">
          <div className="flex flex-col md:flex-row gap-3 w-full">
            {/* Image Section */}
            <div className="md:w-[50%] h-5/6">
              <img className="h-full w-full object-cover" src={assets.about_img} alt="" />
            </div>
  
            {/* Text Section */}
            <div className="md:w-[50%] h-5/6 flex flex-col justify-between">
              <div className="h-1/2 lg:h-5/6 flex flex-col justify-between w-full">
                <p className="text-gray-500 text-base sm:text-lg md:text-xl">
                  Forever was born out of a passion for innovation and a desire to
                  revolutionize the way people shop online. Our journey began with
                  a simple idea: to provide a platform where customers can easily
                  discover, explore, and purchase a wide range of products from
                  the comfort of their homes.
                </p>
                <br />
                <p className="text-gray-500 text-base sm:text-lg md:text-xl">
                  Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.
                </p>
                <br />
                <p className="font-bold text-xl sm:text-2xl">
                  Our Mission
                </p>
                <br />
                <p className="text-gray-500 text-base sm:text-lg md:text-xl">
                  Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default About;
