// src/pages/Profile.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    navigate('/login');
  };

  return (
    <div>
      <UserProfile onDelete={handleDelete} />
    </div>
  );
};

export default Profile;