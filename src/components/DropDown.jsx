import React from "react";

const Dropdown = ({ users, setSelectedUser, selectedUser }) => {
  return (
    <div className="mb-4">
      <label htmlFor="user-select" className="block text-lg font-semibold">
        Select User
      </label>
      <select
        id="user-select"
        className="mt-2 p-2 w-full border border-gray-300 rounded"
        value={selectedUser?._id || ""}
        onChange={(e) => {
          const user = users.find((user) => user._id === e.target.value); // Adjusted for _id
          setSelectedUser(user);
        }}
      >
        <option value="" disabled>
          -- Select a User --
        </option>
        {users.map((user) => (
          <option key={user._id} value={user._id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
