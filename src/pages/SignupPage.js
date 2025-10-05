import React from 'react'

function SignupPage() {
  return (
    <div className='flex min-h-screen'>
        <div className='flex-1 flex justify-center items-center'>
            <div className='w-full max-w-md'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold mb-2'>Create Account</h1>
                    <p className='text-gray-500 mb-6'>Hey There I Forgot You! Haha</p>
                </div>
                <form>
                    <div className='mb-2'>
                        <label className='block text-gray-700'>Full Name:</label>
                        <div>
                            <input type='text' className='w-full pl-12 px-3 py-2 border border-gray-400 rounded-md' placeholder='Dida Loma' required/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignupPage;