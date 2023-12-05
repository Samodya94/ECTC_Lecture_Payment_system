import { useState } from 'react';
import axios from 'axios';
import { useLecAuthContext } from '../../hooks/useLecAuthContext';


export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [ msg, setMsg] = useState('')
  const { lecturer } = useLecAuthContext();

  const handleChangePassword = async (e) => {
    e.preventDefault();

   if(lecturer){
     // Check if the new password and confirm password match
     if (newPassword !== confirmPassword) {
        setError('New password and confirm password must match');
        return;
      }
  
      try {
        const lecid = lecturer.id
        const response = await axios.post('http://localhost:8000/api/lecturer/change-password', { oldPassword, newPassword, lecid });
        setMsg("Password changed successfully")
        console.log(response.data); // Handle success
      } catch (err) {
        setMsg("");
         setError(err.message); // Handle error
          console.log(err.message)
      }
   }
  };

  return (
    <div className="change_password">
      <form  onSubmit={handleChangePassword}>
      <div className="my-2">
                <div>Current Password :</div>
        <input type="password"
          className='form-control'
         value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
      </div>
      <div className="my-2">
                <div>New Password :</div>
        <input type="password" 
        className='form-control'
        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <div className="my-2">
                <div>Confirm Password :</div>
        <input 
        className='form-control'
        type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      {msg && <div className='error'>{msg}</div>}
      {error && <div className='error'>{error}</div>}
      <div className="m-2"><button className="btn btn-primary" type="submit">Change Password</button></div>
    </form>
    </div>
    
  );
};

