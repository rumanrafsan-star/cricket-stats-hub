import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  'Quick Links': [
    { name: 'Live Scores', href: '#live-scores' },
    { name: 'Fixtures', href: '#fixtures' },
    { name: 'Statistics', href: '#stats' },
    { name: 'Fantasy', href: '#fantasy' },
  ],
  'Features': [
    { name: 'Team Rankings', href: '#rankings' },
    { name: 'Player Stats', href: '#stats' },
    { name: 'News & Updates', href: '#news' },
    { name: 'Fan Polls', href: '#polls' },
  ],
  'Support': [
    { name: 'Help Center', href: '#' },
    { name: 'Contact Us', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-cricket-darker text-white">
      {/* CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold font-display">
                NEVER MISS A <span className="text-primary">MATCH</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Subscribe to our newsletter and get live scores, match updates, and exclusive content delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-500 h-14 rounded-full px-6"
              />
              <Button className="bg-primary hover:bg-cricket-gold-hover text-primary-foreground h-14 px-8 rounded-full font-semibold">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-6">
              <a href="#home" className="flex items-center gap-2">
                <div className="p-2 bg-primary rounded-xl">
                  <Trophy className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-2xl font-bold font-display">
                  Cricket<span className="text-primary">Pro</span>
                </span>
              </a>
              <p className="text-gray-400 text-sm">
                Your ultimate destination for live cricket scores, statistics, fantasy leagues, and exclusive news.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold text-lg mb-4">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        className="text-gray-400 hover:text-primary transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  info@cricketpro.com
                </li>
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="w-4 h-4 text-primary" />
                  +1 234 567 890
                </li>
                <li className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4 text-primary mt-0.5" />
                  123 Cricket Street,<br />Sports City, SC 12345
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 CricketPro. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
