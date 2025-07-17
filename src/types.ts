// src/types.ts
export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  other_names?: string;
  artist_name: string; // Required during creation
  country?: string;
  date_joined?: string;
  last_login?: string;
  image?: string;
  bio?: string;
  website?: string;
  is_active?: boolean;
  followers_count?: number;
  following_count?: number;
}

export interface UserCreate {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  other_names?: string;
  artist_name: string; // Required
  country?: string;
  image?: string;
  bio?: string;
  website?: string;
  is_active?: boolean;
  followers_count?: number;
  following_count?: number;
}

export interface UserUpdate {
  email?: string;
  first_name?: string;
  last_name?: string;
  other_names?: string;
  artist_name?: string;
  country?: string;
  image?: string;
  bio?: string;
  website?: string;
  is_active?: boolean;
  followers_count?: number;
  following_count?: number;
}

export interface Token {
  access_token: string;
  token_type: string;
}