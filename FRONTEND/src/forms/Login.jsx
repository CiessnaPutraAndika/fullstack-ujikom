import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import { postAdmin } from '../services/Api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await postAdmin({
                email: email,
                password: password
            });
            console.log(response)
            if (response.data.accessToken) {
                navigate("/dashboard");
            } else {
                setErrorMessage(response.data.message || "Login gagal");
            }
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message || "Terjadi kesalahan");
            } else {
                setErrorMessage("Terjadi kesalahan pada jaringan");
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="w-full">
            <div className="w-full m-auto h-screen flex flex-col lg:flex-col justify-center items-center bg-black/15">
                <form onSubmit={Auth} className="bg-white rounded-md w-[80%] lg:w-[30%] md:w-[35%] sm:w-[40%] h-[60%] flex flex-col justify-center items-center drop-shadow-xl">
                    <p className="flex justify-center items-center gap-2 font-extrabold text-black text-2xl drop-shadow-md">
                        Admin <span><img src={logo} className="w-30" alt="Logo" /></span>
                    </p>
                    <div className="w-[80%] h-[60%] flex flex-col gap-y-2 justify-center">
                        <p className="text-slate-400">Input Email <span className="text-red-500">*</span></p>
                        <input onChange={(e) => setEmail(e.target.value)} id='email' value={email} type="text" placeholder="Email Admin..." className="w-full rounded-md outline-blue outline-2 p-1 drop-shadow-lg" />

                        <p className="text-slate-400">Input Password <span className="text-red-500">*</span></p>
                        <input onChange={(e) => setPassword(e.target.value)} id='password' value={password} type="password" placeholder="Password Admin..." className="w-full rounded-md outline-2 outline-black p-1 drop-shadow-lg" />

                        <Link to='/register' className='text-black'>Dont Have Account? <span className='font-semibold'>Click Here!</span></Link>
                    </div>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    <button type="submit" disabled={isLoading} className="flex p-2 px-5 bg-black hover:bg-black/75 ease-in-out duration-75 rounded font-bold text-white">
                        {isLoading ? "Loading..." : "SignIn"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;