import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/write.css";
import moment from "moment";
import axios from "axios";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

function Write() {
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || null);
  const [price, setPrice] = useState(state?.price || null);
  const [tripDate, setTripDate] = useState(state?.tripDate || null);
  const [value, setValue] = useState(state?.desc || null);
  const [cat, setCat] = useState(state?.cat || null);
  const { currentUser } = useContext(AuthContext);
  const hiddenFileInput = React.useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    }
  }, [currentUser]);

  const uplaod = async () => {
    if (file !== null) {
      try {
        console.log("flag1 ");
        const formData = new FormData();
        console.log("flag2 ");
        formData.append("file", file);
        console.log("flag3 ");
        const res = await axios.post("/upload", formData);
        console.log("in upload " + res.data);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await uplaod();
    try {
      state
        ? await axios.put(`/trips/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state?.img,
          price,
          tripDate
        })
        : await axios.post(`/trips/`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : null,
          price,
          tripDate,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Cannot be empty fields!");
    }
  };

  const handleClick1 = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div className="container mt-5">
      {currentUser ? (
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="title-write">ADD NEW TRIP</h1>
            <div className="form-group">
              <label className="label-write">Title</label>
              <input
                className="form-control"
                type={"text"}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="form-group">
              <label className="label-write">Description</label>
              <textarea
                className="form-control"
                type={"text"}
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </div>
            <div className="form-group">
              <label className="label-write">Category</label>
              <select
                className="form-control"
                onChange={(e) => setCat(e.target.value)}
                value={cat}
              >
                <option value={null}>Choose categroy:</option>
                <option value={"Evropa"}>Europe</option>
                <option value={"Azija"}>Asia</option>
                <option value={"Afrika"}>Africa</option>
                <option value={"Ljetna putovanja"}>Summer trips</option>
                <option value={"Zimska"}>Winter trips</option>
                <option value={"Historijska putovanja"}>Historical trips</option>
                <option value={"Prirodna cuda"}>Natural wonders</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label-write">Picture</label>
              <div className="d-flex align-items-center">
                <button onClick={handleClick1} className="btn btn-primary">
                  Add picture
                </button>
                <input
                  ref={hiddenFileInput}
                  style={{ display: "none" }}
                  type={"file"}
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file && <p className="image-text">{file.name}</p>}
              </div>
            </div>
            <p className="error-write">{error}</p>
            <div className="form-group">
              <label className="label-write">Price</label>
              <input
                className="form-control"
                type={"text"}
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <div>
              <label className="label-write">Trip date</label><br/>
              <DatePicker
                className="form-control-date"
                selected={tripDate}
                onChange={(date) => setTripDate(date)
                }
              />
            </div>
            <div className="form-group">
              <button className="btn btn-success" onClick={handleClick}>
                Publish
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Write;
