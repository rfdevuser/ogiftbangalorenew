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
  "/": "Best Fashion Design Institute in Bangalore | OGIFT Onati Global | Admissions 2026",
  "/courses": "Fashion Design Courses in Bangalore 2026 | OGIFT | Best Fashion Institute",
  "/about": "About OGIFT | Best Fashion Design College in Bangalore | Since 2010",
  "/placements": "100% Placement | Fashion Design Jobs Bangalore | OGIFT 2026",
  "/admissions": "Fashion Design Admissions 2026 | OGIFT Bangalore | Enroll Now",
  "/counsellor": "Free AI Fashion Career Counsellor | OGIFT Bangalore | Admissions 2026",
  "/portfolio": "AI Fashion Portfolio Builder Bangalore 2026 | OGIFT | Free for Students",
  "/videos": "Fashion Design Video Lessons Bangalore | OGIFT | Free Learning 2026",
  "/community": "Fashion Design Community Bangalore | OGIFT | Share & Learn 2026",
  "/quicktour": "Best Online Fashion Design Course India 2026 | OGIFT | AI-Powered 3 Month Tour",
  "/interactive-training": "Interactive Fashion Training | OGIFT Bangalore | AI-Powered 2026",
  "/faqavatar": "Fashion Design FAQ Avatar | OGIFT Bangalore | Get Answers 2026",
  "/fabric-sim": "Interactive 3D Fabric Simulation Tool | OGIFT Bangalore | Fashion Technology",
  "/verify": "Verify Fashion Design Certificate | OGIFT Bangalore | Blockchain Verified",
  "/careers/work-from-home": "Work From Home Fashion Jobs Bangalore | OGIFT Careers 2026",
  "/courses/fashup-free-taster-sessions": "FASHUP Free Fashion Design Course Bangalore 2026 | OGIFT | Enroll Now",
  "/courses/fashion-illustration": "Best Fashion Illustration Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/pattern-making-basic": "Best Pattern Making Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/pattern-making-blouses-advanced": "Best Blouse Pattern Making Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/pattern-making-western-advanced": "Best Western Pattern Making Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/art-of-garment-foundation": "Best Garment Construction Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/fabric-knowledge-textile-designing": "Best Fabric & Textile Designing Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/draping-technology": "Best Draping Technology Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/digital-portfolio-making": "Best Fashion Portfolio Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/graphic-designing-for-fashion": "Best Graphic Design for Fashion Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/fashion-designing-boutique-management": "Best Boutique Management Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/fashion-styling": "Best Fashion Styling Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/pattern-making-kids-clothing": "Best Kids Clothing Pattern Making Course Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/pattern-making-boutique-management-3months": "Best Pattern Making & Boutique Management Course Bangalore 2026 | OGIFT",
  "/courses/design-process-pattern-making-3months": "Best Fashion Design & Pattern Making Course Bangalore 2026 | OGIFT | DPPM",
  "/courses/design-pattern-making-portfolio-3months": "Best Fashion Design Portfolio Course Bangalore 2026 | OGIFT | DPPMP Admissions",
  "/courses/six-months-diploma-fashion-designing": "Best 6 Month Fashion Designing Diploma Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/one-year-advanced-diploma-fashion-designing": "Best 1 Year Advanced Fashion Designing Diploma Bangalore 2026 | OGIFT | Admissions Open",
  "/courses/onlinecourse": "Best Online Fashion Design Course India 2026 | OGIFT | 3 Months AI-Powered",
};

// ─── PER-ROUTE META DESCRIPTIONS ─────────────────────────────────────────────
const routeDescriptions = {
  "/": "Rated 4.9★ — OGIFT is Bangalore's best fashion design institute. 100% placement support, expert industry faculty & modern studios. Pattern making, garment construction, styling & diploma courses. Admissions 2026 open!",
  "/courses": "Explore Bangalore's best fashion design courses at OGIFT. Admissions 2026 open — pattern making, garment construction, fashion illustration, boutique management, styling & advanced diplomas. 100% placement assistance.",
  "/about": "OGIFT — Bangalore's best fashion design college since 2010. Rated 4.9★ on Google. Expert industry faculty, world-class design studios, 50+ brand partnerships & 100% placement support at Vinayakanagar, Bangalore.",
  "/placements": "OGIFT delivers 100% placement for fashion design graduates in Bangalore. 500+ alumni at Fabindia, Myntra, Raymond, Zara, H&M & 50+ top brands. Avg package ₹4.5L. Best fashion institute for placements — since 2010.",
  "/admissions": "Fashion design admissions 2026 now open at OGIFT Bangalore. Apply for 1-month, 3-month, 6-month or 1-year diploma programs. 100% placement support. Enroll at Vinayakanagar, Bangalore — call +91-90369-28799.",
  "/counsellor": "Get free personalized fashion career guidance from Amy, OGIFT's AI counsellor. Explore courses, check admissions 2026 eligibility & plan your fashion design career at Bangalore's 4.9★ rated best fashion institute.",
  "/portfolio": "Build a winning fashion portfolio with AI critique at OGIFT — Bangalore's best fashion institute (4.9★). Upload sketches, get expert feedback on proportion, color theory & commercial viability. Free for enrolled students.",
  "/videos": "Watch fashion design video lessons at OGIFT Bangalore — pattern making, garment construction, styling & more in English, Hindi & Kannada. 4.9★ rated best fashion institute. Admissions 2026 open!",
  "/community": "Join OGIFT's fashion design community in Bangalore — share portfolios, get feedback, connect with peers & industry experts. 4.9★ rated best fashion institute. Admissions 2026 open!",
  "/quicktour": "India's best AI-powered online fashion design course at OGIFT — 3-month certificate, 40+ video modules, multi-lingual (Hindi, Kannada, Telugu, English). 4.9★ rated. Admissions 2026 open. Enroll now!",
  "/interactive-training": "Experience interactive AI-powered fashion design training at OGIFT Bangalore. Learn pattern making, garment construction & styling with immersive 3D training at Bangalore's 4.9★ best fashion institute.",
  "/faqavatar": "Get instant answers to fashion design questions with OGIFT's FAQ Avatar. Course info, admissions 2026, fees & career guidance at Bangalore's 4.9★ best fashion institute.",
  "/fabric-sim": "Explore fabric physics with OGIFT's interactive 3D simulation — test draping, weight, wind & stiffness with AI analysis. Free tool for fashion design students at Bangalore's 4.9★ best fashion institute.",
  "/verify": "Verify OGIFT Bangalore fashion design certificates & digital assets on blockchain. Authenticate student credentials from Bangalore's 4.9★ best fashion institute.",
  "/careers/work-from-home": "Explore work-from-home fashion career opportunities with OGIFT Bangalore. Earn from home using your fashion design skills — pattern making, styling & boutique management. 4.9★ rated best fashion institute.",
  "/courses/fashup-free-taster-sessions": "Try fashion design FREE at OGIFT Bangalore! FASHUP — 10-day taster course covering fashion basics, body measurements, bodice block & stitching. Free certificate. 4.9★ rated. Enroll 2026!",
  "/courses/fashion-illustration": "Best fashion illustration course in Bangalore at OGIFT — figure drawing, color theory, croqui proportions, fabric folds & garment rendering. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/pattern-making-basic": "Best pattern making course in Bangalore at OGIFT — bodice block, kurta, skirts, trousers & blouse. 1-month, 9 patterns covered. 4.9★ rated. 100% placement. Admissions 2026 open!",
  "/courses/pattern-making-blouses-advanced": "Best blouse pattern making course in Bangalore at OGIFT — 8 advanced styles: princess cut, boat neck, cape sleeve, puff sleeve & peplum. 1-month, 4.9★ rated. 100% placement. Admissions 2026 open!",
  "/courses/pattern-making-western-advanced": "Best advanced Western pattern making course in Bangalore at OGIFT — skirt blocks, trousers, cascade skirts, empire waist & reversible jacket. 1-month, 4.9★ rated. 100% placement. Admissions 2026 open!",
  "/courses/art-of-garment-foundation": "Best garment construction course in Bangalore at OGIFT — sewing techniques, pattern making & professional finishing in 1-month Express Mastery. 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/fabric-knowledge-textile-designing": "Best textile designing course in Bangalore at OGIFT — textile science, fiber types, yarn construction & fabric finishing. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/draping-technology": "Best draping technology course in Bangalore at OGIFT — 3D pattern making on dress forms, bodice, skirt, sleeve & gown draping. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/digital-portfolio-making": "Best fashion portfolio course in Bangalore at OGIFT — mood boards, storyboards, logo design, spec sheets & garment development. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/graphic-designing-for-fashion": "Best graphic design for fashion course in Bangalore at OGIFT — digital illustration, pen tool, fabric effects & fashion branding. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/fashion-designing-boutique-management": "Best boutique management course in Bangalore at OGIFT — brand identity, inventory, visual merchandising, pricing & digital promotion. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/fashion-styling": "Best fashion styling course in Bangalore at OGIFT — body type analysis, image makeover, trend forecasting & editorial styling. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/pattern-making-kids-clothing": "Best kids clothing pattern making course in Bangalore at OGIFT — A-line frock, gathered frock, umbrella frock, layered skirt & jabla. 1-month, 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/pattern-making-boutique-management-3months": "Best 3-month pattern making & boutique management course in Bangalore at OGIFT. Garment patterns, business skills, inventory & boutique operations. 4.9★ rated. 100% placement. Admissions 2026 open!",
  "/courses/design-process-pattern-making-3months": "Best fashion design & pattern making 3-month course (DPPM) in Bangalore at OGIFT — design fundamentals, illustration, textile science. 107 hours. 4.9★ rated. 100% placement. Admissions 2026 open!",
  "/courses/design-pattern-making-portfolio-3months": "Best 3-month fashion design, pattern making & portfolio course (DPPMP) in Bangalore at OGIFT — design, construction & professional portfolio. 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/six-months-diploma-fashion-designing": "Best 6-month fashion designing diploma in Bangalore at OGIFT — design fundamentals, pattern making, garment construction, textile science & portfolio. 4.9★ rated. 100% placement support. Admissions 2026 open!",
  "/courses/one-year-advanced-diploma-fashion-designing": "Best 1-year advanced fashion designing diploma in Bangalore at OGIFT — design, pattern making, garment construction, styling, portfolio & 100% placement support. 4.9★ rated. Admissions 2026 open!",
  "/courses/onlinecourse": "Best online fashion design course in India at OGIFT — 3-month AI-powered, multi-lingual (English, Hindi, Kannada). Pattern making, garment construction, illustration & boutique management. 4.9★ rated. Admissions 2026 open!",
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
  "/courses/onlinecourse": `
    <h1>Best Online Fashion Design Course India 2026 - OGIFT Bangalore</h1>
    <p>Best 3-month online fashion design course in India at OGIFT Bangalore. Learn at
    your own pace with AI-powered conversational learning tools, expert mentorship
    and live sessions available in Hindi, English and Kannada. 4.9★ rated. Admissions 2026 open!</p>
    <h2>Course Highlights</h2>
    <ul>
      <li>Flexible online learning schedule</li>
      <li>AI-powered conversational learning agents</li>
      <li>Live mentorship sessions with expert faculty</li>
      <li>Available in Hindi, English and Kannada</li>
      <li>AI Portfolio Builder access included</li>
      <li>Certificate on completion</li>
      <li>100% placement support</li>
    </ul>
    <a href="/courses">View All Courses</a>
    <a href="/admissions">Enroll Now - Admissions 2026</a>`,
  "/admissions": `
    <h1>Fashion Design Admissions 2026 - OGIFT Bangalore</h1>
    <p>Fashion design admissions 2026 now open at OGIFT Bangalore — Bangalore's best
    fashion design institute (4.9★). Apply for 1-month, 3-month, 6-month or 1-year
    diploma programs with 100% placement support. Located at Vinayakanagar, Bangalore.</p>
    <h2>Programs Available</h2>
    <ul>
      <li><a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a></li>
      <li><a href="/courses/pattern-making-basic">1-Month Express Mastery Courses</a></li>
      <li><a href="/courses/pattern-making-boutique-management-3months">3-Month Diploma Programs</a></li>
      <li><a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a></li>
      <li><a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma</a></li>
      <li><a href="/courses/onlinecourse">3-Month Online Course</a></li>
    </ul>
    <h2>Why Choose OGIFT</h2>
    <ul>
      <li>Rated 4.9★ on Google</li>
      <li>100% placement assistance</li>
      <li>Expert industry faculty</li>
      <li>Located at Vinayakanagar, Bangalore</li>
      <li>Call +91-90369-28799 to enroll</li>
    </ul>
    <a href="/courses">View All Courses</a>`,
  "/counsellor": `
    <h1>Free AI Fashion Career Counsellor - OGIFT Bangalore 2026</h1>
    <p>Get free personalized fashion career guidance from Amy, OGIFT's AI counsellor.
    Explore courses, check admissions 2026 eligibility and plan your fashion design
    career at Bangalore's 4.9★ rated best fashion institute.</p>
    <h2>What Amy Can Help With</h2>
    <ul>
      <li>Course selection and recommendations</li>
      <li>Admissions 2026 eligibility and process</li>
      <li>Career paths in fashion design</li>
      <li>Fee structure and payment options</li>
      <li>Placement support and career guidance</li>
    </ul>
    <a href="/admissions">Apply for Admissions 2026</a>
    <a href="/courses">View All Courses</a>`,
  "/videos": `
    <h1>Fashion Design Video Lessons Bangalore - OGIFT 2026</h1>
    <p>Watch fashion design video lessons at OGIFT Bangalore in English, Hindi and
    Kannada. Pattern making, garment construction, styling tutorials and more at
    Bangalore's 4.9★ rated best fashion institute. Admissions 2026 open!</p>
    <h2>Video Topics Available</h2>
    <ul>
      <li>Introduction to Fashion Design</li>
      <li>Pattern Making Fundamentals</li>
      <li>Garment Construction Techniques</li>
      <li>Fashion Illustration Basics</li>
      <li>Fashion Styling Tips</li>
    </ul>
    <a href="/admissions">Enroll for Full Course Access</a>
    <a href="/courses">View All Courses</a>`,
  "/community": `
    <h1>Fashion Design Community Bangalore - OGIFT 2026</h1>
    <p>Join OGIFT's fashion design community in Bangalore — share portfolios, get
    feedback, connect with fashion design peers and industry experts. 4.9★ rated
    best fashion institute in Bangalore. Admissions 2026 open!</p>
    <h2>Community Features</h2>
    <ul>
      <li>Share your fashion designs and portfolios</li>
      <li>Get feedback from peers and experts</li>
      <li>Connect with fashion industry professionals</li>
      <li>Discover trending fashion content</li>
      <li>Build your fashion design reputation</li>
    </ul>
    <a href="/admissions">Join OGIFT - Admissions 2026</a>
    <a href="/courses">View All Courses</a>`,
  "/interactive-training": `
    <h1>Interactive Fashion Training - OGIFT Bangalore 2026</h1>
    <p>Experience interactive AI-powered fashion design training at OGIFT Bangalore.
    Learn pattern making, garment construction and styling with immersive 3D training
    at Bangalore's 4.9★ best fashion institute. Admissions 2026 open!</p>
    <h2>Training Features</h2>
    <ul>
      <li>AI-powered interactive fashion avatar</li>
      <li>3D garment and fabric visualisation</li>
      <li>Hands-on pattern making guidance</li>
      <li>Real-time feedback on designs</li>
      <li>Multi-lingual support: Hindi, Kannada, English</li>
    </ul>
    <a href="/admissions">Enroll Now - Admissions 2026</a>
    <a href="/courses">View All Courses</a>`,
  "/faqavatar": `
    <h1>Fashion Design FAQ Avatar - OGIFT Bangalore 2026</h1>
    <p>Get instant answers to fashion design questions with OGIFT's FAQ Avatar.
    Course info, admissions 2026, fees and career guidance at Bangalore's
    4.9★ best fashion institute. Ask anything about fashion design!</p>
    <h2>Common Questions</h2>
    <ul>
      <li>What fashion courses are available at OGIFT?</li>
      <li>How do I apply for admissions 2026?</li>
      <li>What are the course fees?</li>
      <li>Does OGIFT provide placement support?</li>
      <li>Are online fashion courses available?</li>
    </ul>
    <a href="/admissions">Apply Now - Admissions 2026</a>
    <a href="/counsellor">Talk to AI Counsellor Amy</a>`,
  "/fabric-sim": `
    <h1>Interactive 3D Fabric Simulation - OGIFT Bangalore Fashion Technology</h1>
    <p>Explore fabric physics with OGIFT's interactive 3D simulation tool — test
    draping, weight, wind and stiffness with AI-powered analysis. Free for fashion
    design students at Bangalore's 4.9★ best fashion institute.</p>
    <h2>Simulation Features</h2>
    <ul>
      <li>Real-time 3D fabric draping simulation</li>
      <li>Adjustable weight, stiffness and wind parameters</li>
      <li>AI-powered fabric behaviour analysis</li>
      <li>Multiple fabric type presets</li>
      <li>Visual learning for draping courses</li>
    </ul>
    <a href="/courses/draping-technology">Enroll in Draping Technology Course</a>
    <a href="/courses">View All Courses</a>`,
  "/verify": `
    <h1>Verify Fashion Design Certificate - OGIFT Bangalore</h1>
    <p>Verify OGIFT Bangalore fashion design certificates and digital assets on
    blockchain. Authenticate student credentials from Bangalore's 4.9★ best
    fashion institute. Tamper-proof blockchain verification.</p>
    <a href="/courses">View All Courses</a>
    <a href="/admissions">Apply for Admissions 2026</a>`,
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
