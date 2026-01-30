import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { liveMatches, upcomingMatches, completedMatches } from '@/data/mockData';
import type { Match } from '@/types/cricket';
import { Activity, Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Trophy } from 'lucide-react';

type MatchTab = 'live' | 'upcoming' | 'completed';

export default function LiveScores() {
  const [activeTab, setActiveTab] = useState<MatchTab>('live');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getMatches = (): Match[] => {
    switch (activeTab) {
      case 'live':
        return liveMatches;
      case 'upcoming':
        return upcomingMatches;
      case 'completed':
        return completedMatches;
      default:
        return [];
    }
  };

  const matches = getMatches();

  useEffect(() => {
    setCurrentSlide(0);
  }, [activeTab]);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % Math.max(1, matches.length - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + Math.max(1, matches.length - 1)) % Math.max(1, matches.length - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const renderMatchCard = (match: Match, index: number) => {
    const isLive = match.status === 'live';
    const isUpcoming = match.status === 'upcoming';
    const isCompleted = match.status === 'completed';

    return (
      <Card
        key={match.id}
        className={`min-w-[350px] sm:min-w-[400px] transition-all duration-500 ${
          index === currentSlide ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
        }`}
      >
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {isLive && (
                <Badge className="bg-destructive text-destructive-foreground animate-pulse flex items-center gap-1">
                  <Activity className="w-3 h-3" />
                  LIVE
                </Badge>
              )}
              {isUpcoming && (
                <Badge variant="outline" className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  UPCOMING
                </Badge>
              )}
              {isCompleted && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  COMPLETED
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-medium">{match.tournament}</span>
          </div>

          {/* Teams & Score */}
          <div className="space-y-4">
            {/* Team 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{match.team1.flag}</span>
                <div>
                  <p className="font-bold text-lg">{match.team1.shortName}</p>
                  <p className="text-xs text-muted-foreground">{match.team1.name}</p>
                </div>
              </div>
              {isLive && match.score && (
                <div className="text-right">
                  <p className="text-2xl font-bold">{match.score.team1.runs}/{match.score.team1.wickets}</p>
                  <p className="text-xs text-muted-foreground">{match.score.team1.overs} ov</p>
                </div>
              )}
              {isCompleted && match.score && (
                <div className="text-right">
                  <p className="text-xl font-semibold">{match.score.team1.runs}/{match.score.team1.wickets}</p>
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs font-bold text-muted-foreground">VS</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Team 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{match.team2.flag}</span>
                <div>
                  <p className="font-bold text-lg">{match.team2.shortName}</p>
                  <p className="text-xs text-muted-foreground">{match.team2.name}</p>
                </div>
              </div>
              {isLive && match.score && (
                <div className="text-right">
                  <p className="text-2xl font-bold">{match.score.team2.runs}/{match.score.team2.wickets}</p>
                  <p className="text-xs text-muted-foreground">{match.score.team2.overs} ov</p>
                </div>
              )}
              {isCompleted && match.score && (
                <div className="text-right">
                  <p className="text-xl font-semibold">{match.score.team2.runs}/{match.score.team2.wickets}</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-4 border-t border-border space-y-2">
            {isLive && (
              <>
                <p className="text-sm text-muted-foreground">{match.toss}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {match.venue}
                  </span>
                </div>
              </>
            )}
            {isUpcoming && (
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {match.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {match.time}
                </span>
              </div>
            )}
            {isCompleted && match.result && (
              <p className="text-sm font-medium text-primary">{match.result}</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section id="live-scores" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 font-display">
            MATCH <span className="text-gradient">CENTER</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with live scores, upcoming fixtures, and match results from tournaments around the world.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {(['live', 'upcoming', 'completed'] as MatchTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-medium text-sm capitalize transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tab === 'live' && <Activity className="w-4 h-4 inline mr-2" />}
              {tab === 'upcoming' && <Calendar className="w-4 h-4 inline mr-2" />}
              {tab === 'completed' && <Trophy className="w-4 h-4 inline mr-2" />}
              {tab}
            </button>
          ))}
        </div>

        {/* Matches Carousel */}
        <div className="relative">
          {matches.length > 0 ? (
            <>
              <div className="overflow-hidden">
                <div
                  className="flex gap-6 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 420}px)` }}
                >
                  {matches.map((match, index) => renderMatchCard(match, index))}
                </div>
              </div>

              {/* Navigation Arrows */}
              {matches.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card shadow-lg hover:bg-muted rounded-full w-12 h-12"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card shadow-lg hover:bg-muted rounded-full w-12 h-12"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </>
              )}

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {matches.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'w-8 bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No {activeTab} matches available.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
