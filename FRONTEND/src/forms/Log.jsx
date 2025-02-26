import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { postUsers } from '../services/Api';
import { jwtDecode } from 'jwt-decode';

const Log = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        try {
            const response = await postUsers({
                email: email,
                password: password
            });

            console.log("API Response:", response.data);

            const accessToken = response.data.accessToken;
            if (!accessToken) {
                throw new Error("Login gagal: accessToken tidak ditemukan.");
            }

            localStorage.setItem("token", accessToken);

            const decoded = jwtDecode(accessToken);
            console.log("Decoded Token:", {...decoded,UserId:decoded.UserId});

            if (decoded && decoded.UserId) {
                localStorage.setItem("dataku", JSON.stringify(decoded));
                navigate("/home");
            } else {
                throw new Error("Login gagal: ID user tidak ditemukan dalam token.");
            }
        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                setErrorMessage(error.response.data.message || "Terjadi kesalahan saat login.");
            } else {
                setErrorMessage(error.message || "Terjadi kesalahan pada jaringan.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='hidden w-full max-w-[30%] p-3 m-auto h-screen sm:flex flex-col lg:flex-col'>
                <div className='w-full h-full flex items-center justify-center'>
                    <img src={logo} alt="Logo" />
                </div>
            </div>
            <div className='w-full bg-slate-100 sm:w-[70%] p-3 m-auto h-screen flex justify-center items-center'>
                <form onSubmit={Auth} className='bg-white rounded-lg drop-shadow-lg w-[80%] lg:w-[70%] h-[80%] flex flex-col gap-5 justify-center items-center'>
                    <p className="flex flex-col justify-center items-center gap-2 font-extrabold text-black text-2xl">
                        WELCOME TO <span><img src={logo} className="w-30 lg:w-45 md:w-40 sm:w-35" alt="Logo" /></span>
                    </p>
                    <div className='w-[80%] h-[50%] flex flex-col gap-y-2 justify-center'>
                        <p className='text-slate-400'>Input Email <span className='text-red-500'>*</span></p>
                        <input type="text" onChange={(e) => setEmail(e.target.value)} id='email' value={email} placeholder='Email...' className='bg-white outline-2 outline-black rounded w-full p-2'/>

                        <p className='text-slate-400'>Input Password <span className='text-red-500'>*</span></p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} id='password' value={password} placeholder='Password...' className='bg-white outline-2 outline-black rounded w-full p-2'/>

                        <Link to='/regist' className='text-slate-600'>Don't Have an Account? <span className='font-semibold text-black'>Click Here!</span></Link>
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button type="submit" disabled={isLoading} className="flex p-2 px-5 bg-black hover:bg-black/75 ease-in-out duration-75 rounded font-bold text-white">
                        {isLoading ? "Loading..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Log;