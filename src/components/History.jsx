import React from 'react';

const History = ({ user }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Claim History</h2>
      <ul className="space-y-2">
        {user.pointsHistory.map((entry) => (
          <li key={entry._id} className="p-3 bg-white rounded shadow">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Points: {entry.points}</span>
              <span className="text-sm text-gray-500">{new Date(entry.date).toLocaleString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
