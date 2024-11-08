import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [users, setUsers] = useState([]);
  const [trashedUsers, setTrashedUsers] = useState([]);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get(
        "http://192.168.68.117:8000/api/dashboard/existinguser"
      );
      setUsers(usersResponse.data.users);
      console.log(usersResponse.data);

      const trashedUsersResponse = await axios.get(
        "http://192.168.68.117:8000/api/dashboard/trashlist"
      );
      setTrashedUsers(trashedUsersResponse.data);
      console.log(trashedUsersResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setUsers([
        { id: 1, fname: "John Doe", email: "john@example.com" },
        { id: 2, fname: "Jane Smith", email: "jane@example.com" },
        { id: 3, fname: "Alice Johnson", email: "alice@example.com" },
      ]);
      setTrashedUsers([
        { id: 1, fname: "Deleted User", email: "deleted@example.com" },
        { id: 2, fname: "Inactive User", email: "inactive@example.com" },
      ]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleTrashUser = async (userId) => {
    try {
      await axios.post(
        `http://192.168.68.117:8000/api/dashboard/existinguser/trashuser/${userId}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      fetchData();
    } catch (error) {
      console.error("Error trashing user:", error);
    }
  };

  const handleRetrieve = async (userId) => {
    try {
      await axios.post(
        `http://192.168.68.117:8000/api/dashboard/existinguser/trashlist/${userId}`
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.post(
        `http://192.168.68.117:8000/api/dashboard/existinguser/delete/${userId}`
      );
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-sky-100 pt-8">
      <div className="max-w-7xl w-[80%] mx-auto min-h-40 bg-blue-950 text-white p-4 rounded-md">
        <p className="text-2xl font-bold">Admin</p>
        <div className="flex mt-4 gap-8">
          <button
            className={`py-2 px-4 rounded-md ${
              activeTab === "all" ? "bg-yellow-400" : "bg-blue-600"
            }`}
            onClick={() => handleTabClick("all")}
          >
            All Users
          </button>
          <button
            className={`py-2 px-4 rounded-md ${
              activeTab === "trash" ? "bg-yellow-400" : "bg-blue-600"
            }`}
            onClick={() => handleTabClick("trash")}
          >
            Trash
          </button>
          <Link to={"/register"}>
            <button
              className={`py-2 px-4 rounded-md ${
                activeTab === "add" ? "bg-yellow-400" : "bg-blue-600"
              }`}
              onClick={() => handleTabClick("add")}
            >
              Add User
            </button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl w-[80%] mx-auto max-h-[600px] bg-sky-200 mt-8 text-black rounded-lg border-2 border-gray-300 ">
        {activeTab === "all" && (
          <table className="w-full  table-auto  ">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start ">Name</th>
                <th className="px-4 py-2 text-start ">Email</th>
                <th className="px-4 py-2 text-start ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2 ">{user.fname}</td>
                  <td className="px-4 py-2 ">{user.email}</td>
                  <td className="px-4 py-2 ">
                    <Link to={"/editUser"}>
                      <button className="py-1 px-3 bg-yellow-500 text-black rounded-md">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="ml-12 py-1 px-3 border-2 border-red-500  rounded-md"
                      onClick={() => handleTrashUser(user.user_id)}
                    >
                      Trash
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "trash" && (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-start">Name</th>
                <th className="px-4 py-2 text-start">Email</th>
                <th className="px-4 py-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trashedUsers.length > 0 ? (
                trashedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-4 py-2">{user.fname}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <button
                        className="py-1 px-3 bg-green-500 text-white rounded-md"
                        onClick={handleRetrieve(user.user_id)}
                      >
                        Retrieve
                      </button>
                      <button
                        className="ml-2 py-1 px-3 bg-red-500 text-white rounded-md"
                        onClick={handleDelete(user.user_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="p-4 text-gray-500">trash list is empty</p>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
