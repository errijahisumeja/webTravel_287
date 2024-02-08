import React,{useState,useContext,useEffect} from 'react'
import { AuthContext } from '../context/authContext';
import {Link, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function Login() {
  const {login,currentUser} = useContext(AuthContext);
  const [error,setError] = useState(null);
  const navigate = useNavigate()
  

  useEffect(()=>{
    if(currentUser !== null){
      navigate("/");
    }
  },[currentUser])
  
  const [inputs,setInputs] = useState({
    username:"",
    password:""
  })

  const handleChange = (e) => {
    setInputs((prev)=>({...prev, [e.target.name]: e.target.value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      
      await login(inputs);
        navigate("/");

      
    }catch(err){
      console.log(err);
      setError(err.response.data)
    }
  }

  return (
    <section className="h-100" style={{ overflow: 'hidden' }}>
    {currentUser ? (
      <div></div>
    ) : (
      <div className="container-fluid h-75 bg-secondary px-0" >
        <div className="row">
          <div className="col-sm-6 text-dark bg-light">
            <div className="px-5 mt-5 text-center">
              <i className="fas fa-crow fa-4x mb-3" style={{ color: '#4CAF50' }}></i>
              <h1 className="fw-bold mb-5">Travel Time</h1>
            </div>

            <div className="d-flex flex-column align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 mt-xl-n5">
              <form style={{ width: '23rem' }}>
                <h3 className="fw-normal mb-4">Log in</h3>

                <div className="form-outline mb-4">
                  <input
                    id="form2Example18"
                    className="form-control form-control-lg"
                    autoComplete="off"
                    type={'text'}
                    name="username"
                    onChange={handleChange}
                  />
                  <label
                    className={`form-label ${inputs.username ? 'labelFormValueP' : 'labelFormP'}`}
                    htmlFor="form2Example18"
                  >
                    Username
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    id="form2Example28"
                    className="form-control form-control-lg"
                    autoComplete="off"
                    type={'password'}
                    name="password"
                    onChange={handleChange}
                  />
                  <label
                    className={`form-label ${inputs.password ? 'labelFormValueP' : 'labelFormP'}`}
                    htmlFor="form2Example28"
                  >
                    Password
                  </label>
                </div>

                <p className={`mb-4 ${error ? 'text-danger' : 'd-none'}`}>{error}</p>
                <div className="pt-2 mb-4">
                  <button className="btn btn-success btn-lg btn-block" type="button" onClick={handleSubmit}>
                    Login
                  </button>
                </div>

                <p className="mb-0">
                  Don't have an account? <Link className="linkP" to={'/register'}>
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="col-sm-6 px-0 d-none d-sm-block h-45">
            <img
              src="https://i.pinimg.com/736x/34/da/81/34da812b6f798220b0326f43ab2d2c0a.jpg"
              alt="Login image"
              className="h-100 w-100"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    )}
  </section>
  )
}

export default Login