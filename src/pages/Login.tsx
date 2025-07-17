// src/pages/Login.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/profile');
  };

  return (
    <div>
      <LoginForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Login;