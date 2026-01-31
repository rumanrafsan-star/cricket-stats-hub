import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Trophy, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Live Scores', href: '#live-scores' },
  { name: 'Fixtures', href: '#fixtures' },
  { name: 'Stats', href: '#stats' },
  { name: 'Fantasy', href: '#fantasy' },
  { name: 'News', href: '#news' },
  { name: 'Rankings', href: '#rankings' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { session, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="flex items-center gap-2 group"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isScrolled ? 'bg-primary' : 'bg-white/10 backdrop-blur-sm'
              }`}>
                <Trophy className={`w-6 h-6 ${isScrolled ? 'text-primary-foreground' : 'text-primary'}`} />
              </div>
              <span className={`text-2xl font-bold tracking-tight transition-colors font-display ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                Cricket<span className="text-primary">Pro</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 ${
                    isScrolled
                      ? 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-2">
              {session ? (
                <>
                  <span className={`text-sm font-medium ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                    {session.user?.email}
                  </span>
                  <Link to="/profile">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`rounded-full ${
                        isScrolled
                          ? 'border-primary text-primary hover:bg-primary/10'
                          : 'border-white/20 text-white hover:bg-white/10'
                      }`}
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className={`rounded-full ${
                      isScrolled
                        ? 'border-primary text-primary hover:bg-primary/10'
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`}
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      className={`rounded-full ${
                        isScrolled
                          ? 'text-foreground hover:bg-muted'
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                      className={`rounded-full px-6 transition-all duration-300 ${
                        isScrolled
                          ? 'bg-primary hover:bg-cricket-gold-hover text-primary-foreground'
                          : 'bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/20'
                      }`}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
        <div
          className={`absolute top-20 left-4 right-4 bg-card rounded-2xl shadow-2xl p-6 transition-all duration-300 ${
            isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border">
              {session ? (
                <>
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    {session.user?.email}
                  </div>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="rounded-full"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full rounded-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-cricket-gold-hover text-primary-foreground rounded-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
