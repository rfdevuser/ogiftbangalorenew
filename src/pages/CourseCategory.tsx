import { useParams, Link, Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft, MapPin, Wifi } from 'lucide-react';
import { getCategoryById } from '@/data/courseCategories';
import heroImage from '@/assets/hero-courses.jpg';

const CourseCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryId ? getCategoryById(categoryId) : undefined;

  if (!category) {
    return <Navigate to="/courses" replace />;
  }

  const IconComponent = category.icon;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/50" />
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <Link 
            to="/courses" 
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-br ${category.color} text-white`}>
              <IconComponent className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{category.title}</h1>
              <p className="text-xl text-muted-foreground">{category.subtitle}</p>
            </div>
          </div>
          
          <p className="text-lg max-w-2xl">{category.description}</p>
        </div>
      </section>

       {/* Fashup Banner for student-11th-std */}
      {categoryId === 'student-9th-std' && (
        <div className="bg-destructive py-3">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="text-white font-bold text-sm md:text-base tracking-wide">
              🎉 Enroll for the Free 10 Days Fashup Taster Course!
            </span>
            <Button size="sm" variant="secondary" className="font-bold" asChild>
              <a href="https://wa.me/919036928799?text=Hi!%20I'm%20interested%20in%20the%20Free%2010%20Days%20Fashup%20Taster%20Course." target="_blank" rel="noopener noreferrer">Contact Us</a>
            </Button>
          </div>
        </div>
      )}

       {/* Fashup Banner for student-11th-std */}
      {categoryId === 'home-maker' && (
        <div className="bg-destructive py-3">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="text-white font-bold text-sm md:text-base tracking-wide">
              🎉 Enroll for the Free 10 Days Fashup Taster Course!
            </span>
            <Button size="sm" variant="secondary" className="font-bold" asChild>
              <a href="https://wa.me/919036928799?text=Hi!%20I'm%20interested%20in%20the%20Free%2010%20Days%20Fashup%20Taster%20Course." target="_blank" rel="noopener noreferrer">Contact Us</a>
            </Button>
          </div>
        </div>
      )}

       {categoryId === 'elite-design-entrance' && (
        <div className="bg-destructive py-3">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
            <span className="text-white font-bold text-sm md:text-base tracking-wide">
              🎉 Project Based Training Provided
            </span>
            <Button size="sm" variant="secondary" className="font-bold" asChild>
              <a href="https://wa.me/919036928799?text=Hi!%20I'm%20interested%20in%20the%20Free%2010%20Days%20Fashup%20Taster%20Course." target="_blank" rel="noopener noreferrer">Contact Us</a>
            </Button>
          </div>
        </div>
      )}

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Available Courses</h2>
            <p className="text-muted-foreground">
              {category.courses.length} courses available in this category
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.courses.map((course, index) => (
              <Card 
                key={index} 
                className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary bg-card"
              >
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
                    {course.category}
                  </span>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-500" />
                      <span className="text-muted-foreground">&</span>
                      <Wifi className="h-4 w-4 text-emerald-500" />
                      <span className="text-muted-foreground">Online & Offline</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 line-clamp-3">{course.description}</p>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-sm">Key Highlights:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {course.highlights.slice(0, 4).map((highlight, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="text-primary mr-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary">Contact us for details</p>
                  <Link 
                    to={`/courses/${course.slug}`} 
                    className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center gap-1 transition-colors"
                  >
                    Learn More →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Fashion Journey?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Contact us to learn more about enrollment, schedules, and fee structures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="#contact">Contact Us</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
                <Link to="/courses">View All Categories</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CourseCategory;
