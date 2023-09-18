import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import classes from './manageUsers.module.css';

const AddUsers = () => {
   const [fullname, setFullname] = useState("");
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [branch, setBranch] = useState("");
   const [userLevel, setUserLevel] = useState("");
   const [password, setPassword] = useState("");
   const [token, setToken] = useState("");
   const [users, setUsers] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");

   const navigate = useNavigate();

   useEffect(() => {
      // Manually set a valid token here for testing
      const validToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTNlODUzNzM1YzlhNWMxMGRhYjdlMyIsImlhdCI6MTY5NDAyOTEzMywiZXhwIjoxNjk2NjIxMTMzfQ.sn1qmW_tCV10Uqv3No9k2y_hjOtjYhZjjOYS0Rh-mq4";
      setToken(validToken);
      
      // Fetch existing users when the component mounts
      fetchExistingUsers(validToken);
   }, []);

   const fetchExistingUsers = async (token) => {
      try {
         const res = await fetch(`http://localhost:8000/api/users/all`, {
            headers: {
               "Authorization": `Bearer ${token}`
            },
            method: "GET",
         });
         if (!res.ok) {
            throw new Error(`Failed to fetch existing users: ${res.status}`);
         }
         const existingUsers = await res.json();
         setUsers(existingUsers);
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleCreateUsers = async (e) => {
      e.preventDefault();
      try {
         if (!token) {
            throw new Error("Token is missing.");
         }

         const res = await fetch(`http://localhost:8000/api/users`, {
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
               fullname,
               email,
               username,
               branch,
               userLevel,
               password,
            })
         });

         if (!res.ok) {
            throw new Error(`Failed to create user: ${res.status}`);
         }

         const newUserData = await res.json();
         setUsers([...users, newUserData]);
         alert("Preferred User added Successfully");
         setFullname("");
         setEmail("");
         setUsername("");
         setBranch("");
         setUserLevel("");
         setPassword("");
         fetchExistingUsers(token);
      } catch (error) {
         console.error(error.message);
      }
   }

   const handleRemoveUser = async (userid) => {
      try {
         const res = await fetch(`http://localhost:8000/api/users/${userid}`, {
            headers: {
               "Authorization": `Bearer ${token}`
            },
            method: "DELETE",
         });
         const result = await res.json();
         alert("User removed Successfully");
         fetchExistingUsers(token); // Refresh the list of existing Users
      } catch (error) {
         console.error(error.message);
      }
   }   

   const handleSearch = (e) => {
      setSearchTerm(e.target.value);
   }

   const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
   );

   return (
      <div className={classes.container}>
         <div className={classes.wrapper}>
            <h2 className={classes.title}>Manage Courses</h2>
            <form onSubmit={handleCreateUsers} encType="multipart/form-data">
               <div className={classes.inputWrapper}>
                  <label>Full Name:</label>
                  <input type="text" placeholder="Enter Full Name" className={classes.input}
                     value={fullname} onChange={(e) => setFullname(e.target.value)} />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Email:</label>
                  <input type="email" placeholder="Enter Email Address" className={classes.input}
                     value={email} onChange={(e) => setEmail(e.target.value)} />
               </div>

               <div className={classes.inputWrapper}>
                  <label>User Name:</label>
                  <input type="text" placeholder="Enter User Name" className={classes.input}
                     value={username} onChange={(e) => setUsername(e.target.value)} />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Branch:</label>
                  <input type="text" placeholder="Enter Branch" className={classes.input}
                     value={branch} onChange={(e) => setBranch(e.target.value)} />
               </div>

               <div className={classes.inputWrapper}>
                  <label>User Level:</label>
                  <input type="text" placeholder="Enter User Level" className={classes.input}
                     value={userLevel} onChange={(e) => setUserLevel(e.target.value)} />
               </div>

               <div className={classes.inputWrapper}>
                  <label>Password:</label>
                  <input type="password" placeholder="Enter Password" className={classes.input}
                     value={password} onChange={(e) => setPassword(e.target.value)} />
               </div>

               <div className={classes.buttonWrapper}>
                  <button type="submit" className={classes.submitBtn}>
                     Create User
                  </button>
               </div>
            </form>

            <div className={classes.searchBar}>
               <input
                  type="text"
                  placeholder="Search Users"
                  value={searchTerm}
                  onChange={handleSearch}
               />
            </div>

            <table className={classes.userTable}>
               <thead>
                  <tr>
                     <th>Full Name</th>
                     <th>Email</th>
                     <th>Username</th>
                     <th>Branch</th>
                     <th>User Level</th>
                     <th>Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredUsers.map(user => (
                     <tr key={user.id}>
                        <td>{user.fullname}</td>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.branch}</td>
                        <td>{user.userLevel}</td>
                        <td>
                           <button onClick={() => handleRemoveUser(user.id)}>
                              Remove
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default AddUsers;
