import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { registAdmin } from '../services/Api'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const Regist = async (e) => {
    e.preventDefault()
    try {
      await registAdmin( {
        username: username,
        email: email,
        password: password
      })
      navigate("/login")
    } catch (error) {
      if(error.respone){
        console.log(error.response.data)
      }
    }
  }

  return (
    <div className="w-full">
      <div className="w-full m-auto h-screen flex flex-col lg:flex-col justify-center items-center bg-black/15">
        <form onSubmit={Regist} className="bg-white rounded-md w-[80%] lg:w-[30%] md:w-[35%] sm:w-[40%] h-[60%] flex flex-col justify-center items-center drop-shadow-xl">
          <p className="flex font-extrabold text-black text-2xl drop-shadow-md gap-3 justify-center items-center">Regist <span><img src={logo} className="w-30" /></span></p>
          <div className="w-[80%] h-[60%] flex flex-col gap-y-2 justify-center my-5">
            <p className="text-slate-400">Input Username <span className="text-red-500">*</span></p>
            <input onChange={(e) => setUsername(e.target.value)} id='username' value={username} type="text" placeholder="Username..." className="w-full rounded-md outline-black outline-2 p-1 drop-shadow-lg" />

            <p className="text-slate-400">Input Email <span className="text-red-500">*</span></p>
            <input onChange={(e) => setEmail(e.target.value)} id='email' value={email} type="text" placeholder="Email..." className="w-full rounded-md outline-black outline-2 p-1 drop-shadow-lg" />

            <p className="text-slate-400">Input Password <span className="text-red-500">*</span></p>
            <input onChange={(e) => setPassword(e.target.value)} id='password' value={password} type="password" placeholder="Password..." className="w-full rounded-md outline-black outline-2 p-1 drop-shadow-lg" />
          </div>
          <button type="submit" className="flex p-2 px-5 bg-black hover:bg-black/75 ease-in-out duration-75 rounded font-bold text-white">Confirm</button>
        </form>
      </div>
    </div>
  )
}

export default Register