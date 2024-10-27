"use client";
import Image from 'next/image';
import logo from "@/public/logo.svg";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  // Default redirect path is set to home
  const [redirectPath, setRedirectPath] = useState('/');

  useEffect(() => {
    // 1. Get the `from` parameter from the URL
    const fromPath = searchParams.get('from');
    if (fromPath) {
      // 2. Map the `from` parameter to a desired redirect destination
      const redirectMap: Record<string, string> = {
        '/for_farmers': '/farmers_dashboard',
        '/': '/shop',
        // Add more paths as needed
      };
      setRedirectPath(redirectMap[fromPath] || '/');
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(''); // Clear any previous messages

    try {
      // 3. Send login request
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);

      // Save tokens
      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);

      setMessage('Login successful!');

      // 4. Redirect after a brief delay
      setTimeout(() => {
        router.push(redirectPath); // Uses the redirect path determined above
      }, 1500);
    } catch (error: any) {
      // 5. Handle any errors
      const errorMessage = error.response?.data?.detail || 
                          'Login failed. Please check your credentials.';
      setMessage(errorMessage);
      console.error('Login error:', error);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="flex min-h-max flex-col justify-center px-6 py-24 lg:px-8 bg-white w-11/12 sm:w-10/12 md:w-8/12 lg:w-7/12 xl:w-2/5 rounded-lg shadow-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center flex-col items-center">
          <Image
            alt="Your Company"
            src={ logo }
            className="mx-auto h-20 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-start">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  required
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#44403c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div>
              <button className='text-blue-600' onClick={() => router.push('/register')}>
                Register Here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
