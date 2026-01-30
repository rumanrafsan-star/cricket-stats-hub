import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { teams } from '@/data/mockData';
import type { Team } from '@/types/cricket';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Trophy, Users, Calendar, TrendingUp } from 'lucide-react';

export default function TeamGrid() {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  const getTeamStats = (team: Team) => {
    const stats: Record<string, { titles: number; matches: number; winRate: number }> = {
      'India': { titles: 5, matches: 542, winRate: 62 },
      'Australia': { titles: 7, matches: 568, winRate: 65 },
      'England': { titles: 3, matches: 523, winRate: 58 },
      'Pakistan': { titles: 2, matches: 489, winRate: 54 },
      'South Africa': { titles: 0, matches: 467, winRate: 59 },
      'New Zealand': { titles: 1, matches: 445, winRate: 56 },
      'Sri Lanka': { titles: 2, matches: 412, winRate: 51 },
      'West Indies': { titles: 4, matches: 398, winRate: 48 },
      'Bangladesh': { titles: 0, matches: 312, winRate: 42 },
      'Afghanistan': { titles: 0, matches: 156, winRate: 45 },
    };
    return stats[team.name] || { titles: 0, matches: 0, winRate: 0 };
  };

  return (
    <section id="fixtures" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 font-display">
            INTERNATIONAL <span className="text-gradient">TEAMS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore cricket teams from around the world and their journey to glory.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {teams.map((team) => {
            const stats = getTeamStats(team);
            const isHovered = hoveredTeam === team.id;

            return (
              <Dialog key={team.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`cursor-pointer transition-all duration-300 ${
                      isHovered ? 'scale-105 shadow-xl z-10' : 'hover:scale-102'
                    }`}
                    style={{
                      transform: hoveredTeam && hoveredTeam !== team.id ? 'scale(0.98)' : 'scale(1)',
                      opacity: hoveredTeam && hoveredTeam !== team.id ? 0.7 : 1,
                    }}
                    onMouseEnter={() => setHoveredTeam(team.id)}
                    onMouseLeave={() => setHoveredTeam(null)}
                  >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-4 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${team.color}20, ${team.color}40)`,
                          boxShadow: isHovered ? `0 0 30px ${team.color}40` : 'none',
                        }}
                      >
                        {team.flag}
                      </div>
                      <h3 className="font-bold text-lg mb-1">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">{team.shortName}</p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <Trophy className="w-3 h-3" />
                        <span>{stats.titles} ICC Titles</span>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                      <span className="text-4xl">{team.flag}</span>
                      <span>{team.name}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    {/* Team Color Banner */}
                    <div
                      className="h-20 rounded-xl flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, ${team.color}, ${team.color}dd)` }}
                    >
                      <span className="text-white text-2xl font-bold">{team.shortName}</span>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted rounded-xl text-center">
                        <Trophy className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <p className="text-2xl font-bold">{stats.titles}</p>
                        <p className="text-xs text-muted-foreground">ICC Titles</p>
                      </div>
                      <div className="p-4 bg-muted rounded-xl text-center">
                        <Calendar className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                        <p className="text-2xl font-bold">{stats.matches}</p>
                        <p className="text-xs text-muted-foreground">Matches Played</p>
                      </div>
                      <div className="p-4 bg-muted rounded-xl text-center">
                        <TrendingUp className="w-6 h-6 mx-auto mb-2 text-green-500" />
                        <p className="text-2xl font-bold">{stats.winRate}%</p>
                        <p className="text-xs text-muted-foreground">Win Rate</p>
                      </div>
                      <div className="p-4 bg-muted rounded-xl text-center">
                        <Users className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                        <p className="text-2xl font-bold">15</p>
                        <p className="text-xs text-muted-foreground">Squad Size</p>
                      </div>
                    </div>

                    {/* Recent Form */}
                    <div>
                      <p className="font-semibold mb-3">Recent Form</p>
                      <div className="flex gap-2">
                        {['W', 'W', 'L', 'W', 'D'].map((result, i) => (
                          <span
                            key={i}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                              result === 'W'
                                ? 'bg-green-500 text-white'
                                : result === 'L'
                                ? 'bg-destructive text-destructive-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      </div>
    </section>
  );
}
