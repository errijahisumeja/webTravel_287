import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/authContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Menu from '../components/Menu';
import moment from 'moment';
import '../styles/single.css';


function SingleWithComments() {
  const location = useLocation();
  const tripId = location.pathname.split('/')[2];
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [trip, setTrip] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [reservationStatus, setReservationStatus] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/trips/${tripId}`);
      
        setTrip(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();

    const fetchReservationStatus = async () => {
      try {
        const res = await axios.get(`/reservations/${tripId}`);
        
        if (res.data.userId == currentUser.id && res.data.tripId == tripId){
          setReservationStatus(true)
         
        }else{
          setReservationStatus(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchReservationStatus();

  }, [tripId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/trips/${tripId}`);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${tripId}`);
        setComments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    try {
      if (!currentUser) {
        console.log('User not logged in');
        alert("Log in first!")
        return;
      }


      const response = await axios.post(`/comments/${tripId}`, {
        content: newComment,
        userId: currentUser.id,
        tripId: tripId
       
      });

      console.log('Response from server:', response.data);

      const commentsResponse = await axios.get(`/comments/${tripId}`);
      setComments(commentsResponse.data);


      setNewComment('');

      console.log('Comment added successfuly!');
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleCommentDelete = async (commentId) => {
    try {
      await axios.delete(`/comments/${tripId}/${commentId}`);
      window.location.reload();
    } catch (err) {
      console.log("Error: "+err);
    }
  };

  const handleReservationToggle = async () => {
    try {
      if (!currentUser) {
        console.log('Korisnik nije prijavljen.');
        alert("Prijavite se da biste mogli rezervisati ili otkazati putovanje!");
        return;
      }
      if (reservationStatus == false){
        await axios.post(`/reservations/${tripId}`, {
          userId: currentUser.id,
          tripId: tripId,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        });
        alert('Uspješno ste rezervisali putovanje.');
      }
      setReservationStatus(!reservationStatus);
    } catch (error) {
      console.error('Greška prilikom rezervacije!:', error);
    }
  };
      



  
  

  return (
    <div className="main-container">
      <div className='main-box-single'>
        <h1 className='title-single'>{trip.title}</h1>
        <div className='content-box-single'>
          <div className='user-info'>
            <img className='img-single' src={`../upload/${trip?.img || ''}`} alt="img here" />
            <div className='description-single'>
              
              <p>{trip?.desc}</p>
            </div>

            <div className='trip-info'>
              
              <div className='avatar-text-single'>
                <p>Published {moment(trip.date).fromNow()}</p>
                <p> {trip.username}</p>
              </div>
              
            </div>
            <p>Price: {trip?.price}</p>
              <p>Trip date: {trip?.tripDate}</p>

            {currentUser?.username === trip.username && (
              <div className='user-actions'>
                <Link className='button-single' to={`/write?edit=${tripId}`} state={trip}>
                  Edit
                </Link>
                <Link className='button-delete-single' onClick={handleDelete}>Delete</Link>
              </div>
            )}
            {currentUser && currentUser?.is_admin !== "admin" && (
            <div>
              <button onClick={handleReservationToggle}>
               
                {reservationStatus ? 'Reserved' : 'Make reservation'}
              </button>
            </div>
          )}
          </div>
        </div>
        <div className='recomendations'>
          <Menu cat={trip.cat} />
        </div>
      </div>

      <div className="Forum">
        <div>
          <h2 className="headingForum">Comments</h2>
          <div>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write a comment..."
            />
            <button onClick={handleCommentSubmit}>Submit</button>
          </div>
          <div>
            {comments.map((comment) => (
              
              <div key={comment.id}>
               
                
                <div className="user">
                  
                  <div className="profile_picture">
                    {comment.userImg && (
                      <img
                        className="avatar-single"
                        src={`../upload/${comment.userImg}` || ''}
                        alt="user image"
                      />
                    )}
                  </div>
                  <div className="username">
                    <span>{comment.username}</span>
                  </div>
                  <br />
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
               
                {comment.userId == currentUser?.id && (
                  
                  <div className="user-actions">
                    <Link className="button-delete-single"
                      onClick={() => handleCommentDelete(comment.id)}>
                      Delete
                    </Link> 
                  </div>
                )}
                {currentUser?.is_admin == "admin" && comment.userId != currentUser.id && (
                      <Link
                      className="button-delete-single"
                      onClick={() => handleCommentDelete(comment.id)}
                    >
                      Delete
                    </Link>
                    )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleWithComments;
