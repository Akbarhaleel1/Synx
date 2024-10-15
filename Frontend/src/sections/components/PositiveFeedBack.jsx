
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const PositiveFeedBack = () => {
    const [data, setData] = useState('');
    const navigate = useNavigate()
    useEffect(()=>{
        const fetchLink = () =>{
            const endpoint = localStorage.getItem('endpoint');
            const result = axios.post('https://synxbackend.synxautomate.com/starFilterReviewLink',{endpoint});
            console.log('result is',result)
            setData(result.data.reviewLink.starFilter)
        }
        fetchLink()
    },[])

    const handleNavigation = () =>{
        console.log('data',data)
        navigate(data)
    }
  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="md:w-1/2 p-8 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <svg className="w-16 h-16 mb-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40 H80 V90 H20 Z" stroke="black" strokeWidth="4" />
            <path d="M10 40 Q50 10 90 40" fill="black" />
          </svg>

          <p className="text-gray-600 mb-6 text-sm">
            Leave us a review, it will help us grow and better serve our customer like you.
          </p>
        
          <p className="text-center text-sm text-gray-500 mt-4">
            Leave a public review
          </p>
          <button onClick={handleNavigation}>Leave a review</button>
        </div>
      </div>
      <div className="md:w-1/2 bg-gray-100 hidden md:block">
        <img 
          src="https://wallpaperaccess.com/full/2484157.jpg" 
          alt="Person working on laptop" 
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
};

export default PositiveFeedBack;
