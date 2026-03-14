import { Home, GraduationCap, School, Award, Users } from 'lucide-react';

export interface Course {
  title: string;
  duration: string;
  category: string;
  description: string;
  highlights: string[];
  fees: string;
  slug: string;
  mode: 'Offline' | 'Online' | 'Hybrid';
}

export interface CourseCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: typeof Home;
  color: string;
  courses: Course[];
}

// All courses data
const allCourses: Course[] = [
  {
    title: 'FASHUP - Experience Our FREE Taster Sessions',
    duration: '10 Days',
    category: 'Certificate',
    description: 'There is no better way to start your fashion journey than experiencing the OGIFT Way of Introducing you to the Truly Fascinating world of Fashion.',
    highlights: ['Have Fun Learning', 'Meet Like Minded Enthusiasts', 'Seek Advice from our Trained Faculty', 'Take The Plunge'],
    fees: "Absolutely FREE",
    slug: "fashup-free-taster-sessions",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Fashion Illustration',
    duration: '1 Month',
    category: 'Certificate',
    description: 'Acquire a good foundation to understanding of skills required to visually communicate your designs.',
    highlights: ['Figure Drawing & Proportions', 'Garment Rendering', 'Technical Drawing', 'Media & Color'],
    fees: "₹15,000",
    slug: "fashion-illustration",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Pattern Making (Basic)',
    duration: '1 Month',
    category: 'Certificate',
    description: 'Dive into the fascinating world of Pattern Creation and Development.',
    highlights: ['Creative Design', 'Pattern Making', 'Pattern Visualization', 'Basics of Pattern Development'],
    fees: "₹12,000",
    slug: "pattern-making-basic",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Pattern Making Blouses (Advanced)',
    duration: '1 Month',
    category: 'Certificate',
    description: 'Dive into the fascinating world of Pattern Creation and Development of Blouses.',
    highlights: ['Creative Design', 'Pattern Making', 'Pattern Visualization', 'Introduction to Pattern Development'],
    fees: "₹15,000",
    slug: "pattern-making-blouses-advanced",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Pattern Making Western (Advanced)',
    duration: '1 Month',
    category: 'Certificate',
    description: 'Dive into the fascinating world of Pattern Creation and Development of Western Clothing',
    highlights: ['Creative Design', 'Pattern Making', 'Pattern Visualization', 'Introduction to Pattern Development'],
    fees: "₹15,000",
    slug: "pattern-making-western-advanced",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Art of Garment Foundation',
    duration: '1 Month',
    category: 'Certificate',
    description: 'Learn the basics of essential skills and technical knowledge needed to construct, fit, and finish clothing.',
    highlights: ['Pattern Making & Grading', 'Fabric Science', 'Sewing Techniques', 'Fit & Alterations'],
    fees: "₹12,000",
    slug: "art-of-garment-foundation",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Fabric Knowledge and Textile Designing',
    duration: '1 Month',
    category: 'Certificate',
    description: 'This course focusses on the material science of textiles and the creative processes involved in designing and producing fabrics.',
    highlights: ['Fiber to Fabric', 'Weaving & Knitting Structures', 'CAD Textile Design', 'Printing & Finishing'],
    fees: "Call Institute",
    slug: "fabric-knowledge-textile-designing",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Draping Technology',
    duration: '1 Month',
    category: 'Certificate',
    description: 'This fabulous course will introduce you to the fundamentals of Draping Technology course that teaches the three-dimensional method of pattern creation by manipulating fabric directly on a dress form.',
    highlights: ['Block Development', 'Design Interpretation', 'Muslin Manipulation', 'Transfer To Paper'],
    fees: "Call Institute",
    slug: "draping-technology",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Digital Portfolio Making',
    duration: '1 Month',
    category: 'Certificate',
    description: 'This course will focus on strategically curating, designing, and presenting creative work online to appeal to potential employers or clients.',
    highlights: ['Platform Selection & Structure', 'Visual Presentation & Curation', 'Content Strategy', 'Digital Tools & Interactivity'],
    fees: "Call Institute",
    slug: "digital-portfolio-making",
    mode: 'Online'
  },
  {
    title: 'Express Mastery Month - Graphic Designing for Fashion',
    duration: '1 Month',
    category: 'Certificate',
    description: 'This course course focuses on applying core graphic design principles specifically within the fashion industry context, from branding to marketing materials.',
    highlights: ['Fashion Branding & Identity', 'Layout & Collateral Design', 'Digital Marketing Assets', 'Software Proficiency'],
    fees: "₹15,000",
    slug: "graphic-designing-for-fashion",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Fashion Designing and Boutique Management',
    duration: '1 Month',
    category: 'Certificate',
    description: 'With this course, you will get introduced to the business and retail skills needed to successfully launch, operate, and grow a small fashion retail enterprise.',
    highlights: ['Inventory & Merchandising', 'Financial Management', 'Customer Experience & Sales', 'Legal & Operations'],
    fees: "₹12,000",
    slug: "fashion-designing-boutique-management",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Fashion Styling',
    duration: '1 Month',
    category: 'Certificate',
    description: 'This course will introduce you to the visual and creative skills necessary to select and coordinate clothing and accessories for photoshoots, editorials, and personal clients.',
    highlights: ['Image Conception & Mood Boards', 'Wardrobe Curation & Sourcing', 'Editorial & Commercial Styling', 'Client & Body Analysis'],
    fees: "Call Institute",
    slug: "fashion-styling",
    mode: 'Offline'
  },
  {
    title: 'Express Mastery Month - Pattern Making for Kids Clothing',
    duration: '1 Month',
    category: 'Certificate',
    description: 'Dive into the fascinating world of Pattern Creation and Development of Kids Clothing',
    highlights: ['Creative Design', 'Pattern Making', 'Pattern Visualization', 'Introduction to Pattern Development'],
    fees: "Call Institute",
    slug: "pattern-making-kids-clothing",
    mode: 'Offline'
  },
  {
    title: 'Short Certificate Course in Pattern Making and Boutique Management (PMBM)',
    duration: '3 Months',
    category: 'Certificate',
    description: 'Dive into the world of fashion with our 3-Months Certificate Course in Fashion Designing. Gain hands-on skills in design fundamentals, fabric knowledge, and garment construction.',
    highlights: ['Creative Design', 'Pattern Making', 'CAD Design', 'Portfolio Development'],
    fees: "₹35,000",
    slug: "pattern-making-boutique-management-3months",
    mode: 'Offline'
  },
  {
    title: 'Short Certificate Course in Design Process and Pattern Making (DPPM)',
    duration: '3 Months',
    category: 'Certificate',
    description: 'Dive into the world of fashion with our 3-Months Certificate Course in Fashion Designing. Gain hands-on skills in design fundamentals, fabric knowledge, and garment construction.',
    highlights: ['Creative Design', 'Pattern Making', 'CAD Design', 'Portfolio Development'],
    fees: "₹35,000",
    slug: "design-process-pattern-making-3months",
    mode: 'Offline'
  },
  {
    title: 'Short Certificate Course in Design Pattern Making, Design Process and Portfolio (DPPMP)',
    duration: '3 Months',
    category: 'Certificate',
    description: 'Dive into the world of fashion with our 3-Months Certificate Course in Fashion Designing. Gain hands-on skills in design fundamentals, fabric knowledge, and garment construction.',
    highlights: ['Creative Design', 'Pattern Making', 'CAD Design', 'Portfolio Development'],
    fees: "₹35,000",
    slug: "design-pattern-making-portfolio-3months",
    mode: 'Offline'
  },
  {
    title: 'Six Months Diploma in Fashion Designing',
    duration: '6 Months',
    category: 'Diploma',
    description: 'Dive into the world of fashion with our 6-month Diploma in Fashion Designing. Gain hands-on skills in design fundamentals, fabric knowledge, and garment construction.',
    highlights: ['Creative Design', 'Pattern Making', 'CAD Design', 'Portfolio Development'],
    fees: "₹55,000",
    slug: "six-months-diploma-fashion-designing",
    mode: 'Offline'
  },
  {
    title: 'One Year Advanced Diploma in Fashion Designing',
    duration: '1 Year',
    category: 'Advanced Diploma',
    description: 'Technical program focusing on garment construction, production planning, quality control, and textile science.',
    highlights: ['Production Planning', 'Quality Control', 'Textile Science', 'Manufacturing'],
    fees: "₹1,20,000",
    slug: "one-year-advanced-diploma-fashion-designing",
    mode: 'Offline'
  },
];

// Course categories based on audience from syllabus sheet
export const courseCategories: CourseCategory[] = [
  {
    id: 'home-maker',
    title: 'Home Maker',
    subtitle: 'Learn at Your Own Pace',
    description: 'Perfect courses for homemakers looking to develop new skills, start a home-based boutique, or pursue their passion for fashion design.',
    icon: Home,
    color: 'from-pink-500 to-rose-500',
    courses: [
      allCourses.find(c => c.slug === 'pattern-making-basic')!,
      allCourses.find(c => c.slug === 'pattern-making-blouses-advanced')!,
      allCourses.find(c => c.slug === 'pattern-making-western-advanced')!,
      // allCourses.find(c => c.slug === 'art-of-garment-foundation')!,
      // allCourses.find(c => c.slug === 'fashion-designing-boutique-management')!,
      allCourses.find(c => c.slug === 'pattern-making-boutique-management-3months')!,
      allCourses.find(c => c.slug === 'design-process-pattern-making-3months')!,
      allCourses.find(c => c.slug === 'design-pattern-making-portfolio-3months')!,
    ].filter(Boolean)
  },
  {
    id: 'student-9th-std',
    title: 'For School Students',
    subtitle: 'Summer Vacation & Weekend Programs',
    description: 'Ideal courses for high school students to explore fashion during summer vacations or weekends, building a foundation for future careers.',
    icon: School,
    color: 'from-blue-500 to-cyan-500',
    courses: [
      allCourses.find(c => c.slug === 'fashion-illustration')!,
      allCourses.find(c => c.slug === 'pattern-making-basic')!,
      allCourses.find(c => c.slug === 'art-of-garment-foundation')!,
      allCourses.find(c => c.slug === 'graphic-designing-for-fashion')!,
      // allCourses.find(c => c.slug === 'pattern-making-boutique-management-3months')!,
      // allCourses.find(c => c.slug === 'design-process-pattern-making-3months')!,
      // allCourses.find(c => c.slug === 'design-pattern-making-portfolio-3months')!,
    ].filter(Boolean)
  },
  {
    id: 'after-puc',
    title: 'After PUC Students',
    subtitle: 'Diploma & Certificate Programs',
    description: 'Comprehensive programs for students who have completed PUC, offering certificate courses, diplomas, and advanced diplomas in fashion designing.',
    icon: GraduationCap,
    color: 'from-purple-500 to-violet-500',
    courses: [
      allCourses.find(c => c.slug === 'fashion-illustration')!,
      allCourses.find(c => c.slug === 'pattern-making-basic')!,
      allCourses.find(c => c.slug === 'pattern-making-blouses-advanced')!,
      allCourses.find(c => c.slug === 'pattern-making-western-advanced')!,
      allCourses.find(c => c.slug === 'art-of-garment-foundation')!,
      allCourses.find(c => c.slug === 'pattern-making-kids-clothing')!,
      // allCourses.find(c => c.slug === 'graphic-designing-for-fashion')!,
      // allCourses.find(c => c.slug === 'fashion-designing-boutique-management')!,

      allCourses.find(c => c.slug === 'pattern-making-boutique-management-3months')!,
      allCourses.find(c => c.slug === 'design-process-pattern-making-3months')!,
      allCourses.find(c => c.slug === 'design-pattern-making-portfolio-3months')!,
      // allCourses.find(c => c.slug === 'six-months-diploma-fashion-designing')!,
      // allCourses.find(c => c.slug === 'one-year-advanced-diploma-fashion-designing')!,
    ].filter(Boolean)
  },
  {
    id: 'elite-design-entrance',
    title: 'Elite Design Schools Entrance Preparation',
    subtitle: 'Foundation Courses',
    description: 'Specialized courses designed to prepare students for NIFT, NID, and other elite design school entrance examinations with portfolio building and skill development.',
    icon: Award,
    color: 'from-amber-500 to-orange-500',
    courses: [
      allCourses.find(c => c.slug === 'graphic-designing-for-fashion')!,
      allCourses.find(c => c.slug === 'art-of-garment-foundation')!,
      allCourses.find(c => c.slug === 'pattern-making-basic')!,
      allCourses.find(c => c.slug === 'digital-portfolio-making')!,
      // allCourses.find(c => c.slug === 'pattern-making-boutique-management-3months')!,
      // allCourses.find(c => c.slug === 'design-process-pattern-making-3months')!,
      // allCourses.find(c => c.slug === 'design-pattern-making-portfolio-3months')!,
    ].filter(Boolean)
  },
  {
    id: 'for-all',
    title: 'For Everyone',
    subtitle: 'Open to All Learners',
    description: 'Courses suitable for anyone interested in fashion, regardless of background or experience level. Start your creative journey today!',
    icon: Users,
    color: 'from-emerald-500 to-teal-500',
    courses: [
      allCourses.find(c => c.slug === 'fashup-free-taster-sessions')!,
      allCourses.find(c => c.slug === 'fabric-knowledge-textile-designing')!,
      allCourses.find(c => c.slug === 'draping-technology')!,
      allCourses.find(c => c.slug === 'fashion-styling')!,
      allCourses.find(c => c.slug === 'six-months-diploma-fashion-designing')!,
      allCourses.find(c => c.slug === 'one-year-advanced-diploma-fashion-designing')!,
    ].filter(Boolean)
  },
];

export const getCategoryById = (id: string): CourseCategory | undefined => {
  return courseCategories.find(cat => cat.id === id);
};

export const getCourseBySlug = (slug: string): Course | undefined => {
  return allCourses.find(course => course.slug === slug);
};

export const getAllCourses = (): Course[] => allCourses;
