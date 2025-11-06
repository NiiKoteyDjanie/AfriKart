import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import Google from '../assets/google.png';
import { IoEyeOutline, IoEye } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { authDataContext } from '../context/authContext.jsx';// adjust path if needed


function Login() {

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        'http://localhost:8000/api/auth/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
      <div
        className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
        onClick={() => navigate('/')}
      >
        <img className="w-[40px]" src={Logo} alt="logo" />
        <h1 className="text-[22px] font-sans">AfriKart</h1>
      </div>

      <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
        <span className="text-[25px] font-semibold">Registration Page</span>
        <span className="text-[16px]">
          Welcome to AfriKart — please create an account to continue
        </span>
      </div>

      <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
        <form
        onSubmit={handleLogin}
          autoComplete="off"
          className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]"
        >
          {/* Google Sign Up */}
          <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer">
            <img className="w-[20px]" src={Google} alt="Google logo" />
            <span className="text-[16px]">Registration with Google</span>
          </div>

          {/* Divider */}
          <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
            OR
            <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
          </div>

          {/* Input fields */}
          <div className="w-[90%] flex flex-col items-center justify-center gap-[15px] relative">
            <input
              type="text"
              placeholder="Email"
              required
              autoComplete="off"
              className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <div className="relative w-full">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Password"
                required
                autoComplete="off"
                className="w-full h-[50px] border-2 border-[#96969635] rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {show ? (
                <IoEye
                  className="w-[22px] h-[22px] cursor-pointer absolute right-[5%] top-[50%] translate-y-[-50%] bottom-[57%]"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <IoEyeOutline
                  className="w-[22px] h-[22px] cursor-pointer absolute right-[5%] top-[50%] translate-y-[-50%] bottom-[57%]"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>

            <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
              Login
            </button>

            <p className="flex gap-[10px]">
              You haven't any account?{' '}
              <span
                className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                onClick={() => navigate('/signup')}
              >
                Create New Account
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
