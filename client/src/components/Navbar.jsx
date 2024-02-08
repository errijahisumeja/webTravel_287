import React, {useState,useEffect,useContext} from 'react';
import { AuthContext } from '../context/authContext';
import { Link} from 'react-router-dom';
import Sidebar from './Sidebar';
import "../styles/navbar.css";
import axios from 'axios';

function Navbar() {
  const {currentUser} = useContext(AuthContext);
  const [img, setImg] = useState("");

  useEffect(()=>{
    const getUser = async() => {
      const res = await axios.get(`/users/${currentUser.id}`);
      setImg(res.data.img);
    }
    getUser();
  },[currentUser])

  let showAvatar = () => {
    if(currentUser){
      if(img){
        return <Link to={"/profile"} className="linkNavbar-profile" > <img className='profile-image'  src={`../upload/${img}`} alt="u.i"/></Link>
      }else{
        return <Link to={"/profile"} className="linkNavbar-img" > <p className='profile-image'/> </Link>
      }
    }else{
      return null
    }
  }

  return (
    <div className='navbar'>
      <div className='loginRegister'>
        {currentUser? null :  <Link to={"/login"} className="linkNavbar" >Log in</Link>} 
        {currentUser? null : <Link to={"/register"} className="linkNavbar" >Register</Link> }
        {showAvatar()}
      </div>
      
      <div  id="outer-container">
        <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
      </div>
    </div>
  )
}

export default Navbar