// src/components/UserSearch.tsx
import React, { useState, FormEvent } from 'react';
import { searchUsers } from '../data/api';
import { User } from '../types';

interface UserSearchProps {
  onSearchResults: (users: User[]) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearchResults }) => {
  const [email, setEmail] = useState('');
  const [artistName, setArtistName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const users = await searchUsers(email, artistName);
      onSearchResults(users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Artist Name:</label>
          <input
            type="text"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading || (!email && !artistName)}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default UserSearch;