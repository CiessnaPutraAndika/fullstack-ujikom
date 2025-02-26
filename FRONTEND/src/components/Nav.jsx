import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logoutUsers, refreshTokens, usersToken } from '../services/Api';
import { BiCart, BiLogOut } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';

export const Nav = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [allList, setAllList] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('')

    const refreshToken = async () => {
      try {
          const response = await usersToken()
          setToken(response.data.accessToken)
          const decoded = jwtDecode(response.data.accessToken)
          setName(decoded.username)
          setExpire(decoded.exp)
      } catch (error) {
          if (error.response) {
              navigate('/')
          }            
      }
  }

  useEffect(() => {
      refreshToken()
  }, [])

  const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(async(config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
          const response = await usersToken()
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwtDecode(response.data.accessToken)
          setName(decoded.username)
          setExpire(decoded.exp)
      }
      return config;
  }, (error) => {
      return Promise.reject(error)
  })
  
  const getUsers = async () => {
      try {
          const response = await axiosJWT.get('http://localhost:5500/users', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          setAllList(response.data);
      } catch (error) {
          console.error('Error fetching admin data:', error);
      }
  };

  useEffect(() => {
      if (token) {
          getUsers();
      }
  }, [token]);

    const logout = async() => {
        try {
            await logoutUsers()
            localStorage.removeItem('dataku');
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    }
  return (
    <div className='w-full bg-white drop-shadow-lg'>
        <div className='max-w-[1200px] px-3 m-auto flex justify-between items-center py-3'>
            <div className='flex items-center gap-5'>
                <img src={logo} className="w-32" />
            </div>

          <div className='lg:hidden md:hidden sm:hidden flex justify-center items-center'>
            <button onClick={toggleMenu}>
              <GiHamburgerMenu className='text-2xl text-black'/>
            </button>
          </div>

          <div className='hidden lg:flex md:flex sm:flex gap-5 justify-center items-center'>
            <ul className='flex justify-center items-center gap-5'>
              <li>
                <Link to="/home"><button className='text-black font-bold hover:bg-slate-200 ease-in-out duration-75 rounded-xl px-3 p-1'>CATALOG</button></Link>
              </li>
              <li>
                <Link to="/community"><button className='text-black font-bold hover:bg-slate-200 ease-in-out duration-75 rounded-xl px-3 p-1'>COMMUNITY</button></Link>
              </li>
              <li>
                <Link to="/about"><button className='text-black font-bold hover:bg-slate-200 ease-in-out duration-75 rounded-xl px-3 p-1'>ABOUT</button></Link>
              </li>
            </ul>
          </div>
          <div className="relative hidden sm:flex justify-center items-center gap-5">
            <Link to='/cart'><BiCart className='text-3xl hover:text-black/75'/></Link>
            <div 
              className="cursor-pointer font-semibold px-4 py-2 bg-black hover:bg-black/75 text-white rounded-md flex justify-center items-center gap-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaUser />{name}
            </div>

            {isOpen && (
              <ul className="absolute right-0 mt-2 bg-black shadow-md rounded-md w-27">
                <li>
                  <button 
                    onClick={logout} 
                    className="w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-black/75 font-semibold rounded text-white"
                  >
                    <BiLogOut /> LogOut
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* mobile menu */}
        {menuOpen ? (
          <div className='flex-col gap-3 ms-4 flex w-[150px]'>
            <ul className='flex-col lg:hidden md:hidden sm:hidden gap-2 font-semibold flex pb-2'>
              <li>
                <Link to="/home"><button className='text-black font-semibold hover:bg-slate-200 ease-in-out duration-75 rounded-lg px-2 p-1'>CATALOG</button></Link>
              </li>
              <li>
                <Link to="/community"><button className='text-black font-semibold hover:bg-slate-200 ease-in-out duration-75 rounded-lg px-2 p-1'>COMMUNITY</button></Link>
              </li>
              <li>
                <Link to="/about"><button className='text-black font-semibold hover:bg-slate-200 ease-in-out duration-75 rounded-lg px-2 p-1'>ABOUT</button></Link>
              </li>
              <li>
                  <Link to="/log"><button onClick={logout} className='text-white hover:bg-black/75 ease-in-out duration-75 bg-black rounded px-3 p-1'>LogOut</button></Link>
              </li>
            </ul>            
          </div>
        ) : null}

    </div>
  )
}