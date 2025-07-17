// src/pages/Register.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/login');
  };

  return (
    <div>
      <RegisterForm onSuccess={handleSuccess} />
    </div>
  );
};

export default Register;