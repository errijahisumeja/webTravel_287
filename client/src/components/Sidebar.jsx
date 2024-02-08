import React, {useState,useEffect,useContext}  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { slide as Menu } from 'react-burger-menu';
import "../styles/navbar.css";
import axios from 'axios';

function Sidebar() {
  const { currentUser, logout, isAdmin } = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();
  
  const logOutUser = () => {
    logout();
    navigate("/");
  }
  
  useEffect(()=>{
    const getUser = async() => {
      const res = await axios.get(`/users/${currentUser.id}`);
      setUsername(res.data.username);
    }
    getUser();
  },[currentUser])

  return (
    <Menu>
    <div className='margin-space'></div>
    
      {currentUser ? <>
        <p className='link-title text-dark'> WELCOME  </p> 
        <p className='link-title-name text-dark'>{username ? username : currentUser?.username }</p>
      </> : null}
      <Link className='link-sideBar' to="/"><p>HOME</p></Link>
      
      {isAdmin() ? 
        <div>
          <Link className="link-sideBar" to="/write"> <p>ADD NEW TRIP</p></Link>
        </div> : null}

        {isAdmin() ? 
        <div>
          <Link className="link-sideBar" to="/users"> <p>SHOW ALL USERS</p></Link>
        </div> : null}

      {currentUser ? <div>
        <Link className='link-sideBar' to="/profile"><p>PROFILE</p></Link>
      </div> : null}

      {!isAdmin() && currentUser ? <div>
        <Link className='link-sideBar' to="/reservations"><p>RESERVATIONS</p></Link>
      </div> : null}

      {currentUser? <span onClick={logOutUser} className="link-sideBar" >LOG OUT</span> :  null} 
      <div className='margin-space'></div>

      <ul>
      <div className='title-sideBar'><p>TRIPS</p></div>
      </ul>
      <ul>
      <li><Link className='link-sideBar' to="/Asia"><p>ASIA</p></Link></li>
        <li><Link className='link-sideBar' to="/Africa"><p>AFRICA</p></Link></li>
        <li><Link className='link-sideBar' to="/Europe"><p>EUROPE</p></Link></li>
        <li><Link className='link-sideBar' to="/Summer"><p>SUMMER TRIPS</p></Link></li>
        <li><Link className='link-sideBar' to="/Winter"><p>WINTER TRIPS</p></Link></li>
        <li><Link className='link-sideBar' to="/History"><p>HISTORICAL TRIPS</p></Link></li>
        <li><Link className='link-sideBar' to="/Nature"><p>NATURAL WONDERS</p></Link></li>
      </ul>
        
    </Menu>
  )
}

export default Sidebar