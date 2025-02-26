import React from 'react'
import bg1 from '../assets/g1.jpeg';
import bg2 from '../assets/g2.jpeg';
import bg3 from '../assets/g3.jpeg';
import bg4 from '../assets/g4.jpeg';
import './All.css'

const Background = () => {
  return (
    <div className='w-full'>
        <div className="area">
            <ul className="circles">
                <li><img src={bg1} alt="" srcset="" /></li>
                <li><img src={bg1} alt="" srcset="" /></li>
                <li><img src={bg1} alt="" srcset="" /></li>
                <li><img src={bg1} alt="" srcset="" /></li>
                <li><img src={bg1} alt="" srcset="" /></li>
                <li><img src={bg2} alt="" srcset="" /></li>
                <li><img src={bg2} alt="" srcset="" /></li>
                <li><img src={bg2} alt="" srcset="" /></li>
                <li><img src={bg2} alt="" srcset="" /></li>
                <li><img src={bg2} alt="" srcset="" /></li>
                <li><img src={bg3} alt="" srcset="" /></li>
                <li><img src={bg3} alt="" srcset="" /></li>
                <li><img src={bg3} alt="" srcset="" /></li>
                <li><img src={bg3} alt="" srcset="" /></li>
                <li><img src={bg3} alt="" srcset="" /></li>
                <li><img src={bg4} alt="" srcset="" /></li>
                <li><img src={bg4} alt="" srcset="" /></li>
                <li><img src={bg4} alt="" srcset="" /></li>
                <li><img src={bg4} alt="" srcset="" /></li>
                <li><img src={bg4} alt="" srcset="" /></li>
            </ul>
        </div>
    </div>
  )
}

export default Background