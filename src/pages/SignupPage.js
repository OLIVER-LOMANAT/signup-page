import { User, Lock, Mail, MessageSquare } from 'lucide-react';
import React, { useState } from 'react'

function SignupPage() {
    const [isLogin, setIsLogin] = useState(false)

    function toggleAuthUser() {
        setIsLogin(!isLogin)
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
                            <input type='text' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='Dida Loma' required/>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='block text-gray-700 mt-2'>Email: </label>
                        <div className='relative'>
                            <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                            <input type='email' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='your@email.com' required/>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='block text-gray-700 mt-2'>Password: </label>
                        <div className='relative'>
                            <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                            <input type='password' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='******' required/>
                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='w-full text-white font-bold px-3 py-2 mt-3 mb-3 bg-purple-500 rounded-md hover:bg-purple-300 hover:text-black transition duration-200'>CREATE ACCOUNT</button>
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
                            <input type='text' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='didaloma' required/>
                        </div>
                    </div>
                    <div className='mb-2'>
                        <label className='block text-gray-700 mt-2'>Password:</label>
                        <div className='relative'>
                            <User className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" size={20}/>
                            <input type='password' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='******' required/>
                        </div>
                    </div>
                    <div>
                        <button className='w-full text-white font-bold px-3 py-2 mt-3 mb-3 bg-purple-500 rounded-md hover:bg-purple-300 hover:text-black transition duration-200'>Login</button>
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