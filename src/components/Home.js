import { useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useState } from 'react';

const options = [
    'none','Admin', 'User'
  ];
  const defaultOption = options[0];

export const Home = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [selectedRole,setselectedRole] = useState('');
console.log(auth.user,auth.password,'Home');

    const handleClick = () => {
        navigate('/contentProperties',{state : {role:selectedRole}});
      }
      const handleLogout = () => {
        navigate('/');
      }
  return (
    <>
    <div style={{display:'flex',flexDirection:'row',margin:'30px'}}>
      <div style={{fontWeight:'bold'}}>Select Role  </div>
      <div style={{width:'80',marginLeft:'10px'}}>
      <Dropdown options={options} onChange={(item) => setselectedRole(item)} value={defaultOption} placeholder="Select an option" />
      </div>
    
      <div>
      Welcome {auth.user} <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
      <button style={{height:'50px',margin:'30px'}} onClick={handleClick}>
      Content Properties
    </button>
    </>
  )
}
