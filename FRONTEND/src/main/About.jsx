import React from 'react'
import { Nav } from '../components/Nav'

const About = () => {
  return (
    <div className='w-full'>
      <Nav />
        <div className='flex flex-col lg:flex-row md:flex-row sm:flex-row justify-center p-5'>
            <div className='w-full h-full sm:w-[20%] flex flex-col gap-3 px-3 pb-5'>
                <p className='font-extrabold text-2xl'>About Calle :</p>
                <div className='flex flex-col gap-2 font-semibold'>
                    <p>Address : Jl. Hj. Jamat Gang Rais Buaran Serpong, Tangerang Selatan.</p>
                    <a 
                    href="https://www.google.com/maps/place/Jl.+H.+Jamat+Gg.+Rais,+Buaran,+Kec.+Serpong,+Kota+Tangerang+Selatan,+Banten+15316/@-6.3443206,106.7018813,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69e5754d201985:0xe5536984ad5c785a!8m2!3d-6.3443206!4d106.7044562!16s%2Fg%2F11b6ybmbjz?entry=ttu&g_ep=EgoyMDI1MDIwOS4wIKXMDSoASAFQAw%3D%3D"
                    className='bg-black text-white font-semibold text-center rounded-md p-2 hover:bg-black/75'
                    >
                        See on Maps
                    </a>
                </div>
            </div>
            <div className='w-full sm:w-[80%]'>
                <iframe
                    width="100%"
                    height="600"
                    frameBorder="0"
                    src="https://maps.google.com/maps?width=720&amp;height=600&amp;hl=en&amp;q=Jalan%20Haji%20Jamat%20Gang%20Rais,%20Buaran,%20Serpong,%20Kota%20Tangerang%20Selatan,%20Banten%2015310+(Calle%20De%20Larache)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                />
            </div>
        </div>
    </div>
  )
}

export default About
