import React from 'react';
import '../styles/userCard.css';

function UserCard({ user }) {
  return (
    <div className='card border-primary mb-3'>
      <div className='card-header p-3 mb-2 custom-bg-indigo text-white'>
        <h2>{user.username}</h2>
      </div>
      <div className='card-body'>
        <p className='card-text'>ID: {user.id}</p>
        <p className='card-text'>Email: {user.email}</p>
        <p className='card-text'>Status: {user.status}</p>
        <p className='card-text'>Role: {user.is_admin}</p>
      </div>
    </div>
  );
}

export default UserCard;
