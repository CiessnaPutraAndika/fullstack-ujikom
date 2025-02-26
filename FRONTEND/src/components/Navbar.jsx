import React, { useEffect, useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';
import { logoutAdmin, refreshTokens } from '../services/Api';
import { BiLogOut, BiUser } from 'react-icons/bi';
import { AiFillProduct } from 'react-icons/ai';
import axios from 'axios';
import { MdPayment } from 'react-icons/md';
import { GrUserAdmin } from 'react-icons/gr';
import { RiAdminLine } from 'react-icons/ri';
import { jwtDecode } from 'jwt-decode';
import { FaUser } from 'react-icons/fa';

export const Navbar = () => {
    const navigate = useNavigate()
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [allList, setAllList] = useState()
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('')

    const refreshToken = async () => {
        try {
            const response = await refreshTokens()
            setToken(response.data.accessToken)
            const decoded = jwtDecode(response.data.accessToken)
            setName(decoded.username)
            setExpire(decoded.exp)
        } catch (error) {
            if (error.response) {
                navigate('/login')
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
            const response = await refreshTokens()
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
    
    const getAdmin = async () => {
        try {
            const response = await axiosJWT.get('http://localhost:5500/admin', {
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
            getAdmin();
        }
    }, [token]);

    const logout = async() => {
        try {
            await logoutAdmin()
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
      setMenuOpen(!menuOpen);
    }
  return (
    <div className='w-full bg-white'>
        <div className='max-w-[1200px] px-3 m-auto flex justify-between items-center py-3 drop-shadow-md'>
            <div className='flex items-center gap-5'>
                <img src={logo} className="w-32" />
            </div>

          <div className='lg:hidden md:hidden sm:hidden flex justify-center items-center'>
            <button onClick={toggleMenu}>
              <GiHamburgerMenu className='text-2xl text-black'/>
            </button>
          </div>

          <div className="relative hidden sm:flex">
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
          <div className='flex-col gap-3 ms-4 flex w-full py-3 sm:py-0'>
            <ul className='flex-col lg:hidden md:hidden sm:hidden gap-2 font-semibold flex'>
                <li>
                    <Link to="/dashboard"><button className='ease-in-out duration-75 rounded px-3 p-1 flex justify-center items-center gap-1'><RiAdminLine className='text-3xl hover:text-black/50'/>Data Admin</button></Link>
                </li>
                <li>
                    <Link to="/users"><button className='ease-in-out duration-75 rounded px-3 p-1 flex justify-center items-center gap-1'><BiUser className='text-3xl hover:text-black/50'/>Data Users</button></Link>
                </li>
                <li>
                    <Link to="/product"><button className='ease-in-out duration-75 rounded px-3 p-1 flex justify-center items-center gap-1'><AiFillProduct className='text-3xl hover:text-black/50'/>Data Product</button></Link>
                </li>
                <li>
                    <Link to="/history"><button className='ease-in-out duration-75 rounded px-3 p-1 flex justify-center items-center gap-1'><MdPayment className='text-3xl hover:text-black/50'/>Data Payment</button></Link>
                </li>
                <li>
                    <Link to="/" className='px-3'><button onClick={logout} className='text-white hover:bg-black/75 ease-in-out duration-75 bg-black rounded px-3 p-1'>LogOut</button></Link>
                </li>
            </ul>            
          </div>
        ) : null}

    </div>
  )
}