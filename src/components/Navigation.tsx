import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [onlineCourseOpen, setOnlineCourseOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/courses', label: 'Courses' },
    { to: '/about', label: 'About Us' },
    { to: '/placements', label: 'Placements' },
    { to: '/counsellor', label: 'Counsellor'},
    { to: '/community', label: 'Assets Registry'},
    { to: '/portfolio', label: 'Portfolio Builder'},
    { to: '/careers/work-from-home', label: 'Careers At OGIFT'},
    // { to: '/fabric-sim', label: 'Fabric Lab' },
    
   

  ];

  const onlineCourseLinks = [
    { to: '/quicktour', label: 'Quick Tour' },
    { to: '/courses/onlinecourse', label: 'About' },
    { to: '/interactive-training', label: 'Interactive Training Teaser' },
    { to: '/ai-avatar', label: 'Start Course' },
  ];

  const isOnlineCourseActive = onlineCourseLinks.some(
    (link) => location.pathname === link.to
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-2">
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

            {/* Online Course Dropdown - Hover */}
            <div className="relative group">
              <button
                className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 ${
                  isOnlineCourseActive ? 'text-primary' : 'text-foreground'
                }`}
              >
                Online Course
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-background border border-border rounded-md shadow-lg py-1 min-w-[140px] z-50">
                  {onlineCourseLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={`block px-4 py-2 text-sm transition-colors hover:bg-accent ${
                        location.pathname === link.to ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Button variant="default" asChild>
              <a href="/admissions">Enroll Now</a>
            </Button>
            <Button variant="default" asChild>
              <a href="/payment">Make Payment</a>
            </Button>
            <Button variant="default" asChild>
              <a href="/register">Register</a>
            </Button>
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

              {/* Mobile Online Course Dropdown */}
              <div className="flex flex-col">
                <button
                  onClick={() => setOnlineCourseOpen(!onlineCourseOpen)}
                  className={`text-sm font-medium transition-colors hover:text-primary flex items-center justify-between ${
                    isOnlineCourseActive ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  Online Course
                  <ChevronDown className={`h-4 w-4 transition-transform ${onlineCourseOpen ? 'rotate-180' : ''}`} />
                </button>
                {onlineCourseOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2 border-l-2 border-border pl-4">
                    {onlineCourseLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className={`text-sm font-medium transition-colors hover:text-primary ${
                          location.pathname === link.to ? 'text-primary' : 'text-muted-foreground'
                        }`}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setOnlineCourseOpen(false);
                        }}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <Button variant="default" asChild className="w-full">
                <a href="/admissions" onClick={() => setMobileMenuOpen(false)}>Enroll Now</a>
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
