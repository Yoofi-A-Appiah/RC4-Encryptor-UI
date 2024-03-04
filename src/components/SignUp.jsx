import React, { useState } from 'react';
import spinner from "../assets/Gear-0.2s-200px.gif"
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [normal, setNormal] = useState({
    confirmPassword: '',
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleConfirmChange = (e) => {
    const { name, value } = e.target;
    setNormal({ ...normal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (formData.password !== normal.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    
    // Create form data object
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    setLoading(true);
    try {
      // Send POST request to the endpoint
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/signup`, {
        method: 'POST',
        body: formDataToSend
      });
  
      // Check if response is successful (status code 200)
      if (response.ok) {
        const data = await response.json();
          const accessToken = data.access_token;
      
          localStorage.setItem('secure_scroll_accessToken', accessToken);
          toast.success('Login Successful!', {
              
            });
          setTimeout(()=>{window.location.href = '/dashboard';},3000) 
      } else {
        toast.error('Invalid Email');
        console.error('Failed to sign up:', response.statusText);
      }
    } catch (error) {
      toast.error('Cannot connect to server. Try again..');
      console.error('Error occurred while signing up:', error);
    }
    setLoading(false);
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-white">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">Create Your Account</h1>
      <form className="w-full sm:w-80 flex flex-col items-center" onSubmit={handleSubmit}>
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block mb-1 text-left">Email</label>
          <input type="email" id="email" name="username" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none" />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="password" className="block mb-1 text-left">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none" />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="confirmPassword" className="block mb-1 text-left">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" value={normal.confirmPassword} onChange={handleConfirmChange} className={`w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none ${!passwordsMatch ? 'border-red-500' : ''}`} />
          {!passwordsMatch && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>}
        </div>
        {loading ?<img src={spinner} width={40}/> :<button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Sign Up</button>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
