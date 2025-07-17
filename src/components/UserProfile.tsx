// src/components/UserProfile.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { getCurrentUser, updateUser, deleteUser } from '../data/api';
import { User, UserUpdate } from '../types';

interface UserProfileProps {
  onDelete: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onDelete }) => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserUpdate>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
        setFormData({
          email: userData.email,
          first_name: userData.first_name,
          last_name: userData.last_name,
          artist_name: userData.artist_name,
        });
      } catch (err) {
        setError(err.message);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const updatedUser = await updateUser(user.id, formData);
      setUser(updatedUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      await deleteUser(user.id);
      onDelete();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>Your Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleUpdate}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Artist Name:</label>
          <input
            type="text"
            name="artist_name"
            value={formData.artist_name || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name || ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Account'}
      </button>
    </div>
  );
};

export default UserProfile;