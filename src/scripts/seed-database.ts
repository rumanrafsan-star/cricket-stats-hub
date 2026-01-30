import dotenv from 'dotenv';
dotenv.config();

import { supabase } from '../lib/supabase';
import { teams, players, liveMatches, upcomingMatches, completedMatches, newsArticles, fantasyTeams, polls } from '../data/mockData';

async function seedDatabase() {
  console.log('Starting database seeding...');

  try {
    console.log('\n1. Seeding teams...');
    const teamsData = teams.map(team => ({
      name: team.name,
      short_name: team.shortName,
      flag: team.flag,
      color: team.color,
    }));

    const { data: insertedTeams, error: teamsError } = await supabase
      .from('teams')
      .insert(teamsData)
      .select();

    if (teamsError) {
      console.error('Error seeding teams:', teamsError);
    } else {
      console.log(`✓ Inserted ${insertedTeams?.length} teams`);
    }

    console.log('\n2. Seeding players...');
    const playersData = players.map(player => ({
      name: player.name,
      role: player.role,
      team: player.team,
      matches: player.stats.matches,
      runs: player.stats.runs,
      wickets: player.stats.wickets,
      average: player.stats.average,
      strike_rate: player.stats.strikeRate,
      economy: player.stats.economy || null,
      price: player.price || null,
    }));

    const { data: insertedPlayers, error: playersError } = await supabase
      .from('players')
      .insert(playersData)
      .select();

    if (playersError) {
      console.error('Error seeding players:', playersError);
    } else {
      console.log(`✓ Inserted ${insertedPlayers?.length} players`);
    }

    if (insertedTeams && insertedTeams.length > 0) {
      console.log('\n3. Seeding matches...');

      const findTeamId = (teamShortName: string) => {
        const team = insertedTeams.find(t => t.short_name === teamShortName);
        return team?.id || null;
      };

      const allMatches = [...liveMatches, ...upcomingMatches, ...completedMatches];
      const matchesData = allMatches.map(match => ({
        team1_id: findTeamId(match.team1.shortName),
        team2_id: findTeamId(match.team2.shortName),
        status: match.status,
        format: match.format,
        tournament: match.tournament,
        venue: match.venue,
        match_date: match.date,
        match_time: match.time || null,
        team1_runs: match.score?.team1.runs || null,
        team1_wickets: match.score?.team1.wickets || null,
        team1_overs: match.score?.team1.overs || null,
        team2_runs: match.score?.team2.runs || null,
        team2_wickets: match.score?.team2.wickets || null,
        team2_overs: match.score?.team2.overs || null,
        result: match.result || null,
        toss: match.toss || null,
      }));

      const { data: insertedMatches, error: matchesError } = await supabase
        .from('matches')
        .insert(matchesData)
        .select();

      if (matchesError) {
        console.error('Error seeding matches:', matchesError);
      } else {
        console.log(`✓ Inserted ${insertedMatches?.length} matches`);
      }
    }

    console.log('\n4. Seeding news articles...');
    const newsData = newsArticles.map(article => ({
      title: article.title,
      excerpt: article.excerpt,
      category: article.category,
      author: article.author,
      published_at: article.date,
    }));

    const { data: insertedNews, error: newsError } = await supabase
      .from('news_articles')
      .insert(newsData)
      .select();

    if (newsError) {
      console.error('Error seeding news:', newsError);
    } else {
      console.log(`✓ Inserted ${insertedNews?.length} news articles`);
    }

    if (insertedPlayers && insertedPlayers.length > 0) {
      console.log('\n5. Seeding fantasy teams...');
      const fantasyData = fantasyTeams.map(team => ({
        name: team.name,
        player_ids: team.players.map(p => p.id),
        captain_id: team.captain,
        vice_captain_id: team.viceCaptain,
        total_points: team.totalPoints,
      }));

      const { data: insertedFantasy, error: fantasyError } = await supabase
        .from('fantasy_teams')
        .insert(fantasyData)
        .select();

      if (fantasyError) {
        console.error('Error seeding fantasy teams:', fantasyError);
      } else {
        console.log(`✓ Inserted ${insertedFantasy?.length} fantasy teams`);
      }
    }

    console.log('\n6. Seeding polls...');
    const pollsData = polls.map(poll => ({
      question: poll.question,
      options: poll.options,
      total_votes: poll.totalVotes,
      is_active: true,
    }));

    const { data: insertedPolls, error: pollsError } = await supabase
      .from('polls')
      .insert(pollsData)
      .select();

    if (pollsError) {
      console.error('Error seeding polls:', pollsError);
    } else {
      console.log(`✓ Inserted ${insertedPolls?.length} polls`);
    }

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('Error during database seeding:', error);
    throw error;
  }
}

seedDatabase();
