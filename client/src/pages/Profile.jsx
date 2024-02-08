import React, {useEffect, useContext, useState} from 'react'
import { AuthContext } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import validator from "validator";
import "../styles/profile.css";
import axios from 'axios';

function Profile() {
  
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const {currentUser, deletedUser} = useContext(AuthContext);
  const [id, setId] = useState(currentUser.id);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const hiddenFileInput = React.useRef(null);
  const [email, setEmail] = useState("");
  const [error,setError] = useState("");
  const [file, setFile] = useState(""); 
  const navigate = useNavigate()

  useEffect(()=>{
    if(currentUser == null){
      navigate("/");
    }
  },[currentUser])

  useEffect(()=>{
    const getUser = async() => {
      const res = await axios.get(`/users/${currentUser.id}`);
      console.log( res.data);
      setUsername(res.data.username);
      setEmail(res.data.email);
    }
    getUser();
  },[]) 

  const validateEmail = (e) => {
    if (validator.isEmail(e)) {
      setError(" ");
      setEmail(e)
    } else {
    setError("Enter valid email!");
    }
  };
    
  const uplaod = async () => {
    if(file !== null){
      try {
        const formData = new FormData();
        formData.append("file", file)
        const res = await axios.post("/upload", formData);
        console.log("in upload " + res.data)
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handelImage = async() =>{
    const imgUrl = await uplaod();
    try{
      await axios.put(`/users/user-image-upload/${currentUser.id}`, {
        img: file ? imgUrl : ""
      })
      handelRefresh();
    }catch(err){
      console.log(err);
    }
  }

  const handelDelete = async() => {
    try{
      await axios.delete(`/users/${currentUser.id}`);
      deletedUser();
      navigate("/") 
    }catch(err){
      console.log(err);
      alert('Error!');
    }
  }

  const handelClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${currentUser.id}`, {
        username, 
        email, 
      });
      handelRefresh();
    } catch (err) {
      console.log(err);
    }
  }

  const handelClickPassword = async (e) => {
    e.preventDefault();
    try {
      if(newPassword !== ConfirmNewPassword){
        setError("Passwords must be the same!")
      }else{
        await axios.put(`/users/password-change/${currentUser.id}`, {
          username, 
          password,
          newPassword,
          id,
        });
        handelRefresh();
        alert('Password changed successfuly!');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handelRefresh = () => {
    window.location.reload();
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  return (
    <div className='container mt-5'>
      {currentUser ? (
        <div className='row justify-content-center'>
          <div className='col-md-8'>
            <h1 className='text-center mb-4'>Profile</h1>
            <form>
              <div className='form-group'>
                <label>Username</label>
                <input
                  type='text'
                  className='form-control'
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              </div>
              <div className='form-group'>
                <label>Email</label>
                
                <input
                  type='email'
                  className='form-control'
                  onChange={(e) => validateEmail(e.target.value)}
                  value={email}
                />
              </div>
              <button className='btn btn-primary' onClick={handelClick}>
                Submit
              </button>
            </form>

            <h2 className='mt-4'>Update your profile picture</h2>
            <div className='form-group'>
              <button className='btn btn-primary mr-7' onClick={handleClick}>
                Choose picture
              </button>
              <input
                ref={hiddenFileInput}
                style={{ display: 'none' }}
                type='file'
                onChange={(e) => setFile(e.target.files[0])}
              />
              {file ? <p className='image-text'>{file.name}</p> : null}
             {file ? <button className='btn btn-primary ms-7' onClick={handelImage}>
                Submit
              </button> : null}

            </div>
           
            <h2 className='mt-4'>Submit password</h2>
            <div className='form-group'>
              {error && <p className='text-danger'>{error}</p>}
              <input
                type='password'
                className='form-control'
                placeholder='Old password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                type='password'
                className='form-control'
                placeholder='New password'
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              <input
                type='password'
                className='form-control'
                placeholder='Enter again your new password'
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                value={ConfirmNewPassword}
              />
              <button className='btn btn-primary mt-2' onClick={handelClickPassword}>
                Potvrdi
              </button>
            </div>

            <h2 className='mt-4'>Delete profile</h2>
            <button className='btn btn-danger' onClick={handelDelete}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Profile