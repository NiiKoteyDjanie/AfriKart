import React, {useState, useContext} from 'react';
import logo from '../assets/logo.png';
import { IoSearchCircleOutline } from 'react-icons/io5';
import { FaCircleUser } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { userDataContext } from '../context/UserContext.jsx';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext.jsx';
function Nav() {
  let {getCurrentUser, userData} = useContext(userDataContext);
  let {serverUrl} = useContext(authDataContext);
  let [showSearch, setShowSearch] = useState(false);
  let [showProfile, setShowProfile] = useState(false);
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + 'api/auth/logout', { withCredentials: true })
      console.log(result.data);
      getCurrentUser();
    } catch (error) {
      console.log(error)
    }
    // Logic to handle user logout
  }
  return (
    <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
      <div className="w-[30%] flex items-center justify-start gap-[10px]">
        <img src={logo} alt="" className="w-[30px]" />
        <h1 className="text-[25px] text-[black] font-sans">AfriKart</h1>
      </div>

      <div className="w-[40%]">
        <ul className="flex items-center justify-center gap-[19px] text-[white]">
          <li
            className="text-[12px] hover:bg-slate-400 cursor-pointer bg-[#000000c9] py-[10px]
            px-[20px] rounded-3xl"
          >
            Home
          </li>
          <li
            className="text-[12px] hover:bg-slate-400 cursor-pointer bg-[#000000c9] py-[10px]
            px-[20px] rounded-3xl"
          >
            Collections
          </li>
          <li
            className="text-[12px] hover:bg-slate-400 cursor-pointer bg-[#000000c9] py-[10px]
            px-[20px] rounded-3xl"
          >
            About
          </li>
          <li
            className="text-[12px] hover:bg-slate-400 cursor-pointer bg-[#000000c9] py-[10px]
            px-[20px] rounded-3xl"
          >
            Contact
          </li>
        </ul>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-[20px]">
      {!showSearch && <IoSearchCircleOutline className="w-[38px] h-[38px] text-[#000000] cursor-pointer" 
        onClick={()=>setShowSearch(prev=>!prev)}
      />}
       {showSearch && <IoSearchCircleSharp className="w-[38px] h-[38px] text-[#000000] cursor-pointer" 
        onClick={()=>setShowSearch(prev=>!prev)}
      />}
      {!userData && 
        <FaCircleUser className="w-[29px] h-[29px] text-[#000000] cursor-pointer" />
      }
      {userData && 
        <div
          className="w-[30px] h-[30px] bg-[#080808] text-[white] rounded-full
            flex items-center justify-center cursor-pointer relative" onClick={()=>setShowProfile(prev=>!prev)}  
        >
          
          {userData?.name.slice(0, 1)}
        </div>
      }
     
        <MdOutlineShoppingCart className="w-[30px] h-[30px] text-[#000000] cursor-pointer" />
        <p
          className="absolute w-[18px] h-[18px] items-center md:flex justify-center bg-black px-[5px]
            py-[2px] text-white rounded-full text-[9px] top-[10px] right-[23px] hidden"
        >
          10
        </p>
      </div>
      {showSearch &&
        <div
          className="w-[100%] h-[80px] bg-[#d8f6f9dd] absolute top-[100%] left-0 right-0
      flex items-center justify-center"
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-[50%] h-[60%] bg-[#233533] rounded-[30px] px-[50px] text-[white] text-[18px]"
          />
        </div>
      }
      {showProfile && <div className='absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px]
      border-[#aaa9a9] rounded-[10px] z-10'>
        <ul className='w-[100%] h-[100%] flex items-start justify-around flex-col text-[white] px-[20px] py-[15px] gap-[10px]'>
          {!userData && <li className='w-[100%] hover:b[#2f2f2f] px-[15px] py-[15px] cursor-pointer' onClick={()=>{navigate('/login');setShowProfile(false)}}>Login</li>}
          {userData && <li className='w-[100%] hover:b[#2f2f2f] px-[15px] py-[15px] cursor-pointer' onClick={()=>{handleLogout();setShowProfile(false)}}>LogOut</li>}
          <li className='w-[100%] hover:b[#2f2f2f] px-[15px] py-[15px] cursor-pointer'>Orders</li>
          <li className='w-[100%] hover:b[#2f2f2f] px-[15px] py-[15px] cursor-pointer'>About</li>
        </ul>
      </div>}
    
    </div>
  );
}

export default Nav;
