import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import '../styles/Europe.css';
import axios from 'axios';


function Zimska() {
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState('');
  const cat = 'Zimska';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/trips?cat=${cat}`);
        setTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData2 = async () => {
      try {
        const res = await axios.get(`/trips/search/?cat=${cat}&title=${title}`);
        setTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (title === '') {
      fetchData();
    } else {
      fetchData2();
    }
  }, [title]);

  return (
    <div className='home-body'>
      <div className='col-md-6 offset-md-3 mt-5'>
        <input
          className='search'
          type={'text'}
          placeholder='Search by title...'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='landing-container'>
        <div>
          <div className='card-flex'>
            {trips?.map((trip) => (
              <Card key={trip.id}>{trip}</Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Zimska;