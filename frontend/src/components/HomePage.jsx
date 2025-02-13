import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const HomePage = () => {
  const { getAllUser, authUser, users } = useAuthStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (authUser) {
      getAllUser();
    }
  }, [getAllUser, authUser]);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          User Search
        </h2>
        <input
          type="text"
          placeholder="Search by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <table className="w-full mt-4 border-collapse bg-white shadow-md">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-2">Full Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Date of Birth</th>
              <th className="p-2">Country</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id} className="border-t text-center">
                  <td className="p-2">{user.fullName}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.gender}</td>
                  <td className="p-2">
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="p-2">{user.country}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
