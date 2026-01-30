import { supabase } from './supabase';
import type { Database } from '@/types/database';

type Tables = Database['public']['Tables'];

export const dbUtils = {
  teams: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    create: async (team: Tables['teams']['Insert']) => {
      const { data, error } = await supabase
        .from('teams')
        .insert(team)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  players: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('runs', { ascending: false });

      if (error) throw error;
      return data;
    },

    getByTeam: async (team: string) => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('team', team)
        .order('runs', { ascending: false });

      if (error) throw error;
      return data;
    },

    getByRole: async (role: string) => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('role', role)
        .order('runs', { ascending: false });

      if (error) throw error;
      return data;
    },

    create: async (player: Tables['players']['Insert']) => {
      const { data, error } = await supabase
        .from('players')
        .insert(player)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  matches: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id(id, name, short_name, flag, color),
          team2:team2_id(id, name, short_name, flag, color)
        `)
        .order('match_date', { ascending: false });

      if (error) throw error;
      return data;
    },

    getByStatus: async (status: 'live' | 'upcoming' | 'completed') => {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          *,
          team1:team1_id(id, name, short_name, flag, color),
          team2:team2_id(id, name, short_name, flag, color)
        `)
        .eq('status', status)
        .order('match_date', { ascending: status === 'completed' ? false : true });

      if (error) throw error;
      return data;
    },

    create: async (match: Tables['matches']['Insert']) => {
      const { data, error } = await supabase
        .from('matches')
        .insert(match)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    updateScore: async (id: string, scoreData: Partial<Tables['matches']['Update']>) => {
      const { data, error } = await supabase
        .from('matches')
        .update(scoreData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  news: {
    getAll: async (limit?: number) => {
      let query = supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },

    getByCategory: async (category: string) => {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .eq('category', category)
        .order('published_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    create: async (article: Tables['news_articles']['Insert']) => {
      const { data, error } = await supabase
        .from('news_articles')
        .insert(article)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  fantasy: {
    getAll: async () => {
      const { data, error } = await supabase
        .from('fantasy_teams')
        .select('*')
        .order('total_points', { ascending: false });

      if (error) throw error;
      return data;
    },

    create: async (team: Tables['fantasy_teams']['Insert']) => {
      const { data, error } = await supabase
        .from('fantasy_teams')
        .insert(team)
        .select()
        .single();

      if (error) throw error;
      return data;
    },

    update: async (id: string, updates: Tables['fantasy_teams']['Update']) => {
      const { data, error } = await supabase
        .from('fantasy_teams')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },

  polls: {
    getActive: async () => {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },

    getById: async (id: string) => {
      const { data, error } = await supabase
        .from('polls')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },

    vote: async (pollId: string, optionId: string, voterIdentifier: string) => {
      const { data: existingVote } = await supabase
        .from('poll_votes')
        .select('*')
        .eq('poll_id', pollId)
        .eq('voter_identifier', voterIdentifier)
        .maybeSingle();

      if (existingVote) {
        throw new Error('Already voted on this poll');
      }

      const { data, error } = await supabase
        .from('poll_votes')
        .insert({
          poll_id: pollId,
          option_id: optionId,
          voter_identifier: voterIdentifier,
        })
        .select()
        .single();

      if (error) throw error;

      const { data: poll } = await supabase
        .from('polls')
        .select('options, total_votes')
        .eq('id', pollId)
        .single();

      if (poll) {
        const updatedOptions = poll.options.map((opt: any) =>
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );

        await supabase
          .from('polls')
          .update({
            options: updatedOptions,
            total_votes: poll.total_votes + 1,
          })
          .eq('id', pollId);
      }

      return data;
    },

    create: async (poll: Tables['polls']['Insert']) => {
      const { data, error } = await supabase
        .from('polls')
        .insert(poll)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
  },
};
