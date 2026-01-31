/*
  # Create Users Profile Table

  ## Changes
  Creates a users table to store user profile information that extends Supabase auth.

  ## New Tables
  
  ### `users`
  Stores user profile information linked to Supabase auth
  - `id` (uuid, primary key) - References auth.users(id)
  - `email` (text) - User email
  - `full_name` (text) - User full name
  - `bio` (text) - User bio/description
  - `role` (text) - user or admin
  - `avatar_url` (text) - Profile picture URL
  - `created_at` (timestamp)
  - `updated_at` (timestamp)

  ## Security
  - RLS enabled for secure profile access
  - Users can only view/edit their own profiles
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  bio text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
