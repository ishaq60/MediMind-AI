'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'; // Make sure to install lucide-react

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign Up Form Data:', formData);
    // Call signup API here
  };

  return (
    <div className='max-w-7xl mx-auto min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Create Your Account</h2>
          <p className='text-gray-600'>Sign up to get started with our platform</p>
        </div>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Name */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                placeholder='Enter your name'
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                placeholder='Enter your email'
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Password</label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none'
                placeholder='Enter your password'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? <EyeOff className='w-5 h-5' /> : <Eye className='w-5 h-5' />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:scale-105 font-medium'
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
