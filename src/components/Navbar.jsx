import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import logo from '../assets/security.jpg';
import { AuthContext } from '../context/Authcontext';

const Navbar = () => {
    

    // State for the responsive navbar
    const [nav, setNav] = React.useState(false)
    const location = useLocation();
    const routerPath = location.pathname;
    const userAuth = useContext(AuthContext)


    
    

    return (
        <div className='w-full fixed z-20 p-3 sm:px-5 bg-[#24304b] shadow-lg'>
            <div className='mx-auto lg:flex lg:items-center lg:justify-between max-w-7xl'>
                <div className='flex items-center justify-between'>

                <a href="/">
                    <img src={logo} alt="logo" className='w-16 ml-3 rounded-full' />

                    </a>
                    <span onClick={() => { setNav(!nav) }} className='p-1 bg-[#3f8ef1] border border-gray-200 rounded-md shadow-md cursor-pointer hover:shadow-none lg:hidden'>
                        {nav ? <AiOutlineClose className='flex text-3xl text-white' /> : <HiOutlineMenuAlt3 className='flex text-3xl text-white' />}
                    </span>
                    
                </div>
                <ul className={`gap-8 py-6 lg:py-0 px-7 lg:px-0  transition-all ease-in duration-500 lg:flex lg:items-center lg:z-auto lg:static absolute bg-[#24304b] w-full left-0 lg:w-auto ${nav ? 'top-20 opacity-100' : 'top-[-400px] opacity-0 lg:opacity-100'}`}>
                    
                        <li className='p-2 lg:p-0' onClick={() => setNav(!nav)}>
                        { routerPath == '/' || routerPath == '/login' || routerPath == '/signup' ? <a href={"/login"} className='px-2  duration-300 text-white active  focus:text-[#3f8ef1] focus:underline hover:text-[#3F8EF1]'>Login</a> : ""}
                        { routerPath == '/' || routerPath == '/login' || routerPath == '/signup' ? <a href={"/signup"} className='px-2  duration-300 text-white active  focus:text-[#3f8ef1] focus:underline hover:text-[#3F8EF1]'>SignUp</a> : ""}
                    { routerPath == '/dashboard' ? <a href={"/dashboard"} className='px-2  duration-300 text-white active  focus:text-[#3f8ef1] focus:underline hover:text-[#3F8EF1]'>dashboard</a> : ""}
                        </li>
                    
                    
                    { routerPath == '/dashboard' ? <div onClick={userAuth.removeAuthToken} className='px-2  duration-300 text-white active  focus:text-[#3f8ef1] focus:underline hover:text-[#3F8EF1]'>Logout</div> : ""}

                    
                    
                </ul>
                
            </div>

        </div>
    )
}

export default Navbar