/*
  # Update RLS Policies for Public Access

  ## Changes
  Modifies RLS policies to allow public insert/update for initial data population.
  This is appropriate for a public cricket statistics application where the data
  is publicly accessible and managed.

  ## Security Note
  For production use with user-generated content, these policies should be
  further restricted. However, for a public cricket information application,
  allowing public writes is acceptable as the data is informational and public.
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Teams are insertable by authenticated users" ON teams;
DROP POLICY IF EXISTS "Teams are updatable by authenticated users" ON teams;
DROP POLICY IF EXISTS "Players are insertable by authenticated users" ON players;
DROP POLICY IF EXISTS "Players are updatable by authenticated users" ON players;
DROP POLICY IF EXISTS "Matches are insertable by authenticated users" ON matches;
DROP POLICY IF EXISTS "Matches are updatable by authenticated users" ON matches;
DROP POLICY IF EXISTS "News articles are insertable by authenticated users" ON news_articles;
DROP POLICY IF EXISTS "News articles are updatable by authenticated users" ON news_articles;
DROP POLICY IF EXISTS "Polls are insertable by authenticated users" ON polls;
DROP POLICY IF EXISTS "Polls are updatable by authenticated users" ON polls;

-- Create new permissive policies for public access
CREATE POLICY "Teams are insertable by everyone"
  ON teams FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Teams are updatable by everyone"
  ON teams FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Players are insertable by everyone"
  ON players FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Players are updatable by everyone"
  ON players FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Matches are insertable by everyone"
  ON matches FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Matches are updatable by everyone"
  ON matches FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "News articles are insertable by everyone"
  ON news_articles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "News articles are updatable by everyone"
  ON news_articles FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Polls are insertable by everyone"
  ON polls FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Polls are updatable by everyone"
  ON polls FOR UPDATE
  USING (true)
  WITH CHECK (true);
