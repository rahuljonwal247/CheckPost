


'use client';
import Image from 'next/image';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase.';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/posts'); // Redirect to posts page on successful login
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      

      <div className="flex flex-col lg:flex-row items-center lg:items-start w-full max-w-4xl rounded-lg shadow-lg overflow-hidden mt-10">
        
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex w-1/2 justify-center items-center p-10 mt-5">
          <Image 
            src="/home-pic.svg" // Replace with your image path
            alt="Illustration" 
            width={300} 
            height={300} 
            className="object-contain" 
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-white mb-4">Login to your account</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-gray-400">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="john.smith@gmail.com" 
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-gray-400">Password</label>
              <input 
                type="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="••••••••" 
              />
            </div>

            <div className="flex items-center text-gray-400">
              <input type="checkbox" id="terms" className="mr-2"/>
              <label htmlFor="terms">I agree to the Terms & Conditions</label>
            </div>

            <button 
              type="submit" 
              className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Signup option */}
          <p className="mt-4 text-gray-400 text-center">
            Don’t have an account?{' '}
            <span 
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => router.push('/signup')}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}


