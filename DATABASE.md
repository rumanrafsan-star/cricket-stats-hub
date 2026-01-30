# Cricket Application Database

This document provides an overview of the database setup for the CricketPro application.

## Database Connection

The application is connected to a Supabase PostgreSQL database. The connection is configured in:
- **Client**: `src/lib/supabase.ts`
- **Environment**: `.env` file (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)

## Database Schema

### Tables

#### 1. **teams**
Stores international cricket team information
- `id` (UUID) - Primary key
- `name` (text) - Full team name (e.g., "India")
- `short_name` (text) - Abbreviated name (e.g., "IND")
- `flag` (text) - Team flag emoji
- `color` (text) - Brand color in hex format
- `created_at` (timestamp) - Creation timestamp

#### 2. **players**
Stores cricket player statistics
- `id` (UUID) - Primary key
- `name` (text) - Player full name
- `role` (text) - Batsman, Bowler, All-Rounder, or Wicket-Keeper
- `team` (text) - Team short name
- `matches` (integer) - Number of matches played
- `runs`, `wickets`, `average`, `strike_rate`, `economy` - Statistics
- `price` (numeric) - Fantasy league price
- `image_url` (text) - Optional player image
- `created_at` (timestamp)

#### 3. **matches**
Stores match information and scores
- `id` (UUID) - Primary key
- `team1_id`, `team2_id` (UUID) - Foreign keys to teams
- `status` (text) - live, upcoming, or completed
- `format` (text) - T20, ODI, or Test
- `tournament`, `venue`, `match_date`, `match_time` - Match details
- `team1_runs`, `team1_wickets`, `team1_overs` - Team 1 score
- `team2_runs`, `team2_wickets`, `team2_overs` - Team 2 score
- `result`, `toss` (text) - Match outcome and toss details
- `created_at` (timestamp)

#### 4. **news_articles**
Stores cricket news and updates
- `id` (UUID) - Primary key
- `title`, `excerpt`, `content` (text) - Article content
- `image_url` (text) - Featured image
- `category` (text) - Article category
- `author` (text) - Author name
- `published_at` (timestamp) - Publication date
- `created_at` (timestamp)

#### 5. **fantasy_teams**
Stores user fantasy cricket teams
- `id` (UUID) - Primary key
- `user_id` (UUID) - Optional user identifier
- `name` (text) - Team name
- `player_ids` (jsonb) - Array of player UUIDs
- `captain_id`, `vice_captain_id` (UUID) - Captain selections
- `total_points` (integer) - Fantasy points
- `created_at` (timestamp)

#### 6. **polls**
Stores fan polls and voting
- `id` (UUID) - Primary key
- `question` (text) - Poll question
- `options` (jsonb) - Array of options with vote counts
- `total_votes` (integer) - Total number of votes
- `is_active` (boolean) - Whether poll is active
- `created_at` (timestamp)

#### 7. **poll_votes**
Tracks individual poll votes to prevent duplicates
- `id` (UUID) - Primary key
- `poll_id` (UUID) - Foreign key to polls
- `option_id` (text) - Selected option ID
- `voter_identifier` (text) - Voter session/user identifier
- `created_at` (timestamp)
- UNIQUE constraint on (poll_id, voter_identifier)

## Security (RLS)

Row Level Security (RLS) is enabled on all tables with the following policies:
- **SELECT**: Public read access for all data
- **INSERT/UPDATE**: Public write access (appropriate for public cricket data)

For production use with user-generated content, consider restricting write policies to authenticated users only.

## Database Utilities

Helper functions for common database operations are available in `src/lib/db-utils.ts`:

```typescript
import { dbUtils } from '@/lib/db-utils';

// Get all teams
const teams = await dbUtils.teams.getAll();

// Get players by role
const batsmen = await dbUtils.players.getByRole('Batsman');

// Get live matches
const liveMatches = await dbUtils.matches.getByStatus('live');

// Vote on a poll
await dbUtils.polls.vote(pollId, optionId, voterIdentifier);
```

## Data Seeding

Initial data has been populated including:
- 10 international cricket teams
- 20 cricket players with statistics
- 8 matches (live, upcoming, completed)
- 4 news articles
- 2 active polls

To re-seed the database:
```bash
npx tsx -r dotenv/config src/scripts/seed-database.ts
```

## Migrations

Database migrations are stored in Supabase and can be viewed/modified through the Supabase dashboard.

Applied migrations:
1. `create_cricket_schema` - Initial schema creation
2. `update_rls_policies_for_public_access` - RLS policy updates

## Type Safety

TypeScript types for the database schema are defined in `src/types/database.ts` and provide full type safety when working with Supabase queries.

## Next Steps

To use the database in your application:

1. Import the Supabase client:
```typescript
import { supabase } from '@/lib/supabase';
```

2. Use helper utilities:
```typescript
import { dbUtils } from '@/lib/db-utils';
```

3. Make queries with type safety:
```typescript
const { data, error } = await supabase
  .from('teams')
  .select('*')
  .order('name');
```

All queries return properly typed data based on the Database schema.
