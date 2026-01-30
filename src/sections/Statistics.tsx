import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { players } from '@/data/mockData';
import type { Player } from '@/types/cricket';
import { TrendingUp, Target, Zap, Award, User } from 'lucide-react';

const filterPlayersByRole = (role: string) => {
  if (role === 'all') return players;
  return players.filter((p) => p.role.toLowerCase().replace('-', '') === role.toLowerCase());
};

const sortPlayers = (playerList: Player[], sortBy: string) => {
  return [...playerList].sort((a, b) => {
    switch (sortBy) {
      case 'runs':
        return b.stats.runs - a.stats.runs;
      case 'wickets':
        return b.stats.wickets - a.stats.wickets;
      case 'average':
        return b.stats.average - a.stats.average;
      case 'strikeRate':
        return b.stats.strikeRate - a.stats.strikeRate;
      default:
        return 0;
    }
  });
};

export default function Statistics() {
  const [selectedRole, setSelectedRole] = useState('all');
  const [sortBy, setSortBy] = useState('runs');

  const filteredPlayers = filterPlayersByRole(selectedRole);
  const sortedPlayers = sortPlayers(filteredPlayers, sortBy).slice(0, 10);

  const getTopPlayer = () => {
    if (sortBy === 'wickets') {
      return players.reduce((prev, current) => (prev.stats.wickets > current.stats.wickets ? prev : current));
    }
    return players.reduce((prev, current) => (prev.stats.runs > current.stats.runs ? prev : current));
  };

  const topPlayer = getTopPlayer();

  return (
    <section id="stats" className="py-20 bg-cricket-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4 font-display">
            PLAYER <span className="text-primary">STATISTICS</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comprehensive player statistics and performance metrics from international cricket.
          </p>
        </div>

        {/* Featured Player Card */}
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 mb-12 overflow-hidden">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Top Performer</span>
                </div>
                <div>
                  <h3 className="text-4xl font-bold mb-2 font-display">{topPlayer.name}</h3>
                  <p className="text-gray-400">{topPlayer.team} • {topPlayer.role}</p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary font-display">{topPlayer.stats.runs.toLocaleString()}</p>
                    <p className="text-sm text-gray-400">Runs</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary font-display">{topPlayer.stats.average}</p>
                    <p className="text-sm text-gray-400">Average</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-primary font-display">{topPlayer.stats.strikeRate}</p>
                    <p className="text-sm text-gray-400">Strike Rate</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <User className="w-24 h-24 text-primary" />
                  </div>
                  <div className="absolute -inset-4 bg-primary/10 rounded-full blur-2xl" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex gap-2 flex-wrap">
                {['all', 'batsman', 'bowler', 'allrounder', 'wicketkeeper'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      selectedRole === role
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {role === 'allrounder' ? 'All-Rounder' : role === 'wicketkeeper' ? 'Wicket-Keeper' : role}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 ml-auto flex-wrap">
                {[
                  { key: 'runs', label: 'Runs', icon: TrendingUp },
                  { key: 'wickets', label: 'Wickets', icon: Target },
                  { key: 'average', label: 'Average', icon: Zap },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSortBy(key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      sortBy === key
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Rank</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Player</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Team</th>
                    <th className="text-left py-4 px-4 text-gray-400 font-medium">Role</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-medium">Matches</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-medium">
                      {sortBy === 'wickets' ? 'Wickets' : 'Runs'}
                    </th>
                    <th className="text-right py-4 px-4 text-gray-400 font-medium">Average</th>
                    <th className="text-right py-4 px-4 text-gray-400 font-medium">SR</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPlayers.map((player, index) => (
                    <tr
                      key={player.id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          index === 0 ? 'bg-primary text-primary-foreground' :
                          index === 1 ? 'bg-gray-300 text-black' :
                          index === 2 ? 'bg-amber-700 text-white' :
                          'bg-gray-800 text-gray-400'
                        }`}>
                          {index + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <span className="font-semibold">{player.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-2xl">{player.team}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">{player.role}</span>
                      </td>
                      <td className="py-4 px-4 text-right">{player.stats.matches}</td>
                      <td className="py-4 px-4 text-right font-bold text-primary">
                        {sortBy === 'wickets' ? player.stats.wickets : player.stats.runs.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right">{player.stats.average}</td>
                      <td className="py-4 px-4 text-right">{player.stats.strikeRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
