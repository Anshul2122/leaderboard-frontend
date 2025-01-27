import React, { useEffect, useState } from "react";
import axios from "axios";
import Dropdown from "../components/DropDown";
import Leaderboard from "../components/LeaderBoard";
const api_key = import.meta.env.VITE_BACKEND_URL;
import toast from "react-hot-toast";

function Mainpage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [popOver, setPopOver] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
  });

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${api_key}/api/v1/user/getAllUsers`);
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${api_key}/api/v1/user/show-leaderboard`);
      setLeaderboard(response.data.users);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${api_key}/api/v1/user/register`, input);
      if (res.data.success) {
        toast.success(`user added`);
        setInput({ name: "", email: "" });
        setPopOver(false);
        fetchUsers();
        fetchLeaderboard();
      }
    } catch (error) {
        toast.error("user already exists")
      console.error("Error registering user:", error);
    }
  };

  const claimPoints = async () => {
    if (selectedUser) {
      try {
        
        const res = await axios.post(`${api_key}/api/v1/user/claimPoint/${selectedUser._id}`,{});
        if (res.data.success) {
            toast.success(`congrats you got ${res.data.points} points`);
          fetchLeaderboard();
        }
      } catch (error) {
        console.error("Error claiming points:", error);
      }
    } else {
      alert("Please select a user to claim points.");
    }
  }


  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">User Leaderboard</h1>
        <Dropdown users={users} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <div className="mb-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
            onClick={() => claimPoints()}
          >
            Claim Points
          </button>
        </div>
        <Leaderboard users={leaderboard} />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
        onClick={() => setPopOver(true)}
      >
        Add User
      </button>
      {popOver && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Blurred Background Div */}
          <div
            className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-md"
            onClick={() => setPopOver(false)}
          ></div>

          {/* Popover Content */}
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-96 z-10">
            <h2 className="text-xl font-bold mb-4">Add User</h2>
            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={input.name}
                  onChange={changeEventHandler}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2 hover:bg-gray-400"
                  onClick={() => setPopOver(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mainpage;
