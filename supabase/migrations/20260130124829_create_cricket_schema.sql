/*
  # Cricket Application Database Schema

  ## Overview
  Creates the complete database structure for a professional cricket statistics and fantasy platform.

  ## New Tables Created
  
  ### 1. `teams`
  Stores international cricket teams
  - `id` (uuid, primary key)
  - `name` (text, unique) - Full team name
  - `short_name` (text, unique) - Abbreviated name (e.g., IND, AUS)
  - `flag` (text) - Flag emoji
  - `color` (text) - Team brand color
  - `created_at` (timestamptz)

  ### 2. `players`
  Stores cricket player information and statistics
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `role` (text, not null) - Batsman, Bowler, All-Rounder, Wicket-Keeper
  - `team` (text, not null)
  - `matches` (integer, default 0)
  - `runs` (integer, default 0)
  - `wickets` (integer, default 0)
  - `average` (numeric, default 0)
  - `strike_rate` (numeric, default 0)
  - `economy` (numeric)
  - `price` (numeric) - Fantasy league price
  - `image_url` (text)
  - `created_at` (timestamptz)

  ### 3. `matches`
  Stores match information
  - `id` (uuid, primary key)
  - `team1_id` (uuid, foreign key to teams)
  - `team2_id` (uuid, foreign key to teams)
  - `status` (text) - live, upcoming, completed
  - `format` (text) - T20, ODI, Test
  - `tournament` (text)
  - `venue` (text)
  - `match_date` (date)
  - `match_time` (time)
  - `team1_runs` (integer)
  - `team1_wickets` (integer)
  - `team1_overs` (numeric)
  - `team2_runs` (integer)
  - `team2_wickets` (integer)
  - `team2_overs` (numeric)
  - `result` (text)
  - `toss` (text)
  - `created_at` (timestamptz)

  ### 4. `news_articles`
  Stores cricket news and updates
  - `id` (uuid, primary key)
  - `title` (text, not null)
  - `excerpt` (text, not null)
  - `content` (text)
  - `image_url` (text)
  - `category` (text, not null)
  - `author` (text, not null)
  - `published_at` (timestamptz)
  - `created_at` (timestamptz)

  ### 5. `fantasy_teams`
  Stores user fantasy teams
  - `id` (uuid, primary key)
  - `user_id` (uuid) - For future auth integration
  - `name` (text, not null)
  - `player_ids` (jsonb) - Array of player IDs
  - `captain_id` (uuid)
  - `vice_captain_id` (uuid)
  - `total_points` (integer, default 0)
  - `created_at` (timestamptz)

  ### 6. `polls`
  Stores fan polls
  - `id` (uuid, primary key)
  - `question` (text, not null)
  - `options` (jsonb) - Array of {id, text, votes}
  - `total_votes` (integer, default 0)
  - `is_active` (boolean, default true)
  - `created_at` (timestamptz)

  ### 7. `poll_votes`
  Tracks individual poll votes
  - `id` (uuid, primary key)
  - `poll_id` (uuid, foreign key to polls)
  - `option_id` (text, not null)
  - `voter_identifier` (text) - Could be user_id or session_id
  - `created_at` (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Public read access for most tables (typical for public sports data)
  - Write access restricted for future authenticated users
  - Poll votes tracked to prevent duplicate voting
*/

-- Teams Table
CREATE TABLE IF NOT EXISTS teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  short_name text UNIQUE NOT NULL,
  flag text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Teams are viewable by everyone"
  ON teams FOR SELECT
  USING (true);

CREATE POLICY "Teams are insertable by authenticated users"
  ON teams FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Teams are updatable by authenticated users"
  ON teams FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Players Table
CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL CHECK (role IN ('Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper')),
  team text NOT NULL,
  matches integer DEFAULT 0,
  runs integer DEFAULT 0,
  wickets integer DEFAULT 0,
  average numeric(5,2) DEFAULT 0,
  strike_rate numeric(5,2) DEFAULT 0,
  economy numeric(4,2),
  price numeric(4,1),
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Players are viewable by everyone"
  ON players FOR SELECT
  USING (true);

CREATE POLICY "Players are insertable by authenticated users"
  ON players FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Players are updatable by authenticated users"
  ON players FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Matches Table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team1_id uuid REFERENCES teams(id),
  team2_id uuid REFERENCES teams(id),
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('live', 'upcoming', 'completed')),
  format text NOT NULL CHECK (format IN ('T20', 'ODI', 'Test')),
  tournament text NOT NULL,
  venue text NOT NULL,
  match_date date NOT NULL,
  match_time time,
  team1_runs integer,
  team1_wickets integer,
  team1_overs numeric(4,1),
  team2_runs integer,
  team2_wickets integer,
  team2_overs numeric(4,1),
  result text,
  toss text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Matches are viewable by everyone"
  ON matches FOR SELECT
  USING (true);

CREATE POLICY "Matches are insertable by authenticated users"
  ON matches FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Matches are updatable by authenticated users"
  ON matches FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- News Articles Table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text,
  image_url text,
  category text NOT NULL,
  author text NOT NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "News articles are viewable by everyone"
  ON news_articles FOR SELECT
  USING (true);

CREATE POLICY "News articles are insertable by authenticated users"
  ON news_articles FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "News articles are updatable by authenticated users"
  ON news_articles FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Fantasy Teams Table
CREATE TABLE IF NOT EXISTS fantasy_teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  player_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  captain_id uuid,
  vice_captain_id uuid,
  total_points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE fantasy_teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Fantasy teams are viewable by everyone"
  ON fantasy_teams FOR SELECT
  USING (true);

CREATE POLICY "Fantasy teams are insertable by everyone"
  ON fantasy_teams FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Fantasy teams are updatable by their creator"
  ON fantasy_teams FOR UPDATE
  USING (user_id IS NULL OR auth.uid() = user_id)
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- Polls Table
CREATE TABLE IF NOT EXISTS polls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  options jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_votes integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE polls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Polls are viewable by everyone"
  ON polls FOR SELECT
  USING (true);

CREATE POLICY "Polls are insertable by authenticated users"
  ON polls FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Polls are updatable by authenticated users"
  ON polls FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Poll Votes Table
CREATE TABLE IF NOT EXISTS poll_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  poll_id uuid REFERENCES polls(id) ON DELETE CASCADE,
  option_id text NOT NULL,
  voter_identifier text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(poll_id, voter_identifier)
);

ALTER TABLE poll_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Poll votes are viewable by everyone"
  ON poll_votes FOR SELECT
  USING (true);

CREATE POLICY "Poll votes are insertable by everyone"
  ON poll_votes FOR INSERT
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_players_team ON players(team);
CREATE INDEX IF NOT EXISTS idx_players_role ON players(role);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(match_date);
CREATE INDEX IF NOT EXISTS idx_news_category ON news_articles(category);
CREATE INDEX IF NOT EXISTS idx_news_published ON news_articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_poll_votes_poll ON poll_votes(poll_id);
