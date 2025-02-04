import React from "react";
import {assets} from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className=" w-full">
      <div className="flex mt-10 md:justify-between w-full items-center">
        <div className=" w-[40%]">
          <div className="">
            <img src={assets.logo} alt="" />
          </div>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
        </div>

        <div className=" w-[30%] flex">
        <div className="flex flex-col w-5/6 justify-between">
        <p className=" text-3xl font-semibold">COMPANY</p>
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Delivery</li>
          <li>Privacy policy</li>
        </ul>
        </div>
        <div className="flex flex-col w-5/6 justify-between">
        <p className=" text-3xl font-semibold whitespace-nowrap">GET IN TOUCH</p>
        <ul>
          <li>+1-000-000-000</li>
          <li>greatstackdev@gmail.com</li>
          <li>Instagram</li>
        </ul>
        </div>
        </div>
      </div>

      {/* foot  */}
      {/* <div className=""></div> */}
    </div>
  );
};

export default Footer;
