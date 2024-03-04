import React, { useState } from 'react';
import spinner from "../assets/Gear-0.2s-200px.gif";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
 
        setLoading(true);

        try {
            // Create form data object
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('password', formData.password);

            // Send POST request to the endpoint
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/login`, {
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
                setTimeout(()=>{window.location.href = '/dashboard';},2000) 
            } else {
                toast.error('Invalid Credentials', {
                    
                  });
                console.error('Failed to log in:', response.statusText);
            }
        } catch (error) {
            toast.error('Possible server error. Retry..', {
                
              });
            console.error('Error occurred while logging in:', error);
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-white">
            <h1 className="text-4xl font-bold mb-8">Login to Your Account</h1>
            <form className="w-full max-w-xs" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block mb-1 text-left">Email</label>
                    <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none" />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block mb-1 text-left">Password</label>
                    <input type="password" name='password' id="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none" />
                </div>
                {loading ? <img src={spinner} width={40} className='mx-auto' alt="Loading spinner" /> : <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">Login</button>}
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
