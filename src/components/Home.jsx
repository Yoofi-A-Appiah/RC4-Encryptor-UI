import React, { useEffect, useState } from 'react';
import securityGif from '../assets/security.jpg';
import '../styles/Home.css'; // Import CSS file for animations

const Home = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 3000); // Show text after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-white">
      <h1 className={`text-4xl font-bold mb-4    `}>Welcome to SecureScrolls</h1>
      {showText && (
        <p className={`text-lg mb-8 text-center ${showText ? 'fade-in' : ''}`}>
          This application allows you to securely encrypt and decrypt your files using the RC4 encryption algorithm.
          <p>You can then download the file or send securely.</p>
          
        </p>
      )}
      <img src={securityGif} alt="Security GIF" className={`w-72 rounded-full mb-8 ${showText ? 'fade-in' : ''}`}/>
      {showText && (<><p className='text-2xl my-5 text-green-400'>Get Started Now </p>
          <span className="arrow text-3xl text-green-400">&#8595;</span></>)}
      {showText && (
        <div className={`flex space-x-20 my-7 `}>
          <a className="bg-green-500 text-white px-10 py-4 rounded-lg hover:bg-green-600 text-lg" href='/login'>Login</a>
          <a className="border-green-500 text-white px-10 py-4 rounded-lg hover:bg-green-600 text-lg" href='/signup'>SignUp</a>
        </div>
      )}
    </div>
  );
};

export default Home;
