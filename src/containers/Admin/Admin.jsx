import React, { useEffect, useState } from "react";
import UserService from "../../_services/UserService";
import TokenStorageService from "../../_services/TokenStorageService";
import { Navigate, useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();
  const token = TokenStorageService.getToken();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers(token);
  }, []);

  // functions definition
  const getAllUsers = async (token) => {
    try {
      const res = await UserService.getAllUsers(token);
      setUsers(res.data.data);
    } catch (error) {
      console.log(error.message || error);
    }
  };

  const handleLogout = () => {
    TokenStorageService.logOut();
    navigate("/");
  };
  const handleDelete = async(userToDelete) => {
    const res = await UserService.deleteUser(userToDelete);
    console.log(res);
    await getAllUsers(token);
    console.log(users);
  }
  

  

  return (
    <div>
      <h2>admin</h2>
      <h1>12</h1>

      <div>
        {users?.map((user) => (
          <div key={user._id}>
            <ol>
              <li>{user.name}</li>
              <li>{user.email}</li>
              <li>{user.role}</li>
            </ol>
            <div className="admin-buttons">
                <button onClick={()=>{handleDelete(user)}} className='delete-user'>borrar</button>
              </div>
          </div>
        ))}
      </div>

      <button onClick={handleLogout}>Logout </button>
    </div>
  );
}
