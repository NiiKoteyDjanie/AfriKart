import React, { useState, useContext } from 'react';
import logo from '../assets/logo.png';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { FaCircleUser } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { userDataContext } from '../context/UserContext.jsx';
import { IoSearchCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext.jsx';
import { IoMdHome } from 'react-icons/io';
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";

function Nav() {
  let { getCurrentUser, userData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let [showSearch, setShowSearch] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  let [showCart, setShowCart] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + 'api/auth/logout', {
        withCredentials: true,
      });
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-screen h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
        <div className="w-[20%] flex items-center justify-start gap-2.5 lg:w-[30%]">
          <img src={logo} alt="" className="w-[30px]" />
          <h1 className="text-[25px] text-black font-sans">AfriKart</h1>
        </div>

        <div className="w-[50%] hidden md:flex lg:w-[50%]">
          <ul className="flex items-center justify-center gap-[19px] text-white">
            <li className="text-[12px] hover:bg-slate-400 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-3xl">
              Home
            </li>
            <li className="text-[12px] hover:bg-slate-400 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-3xl">
              Collections
            </li>
            <li className="text-[12px] hover:bg-slate-400 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-3xl">
              About
            </li>
            <li className="text-[12px] hover:bg-slate-400 cursor-pointer bg-[#000000c9] py-2.5 px-5 rounded-3xl">
              Contact
            </li>
          </ul>
        </div>

        <div className="w-[30%] flex items-center justify-end gap-5 relative">
          {!showSearch && (
            <IoSearchCircleOutline
              className="w-[38px] h-[38px] text-[#000000] cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          )}
          {showSearch && (
            <IoSearchCircleSharp
              className="w-[38px] h-[38px] text-[#000000] cursor-pointer"
              onClick={() => setShowSearch((prev) => !prev)}
            />
          )}

          <div onClick={() => userData ? setShowProfile((prev) => !prev) : navigate('/login')}>
            {!userData && (
              <FaCircleUser 
                className="w-[29px] h-[29px] text-[#000000] cursor-pointer" 
              />
            )}

            {userData && (
              <div
                className="w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer"
              >
                {userData?.name?.slice(0, 1)}
              </div>
            )}
          </div>

          <div className="relative hidden md:block">
            <MdOutlineShoppingCart
              className="w-[30px] h-[30px] text-[#000000] cursor-pointer"
              onClick={() => setShowCart((prev) => !prev)}
            />
            <p className="absolute w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] top-[-8px] right-[-8px]">
              10
            </p>
          </div>

          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute w-[220px] bg-[#000000d7] top-[50px] right-0 border border-[#aaa9a9] rounded-[10px] z-20">
              <ul className="w-full flex flex-col text-white p-[15px] gap-[5px]">
                {!userData && (
                  <li
                    className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer rounded-md"
                    onClick={() => {
                      navigate('/login');
                      setShowProfile(false);
                    }}
                  >
                    Login
                  </li>
                )}
                {userData && (
                  <li
                    className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer rounded-md"
                    onClick={() => {
                      handleLogout();
                      setShowProfile(false);
                    }}
                  >
                    LogOut
                  </li>
                )}
                <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer rounded-md">
                  Orders
                </li>
                <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer rounded-md">
                  About
                </li>
              </ul>
            </div>
          )}

          {/* Cart Dropdown */}
          {showCart && (
            <div className="absolute w-[300px] min-h-[200px] bg-[#000000d7] top-[50px] right-0 border border-[#aaa9a9] rounded-[10px] z-20">
              <div className="w-full p-[20px]">
                <h3 className="text-white text-[18px] font-bold mb-[15px]">Shopping Cart</h3>
                <div className="text-white text-[14px]">
                  <p className="mb-[10px]">Your cart is empty</p>
                  <button 
                    className="bg-[#ecfafaec] text-black px-[20px] py-[10px] rounded-[5px] hover:bg-slate-400"
                    onClick={() => setShowCart(false)}
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="w-full h-20 bg-[#d8f6f9dd] absolute top-full left-0 right-0 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] text-white text-[18px]"
            />
          </div>
        )}
      </div>

      {/* Mobile Bottom Nav */}
      <div className="w-screen h-[90px] text-[12px] flex items-center justify-between px-5 fixed bottom-0 left-0 bg-[#191818] z-10 md:hidden">
        <button className="text-white flex items-center justify-center flex-col gap-0.5">
          <IoMdHome className="w-[25px] h-[25px] text-white md:hidden" />
          <span className="text-[12px]">Home</span>
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-0.5">
          <HiOutlineCollection className="w-[25px] h-[25px] text-white" />
          <span className="text-[12px]">Collections</span>
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-0.5">
          <MdContacts className="w-[25px] h-[25px] text-white" />
          <span className="text-[12px]">Contact</span>
        </button>
        <button className="text-white flex items-center justify-center flex-col gap-0.5">
          <MdOutlineShoppingCart className="w-[25px] h-[25px] text-white" />
          <span className="text-[12px]">Cart</span>
        </button>
      </div>
    </>
  );
}

export default Nav;