import React from 'react'
import { Nav } from '../components/Nav'
import cm1 from '../assets/1.png'
import cm2 from '../assets/2.png'
import cm3 from '../assets/3.png'

const Community = () => {
  return (
    <div className='w-full'>
        <Nav/>
        <div className='w-full max-w-[1250px] m-auto flex justify-center items-center flex-col'>
            <div className='w-full h-full flex justify-center'>
                <img src={cm1} alt="" />
            </div>
            <div className='w-full h-full flex justify-center'>
                <img src={cm2} alt="" />
            </div>
            <div className='w-full h-full flex justify-center'>
                <img src={cm3} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Community