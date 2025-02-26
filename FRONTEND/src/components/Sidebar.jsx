import React from 'react'
import { AiFillProduct } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { FaUserCheck } from 'react-icons/fa'
import { MdPayment } from 'react-icons/md'
import { RiAdminLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='w-[6%] lg:w-[5%] sm:w-[10%] h-screen bg-white hidden md:flex'>
        <div className='w-full h-full flex justify-center'>
            <ul className='w-full items-center flex flex-col gap-5'>
                <li className='w-full h-[10%]'>
                    <Link className='h-full flex justify-center items-center' to='/dashboard'><RiAdminLine className='text-3xl hover:text-black/50'/></Link>
                </li>
                <li className='w-full h-[10%]'>
                    <Link className='h-full flex justify-center items-center' to='/users'><BiUser className='text-3xl hover:text-black/50'/></Link>
                </li>
                <li className='w-full h-[10%]'>
                    <Link className='h-full flex justify-center items-center' to='/product'><AiFillProduct className='text-3xl hover:text-black/50'/></Link>
                </li>
                <li className='w-full h-[10%]'>
                    <Link className='h-full flex justify-center items-center' to='/history'><MdPayment className='text-3xl hover:text-black/50'/></Link>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar