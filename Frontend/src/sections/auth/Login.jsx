import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const EnhancedLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const env = import.meta.env.DOMAIN;
    console.log('eve', env)
    if (validateForm()) {
      try {
        const result = await axios.post('https://synxbackend.synxautomate.com/login', formData)
        if (result) {
          console.log('token', result.data.token);
          console.log('refreshToken', result.data.refreshToken);

          if (result.data.token) {
            localStorage.setItem('token', JSON.stringify(result.data.token))
            localStorage.setItem('refreshToken', JSON.stringify(result.data.refreshToken))
            localStorage.setItem('user', JSON.stringify(result.data.user))
          }

          navigate('/reviews');
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrors(prev => ({ ...prev, api: "Invalid email or password. Please try again." }));
      }
    }
  };


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('user');
    const tokenParam = params.get('token');
    const refreshToken = params.get('refreshToken');
  
    if (userParam && tokenParam) {
      try {
        const user = JSON.parse(decodeURIComponent(userParam));
        
        localStorage.setItem('token', tokenParam);
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
        localStorage.setItem('user', JSON.stringify(user));
  
        console.log('Authenticated successfully');
        
        navigate('/reviews');
      } catch (error) {
        console.error('Error parsing user or token:', error);
      }
    } else {
      console.warn('User or token parameter is missing in the URL');
    }
  }, []);
  

  const handleGoogleLogin = () => {
    window.location.href = "https://synxbackend.synxautomate.com/auth/google";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600  flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex">
        {/* Left side - Image and text */}
        <div className="hidden md:block w-2/5 bg-cover bg-center" style={{ backgroundImage: "url('https://wallpaperaccess.com/full/2441903.jpg" }}>
          <div className="h-full w-full bg-black bg-opacity-80 flex flex-col justify-center items-center text-white p-12">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-xl text-center">
              We are so excited to see you again! Log in to access your account and continue your journey.
            </p>
            <a href="/signup" className="mt-8 px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-indigo-600 transition duration-300">
              Create Account
            </a>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-3/5 p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login to Your Account</h2>
          <p className="text-gray-600 mb-8">Welcome back! Please enter your details.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="/forgorPassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            {errors.api && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{errors.api}</span>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-8 text-center md:hidden">
            <p className="text-gray-600">Don't have an account?</p>
            <a href="/signup" className="mt-2 inline-block px-6 py-3 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition duration-300">
              Create Account
            </a>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div onClick={handleGoogleLogin}>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                </a>
              </div>

              <div>
                <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
    
      </div>
    </div>
  );
};

export default EnhancedLogin;