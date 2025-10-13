import { User, Lock, Mail, MessageSquare, Loader2, ArrowLeft } from 'lucide-react';
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthstore';
import { toast } from 'react-toastify';

function SignupPage() {
    const [isLogin, setIsLogin] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [forgotPasswordStep, setForgotPasswordStep] = useState(1) // 1: email, 2: code, 3: new password
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        resetCode: "",
        newPassword: ""
    })

    // FIXED: Correct state variable names
    const { 
        signup, 
        login, 
        isSigningUp, 
        isLoggingIn, 
        forgotPassword, 
        verifyResetPassword, 
        resetPassword, 
        isResettingPassword 
    } = useAuthStore();

    function validateForm() {
        if (isForgotPassword) {
            if (forgotPasswordStep === 1) {
                if (!formData.email.trim()) return toast.error("Email is required");
                if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
            } else if (forgotPasswordStep === 2) {
                if (!formData.resetCode.trim()) return toast.error("Reset code is required");
            } else if (forgotPasswordStep === 3) {
                if (!formData.newPassword) return toast.error("New password is required");
                if (formData.newPassword.length < 6) return toast.error("Password must be at least 6 characters");
            }
        } else if (isLogin) {
            if (!formData.email.trim()) return toast.error("Email is required");
            if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
            if (!formData.password) return toast.error("Password is required");
        } else { 
            if (!formData.username.trim()) return toast.error("Full name is required");
            if (!formData.email.trim()) return toast.error("Email is required");
            if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
            if (!formData.password) return toast.error("Password is required");
            if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
        }
        return true;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const isValid = validateForm();

        if (isValid === true) {
            if (isForgotPassword) {
                if (forgotPasswordStep === 1) {
                    try {
                        await forgotPassword({ email: formData.email });
                        setForgotPasswordStep(2);
                        toast.success("Reset code sent to your email");
                    } catch (error) {
                        console.log(error)
                    }
                } else if (forgotPasswordStep === 2) {
                    try {
                        // FIXED: Changed resetCode to code to match backend
                        await verifyResetPassword({ 
                            email: formData.email, 
                            code: formData.resetCode 
                        });
                        setForgotPasswordStep(3);
                        toast.success("Code verified successfully");
                    } catch (error) {
                        console.log(error)
                    }
                } else if (forgotPasswordStep === 3) {
                    try {
                        // FIXED: Changed resetCode to code to match backend
                        await resetPassword({ 
                            email: formData.email, 
                            code: formData.resetCode,
                            newPassword: formData.newPassword 
                        });
                        toast.success("Password reset successfully");
                        setIsForgotPassword(false);
                        setForgotPasswordStep(1);
                        setFormData(prev => ({ ...prev, resetCode: "", newPassword: "" }));
                    } catch (error) {
                        console.log(error)
                    }
                }
            } else if (isLogin) {
                const loginData = {
                    email: formData.email,
                    password: formData.password
                };
                login(loginData);
            } else {
                signup(formData);
            }
        }
    }

    function toggleAuthUser() {
        setIsLogin(!isLogin);
        setIsForgotPassword(false);
        setForgotPasswordStep(1);
        setFormData({
            username: "",
            email: "",
            password: "",
            resetCode: "",
            newPassword: ""
        });
    }

    function handleForgotPassword() {
        setIsForgotPassword(true);
        setForgotPasswordStep(1);
    }

    function handleBackToLogin() {
        setIsForgotPassword(false);
        setForgotPasswordStep(1);
        setFormData(prev => ({ ...prev, resetCode: "", newPassword: "" }));
    }

    if (isForgotPassword) {
        return (
            <div className='flex min-h-screen overflow-hidden'>
                <div className='flex-1 flex justify-center items-center'>
                    <div className='w-full max-w-md p-6'>
                        <div className='text-center'>
                            <button 
                                onClick={handleBackToLogin}
                                className="flex items-center text-purple-600 hover:text-purple-800 mb-4"
                            >
                                <ArrowLeft size={20} className="mr-2" />
                                Back to Login
                            </button>
                            <h1 className='text-2xl font-bold mb-2'>
                                {forgotPasswordStep === 1 && "Reset Your Password"}
                                {forgotPasswordStep === 2 && "Enter Reset Code"}
                                {forgotPasswordStep === 3 && "Create New Password"}
                            </h1>
                            <p className='text-gray-500 mb-6'>
                                {forgotPasswordStep === 1 && "Enter your email to receive a reset code"}
                                {forgotPasswordStep === 2 && "Enter the code sent to your email"}
                                {forgotPasswordStep === 3 && "Create your new password"}
                            </p>
                        </div>
                        
                        <form onSubmit={handleSubmit}>
                            {forgotPasswordStep === 1 && (
                                <div className='mb-4'>
                                    <label className='block text-gray-700 mb-2'>Email:</label>
                                    <div className='relative'>
                                        <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                        <input 
                                            type='email' 
                                            className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' 
                                            placeholder='your@email.com' 
                                            value={formData.email} 
                                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                            autoComplete="email"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {forgotPasswordStep === 2 && (
                                <div className='mb-4'>
                                    <label className='block text-gray-700 mb-2'>Reset Code:</label>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                        <input 
                                            type='text' 
                                            className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' 
                                            placeholder='Enter 6-digit code' 
                                            value={formData.resetCode} 
                                            onChange={(e) => setFormData({...formData, resetCode: e.target.value})} 
                                            autoComplete="one-time-code"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {forgotPasswordStep === 3 && (
                                <div className='mb-4'>
                                    <label className='block text-gray-700 mb-2'>New Password:</label>
                                    <div className='relative'>
                                        <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                        <input 
                                            type='password' 
                                            className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' 
                                            placeholder='******' 
                                            value={formData.newPassword} 
                                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})} 
                                            autoComplete="new-password"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <button 
                                type='submit' 
                                className='w-full text-white font-bold px-3 py-2 mt-3 mb-3 bg-purple-500 rounded-md hover:bg-purple-300 hover:text-black transition duration-200 flex items-center justify-center gap-2'
                                disabled={isResettingPassword}
                            >
                                {isResettingPassword ? (
                                    <>
                                        <Loader2 className='size-5 animate-spin'/>
                                        Loading...
                                    </>
                                ) : (
                                    forgotPasswordStep === 1 ? "Send Reset Code" :
                                    forgotPasswordStep === 2 ? "Verify Code" :
                                    "Reset Password"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                
                {/* Right side banner */}
                <div className='flex-1 bg-purple-500 text-white flex justify-center items-center'>
                    <div className='text-center max-w-md p-6'>
                        <MessageSquare className='mx-auto mb-4 animate-bounce' size={54}/>
                        <h1 className='text-3xl font-bold mb-4'>Password Recovery</h1>
                        <p className='text-xl'>We'll help you get back into your account quickly and securely.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Your original signup/login form
    return (
        <div className='flex min-h-screen overflow-hidden'>
            <div className={`flex-1 flex justify-center items-center transition-all duration-700 ease-out
                ${isLogin ? 'translate-x-full' : 'translate-x-0'}`}>
                <div className='w-full max-w-md p-6'>
                    {!isLogin ? (
                    <>
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold mb-2'>Create Account</h1>
                        <p className='text-gray-500 mb-6'>Hey There I Forgot You! Haha</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <label className='block text-gray-700 mb-2'>Full Name:</label>
                            <div className='relative'>
                                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'size={20}/>
                                <input 
                                    type='text' 
                                    className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' 
                                    placeholder='Dida Loma' 
                                    value={formData.username} 
                                    onChange={(e) => setFormData({...formData, username: e.target.value})} 
                                    autoComplete="name"
                                    required
                                />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700 mt-2'>Email: </label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                <input 
                                    type='email' 
                                    className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' 
                                    placeholder='your@email.com' 
                                    value={formData.email} 
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700 mt-2'>Password: </label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20}/>
                                <input 
                                    type='password' 
                                    className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' 
                                    value={formData.password} 
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                    placeholder='******' 
                                    autoComplete="new-password"
                                    required
                                />
                            </div>
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='w-full text-white font-bold px-3 py-2 mt-3 mb-3 bg-purple-500 rounded-md hover:bg-purple-300 hover:text-black transition duration-200 flex items-center justify-center gap-2' disabled={isSigningUp}>
                                {isSigningUp ? (
                                    <>
                                    <Loader2 className='size-5 animate-spin'/>
                                    Loading...
                                    </>
                                ) : (
                                    "CREATE ACCOUNT"
                                )}
                            </button>
                            <p>Already have an account? <button type='button' className='text-purple-700 hover:underline' onClick={toggleAuthUser}>Sign in</button></p>
                        </div>
                    </form>
                    </>
                    ) : (
                    <>
                    <div className='text-center'>
                        <h1 className='text-2xl font-bold mb-2'>Welcome Back</h1>
                        <p className='text-gray-500 mb-6'>Hey There I got forgoten too! Damn</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-2'>
                            <label className='block text-gray-700 mt-2'>Email:</label>
                            <div className='relative'>
                                <Mail className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" size={20}/>
                                <input 
                                    type='email' 
                                    className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' 
                                    placeholder='your@email.com' 
                                    value={formData.email} 
                                    onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                    autoComplete="email"
                                    required
                                />
                            </div>
                        </div>
                        <div className='mb-2'>
                            <label className='block text-gray-700 mt-2'>Password:</label>
                            <div className='relative'>
                                <Lock className="absolute left-3 top-1/2 text-gray-400 transform -translate-y-1/2" size={20}/>
                                <input 
                                    type='password' 
                                    className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' 
                                    placeholder='******' 
                                    value={formData.password} 
                                    onChange={(e) => setFormData({...formData, password: e.target.value})} 
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                        </div>
                        
                        {/*FORGOT PASSWORD LINK */}
                        <div className="text-right mb-4">
                            <button 
                                type="button" 
                                className="text-purple-700 hover:underline text-sm"
                                onClick={handleForgotPassword}
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <div>
                            {/* */}
                            <button type='submit' className='w-full text-white font-bold px-3 py-2 mt-3 mb-3 bg-purple-500 rounded-md hover:bg-purple-300 hover:text-black transition duration-200 flex items-center justify-center gap-2' disabled={isLoggingIn}>
                                {isLoggingIn ? (
                                    <>
                                    <Loader2 className='size-5 animate-spin' />
                                    Loading...
                                    </>
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                            <p className='text-center'>Create an account? <button type='button' className='text-purple-700 hover:underline' onClick={toggleAuthUser}>create account</button></p>
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
                        <p className='text-xl'>{isLogin ? ('Connect with friends, share moments, and stay in touch with your loved ones.') : ('Welcome back again. Keep In touch with your friends.')}</p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;