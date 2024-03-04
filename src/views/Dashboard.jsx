import React, { useState, useEffect } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [procedure, setProcedure] = useState('Encrypt');
    const [algorithm, setAlgorithm] = useState('RC4');
    const [secretKey, setSecretKey] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    
    const handleFileDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    
    const handleProcedureChange = (event) => {
        setProcedure(event.target.value);
    };
    const handleSecretKeyChange = (event) => {
        setSecretKey(event.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedFile) {
            toast.error('You have not selected a file');
            return;
        }
        if (!secretKey) {
            toast.error('You have not entered a secret key');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('key', secretKey);
        // formData.append('procedure', procedure);
        // formData.append('algorithm', algorithm);
        const procedureUrl = procedure === "Encrypt" ? "encrypt-file" : "decrypt-file";
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/${procedureUrl}`, {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'downloaded_file.txt'; // Change the filename as needed
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                toast.success(`Downloading ${procedure}ed file!`);
            } else {
                toast.error('Something wrong with your file');
            }
        } catch (error) {
            toast.error('The server is not responding');

        }
    };
    

    useEffect(() => {
        const handleHover = () => {
          if (window.innerWidth >= 768) {
            setShowDropdown(true);
          }
        };
    
        const handleTap = () => {
          if (window.innerWidth < 768) {
            setShowDropdown(!showDropdown);
          }
        };
    
        const dropdownElement = document.getElementById('dropdown');
    
        dropdownElement.addEventListener('mouseenter', handleHover);
        dropdownElement.addEventListener('mouseleave', () => setShowDropdown(false));
        dropdownElement.addEventListener('click', handleTap);
    
        return () => {
          dropdownElement.removeEventListener('mouseenter', handleHover);
          dropdownElement.removeEventListener('mouseleave', () => setShowDropdown(false));
          dropdownElement.removeEventListener('click', handleTap);
        };
      }, [showDropdown]);
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-900 py-20">
            <p className='text-white mt-40 px-10'>Enter your secret Key and select the file you want to <i className='text-green-500'>{procedure}</i></p>
            <div id="dropdown" className='relative'>
            <p className='text-white' >You are using the <b className='bg-green-500 px-2 py-1 rounded-lg text-black'>{algorithm}⌄</b> algorithm. Click to change</p>
                {showDropdown && (
                <div className='absolute z-20 bg-green-500 px-16  lg:px-9 py-5 text-black rounded-lg top-full left-0 w-full'>
                        <ul className='text-center'>
                        <div className='hover:bg-black hover:text-white rounded-lg' onClick={()=> setAlgorithm("RC4A")} onTouchEnd={() => setAlgorithm("RC4A")}>RC4A</div>
                        <div className='hover:bg-black hover:text-white rounded-lg' onClick={()=> setAlgorithm("VMPC")} onTouchEnd={() => setAlgorithm("VMPC")}>VMPC</div>
                        <div className='hover:bg-black hover:text-white rounded-lg' onClick={()=> setAlgorithm("PRITZ")} onTouchEnd={() => setAlgorithm("PRITZ")}>PRITZ</div>
                        </ul>
                    
                </div>
                )}
            </div>
            
            <div
                className="border border-dashed border-gray-400 lg:w-1/3   m-5 rounded-xl  grid grid-rows-2"
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
            >
                <div className="mb-4  bg-slate-300 px-5 py-5 w-full rounded-t-xl border-double border-gray-400">
                    <label htmlFor="secretkey" className="block mb-1 text-left">Secret Key</label>
                    <input type="text" name="secretkey" id="secretkey"  placeholder='Secret key here...'  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none" onChange={handleSecretKeyChange} value={secretKey}/>
                    <div className="my-4">
                    <label className="block mb-1 text-left">Procedure:</label>
                    <select
                        value={procedure}
                        onChange={handleProcedureChange}
                        className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none"
                    >
                        <option value="Encrypt">Encrypt</option>
                        <option value="Decrypt">Decrypt</option>
                    </select>
                </div>
                </div>
                <div className='lg:p-10'>
                <p className="text-lg hidden lg:flex mb-2 text-white justify-center">Drag and drop a file here</p>
                <p className='text-white text-center'>OR</p>
                <div className="flex items-center justify-center">
                    <input
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="fileInput"
                    />
                    <label htmlFor="fileInput" className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">
                        Select File
                    </label>
                </div>

                {selectedFile && (
                <div className='m-5 bg-black text-green-400 p-3 rounded-xl'>
                    <p className="text-lg">Selected File: {selectedFile.name}</p>
                    <p>File Size: {selectedFile.size} bytes</p>
                    <p>File Type: {selectedFile.type}</p>
                </div>
            )}
            </div>
            
            </div>
            <button onClick={handleSubmit} className="bg-green-500 text-white lg:w-1/3 px-4 py-2 rounded-lg hover:bg-green-600">Submit</button>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
