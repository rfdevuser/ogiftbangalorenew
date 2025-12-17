import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Onati Global Institute</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Leading fashion design and technology institute in Bangalore, empowering creative minds since 2024.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/placements" className="text-muted-foreground hover:text-primary transition-colors">Placements</Link></li>
            </ul>
          </div>

          {/* <div>
            <h4 className="font-semibold mb-4">Popular Courses</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Fashion Design</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Garment Technology</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Fashion Styling</Link></li>
              <li><Link to="/courses" className="text-muted-foreground hover:text-primary transition-colors">Textile Design</Link></li>
            </ul>
          </div> */}

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">No 95/2 Jesu Krupa Complex,1st Floor, Above Canara Bank,Old Airport Road, Bangalore, Karnataka 560017,
                 </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+919036928799" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 90369 28799
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:admissions@ogiftbangalore.com" className="text-muted-foreground hover:text-primary transition-colors">
                  admissions@ogiftbangalore.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Onati Global Institute of Fashion Technology. All rights reserved.</p>
          <p className="mt-2">
            <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            {' • '}
            <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
