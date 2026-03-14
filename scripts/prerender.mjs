// scripts/prerender.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, "../dist");

// Read the built index.html — this already has correct hashed asset paths
const template = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");

// ─── PER-ROUTE TITLES ────────────────────────────────────────────────────────
const routeTitles = {
  "/": "Onati Global Institute of Fashion Technology - Top Fashion Design Institute in Bangalore",
  "/courses": "Fashion Design Courses in Bangalore - OGIFT",
  "/about": "About OGIFT - Premier Fashion Design Institute Bangalore",
  "/placements": "Fashion Design Placements & Careers - OGIFT Bangalore",
  "/portfolio": "AI Portfolio Builder for Fashion Designers - OGIFT Bangalore",
  "/careers/work-from-home": "Work From Home Fashion Design Careers - OGIFT Bangalore",
  "/quicktour": "Quick Tour - OGIFT Fashion Design Institute Bangalore",
  "/courses/fashup-free-taster-sessions": "FASHUP Free Fashion Design Taster Sessions - OGIFT Bangalore",
  "/courses/fashion-illustration": "Fashion Illustration Course in Bangalore - OGIFT",
  "/courses/pattern-making-basic": "Pattern Making Basic Course in Bangalore - OGIFT",
  "/courses/pattern-making-blouses-advanced": "Advanced Blouse Pattern Making Course - OGIFT Bangalore",
  "/courses/pattern-making-western-advanced": "Advanced Western Pattern Making Course - OGIFT Bangalore",
  "/courses/art-of-garment-foundation": "Art of Garment Foundation Course - OGIFT Bangalore",
  "/courses/fabric-knowledge-textile-designing": "Fabric Knowledge & Textile Designing Course - OGIFT Bangalore",
  "/courses/draping-technology": "Draping Technology Course in Bangalore - OGIFT",
  "/courses/digital-portfolio-making": "Digital Portfolio Making Course - OGIFT Bangalore",
  "/courses/graphic-designing-for-fashion": "Graphic Designing for Fashion Course - OGIFT Bangalore",
  "/courses/fashion-designing-boutique-management": "Fashion Designing & Boutique Management Course - OGIFT Bangalore",
  "/courses/fashion-styling": "Fashion Styling Course in Bangalore - OGIFT",
  "/courses/pattern-making-kids-clothing": "Kids Clothing Pattern Making Course - OGIFT Bangalore",
  "/courses/pattern-making-boutique-management-3months": "3-Month Pattern Making & Boutique Management Diploma - OGIFT Bangalore",
  "/courses/design-process-pattern-making-3months": "3-Month Design Process & Pattern Making Course - OGIFT Bangalore",
  "/courses/design-pattern-making-portfolio-3months": "3-Month Design, Pattern Making & Portfolio Course - OGIFT Bangalore",
  "/courses/six-months-diploma-fashion-designing": "6-Month Diploma in Fashion Designing - OGIFT Bangalore",
  "/courses/one-year-advanced-diploma-fashion-designing": "1-Year Advanced Diploma in Fashion Designing - OGIFT Bangalore",
  "/courses/3-months-online-fashion-course": "3-Month Online Fashion Design Course - OGIFT Bangalore",
};

// ─── PER-ROUTE META DESCRIPTIONS ─────────────────────────────────────────────
const routeDescriptions = {
  "/": "India's leading AI-powered fashion design institute in Bangalore. Courses in fashion illustration, pattern making, draping, styling and boutique management. Hindi, English and Kannada. 100% placement support.",
  "/courses": "Explore fashion design courses at OGIFT Bangalore — free taster sessions, short courses, and advanced diplomas in pattern making, draping, fashion illustration, styling and boutique management.",
  "/about": "Onati Global Institute of Fashion Technology (OGIFT) is Bangalore's premier AI-powered fashion design institute. Expert faculty, industry-focused curriculum, multilingual learning and 100% placement support.",
  "/placements": "OGIFT Bangalore offers 100% placement assistance to all fashion design graduates. Our alumni work at leading fashion brands, boutiques and design houses across India.",
  "/portfolio": "Build a professional fashion design portfolio with OGIFT's AI-powered Portfolio Builder. Upload your designs, get expert AI critique, and create a portfolio that stands out to employers and clients.",
  "/careers/work-from-home": "Start a work-from-home fashion design career with OGIFT Bangalore. Learn online, build your portfolio, and launch a freelance fashion career from the comfort of your home.",
  "/quicktour": "Take a quick virtual tour of OGIFT Bangalore's fashion design institute. Explore our facilities, AI learning tools, classrooms and design studios.",
  "/courses/fashup-free-taster-sessions": "Try OGIFT's free 10-day FASHUP fashion design taster sessions. Experience fashion illustration, pattern making and design fundamentals before enrolling in a full course. No cost, no commitment.",
  "/courses/fashion-illustration": "Learn fashion illustration at OGIFT Bangalore. Master sketching fashion figures, rendering fabrics and creating professional fashion plates. Available in Hindi, English and Kannada.",
  "/courses/pattern-making-basic": "Learn the fundamentals of pattern making at OGIFT Bangalore. Master body measurements, basic blocks and pattern drafting techniques for garment construction.",
  "/courses/pattern-making-blouses-advanced": "Advanced blouse pattern making course at OGIFT Bangalore. Learn complex necklines, sleeve variations, fitting and alteration techniques for professional results.",
  "/courses/pattern-making-western-advanced": "Advanced western garment pattern making at OGIFT Bangalore. Master patterns for dresses, skirts, trousers, jackets and contemporary western silhouettes.",
  "/courses/art-of-garment-foundation": "Foundation course in garment construction at OGIFT Bangalore. Learn sewing techniques, fabric handling, seam finishes and basic garment assembly from scratch.",
  "/courses/fabric-knowledge-textile-designing": "Fabric knowledge and textile designing course at OGIFT Bangalore. Understand fiber types, weave structures, prints and fabric selection for different garment applications.",
  "/courses/draping-technology": "Master draping technology at OGIFT Bangalore. Learn to create garments directly on the dress form using fabric manipulation, pinning and creative draping techniques.",
  "/courses/digital-portfolio-making": "Create a professional digital fashion portfolio at OGIFT Bangalore. Learn industry-standard design software and portfolio presentation skills for fashion career success.",
  "/courses/graphic-designing-for-fashion": "Graphic designing for fashion at OGIFT Bangalore. Learn Adobe Illustrator, Photoshop and digital design tools specifically for fashion industry applications and tech packs.",
  "/courses/fashion-designing-boutique-management": "Combined fashion designing and boutique management course at OGIFT Bangalore. Learn to design, produce and run your own successful fashion boutique business.",
  "/courses/fashion-styling": "Professional fashion styling course at OGIFT Bangalore. Learn personal styling, editorial styling, wardrobe management and client consultation skills for a styling career.",
  "/courses/pattern-making-kids-clothing": "Specialized kids clothing pattern making course at OGIFT Bangalore. Learn age-appropriate sizing, growth allowances and design considerations for children's garments.",
  "/courses/pattern-making-boutique-management-3months": "Intensive 3-month diploma in pattern making and boutique management at OGIFT Bangalore. Gain practical skills to launch and run your own fashion boutique.",
  "/courses/design-process-pattern-making-3months": "3-month course in design process and pattern making at OGIFT Bangalore. Learn design methodology, concept development and professional pattern drafting techniques.",
  "/courses/design-pattern-making-portfolio-3months": "Comprehensive 3-month course covering design, pattern making and portfolio creation at OGIFT Bangalore. Build job-ready skills and a professional fashion portfolio.",
  "/courses/six-months-diploma-fashion-designing": "6-month diploma in fashion designing at OGIFT Bangalore. Comprehensive program covering fashion illustration, pattern making, garment construction, styling and portfolio development.",
  "/courses/one-year-advanced-diploma-fashion-designing": "1-year advanced diploma in fashion designing at OGIFT Bangalore. In-depth program with industry internship, AI tools, multilingual learning and 100% placement assistance.",
  "/courses/3-months-online-fashion-course": "Flexible 3-month online fashion design course at OGIFT Bangalore. Learn at your own pace with AI-powered tools, expert mentorship and live sessions in Hindi, English or Kannada.",
};

// ─── PER-ROUTE BODY CONTENT ───────────────────────────────────────────────────
const routeContent = {
  "/": `
    <h1>Onati Global Institute of Fashion Technology - Bangalore</h1>
    <p>India's leading AI-powered fashion design institute offering industry-recognized courses 
    in fashion illustration, pattern making, draping, styling, and more. 
    Located in Vinayakanagar, Bangalore. Available in Hindi, English and Kannada 
    with 100% placement support.</p>
    <h2>Our Courses</h2>
    <ul>
      <li><a href="/courses/fashup-free-taster-sessions">FASHUP Free Taster Sessions - Try for Free</a></li>
      <li><a href="/courses/fashion-illustration">Fashion Illustration Course</a></li>
      <li><a href="/courses/pattern-making-basic">Pattern Making Basic Course</a></li>
      <li><a href="/courses/draping-technology">Draping Technology Course</a></li>
      <li><a href="/courses/fashion-styling">Fashion Styling Course</a></li>
      <li><a href="/courses/fashion-designing-boutique-management">Fashion Designing and Boutique Management</a></li>
      <li><a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a></li>
      <li><a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a></li>
      <li><a href="/courses/3-months-online-fashion-course">3-Month Online Fashion Course</a></li>
    </ul>
    <h2>Why Choose OGIFT</h2>
    <ul>
      <li>AI-powered learning with conversational AI agents</li>
      <li>AI Portfolio Builder with expert feedback</li>
      <li>Virtual Fashion Counsellor available 24/7</li>
      <li>Courses in Hindi, English and Kannada</li>
      <li>100% placement assistance</li>
      <li>Industry-expert faculty</li>
    </ul>
    <a href="/courses">View All Courses</a>
    <a href="/about">About OGIFT</a>
    <a href="/placements">Placements</a>
    <a href="/portfolio">AI Portfolio Builder</a>
  `,
  "/courses": `
    <h1>Fashion Design Courses in Bangalore - OGIFT</h1>
    <p>Explore OGIFT Bangalore's comprehensive range of fashion design courses — from free taster 
    sessions to advanced diplomas. Expert faculty, AI-powered learning tools, 
    industry-focused curriculum, and multilingual support in Hindi, English and Kannada.</p>
    <h2>Free Course</h2>
    <ul>
      <li><a href="/courses/fashup-free-taster-sessions">FASHUP Free Taster Sessions - 10 Days Free</a></li>
    </ul>
    <h2>Short Courses</h2>
    <ul>
      <li><a href="/courses/fashion-illustration">Fashion Illustration Course</a></li>
      <li><a href="/courses/pattern-making-basic">Pattern Making Basic Course</a></li>
      <li><a href="/courses/pattern-making-blouses-advanced">Advanced Blouse Pattern Making Course</a></li>
      <li><a href="/courses/pattern-making-western-advanced">Advanced Western Pattern Making Course</a></li>
      <li><a href="/courses/art-of-garment-foundation">Art of Garment Foundation Course</a></li>
      <li><a href="/courses/fabric-knowledge-textile-designing">Fabric Knowledge and Textile Designing Course</a></li>
      <li><a href="/courses/draping-technology">Draping Technology Course</a></li>
      <li><a href="/courses/digital-portfolio-making">Digital Portfolio Making Course</a></li>
      <li><a href="/courses/graphic-designing-for-fashion">Graphic Designing for Fashion Course</a></li>
      <li><a href="/courses/fashion-designing-boutique-management">Fashion Designing and Boutique Management Course</a></li>
      <li><a href="/courses/fashion-styling">Fashion Styling Course</a></li>
      <li><a href="/courses/pattern-making-kids-clothing">Kids Clothing Pattern Making Course</a></li>
    </ul>
    <h2>Diploma Programs</h2>
    <ul>
      <li><a href="/courses/pattern-making-boutique-management-3months">3-Month Pattern Making and Boutique Management Diploma</a></li>
      <li><a href="/courses/design-process-pattern-making-3months">3-Month Design Process and Pattern Making Course</a></li>
      <li><a href="/courses/design-pattern-making-portfolio-3months">3-Month Design, Pattern Making and Portfolio Course</a></li>
      <li><a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a></li>
      <li><a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a></li>
      <li><a href="/courses/3-months-online-fashion-course">3-Month Online Fashion Design Course</a></li>
    </ul>
  `,
  "/about": `
    <h1>About OGIFT - Premier Fashion Design Institute Bangalore</h1>
    <p>Onati Global Institute of Fashion Technology (OGIFT) is Bangalore's premier 
    AI-powered fashion technology institute. We provide industry-recognized fashion design 
    education with expert faculty, modern facilities, and a curriculum designed 
    for real-world careers in fashion.</p>
    <p>Located in Vinayakanagar, Bangalore, OGIFT offers hands-on and online training in 
    fashion illustration, pattern making, draping, styling, and boutique management. 
    Our platform supports learning in Hindi, English and Kannada, making quality 
    fashion education accessible across India.</p>
    <h2>What Makes OGIFT Different</h2>
    <ul>
      <li>India's first AI-powered multilingual fashion training platform</li>
      <li>Conversational AI agents for personalised learning</li>
      <li>AI Portfolio Builder with expert design feedback</li>
      <li>Virtual Fashion Counsellor available 24/7</li>
      <li>Courses available in Hindi, English and Kannada</li>
      <li>100% placement support for all graduates</li>
      <li>Industry-expert faculty with real-world experience</li>
    </ul>
    <a href="/courses">Explore Our Courses</a>
    <a href="/placements">View Placements</a>
  `,
  "/placements": `
    <h1>Fashion Design Placements and Careers - OGIFT Bangalore</h1>
    <p>OGIFT Bangalore provides 100% placement assistance to all fashion design graduates. 
    Our dedicated placement team connects students with top fashion brands, boutiques, 
    design houses, and styling agencies across India.</p>
    <h2>Placement Support</h2>
    <ul>
      <li>100% placement assistance for all graduates</li>
      <li>Industry partnerships with leading fashion brands</li>
      <li>Portfolio preparation and interview coaching</li>
      <li>Internship opportunities at top fashion houses</li>
      <li>Career guidance from industry experts</li>
      <li>Work-from-home and freelance career pathways</li>
    </ul>
    <a href="/courses">View Our Courses</a>
    <a href="/careers/work-from-home">Work From Home Opportunities</a>
  `,
  "/portfolio": `
    <h1>AI Portfolio Builder for Fashion Designers - OGIFT Bangalore</h1>
    <p>Build your professional fashion design portfolio with OGIFT's AI-powered Portfolio Builder. 
    Upload your designs, receive expert AI critique and feedback, and create a standout 
    portfolio that impresses employers, clients and fashion brands.</p>
    <h2>Portfolio Builder Features</h2>
    <ul>
      <li>AI-powered design critique and feedback</li>
      <li>Professional portfolio templates for fashion designers</li>
      <li>Upload and showcase your fashion illustrations and garments</li>
      <li>Share your portfolio with potential employers</li>
      <li>Build your personal fashion brand identity</li>
    </ul>
    <a href="/courses">Start a Course to Build Your Portfolio</a>
  `,
  "/careers/work-from-home": `
    <h1>Work From Home Fashion Design Careers - OGIFT Bangalore</h1>
    <p>Start a successful work-from-home fashion design career with OGIFT Bangalore. 
    Learn online at your own pace, build a professional portfolio using our AI tools, 
    and launch a freelance fashion career from the comfort of your home.</p>
    <h2>Work From Home Opportunities in Fashion</h2>
    <ul>
      <li>Freelance fashion illustration and pattern making</li>
      <li>Online boutique design and management</li>
      <li>Fashion styling for social media and e-commerce</li>
      <li>Digital portfolio creation and fashion content</li>
      <li>Online fashion teaching and coaching</li>
    </ul>
    <a href="/courses/3-months-online-fashion-course">Start the 3-Month Online Fashion Course</a>
    <a href="/courses">View All Courses</a>
  `,
  "/quicktour": `
    <h1>Quick Tour - OGIFT Fashion Design Institute Bangalore</h1>
    <p>Take a quick virtual tour of OGIFT Bangalore's fashion design institute. 
    Explore our AI-powered learning platform, facilities, classrooms, design studios 
    and meet our expert faculty.</p>
    <a href="/courses">Explore Our Courses</a>
    <a href="/about">Learn More About OGIFT</a>
  `,
  "/courses/fashup-free-taster-sessions": `
    <h1>FASHUP Free Fashion Design Taster Sessions - OGIFT Bangalore</h1>
    <p>Try OGIFT's free 10-day FASHUP fashion design taster sessions. Experience 
    fashion illustration, pattern making, and design fundamentals at no cost 
    before enrolling in a full course. Available in Hindi, English and Kannada.</p>
    <h2>What You Will Learn</h2>
    <ul>
      <li>Introduction to fashion illustration</li>
      <li>Basic pattern making concepts</li>
      <li>Fabric types and selection</li>
      <li>Design fundamentals and colour theory</li>
      <li>Overview of fashion design career paths</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/fashion-illustration": `
    <h1>Fashion Illustration Course in Bangalore - OGIFT</h1>
    <p>Master fashion illustration techniques at OGIFT Bangalore. Learn to sketch 
    fashion figures, render fabrics, develop design collections and create 
    professional fashion plates for your portfolio.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Fashion figure drawing and croquis development</li>
      <li>Fabric rendering and texture techniques</li>
      <li>Design collection development</li>
      <li>Digital and hand illustration methods</li>
      <li>Professional fashion plate creation</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/pattern-making-basic": `
    <h1>Pattern Making Basic Course in Bangalore - OGIFT</h1>
    <p>Learn the fundamentals of pattern making at OGIFT Bangalore. Master body 
    measurements, basic blocks, dart manipulation and pattern drafting techniques 
    for garment construction.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Body measurement and ease allowances</li>
      <li>Basic bodice, skirt and sleeve blocks</li>
      <li>Dart manipulation techniques</li>
      <li>Pattern grading fundamentals</li>
      <li>Seam allowances and notches</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/pattern-making-blouses-advanced": `
    <h1>Advanced Blouse Pattern Making Course - OGIFT Bangalore</h1>
    <p>Advanced pattern making course specializing in blouses at OGIFT Bangalore. 
    Learn complex neckline variations, sleeve constructions, collar designs 
    and professional fitting and alteration techniques.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Complex neckline and collar patterns</li>
      <li>Sleeve variations and set-in constructions</li>
      <li>Blouse fitting and alteration techniques</li>
      <li>Traditional and contemporary blouse styles</li>
      <li>Production-ready pattern preparation</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/pattern-making-western-advanced": `
    <h1>Advanced Western Pattern Making Course - OGIFT Bangalore</h1>
    <p>Advanced western garment pattern making at OGIFT Bangalore. Master patterns 
    for dresses, skirts, trousers, jackets and contemporary western silhouettes 
    for professional garment production.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Dress and top pattern variations</li>
      <li>Trouser and skirt pattern construction</li>
      <li>Jacket and blazer pattern drafting</li>
      <li>Fitting corrections and alterations</li>
      <li>Contemporary western silhouettes</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/art-of-garment-foundation": `
    <h1>Art of Garment Foundation Course - OGIFT Bangalore</h1>
    <p>Foundation course in garment construction at OGIFT Bangalore. Learn sewing 
    techniques, fabric handling, seam finishes and complete garment assembly 
    from scratch for a strong practical base in fashion.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Sewing machine operation and maintenance</li>
      <li>Seam types and finishing techniques</li>
      <li>Fabric cutting and preparation</li>
      <li>Basic garment assembly and construction</li>
      <li>Hand stitching and embellishment basics</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/fabric-knowledge-textile-designing": `
    <h1>Fabric Knowledge and Textile Designing Course - OGIFT Bangalore</h1>
    <p>Learn fabric science and textile design at OGIFT Bangalore. Understand fiber 
    types, weave structures, dyeing and printing methods, and fabric selection 
    for different garment applications and fashion design projects.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Natural and synthetic fiber properties</li>
      <li>Weave structures and fabric construction</li>
      <li>Dyeing, printing and surface treatments</li>
      <li>Fabric selection for garment types</li>
      <li>Textile design and repeat patterns</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/draping-technology": `
    <h1>Draping Technology Course in Bangalore - OGIFT</h1>
    <p>Master draping technology at OGIFT Bangalore. Learn to create garments directly 
    on the dress form using fabric manipulation, creative pinning and professional 
    draping techniques used in high fashion and couture.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Dress form preparation and padding</li>
      <li>Basic and advanced draping techniques</li>
      <li>Bias cut and cowl draping</li>
      <li>Converting drapes to flat patterns</li>
      <li>Creative and experimental draping</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/digital-portfolio-making": `
    <h1>Digital Portfolio Making Course - OGIFT Bangalore</h1>
    <p>Create a professional digital fashion design portfolio at OGIFT Bangalore. 
    Learn industry-standard design software, portfolio layout and presentation 
    skills to showcase your work to employers and fashion brands.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Portfolio planning and curation strategies</li>
      <li>Digital design software for fashion portfolios</li>
      <li>Layout, typography and visual presentation</li>
      <li>Online portfolio platforms and sharing</li>
      <li>Tailoring your portfolio for job applications</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/graphic-designing-for-fashion": `
    <h1>Graphic Designing for Fashion Course - OGIFT Bangalore</h1>
    <p>Learn graphic design for the fashion industry at OGIFT Bangalore. Master 
    Adobe Illustrator, Photoshop and digital tools specifically for fashion 
    tech packs, mood boards, prints and brand identity design.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Adobe Illustrator for fashion flat sketches</li>
      <li>Photoshop for fashion image editing</li>
      <li>Mood board and presentation design</li>
      <li>Print and pattern design for textiles</li>
      <li>Brand identity and lookbook creation</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/fashion-designing-boutique-management": `
    <h1>Fashion Designing and Boutique Management Course - OGIFT Bangalore</h1>
    <p>Combined fashion design and boutique management course at OGIFT Bangalore. 
    Learn to design and produce garments and run your own successful fashion 
    boutique business with practical hands-on training.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Fashion design and garment construction</li>
      <li>Boutique setup and store management</li>
      <li>Buying, merchandising and inventory</li>
      <li>Fashion marketing and social media</li>
      <li>Customer service and business fundamentals</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/fashion-styling": `
    <h1>Fashion Styling Course in Bangalore - OGIFT</h1>
    <p>Professional fashion styling course at OGIFT Bangalore. Learn personal 
    styling, editorial styling, wardrobe management and client consultation 
    skills to build a successful fashion styling career.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Personal and editorial styling techniques</li>
      <li>Body types and dressing guidelines</li>
      <li>Wardrobe auditing and planning</li>
      <li>Fashion shoots and creative direction</li>
      <li>Building a styling client portfolio</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/pattern-making-kids-clothing": `
    <h1>Kids Clothing Pattern Making Course - OGIFT Bangalore</h1>
    <p>Specialized kids clothing pattern making at OGIFT Bangalore. Learn 
    age-appropriate sizing systems, growth allowances, safety considerations 
    and design details specific to children's garment construction.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Children's sizing charts and age groups</li>
      <li>Growth allowance and ease in kids patterns</li>
      <li>Safe garment construction for children</li>
      <li>Tops, bottoms and dress patterns for kids</li>
      <li>Novelty and fun design details for children's wear</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/pattern-making-boutique-management-3months": `
    <h1>3-Month Pattern Making and Boutique Management Diploma - OGIFT Bangalore</h1>
    <p>Intensive 3-month diploma combining pattern making and boutique management 
    at OGIFT Bangalore. Gain practical skills to design garments and launch and 
    run your own successful fashion boutique.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Complete pattern making from basic to advanced</li>
      <li>Boutique setup, layout and operations</li>
      <li>Stock management and buying</li>
      <li>Fashion retail marketing strategies</li>
      <li>Business planning for boutique owners</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/design-process-pattern-making-3months": `
    <h1>3-Month Design Process and Pattern Making Course - OGIFT Bangalore</h1>
    <p>Comprehensive 3-month course in design process and pattern making at OGIFT 
    Bangalore. Learn design methodology, concept development, trend research and 
    professional pattern drafting techniques.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Design research and trend forecasting</li>
      <li>Concept and mood board development</li>
      <li>Design to pattern workflow</li>
      <li>Professional pattern drafting and grading</li>
      <li>Collection development fundamentals</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/design-pattern-making-portfolio-3months": `
    <h1>3-Month Design, Pattern Making and Portfolio Course - OGIFT Bangalore</h1>
    <p>Comprehensive 3-month course at OGIFT Bangalore covering design, pattern making 
    and professional portfolio creation. Build complete job-ready skills and a 
    strong fashion design portfolio in one program.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Fashion design and concept development</li>
      <li>Pattern making for multiple garment types</li>
      <li>Portfolio planning and curation</li>
      <li>Digital presentation and styling</li>
      <li>Career preparation and placement support</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/six-months-diploma-fashion-designing": `
    <h1>6-Month Diploma in Fashion Designing - OGIFT Bangalore</h1>
    <p>Comprehensive 6-month diploma in fashion designing at OGIFT Bangalore. 
    Covering fashion illustration, pattern making, garment construction, draping, 
    styling and portfolio development with 100% placement assistance.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Fashion illustration and design process</li>
      <li>Pattern making and garment construction</li>
      <li>Draping and fabric technology</li>
      <li>Fashion styling and merchandise</li>
      <li>Portfolio building and career preparation</li>
      <li>100% placement assistance</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/one-year-advanced-diploma-fashion-designing": `
    <h1>1-Year Advanced Diploma in Fashion Designing - OGIFT Bangalore</h1>
    <p>Advanced 1-year diploma in fashion designing at OGIFT Bangalore. In-depth 
    program with AI-powered learning tools, industry internship opportunities, 
    multilingual support and 100% placement assistance for a complete fashion career launch.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Advanced fashion illustration and design</li>
      <li>Complete pattern making and garment construction</li>
      <li>Draping, textile and fabric technology</li>
      <li>Fashion styling, merchandising and business</li>
      <li>AI Portfolio Builder and digital tools</li>
      <li>Industry internship and live projects</li>
      <li>100% placement assistance</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/courses/3-months-online-fashion-course": `
    <h1>3-Month Online Fashion Design Course - OGIFT Bangalore</h1>
    <p>Flexible 3-month online fashion design course at OGIFT Bangalore. Learn at 
    your own pace with AI-powered conversational learning tools, expert mentorship 
    and live sessions available in Hindi, English and Kannada.</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Flexible online learning schedule</li>
      <li>AI-powered conversational learning agents</li>
      <li>Live mentorship sessions with expert faculty</li>
      <li>Available in Hindi, English and Kannada</li>
      <li>AI Portfolio Builder access included</li>
      <li>Certificate on completion</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
};

// ─── BUILD LOOP ───────────────────────────────────────────────────────────────
let successCount = 0;
let errorCount = 0;

for (const [route, content] of Object.entries(routeContent)) {
  try {
    // Build the output directory path
    const routeDir =
      route === "/"
        ? distDir
        : path.join(distDir, ...route.split("/").filter(Boolean));

    // Create the directory if it doesn't exist
    fs.mkdirSync(routeDir, { recursive: true });

    const title = routeTitles[route] || "OGIFT Bangalore - Fashion Design Institute";
    const description = routeDescriptions[route] || "";
    const canonical = `https://www.ogiftbangalore.com${route === "/" ? "" : route}`;

    // Inject content + update title, description and canonical per route
    const html = template
      .replace(
        '<div id="root"></div>',
        `<div id="root" suppressHydrationWarning="true">${content}</div>`
      )
      .replace(
        /<title>.*?<\/title>/s,
        `<title>${title}</title>`
      )
      .replace(
        /<meta name="description" content=".*?"/,
        `<meta name="description" content="${description}"`
      )
      .replace(
        /<link rel="canonical" href=".*?"/,
        `<link rel="canonical" href="${canonical}"`
      )
      .replace(
        /<meta property="og:title" content=".*?"/,
        `<meta property="og:title" content="${title}"`
      )
      .replace(
        /<meta property="og:description" content=".*?"/,
        `<meta property="og:description" content="${description}"`
      )
      .replace(
        /<meta property="og:url" content=".*?"/,
        `<meta property="og:url" content="${canonical}"`
      )
      .replace(
        /<meta name="twitter:title" content=".*?"/,
        `<meta name="twitter:title" content="${title}"`
      )
      .replace(
        /<meta name="twitter:description" content=".*?"/,
        `<meta name="twitter:description" content="${description}"`
      );

    // Write the HTML file
    fs.writeFileSync(path.join(routeDir, "index.html"), html);
    console.log(`✅ Prerendered: ${route}`);
    successCount++;
  } catch (err) {
    console.error(`❌ Failed: ${route}`, err);
    errorCount++;
  }
}

console.log(`\n🎉 Prerender complete: ${successCount} succeeded, ${errorCount} failed`);
