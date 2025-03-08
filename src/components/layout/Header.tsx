
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Resources', path: '/resources' },
    { title: 'Dashboard', path: '/dashboard' },
  ];
  
  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <BookOpen className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-accent animate-pulse-slow" />
            </div>
            <span className="text-xl font-semibold font-display">EduPath</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  'nav-link',
                  location.pathname === link.path && 'active'
                )}
              >
                {link.title}
              </Link>
            ))}
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hover:bg-white/20 backdrop-blur-sm">Sign In</Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 transition-colors">Get Started</Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground p-2 rounded-full hover:bg-white/20 backdrop-blur-sm transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={cn(
                    'text-foreground/80 hover:text-foreground py-2 px-4 rounded-md transition-colors',
                    location.pathname === link.path && 'bg-white/20 text-foreground font-medium'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-2 border-t border-white/20">
                <Button variant="ghost" className="justify-start hover:bg-white/20">Sign In</Button>
                <Button className="justify-start">Get Started</Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
