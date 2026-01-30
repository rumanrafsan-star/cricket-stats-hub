// Cricket Types

export interface Team {
  id: string;
  name: string;
  shortName: string;
  flag: string;
  color: string;
}

export interface Player {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  team: string;
  stats: {
    matches: number;
    runs: number;
    wickets: number;
    average: number;
    strikeRate: number;
    economy?: number;
  };
  image?: string;
  price?: number;
}

export interface Match {
  id: string;
  team1: Team;
  team2: Team;
  status: 'live' | 'upcoming' | 'completed';
  format: 'T20' | 'ODI' | 'Test';
  tournament: string;
  venue: string;
  date: string;
  time: string;
  score?: {
    team1: {
      runs: number;
      wickets: number;
      overs: number;
    };
    team2: {
      runs: number;
      wickets: number;
      overs: number;
    };
  };
  result?: string;
  toss?: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export interface FantasyTeam {
  id: string;
  name: string;
  players: Player[];
  captain: string;
  viceCaptain: string;
  totalPoints: number;
  rank?: number;
}

export interface TeamRanking {
  position: number;
  team: string;
  matches: number;
  points: number;
  rating: number;
}

export interface Poll {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    votes: number;
  }[];
  totalVotes: number;
}
