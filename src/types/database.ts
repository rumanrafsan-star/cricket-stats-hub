export interface Database {
  public: {
    Tables: {
      teams: {
        Row: {
          id: string;
          name: string;
          short_name: string;
          flag: string;
          color: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          short_name: string;
          flag: string;
          color: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          short_name?: string;
          flag?: string;
          color?: string;
          created_at?: string;
        };
      };
      players: {
        Row: {
          id: string;
          name: string;
          role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
          team: string;
          matches: number;
          runs: number;
          wickets: number;
          average: number;
          strike_rate: number;
          economy: number | null;
          price: number | null;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
          team: string;
          matches?: number;
          runs?: number;
          wickets?: number;
          average?: number;
          strike_rate?: number;
          economy?: number | null;
          price?: number | null;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
          team?: string;
          matches?: number;
          runs?: number;
          wickets?: number;
          average?: number;
          strike_rate?: number;
          economy?: number | null;
          price?: number | null;
          image_url?: string | null;
          created_at?: string;
        };
      };
      matches: {
        Row: {
          id: string;
          team1_id: string | null;
          team2_id: string | null;
          status: 'live' | 'upcoming' | 'completed';
          format: 'T20' | 'ODI' | 'Test';
          tournament: string;
          venue: string;
          match_date: string;
          match_time: string | null;
          team1_runs: number | null;
          team1_wickets: number | null;
          team1_overs: number | null;
          team2_runs: number | null;
          team2_wickets: number | null;
          team2_overs: number | null;
          result: string | null;
          toss: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          team1_id?: string | null;
          team2_id?: string | null;
          status?: 'live' | 'upcoming' | 'completed';
          format: 'T20' | 'ODI' | 'Test';
          tournament: string;
          venue: string;
          match_date: string;
          match_time?: string | null;
          team1_runs?: number | null;
          team1_wickets?: number | null;
          team1_overs?: number | null;
          team2_runs?: number | null;
          team2_wickets?: number | null;
          team2_overs?: number | null;
          result?: string | null;
          toss?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          team1_id?: string | null;
          team2_id?: string | null;
          status?: 'live' | 'upcoming' | 'completed';
          format?: 'T20' | 'ODI' | 'Test';
          tournament?: string;
          venue?: string;
          match_date?: string;
          match_time?: string | null;
          team1_runs?: number | null;
          team1_wickets?: number | null;
          team1_overs?: number | null;
          team2_runs?: number | null;
          team2_wickets?: number | null;
          team2_overs?: number | null;
          result?: string | null;
          toss?: string | null;
          created_at?: string;
        };
      };
      news_articles: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          content: string | null;
          image_url: string | null;
          category: string;
          author: string;
          published_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt: string;
          content?: string | null;
          image_url?: string | null;
          category: string;
          author: string;
          published_at?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string;
          content?: string | null;
          image_url?: string | null;
          category?: string;
          author?: string;
          published_at?: string;
          created_at?: string;
        };
      };
      fantasy_teams: {
        Row: {
          id: string;
          user_id: string | null;
          name: string;
          player_ids: any;
          captain_id: string | null;
          vice_captain_id: string | null;
          total_points: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          name: string;
          player_ids?: any;
          captain_id?: string | null;
          vice_captain_id?: string | null;
          total_points?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          name?: string;
          player_ids?: any;
          captain_id?: string | null;
          vice_captain_id?: string | null;
          total_points?: number;
          created_at?: string;
        };
      };
      polls: {
        Row: {
          id: string;
          question: string;
          options: any;
          total_votes: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          options?: any;
          total_votes?: number;
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          options?: any;
          total_votes?: number;
          is_active?: boolean;
          created_at?: string;
        };
      };
      poll_votes: {
        Row: {
          id: string;
          poll_id: string | null;
          option_id: string;
          voter_identifier: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          poll_id?: string | null;
          option_id: string;
          voter_identifier: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          poll_id?: string | null;
          option_id?: string;
          voter_identifier?: string;
          created_at?: string;
        };
      };
    };
  };
}
