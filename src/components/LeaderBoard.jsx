import React from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = ({ users }) => {
    const navigate = useNavigate();
  const sortedUsers = [...users].sort((a, b) => b.totalPoints - a.totalPoints);  // Sort users by points

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Leaderboard</h2>
      <ul className="space-y-2">
        {sortedUsers.map((user, index) => (
          <li key={index} className="p-3 bg-white rounded shadow hover:shadow-xl cursor-pointer" onClick={()=>{navigate(`/user/${user._id}`)}}>
            <div className="flex justify-between items-center">
              <span className="font-semibold">{user.name}</span>
              <span className="text-gray-600">{user.points} points</span>
            </div>
            <div className="text-sm text-gray-500">Rank: {index + 1}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
