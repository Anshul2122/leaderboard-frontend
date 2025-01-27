import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoMdArrowBack } from 'react-icons/io';

import { useNavigate, useParams } from 'react-router-dom'
const api_key = import.meta.env.VITE_BACKEND_URL;

const UserPointHistory = () => {
    const [name, setName] = useState(null);
    const [points, setPoints] = useState([]);
    const [total, setTotal] = useState(0);
    const {id}= useParams();
    const navigate = useNavigate();
    const fetchUserPointHistory = async()=>{
        
        try {
            const res = await axios.get(`${api_key}/api/v1/user/user/pointshistory/${id}`)
            if(res.data.success){
                setName(res.data.name);
                setPoints(res.data.pointsHistory);
                setTotal(res.data.total);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchUserPointHistory();
      },[])

  return (
    <div className="w-full mx-2 mt-10 p-6 bg-white shadow-md rounded-lg border-1">
        <button className='text-xl' onClick={()=>{navigate('/')}}><IoMdArrowBack/></button>
    <h1 className="text-2xl font-bold mb-4 text-center">Points History</h1>
    <div className="text-center mb-6">
      <h2 className="text-2xl font-semibold">{name}</h2>
      <p className="text-gray-600 text-xl">
        Total Points: <span className="text-green-500 font-bold">{total}</span>
      </p>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">History</h3>
      <div className="space-y-4">
        {points.map((entry, index) => (
          <div
            key={entry._id}
            className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">
                Date:{" "}
                <span className="text-gray-700">
                  {new Date(entry.date).toLocaleDateString()}{" "}
                  {new Date(entry.date).toLocaleTimeString()}
                </span>
              </p>
              <p className="font-semibold text-blue-600">
                Points: <span className='text-green-600'>+{entry.points}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default UserPointHistory