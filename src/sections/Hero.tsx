import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Play } from 'lucide-react';
import heroStadium from '@/assets/hero-stadium.jpg';
import heroPlayer from '@/assets/hero-player.png';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x: x * 10, y: y * 5 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background Stadium Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `scale(1.1) translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        <img
          src={heroStadium}
          alt="Cricket Stadium"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-primary text-sm font-medium tracking-wide">
                  LIVE CRICKET UPDATES
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight font-display">
                  THE PITCH
                </h1>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tight font-display">
                  <span className="text-gradient">IS WAITING</span>
                </h1>
              </div>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-gray-300 max-w-lg leading-relaxed">
                Experience the thrill of professional cricket with live scores,
                detailed statistics, fantasy leagues, and exclusive news updates
                from around the globe.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection('live-scores')}
                  className="bg-primary hover:bg-cricket-gold-hover text-primary-foreground font-semibold px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Live Matches
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection('fantasy')}
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Fantasy League
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-primary font-display">50+</p>
                  <p className="text-sm text-gray-400">Live Matches</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-primary font-display">10K+</p>
                  <p className="text-sm text-gray-400">Players</p>
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-primary font-display">1M+</p>
                  <p className="text-sm text-gray-400">Active Users</p>
                </div>
              </div>
            </div>

            {/* Right Content - Player Image */}
            <div className="hidden lg:flex justify-center items-end relative">
              <div
                className="relative"
                style={{
                  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <img
                  src={heroPlayer}
                  alt="Cricket Player"
                  className="w-full max-w-lg object-contain drop-shadow-2xl animate-float"
                />
                {/* Glow Effect */}
                <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full -z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
}
