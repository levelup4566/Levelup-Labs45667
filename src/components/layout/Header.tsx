
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserButton, useAuth, useUser } from '@clerk/clerk-react'
import LoginCheck from '../database/login/LoginCheck';
import LoginInsert from '../database/login/LoginInsert';


const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { userId , isSignedIn } = useAuth();
  const { user } = useUser()

  useEffect(() => {
    if (isSignedIn && user){
      console.log("Clerk user id: " , userId)
      console.log("About the user" , user)
      LoginCheck(user.id).then((data)=>{
        console.log("checked user" , data)
        if (!data){
          LoginInsert(user.id , user.emailAddresses[0].emailAddress , user.fullName , user.username)
        }else{
          console.log("user already there" , data)
        }
      }).catch((error)=> {
        console.error("error checking user" , error)
      })

    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [userId]);

  const navLinks = [
    { title: 'Home', path: '/' },
  ];

  const handleGetStarted = () => {
    navigate('/sign-up');
  };

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
              <Layers className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <Sparkles className="h-4 w-4 absolute -top-1 -right-1 text-accent animate-pulse-slow" />
            </div>
            <span className="text-xl font-semibold font-display">Levelup Labs</span>
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

          <div className="flex items-center gap-6">

            {isSignedIn ? (
              <UserButton />
            ) : (
              <div className='flex gap-5'>

                <Link to="/signup">
                  <button className="pt-2 pb-2 px-4 hover:bg-[#e67e22] hover:rounded-[10px] text-white cursor-pointer bg-gradient-to-r from-blue-700 to-blue-400">Get Started</button>
                </Link>

              </div>
            )}
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
                <Button
                  variant="ghost"
                  className="justify-start hover:bg-white/20"
                  onClick={() => {
                    navigate('/sign-in');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="justify-start"
                  onClick={() => {
                    navigate('/sign-up');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
