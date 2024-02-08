import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Card from '../components/Card';
import axios from 'axios';
import '../styles/Europe.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
  const [onlyCat, setOnlyCat] = useState('');
  const [trips, setTrips] = useState([]);
  const [title, setTitle] = useState('');
  const cat = useLocation().search;

  useEffect(() => {
    let onlyCatArry = cat.split('=');
    setOnlyCat(onlyCatArry[1]);
  }, [cat]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/trips${cat}`);
        setTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchData2 = async () => {
      let getCat = () => {
        if (onlyCat === undefined) {
          return cat;
        } else {
          return onlyCat;
        }
      };

      try {
        const res = await axios.get(`/trips/search/?cat=${getCat()}&title=${title}`);
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
  }, [cat, title]);

  return (
    <div className='container-fluid home-body'>
      
      <div className='row baner-elements'>
        <div className='col-md-6 offset-md-3 mt-5'>
        <input
          className='search'
          type={'text'}
          placeholder='Search by title...'
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      </div>

      <div className='container mt-4'>
        <div className='row'>
          <TransitionGroup className='card-flex'>
            {trips.map((trip) => (
              <CSSTransition key={trip.id} timeout={500} classNames='fade'>
                <div className='col-md-4 mb-4'>
                  <Card className='card-hover'>{trip}</Card>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    </div>
  );
}

export default Home;
