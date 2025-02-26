import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import { registUsers } from '../services/Api'
import { useNavigate } from 'react-router-dom'

const Regist = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

  const Regist = async (e) => {
    e.preventDefault()
    try {
      await registUsers( {
        username: username,
        email: email,
        password: password
      })
      navigate("/")
    } catch (error) {
      if(error.respone){
        console.log(error.response.data)
      }
    }
  }
  return (
    <div className='w-full flex justify-center items-center'>
        <div className='w-full max-w-[30%] p-3 m-auto h-screen flex flex-col lg:flex-col'>
            <div className='w-full h-full flex items-center justify-center'>
                <img src={logo} />
            </div>
        </div>
        <div className='w-full bg-slate-100 drop-shadow-lg max-w-[70%] p-3 m-auto h-screen flex justify-center items-center'>
            <form onSubmit={Regist} className='bg-white rounded-lg drop-shadow-lg w-[70%] h-[80%] flex flex-col gap-5 justify-center items-center'>
                <p className="flex flex-col justify-center items-center gap-2 font-extrabold text-black text-2xl">
                    WELCOME TO <span><img src={logo} className="w-45" alt="Logo" /></span>
                </p>
                <div className='w-[80%] h-[50%] flex flex-col gap-y-2 justify-center'>
                    <p className='text-slate-400'>Input Username <span className='text-red-500'>*</span></p>
                    <input onChange={(e) => setUsername(e.target.value)} id='username' value={username} type="text" placeholder='Username...' className='bg-white outline-2 outline-black rounded w-full p-2'/>

                    <p className='text-slate-400'>Input Email <span className='text-red-500'>*</span></p>
                    <input onChange={(e) => setEmail(e.target.value)} id='email' value={email} type="text" placeholder='Email...' className='bg-white outline-2 outline-black rounded w-full p-2'/>

                    <p className='text-slate-400'>Input Password <span className='text-red-500'>*</span></p>
                    <input onChange={(e) => setPassword(e.target.value)} id='password' value={password} type="password" placeholder='Password...' className='bg-white outline-2 outline-black rounded w-full p-2'/>
                </div>
                <button className='w-[80%] bg-black text-white rounded-lg font-bold p-3'>SignUp</button>
            </form>
        </div>
    </div>
  )
}

export default Regist