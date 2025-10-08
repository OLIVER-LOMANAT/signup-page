import { User, Lock, Mail, MessageSquare, Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthstore';
import { toast } from 'react-toastify';

function SignupPage() {
    const [isLogin, setIsLogin] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const { signup, login, isSigningup, isLoggingIn } = useAuthStore();

    function validateForm() {
        if(isLogin){
            if(!formData.email.trim()) return toast.error("Email is required")
            if(!/\s+@\s+\.\s+/.test(formData.email)) return toast.error("Invalid email format")
            if(!formData.password) return toast.error("Password is required")
        }else { 
            if (!formData.username.trim()) return toast.error("Full name is required");
            if (!formData.email.trim()) return toast.error("Email is required");
            if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
            if (!formData.password) return toast.error("Password is required");
            if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
       }
       return true
    }

    function handleSubmit(e) {
        e.preventDefault();
        const isValid = validateForm();

        if(isValid === true) {
            if(isLogin){
                const loginData = {
                    email: formData.email,
                    password: formData.password
                };
                login(loginData)
            } else {
                signup(formData)
            }
        }
    }
    function toggleAuthUser() {

        setIsLogin(!isLogin)

        setFormData({
            username: "",
            email: "",
            password: ""
        });
    }
  return (
    <div className='flex min-h-screen overflow-hidden'>
        <div className={`flex-1 flex justify-center items-center transition-all duration-700 ease-out
            ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}>
            <div className='w-full max-w-md p-6'>
                {isLogin ? (
                <>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold mb-2'>Create Account</h1>
                    <p className='text-gray-500 mb-6'>Hey There I Forgot You! Haha</p>
                </div>
                <form>
                    <div className='mb-2'>
                        <label className='block text-gray-700 mb-2'>Full Name:</label>
                        <div className='relative'>
                            <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'size={20}/>
                            <input type='text' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='Dida Loma' value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required/>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='block text-gray-700 mt-2'>Email: </label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                            <input type='email' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='your@email.com' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required/>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='block text-gray-700 mt-2'>Password: </label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                            <input type='password' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.password})} placeholder='******' required/>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='w-full text-white font-bold px-3 py-2 mt-3 mb-3 bg-purple-500 rounded-md hover:bg-purple-300 hover:text-black transition duration-200' onClick={handleSubmit} disabled={isSigningup}>
                            {isSigningup ? (
                                <>
                                <Loader2 className='size-5 animate-spin'/>
                                Loading...
                                </>
                            ) : (
                                "CREATE ACCOUNT"
                            )

                            }
                            
                        </button>
                        <p>Already have an account? <button className='text-purple-700 hover:underline' onClick={toggleAuthUser}>Sign in</button></p>
                    </div>
                </form>
                </>
                ) : (
                <>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold mb-2'>Welcome Back</h1>
                    <p className='text-gray-500 mb-6'>Hey There I got forgoten too! Damn</p>
                </div>
                <form>
                    <div className='mb-2'>
                        <label className='block text-gray-700 mt-2'>Fullname:</label>
                        <div className='relative'>
                            <User className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" size={20}/>
                            <input type='text' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='didaloma' value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required/>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='block text-gray-700 mt-2'>Password:</label>
                        <div className='relative'>
                            <User className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" size={20}/>
                            <input type='password' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='******' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required/>
                        </div>
                    </div>
                    <div>
                        <button type='submit' className='w-full text-white font-bold px-3 py-2 mt-3 mb-3 bg-purple-500 rounded-md hover:bg-purple-300 hover:text-black transition duration-200' onClick={handleSubmit} disabled={isLoggingIn}>
                            {isLoggingIn ? (
                                <>
                                <Loader2 className='size-5 animate-spin' />
                                Loading...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                        <p className='text-center'>Create an account? <button className='text-purple-700 hover:underline' onClick={toggleAuthUser}>create account</button></p>
                    </div>
                </form>
                </>
                )}
            </div>
        </div>
        <div className={`flex-1 bg-purple-500 text-white flex justify-center items-center transition-all duration-700 ease-in-out
            ${isLogin ? '-translate-x-full': 'translate-x-0'}`}>
            <div className='text-center  max-w-md p-6'>
                    <MessageSquare className='mx-auto mb-4 animate-bounce' size={54}/>
                    <h1 className='text-3xl font-bold mb4'>Join our community</h1>
                    <p className='text-xl'>Connect with friends, share moments, and stay in touch with your loved ones.</p>
            </div>
        </div>
    </div>
  )
}

export default SignupPage;