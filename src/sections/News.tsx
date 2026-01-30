import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { newsArticles } from '@/data/mockData';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Records', 'Team News', 'Injury Update', 'IPL', 'Analysis'];

  const filteredNews = selectedCategory === 'all'
    ? newsArticles
    : newsArticles.filter((article) => article.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Records': 'bg-purple-100 text-purple-700',
      'Team News': 'bg-blue-100 text-blue-700',
      'Injury Update': 'bg-red-100 text-red-700',
      'IPL': 'bg-orange-100 text-orange-700',
      'Analysis': 'bg-green-100 text-green-700',
    };
    return colors[category] || 'bg-muted text-muted-foreground';
  };

  return (
    <section id="news" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-4 font-display">
            LATEST <span className="text-gradient">NEWS</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest cricket news, match analysis, and exclusive stories.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                  : 'bg-card text-muted-foreground hover:bg-muted'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((article, index) => (
            <Dialog key={article.id}>
              <DialogTrigger asChild>
                <Card
                  className={`cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                >
                  {/* Image Placeholder */}
                  <div
                    className={`bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center ${
                      index === 0 ? 'h-64 md:h-80' : 'h-48'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/50 flex items-center justify-center">
                        <Clock className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <span className="text-muted-foreground text-sm">News Image</span>
                    </div>
                  </div>

                  <CardContent className={`p-5 ${index === 0 ? 'md:p-6' : ''}`}>
                    {/* Category & Date */}
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-bold text-foreground mb-2 line-clamp-2 ${
                      index === 0 ? 'text-xl md:text-2xl' : 'text-lg'
                    }`}>
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className={`text-muted-foreground mb-4 line-clamp-2 ${
                      index === 0 ? 'text-base' : 'text-sm'
                    }`}>
                      {article.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl leading-tight">{article.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Full Image */}
                  <div className="h-64 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-2 rounded-full bg-white/50 flex items-center justify-center">
                        <Clock className="w-10 h-10 text-muted-foreground" />
                      </div>
                      <span className="text-muted-foreground">News Image</span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="prose prose-gray max-w-none">
                    <p className="text-lg text-foreground leading-relaxed">
                      {article.excerpt}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                      ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                      aliquip ex ea commodo consequat.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                      cupidatat non proident, sunt in culpa qui officia deserunt mollit
                      anim id est laborum.
                    </p>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Button variant="outline" className="flex-1">
                      Share on Twitter
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Share on Facebook
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button
            variant="outline"
            className="px-8 py-6 rounded-full border-2 border-border hover:border-primary hover:bg-primary/10 transition-all"
          >
            Load More Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
