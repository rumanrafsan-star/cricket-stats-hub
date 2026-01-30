import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { players, fantasyTeams } from '@/data/mockData';
import type { Player } from '@/types/cricket';
import { Crown, Star, TrendingUp, Users, Wallet, Shield, Zap, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Fantasy() {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [budget] = useState(100);
  const [usedBudget, setUsedBudget] = useState(0);

  const togglePlayer = (player: Player) => {
    if (selectedPlayers.find((p) => p.id === player.id)) {
      setSelectedPlayers(selectedPlayers.filter((p) => p.id !== player.id));
      setUsedBudget(usedBudget - (player.price || 0));
    } else if (selectedPlayers.length < 11 && usedBudget + (player.price || 0) <= budget) {
      setSelectedPlayers([...selectedPlayers, player]);
      setUsedBudget(usedBudget + (player.price || 0));
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Batsman':
        return <Zap className="w-4 h-4" />;
      case 'Bowler':
        return <Shield className="w-4 h-4" />;
      case 'All-Rounder':
        return <Star className="w-4 h-4" />;
      case 'Wicket-Keeper':
        return <Crown className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <section id="fantasy" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 font-display">
            FANTASY <span className="text-gradient">LEAGUE</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Build your dream team, compete with friends, and win exciting prizes in our fantasy cricket league.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Team Builder */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Bar */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-6 h-6 text-primary" />
                    <span className="font-semibold">Budget</span>
                  </div>
                  <span className="text-2xl font-bold">
                    <span className={usedBudget > budget ? 'text-destructive' : 'text-green-600'}>
                      ${usedBudget.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground text-lg"> / ${budget}M</span>
                  </span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      usedBudget > budget ? 'bg-destructive' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min((usedBudget / budget) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-4 text-sm">
                  <span className="text-muted-foreground">
                    <Users className="w-4 h-4 inline mr-1" />
                    {selectedPlayers.length}/11 Players
                  </span>
                  <span className="text-muted-foreground">
                    Remaining: ${(budget - usedBudget).toFixed(1)}M
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Player Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Select Players</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="all">
                  <TabsList className="mb-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="batsman">Batsmen</TabsTrigger>
                    <TabsTrigger value="bowler">Bowlers</TabsTrigger>
                    <TabsTrigger value="all-rounder">All-Rounders</TabsTrigger>
                    <TabsTrigger value="wicket-keeper">WK</TabsTrigger>
                  </TabsList>

                  {['all', 'batsman', 'bowler', 'all-rounder', 'wicket-keeper'].map((role) => (
                    <TabsContent key={role} value={role} className="mt-0">
                      <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2">
                        {players
                          .filter((p) => role === 'all' || p.role.toLowerCase().replace('-', '') === role.replace('-', ''))
                          .map((player) => {
                            const isSelected = selectedPlayers.find((p) => p.id === player.id);
                            return (
                              <button
                                key={player.id}
                                onClick={() => togglePlayer(player)}
                                disabled={!isSelected && selectedPlayers.length >= 11}
                                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left ${
                                  isSelected
                                    ? 'border-primary bg-primary/10'
                                    : 'border-border hover:border-muted-foreground'
                                } ${!isSelected && selectedPlayers.length >= 11 ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                  }`}>
                                    {getRoleIcon(player.role)}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-sm">{player.name}</p>
                                    <p className="text-xs text-muted-foreground">{player.team}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-primary">${player.price}M</p>
                                  <p className="text-xs text-muted-foreground">{player.stats.runs} runs</p>
                                </div>
                              </button>
                            );
                          })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* My Team */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  My Team
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedPlayers.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">Select players to build your team</p>
                ) : (
                  <div className="space-y-3">
                    {selectedPlayers.map((player, index) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
                          {getRoleIcon(player.role)}
                          <span className="text-sm font-medium">{player.name}</span>
                        </div>
                        <button
                          onClick={() => togglePlayer(player)}
                          className="text-destructive hover:text-destructive/80 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {selectedPlayers.length === 11 && (
                  <Button className="w-full mt-4 bg-primary hover:bg-cricket-gold-hover text-primary-foreground">
                    Save Team
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {fantasyTeams.map((team, index) => (
                    <Dialog key={team.id}>
                      <DialogTrigger asChild>
                        <button className="w-full flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors text-left">
                          <div className="flex items-center gap-3">
                            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              index === 0 ? 'bg-primary text-primary-foreground' :
                              index === 1 ? 'bg-gray-300 text-black' :
                              'bg-muted-foreground/20 text-muted-foreground'
                            }`}>
                              {team.rank}
                            </span>
                            <div>
                              <p className="font-semibold text-sm">{team.name}</p>
                              <p className="text-xs text-muted-foreground">{team.players.length} players</p>
                            </div>
                          </div>
                          <span className="font-bold text-primary">{team.totalPoints} pts</span>
                        </button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{team.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Total Points</span>
                            <span className="text-2xl font-bold text-primary">{team.totalPoints}</span>
                          </div>
                          <div className="space-y-2">
                            <p className="font-semibold">Players:</p>
                            {team.players.map((player) => (
                              <div key={player.id} className="flex items-center justify-between p-2 bg-muted rounded">
                                <span>{player.name}</span>
                                <Badge variant="outline">{player.role}</Badge>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-4">
                            <div className="flex-1 p-3 bg-primary/10 rounded-lg text-center">
                              <Crown className="w-5 h-5 mx-auto mb-1 text-primary" />
                              <p className="text-xs text-muted-foreground">Captain</p>
                              <p className="font-semibold text-sm">
                                {team.players.find((p) => p.id === team.captain)?.name}
                              </p>
                            </div>
                            <div className="flex-1 p-3 bg-muted rounded-lg text-center">
                              <Star className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">Vice Captain</p>
                              <p className="font-semibold text-sm">
                                {team.players.find((p) => p.id === team.viceCaptain)?.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
