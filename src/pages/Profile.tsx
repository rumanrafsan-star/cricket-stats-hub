import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import ProfileSettings from '@/components/dashboard/ProfileSettings';
import TeamsManager from '@/components/dashboard/TeamsManager';
import PlayersManager from '@/components/dashboard/PlayersManager';
import MatchesManager from '@/components/dashboard/MatchesManager';
import NewsManager from '@/components/dashboard/NewsManager';
import PollsManager from '@/components/dashboard/PollsManager';

export default function Profile() {
  const { session } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-slate-400">{session?.user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-4 sm:grid-cols-7 lg:grid-cols-7 w-full mb-8">
            <TabsTrigger value="profile" className="text-xs sm:text-sm">Profile</TabsTrigger>
            <TabsTrigger value="teams" className="text-xs sm:text-sm">Teams</TabsTrigger>
            <TabsTrigger value="players" className="text-xs sm:text-sm">Players</TabsTrigger>
            <TabsTrigger value="matches" className="text-xs sm:text-sm">Matches</TabsTrigger>
            <TabsTrigger value="news" className="text-xs sm:text-sm hidden sm:block">News</TabsTrigger>
            <TabsTrigger value="polls" className="text-xs sm:text-sm hidden sm:block">Polls</TabsTrigger>
            <TabsTrigger value="fantasy" className="text-xs sm:text-sm hidden lg:block">Fantasy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          <TabsContent value="teams">
            <TeamsManager />
          </TabsContent>

          <TabsContent value="players">
            <PlayersManager />
          </TabsContent>

          <TabsContent value="matches">
            <MatchesManager />
          </TabsContent>

          <TabsContent value="news">
            <NewsManager />
          </TabsContent>

          <TabsContent value="polls">
            <PollsManager />
          </TabsContent>

          <TabsContent value="fantasy">
            <Card>
              <CardHeader>
                <CardTitle>Fantasy Teams</CardTitle>
                <CardDescription>Manage your fantasy cricket teams</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Fantasy team management coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
