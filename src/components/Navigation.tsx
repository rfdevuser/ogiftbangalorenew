import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';


const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About Us' },
    { to: '/placements', label: 'Placements' },
    
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
            {/* <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground"></span>
            </div> */}
            <img src="/OGLogo.jpg" style={{height:"50px",width:"50px"}}></img>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">Onati Global</span>
              <span className="text-xs text-muted-foreground">Institute of Fashion Technology</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="default" asChild>
              <a href="/Admissions">Enroll Now</a>
            </Button>
             <Button variant="default" asChild>
              <a href="/payment">Make Payment</a>
            </Button>
              {/* <Button variant="default" asChild>
              <a href="/downloadapp">Download Demo App for Android</a>
            </Button> */}
            
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.to ? 'text-primary' : 'text-foreground'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <Button variant="default" asChild className="w-full">
                <a href="/Admissions" onClick={() => setMobileMenuOpen(false)}>Enroll Now</a>
              </Button>
               <Button variant="default" asChild className="w-full">
                <a href="/payment" onClick={() => setMobileMenuOpen(false)}>Make Payment</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
