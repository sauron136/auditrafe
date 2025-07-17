// src/pages/Search.tsx
import React, { useState } from 'react';
import UserSearch from '../components/UserSearch';
import UserList from '../components/UserList';
import { User } from '../types';

const Search: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <div>
      <UserSearch onSearchResults={setUsers} />
      <UserList users={users} />
    </div>
  );
};

export default Search;