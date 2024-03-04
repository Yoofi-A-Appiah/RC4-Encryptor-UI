import React, { useState, useEffect } from 'react'
import logo from '../assets/security.jpg';
import "../styles/footer.css"

const Footer = () => {



    return (
        <div className='w-full text-gray-900 bg-[#24304b]'>
            <div className=' py-8 mx-5 border-b border-gray-400 md:grid-cols-2 '>
                <div className='col-span-1 pt-8 md:pt-0 text-center'>
                    <img src={logo} alt="logo" className='mx-auto w-20 mb-4 rounded-full' />
                    <h1 className='text-white'>Secure Scrolls</h1>
                    <div className='bg-white p-5 w-52 mx-auto rounded-2xl my-5'>
                        <a href='mailto:appiahyoofi@gmail.com' className='rainbow-text'>Send me a message 😊</a>
                    </div>
                    
                </div>
                <div className='col-span-1 pt-10 md:pt-2'>
                    <h1 className='text-lg text-center text-white  '>Data & network Security Group7</h1>
                    
                </div>

                
            </div>
            <div className='grid justify-between max-w-6xl py-4 mx-auto text-gray-400 sm:flex md:px-4 '>
                <div className='text-center mx-auto'>
                    <p className='mx-auto'>Copyright © {new Date().getFullYear()} all rights reserved</p>
                </div>
                
            </div>


            
        </div>
    )
}

export default Footer