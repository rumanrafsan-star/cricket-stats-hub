import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { polls } from '@/data/mockData';
import type { Poll } from '@/types/cricket';
import { BarChart3, CheckCircle2, MessageSquare, Share2, TrendingUp, Users } from 'lucide-react';

export default function Polls() {
  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});
  const [localPolls, setLocalPolls] = useState<Poll[]>(polls);

  const handleVote = (pollId: string, optionId: string) => {
    if (votedPolls[pollId]) return;

    setVotedPolls({ ...votedPolls, [pollId]: optionId });

    setLocalPolls(localPolls.map((poll) => {
      if (poll.id === pollId) {
        return {
          ...poll,
          options: poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
          totalVotes: poll.totalVotes + 1,
        };
      }
      return poll;
    }));
  };

  const getPercentage = (votes: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((votes / total) * 100);
  };

  return (
    <section className="py-20 bg-cricket-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4 font-display">
            FAN <span className="text-primary">POLLS</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Share your opinion and see what other cricket fans are thinking.
          </p>
        </div>

        {/* Polls Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {localPolls.map((poll) => {
            const hasVoted = votedPolls[poll.id];
            const selectedOption = votedPolls[poll.id];

            return (
              <Card key={poll.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  {/* Poll Header */}
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-xl font-bold text-white font-display">{poll.question}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Users className="w-4 h-4" />
                      {poll.totalVotes.toLocaleString()} votes
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const percentage = getPercentage(option.votes, poll.totalVotes);
                      const isSelected = selectedOption === option.id;

                      return (
                        <button
                          key={option.id}
                          onClick={() => handleVote(poll.id, option.id)}
                          disabled={!!hasVoted}
                          className={`w-full relative overflow-hidden rounded-xl transition-all duration-300 ${
                            hasVoted
                              ? 'cursor-default'
                              : 'cursor-pointer hover:scale-[1.02]'
                          }`}
                        >
                          {/* Background Bar */}
                          {hasVoted && (
                            <div
                              className={`absolute inset-0 transition-all duration-1000 ${
                                isSelected ? 'bg-primary/30' : 'bg-gray-800/50'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          )}

                          {/* Content */}
                          <div
                            className={`relative flex items-center justify-between p-4 border-2 rounded-xl transition-all ${
                              hasVoted
                                ? isSelected
                                  ? 'border-primary'
                                  : 'border-gray-800'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {hasVoted && isSelected && (
                                <CheckCircle2 className="w-5 h-5 text-primary" />
                              )}
                              <span className={`font-medium ${hasVoted && isSelected ? 'text-primary' : 'text-white'}`}>
                                {option.text}
                              </span>
                            </div>
                            {hasVoted && (
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-400">
                                  {option.votes.toLocaleString()} votes
                                </span>
                                <span className={`font-bold ${isSelected ? 'text-primary' : 'text-white'}`}>
                                  {percentage}%
                                </span>
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span className="text-sm">Share</span>
                      </button>
                      <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm">Comment</span>
                      </button>
                    </div>
                    {hasVoted && (
                      <span className="text-sm text-primary flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Voted
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mt-12">
          <div className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-display">24,891</p>
              <p className="text-sm text-gray-400">Total Votes</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-display">156</p>
              <p className="text-sm text-gray-400">Active Polls</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-gray-900/50 rounded-xl">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white font-display">8,432</p>
              <p className="text-sm text-gray-400">Unique Voters</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
