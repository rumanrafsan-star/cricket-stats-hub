import type { Team, Player, Match, NewsArticle, TeamRanking, Poll, FantasyTeam } from '@/types/cricket';

export const teams: Team[] = [
  { id: '1', name: 'India', shortName: 'IND', flag: '🇮🇳', color: '#1a237e' },
  { id: '2', name: 'Australia', shortName: 'AUS', flag: '🇦🇺', color: '#ffd700' },
  { id: '3', name: 'England', shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#1e88e5' },
  { id: '4', name: 'Pakistan', shortName: 'PAK', flag: '🇵🇰', color: '#2e7d32' },
  { id: '5', name: 'South Africa', shortName: 'SA', flag: '🇿🇦', color: '#388e3c' },
  { id: '6', name: 'New Zealand', shortName: 'NZ', flag: '🇳🇿', color: '#424242' },
  { id: '7', name: 'Sri Lanka', shortName: 'SL', flag: '🇱🇰', color: '#fdd835' },
  { id: '8', name: 'West Indies', shortName: 'WI', flag: '🌴', color: '#7b1fa2' },
  { id: '9', name: 'Bangladesh', shortName: 'BAN', flag: '🇧🇩', color: '#00695c' },
  { id: '10', name: 'Afghanistan', shortName: 'AFG', flag: '🇦🇫', color: '#d32f2f' },
];

export const players: Player[] = [
  { id: '1', name: 'Virat Kohli', role: 'Batsman', team: 'IND', stats: { matches: 274, runs: 12898, wickets: 4, average: 57.32, strikeRate: 93.62 }, price: 12.0 },
  { id: '2', name: 'Rohit Sharma', role: 'Batsman', team: 'IND', stats: { matches: 262, runs: 10709, wickets: 8, average: 49.13, strikeRate: 90.34 }, price: 11.5 },
  { id: '3', name: 'Jasprit Bumrah', role: 'Bowler', team: 'IND', stats: { matches: 89, runs: 58, wickets: 149, average: 20.28, strikeRate: 31.5, economy: 4.64 }, price: 11.0 },
  { id: '4', name: 'Steve Smith', role: 'Batsman', team: 'AUS', stats: { matches: 155, runs: 5351, wickets: 28, average: 43.34, strikeRate: 88.26 }, price: 10.5 },
  { id: '5', name: 'Pat Cummins', role: 'Bowler', team: 'AUS', stats: { matches: 110, runs: 432, wickets: 165, average: 23.45, strikeRate: 32.1, economy: 4.38 }, price: 10.0 },
  { id: '6', name: 'Joe Root', role: 'Batsman', team: 'ENG', stats: { matches: 171, runs: 6522, wickets: 27, average: 47.96, strikeRate: 86.87 }, price: 10.5 },
  { id: '7', name: 'Jofra Archer', role: 'Bowler', team: 'ENG', stats: { matches: 28, runs: 87, wickets: 42, average: 24.12, strikeRate: 28.5, economy: 5.07 }, price: 9.5 },
  { id: '8', name: 'Babar Azam', role: 'Batsman', team: 'PAK', stats: { matches: 117, runs: 5729, wickets: 0, average: 56.72, strikeRate: 88.83 }, price: 11.5 },
  { id: '9', name: 'Shaheen Afridi', role: 'Bowler', team: 'PAK', stats: { matches: 53, runs: 78, wickets: 104, average: 22.18, strikeRate: 26.8, economy: 4.96 }, price: 10.0 },
  { id: '10', name: 'Quinton de Kock', role: 'Wicket-Keeper', team: 'SA', stats: { matches: 140, runs: 6770, wickets: 0, average: 45.74, strikeRate: 96.35 }, price: 10.5 },
  { id: '11', name: 'Kagiso Rabada', role: 'Bowler', team: 'SA', stats: { matches: 101, runs: 134, wickets: 157, average: 23.78, strikeRate: 29.4, economy: 4.85 }, price: 10.0 },
  { id: '12', name: 'Kane Williamson', role: 'Batsman', team: 'NZ', stats: { matches: 165, runs: 6815, wickets: 30, average: 48.34, strikeRate: 82.17 }, price: 10.5 },
  { id: '13', name: 'Trent Boult', role: 'Bowler', team: 'NZ', stats: { matches: 114, runs: 98, wickets: 211, average: 23.98, strikeRate: 32.6, economy: 4.41 }, price: 9.5 },
  { id: '14', name: 'Ben Stokes', role: 'All-Rounder', team: 'ENG', stats: { matches: 114, runs: 3465, wickets: 74, average: 38.50, strikeRate: 95.08, economy: 6.05 }, price: 11.0 },
  { id: '15', name: 'Hardik Pandya', role: 'All-Rounder', team: 'IND', stats: { matches: 86, runs: 1768, wickets: 85, average: 34.00, strikeRate: 112.87, economy: 5.53 }, price: 10.5 },
  { id: '16', name: 'Rashid Khan', role: 'Bowler', team: 'AFG', stats: { matches: 102, runs: 1234, wickets: 183, average: 18.45, strikeRate: 24.2, economy: 4.58 }, price: 10.5 },
  { id: '17', name: 'Shakib Al Hasan', role: 'All-Rounder', team: 'BAN', stats: { matches: 247, runs: 7570, wickets: 317, average: 37.85, strikeRate: 82.75, economy: 4.44 }, price: 10.0 },
  { id: '18', name: 'David Warner', role: 'Batsman', team: 'AUS', stats: { matches: 161, runs: 6932, wickets: 0, average: 45.30, strikeRate: 95.88 }, price: 10.5 },
  { id: '19', name: 'Jos Buttler', role: 'Wicket-Keeper', team: 'ENG', stats: { matches: 181, runs: 5022, wickets: 0, average: 41.85, strikeRate: 118.34 }, price: 10.5 },
  { id: '20', name: 'Mohammad Rizwan', role: 'Wicket-Keeper', team: 'PAK', stats: { matches: 89, runs: 3408, wickets: 0, average: 43.68, strikeRate: 87.52 }, price: 9.5 },
];

export const liveMatches: Match[] = [
  {
    id: '1',
    team1: teams[0],
    team2: teams[1],
    status: 'live',
    format: 'T20',
    tournament: 'T20 World Cup 2026',
    venue: 'Melbourne Cricket Ground',
    date: '2026-01-30',
    time: '19:00',
    score: {
      team1: { runs: 186, wickets: 4, overs: 18.2 },
      team2: { runs: 142, wickets: 6, overs: 15.4 },
    },
    toss: 'India won the toss and elected to bat',
  },
  {
    id: '2',
    team1: teams[2],
    team2: teams[3],
    status: 'live',
    format: 'ODI',
    tournament: 'ICC Champions Trophy',
    venue: "Lord's, London",
    date: '2026-01-30',
    time: '14:30',
    score: {
      team1: { runs: 298, wickets: 8, overs: 50 },
      team2: { runs: 245, wickets: 3, overs: 42.1 },
    },
    toss: 'Pakistan won the toss and elected to field',
  },
];

export const upcomingMatches: Match[] = [
  {
    id: '3',
    team1: teams[4],
    team2: teams[5],
    status: 'upcoming',
    format: 'Test',
    tournament: 'ICC World Test Championship',
    venue: 'Newlands, Cape Town',
    date: '2026-02-02',
    time: '10:00',
  },
  {
    id: '4',
    team1: teams[6],
    team2: teams[7],
    status: 'upcoming',
    format: 'T20',
    tournament: 'T20 World Cup 2026',
    venue: 'R. Premadasa Stadium, Colombo',
    date: '2026-02-01',
    time: '19:30',
  },
  {
    id: '5',
    team1: teams[0],
    team2: teams[2],
    status: 'upcoming',
    format: 'ODI',
    tournament: 'Bilateral Series',
    venue: 'Eden Gardens, Kolkata',
    date: '2026-02-05',
    time: '13:30',
  },
  {
    id: '6',
    team1: teams[8],
    team2: teams[9],
    status: 'upcoming',
    format: 'T20',
    tournament: 'T20 World Cup 2026',
    venue: 'Sher-e-Bangla Stadium, Dhaka',
    date: '2026-02-03',
    time: '18:00',
  },
];

export const completedMatches: Match[] = [
  {
    id: '7',
    team1: teams[1],
    team2: teams[2],
    status: 'completed',
    format: 'ODI',
    tournament: 'ICC Champions Trophy',
    venue: 'Sydney Cricket Ground',
    date: '2026-01-28',
    time: '14:00',
    score: {
      team1: { runs: 312, wickets: 7, overs: 50 },
      team2: { runs: 298, wickets: 10, overs: 48.4 },
    },
    result: 'Australia won by 14 runs',
  },
  {
    id: '8',
    team1: teams[3],
    team2: teams[4],
    status: 'completed',
    format: 'T20',
    tournament: 'T20 World Cup 2026',
    venue: 'Gaddafi Stadium, Lahore',
    date: '2026-01-27',
    time: '19:00',
    score: {
      team1: { runs: 178, wickets: 6, overs: 20 },
      team2: { runs: 165, wickets: 8, overs: 20 },
    },
    result: 'Pakistan won by 13 runs',
  },
];

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Virat Kohli Breaks Another Record in T20 World Cup',
    excerpt: 'The Indian captain scored his 50th T20I fifty, becoming the first player to achieve this milestone in international cricket.',
    image: '/news-1.jpg',
    category: 'Records',
    date: '2026-01-30',
    author: 'Rahul Sharma',
  },
  {
    id: '2',
    title: 'Australia Announces Squad for Ashes Series',
    excerpt: 'Cricket Australia has named a 16-player squad for the upcoming Ashes series against England, with two uncapped players included.',
    image: '/news-2.jpg',
    category: 'Team News',
    date: '2026-01-29',
    author: 'Michael Clarke',
  },
  {
    id: '3',
    title: 'Bumrah Ruled Out of Next Two Matches Due to Injury',
    excerpt: "India's pace spearhead Jasprit Bumrah will miss the next two matches due to a minor ankle injury sustained during training.",
    image: '/news-3.jpg',
    category: 'Injury Update',
    date: '2026-01-28',
    author: 'Sourav Ganguly',
  },
  {
    id: '4',
    title: 'IPL 2026 Auction: Record-Breaking Bids Expected',
    excerpt: 'Franchises are preparing for the biggest auction in IPL history, with several international superstars set to go under the hammer.',
    image: '/news-4.jpg',
    category: 'IPL',
    date: '2026-01-27',
    author: 'Harsha Bhogle',
  },
];

export const iccRankings: {
  test: TeamRanking[];
  odi: TeamRanking[];
  t20: TeamRanking[];
} = {
  test: [
    { position: 1, team: 'Australia', matches: 22, points: 2648, rating: 120 },
    { position: 2, team: 'India', matches: 24, points: 2769, rating: 115 },
    { position: 3, team: 'England', matches: 28, points: 2996, rating: 107 },
    { position: 4, team: 'South Africa', matches: 19, points: 1965, rating: 103 },
    { position: 5, team: 'New Zealand', matches: 20, points: 2004, rating: 100 },
  ],
  odi: [
    { position: 1, team: 'India', matches: 42, points: 5346, rating: 127 },
    { position: 2, team: 'Australia', matches: 38, points: 4464, rating: 117 },
    { position: 3, team: 'South Africa', matches: 31, points: 3578, rating: 115 },
    { position: 4, team: 'Pakistan', matches: 37, points: 4144, rating: 112 },
    { position: 5, team: 'New Zealand', matches: 36, points: 3906, rating: 108 },
  ],
  t20: [
    { position: 1, team: 'India', matches: 52, points: 13884, rating: 267 },
    { position: 2, team: 'Australia', matches: 44, points: 11572, rating: 263 },
    { position: 3, team: 'England', matches: 48, points: 12528, rating: 261 },
    { position: 4, team: 'New Zealand', matches: 50, points: 12850, rating: 257 },
    { position: 5, team: 'West Indies', matches: 46, points: 11684, rating: 254 },
  ],
};

export const polls: Poll[] = [
  {
    id: '1',
    question: 'Who will win the T20 World Cup 2026?',
    options: [
      { id: '1', text: 'India', votes: 4523 },
      { id: '2', text: 'Australia', votes: 3210 },
      { id: '3', text: 'England', votes: 2845 },
      { id: '4', text: 'Pakistan', votes: 2156 },
    ],
    totalVotes: 12734,
  },
  {
    id: '2',
    question: 'Best T20 batsman currently?',
    options: [
      { id: '1', text: 'Virat Kohli', votes: 3892 },
      { id: '2', text: 'Babar Azam', votes: 3456 },
      { id: '3', text: 'Jos Buttler', votes: 2789 },
      { id: '4', text: 'David Warner', votes: 1987 },
    ],
    totalVotes: 12124,
  },
];

export const fantasyTeams: FantasyTeam[] = [
  {
    id: '1',
    name: 'Cricket Kings',
    players: [players[0], players[3], players[7], players[13], players[15], players[2], players[4], players[8]],
    captain: '1',
    viceCaptain: '8',
    totalPoints: 856,
    rank: 1,
  },
  {
    id: '2',
    name: 'Super Strikers',
    players: [players[1], players[5], players[11], players[14], players[16], players[6], players[10], players[12]],
    captain: '12',
    viceCaptain: '6',
    totalPoints: 742,
    rank: 2,
  },
];
