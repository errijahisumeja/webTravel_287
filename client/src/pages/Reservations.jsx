import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../context/authContext";
import '../styles/Europe.css';
import axios from 'axios';
import moment from 'moment';

function Reservations() {

    const [reservations, setReservations] = useState([]);
    const { currentUser } = useContext(AuthContext);    
    const id = currentUser.id
    
      useEffect(() => {
        const fetchReservations = async () => {
          try {
            const res = await axios.get(`/reservations/${id}`);
            setReservations(res.data)
            console.log(res)
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchReservations();
      }, []);


      return (
        <div className='container mt-5'>
        <h1 className='mb-4'>Your Reservations</h1>
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>Trip title</th>
                    <th scope='col'>Trip Date</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation, index) => (
                    <tr key={index}>
                        <td>{reservation.title}</td>
                        <td>{moment(reservation.tripDate).format('D/MM/YYYY')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
      );
}

export default Reservations;
