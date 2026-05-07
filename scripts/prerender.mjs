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
    <h1>Best Fashion Design Institute in Bangalore — OGIFT Onati Global</h1>
    <p>Onati Global Institute of Fashion Technology (OGIFT) is Bangalore's highest-rated fashion design institute, located in Vinayakanagar, Bengaluru, Karnataka. Founded in 2010, OGIFT has trained thousands of fashion designers, garment technologists, stylists, and boutique entrepreneurs across Karnataka and beyond. The institute holds a 4.9-star rating based on over 250 verified Google reviews, making it consistently the top-reviewed fashion institute in Bangalore.</p>
    <p>OGIFT offers a complete range of fashion education programmes — from the free FASHUP 10-day taster to 1-month Express Mastery courses, 3-month vocational programmes, 6-month diplomas, and a comprehensive 1-year advanced diploma in fashion designing. Courses cover fashion illustration, pattern making (basic and advanced), draping technology, garment construction, fabric and textile science, fashion styling, graphic design for fashion, boutique management, digital portfolio development, and a 3-month online fashion course. Every programme leads to a certificate or diploma recognised by the Indian fashion industry.</p>
    <p>The curriculum at OGIFT is taught by faculty with active industry experience in design studios, export houses, and garment manufacturing companies across India. All programmes are taught in English, Hindi, and Kannada. OGIFT's placement record is one of its most valued outcomes — the institute provides 100% placement support to all graduates, with an active network of industry partners including Fabindia, Raymond, Myntra, Lifestyle, Zara, H&M, and leading boutique design studios across Bangalore.</p>
    <h2>Our Courses</h2>
    <ul>
      <li><a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a></li>
      <li><a href="/courses/fashion-illustration">Fashion Illustration Course Bangalore</a></li>
      <li><a href="/courses/pattern-making-basic">Pattern Making Basic Course Bangalore</a></li>
      <li><a href="/courses/draping-technology">Draping Technology Course Bangalore</a></li>
      <li><a href="/courses/fashion-styling">Fashion Styling Course Bangalore</a></li>
      <li><a href="/courses/art-of-garment-foundation">Garment Construction Course Bangalore</a></li>
      <li><a href="/courses/fabric-knowledge-textile-designing">Fabric &amp; Textile Designing Course</a></li>
      <li><a href="/courses/graphic-designing-for-fashion">Graphic Design for Fashion Course</a></li>
      <li><a href="/courses/fashion-designing-boutique-management">Boutique Management Course Bangalore</a></li>
      <li><a href="/courses/pattern-making-blouses-advanced">Advanced Blouse Pattern Making Course</a></li>
      <li><a href="/courses/pattern-making-western-advanced">Advanced Western Pattern Making Course</a></li>
      <li><a href="/courses/pattern-making-kids-clothing">Kids Clothing Pattern Making Course</a></li>
      <li><a href="/courses/design-process-pattern-making-3months">Design Process &amp; Pattern Making 3-Month Course</a></li>
      <li><a href="/courses/design-pattern-making-portfolio-3months">Design, Pattern Making &amp; Portfolio 3-Month Course</a></li>
      <li><a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a></li>
      <li><a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a></li>
      <li><a href="/courses/onlinecourse">3-Month Online Fashion Course</a></li>
    </ul>
    <a href="/courses">View All Courses</a>
    <a href="/about">About OGIFT</a>
    <a href="/admissions">Admissions 2026</a>
    <a href="/placements">Placements</a>
    <a href="/verify">Verify OGIFT Certificate</a>
    <a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a>
    <a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a>
    <a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a>
    <a href="/courses/fashion-illustration">Fashion Illustration Course</a>
  `,
  "/courses": `
    <h1>Fashion Design Courses in Bangalore 2026 — OGIFT Best Fashion Institute</h1>
    <p>OGIFT offers a complete range of fashion education programmes at its campus in Vinayakanagar, Bengaluru. From the free FASHUP 10-day taster to 1-month Express Mastery courses, 3-month vocational programmes, a 6-month diploma, and a 1-year advanced diploma in fashion designing. The institute is rated 4.9-star based on 250+ verified Google reviews — the highest rating of any fashion institute in Bangalore. All courses include a certificate or diploma on completion, and OGIFT provides 100% placement support to help graduates find employment in the Indian fashion industry.</p>
    <p>Short courses (1 month, Express Mastery series) cover Fashion Illustration, Draping Technology, Fashion Styling, Pattern Making, Fabric &amp; Textile Science, Graphic Design for Fashion, and Boutique Management. Three-month vocational programmes cover the Design Process &amp; Pattern Making and a 3-month Portfolio course. Six-month and one-year diplomas provide comprehensive coverage of all fashion disciplines.</p>
    <h2>How to Choose the Right Course</h2>
    <p>If you are completely new to fashion, the free FASHUP 10-day programme is the ideal starting point. If you have a specific skill to develop quickly, the Express Mastery 1-month courses are immediately practical. If you want a full qualification that opens the door to professional design roles, the 6-month or 1-year diploma is the best investment. Eligibility for all courses is Class 10 (SSC) and above. Contact the OGIFT admissions team at +91 90369 28799 or admissions@ogiftbangalore.com.</p>
    <h2>All Courses</h2>
    <ul>
      <li><a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a></li>
      <li><a href="/courses/fashion-illustration">Fashion Illustration Course Bangalore</a></li>
      <li><a href="/courses/pattern-making-basic">Pattern Making Basic Course Bangalore</a></li>
      <li><a href="/courses/pattern-making-blouses-advanced">Advanced Blouse Pattern Making Course</a></li>
      <li><a href="/courses/pattern-making-western-advanced">Advanced Western Pattern Making Course</a></li>
      <li><a href="/courses/art-of-garment-foundation">Art of Garment Foundation Course</a></li>
      <li><a href="/courses/fabric-knowledge-textile-designing">Fabric Knowledge and Textile Designing Course</a></li>
      <li><a href="/courses/draping-technology">Draping Technology Course Bangalore</a></li>
      <li><a href="/courses/digital-portfolio-making">Digital Portfolio Making Course</a></li>
      <li><a href="/courses/graphic-designing-for-fashion">Graphic Designing for Fashion Course</a></li>
      <li><a href="/courses/fashion-designing-boutique-management">Fashion Designing and Boutique Management Course</a></li>
      <li><a href="/courses/fashion-styling">Fashion Styling Course Bangalore</a></li>
      <li><a href="/courses/pattern-making-kids-clothing">Kids Clothing Pattern Making Course</a></li>
      <li><a href="/courses/pattern-making-boutique-management-3months">3-Month Pattern Making and Boutique Management</a></li>
      <li><a href="/courses/design-process-pattern-making-3months">3-Month Design Process and Pattern Making Course</a></li>
      <li><a href="/courses/design-pattern-making-portfolio-3months">3-Month Design, Pattern Making and Portfolio Course</a></li>
      <li><a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a></li>
      <li><a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a></li>
      <li><a href="/courses/onlinecourse">3-Month Online Fashion Design Course</a></li>
    </ul>
    <h2>Explore OGIFT</h2>
    <a href="/">OGIFT Home — Best Fashion Design Institute Bangalore</a>
    <a href="/about">About OGIFT</a>
    <a href="/admissions">Fashion Design Admissions 2026</a>
    <a href="/verify">Verify OGIFT Certificate</a>
    <a href="/fabric-sim">Interactive 3D Fabric Simulation Tool</a>
    <a href="/faqavatar">Fashion Design FAQ Avatar</a>
    <a href="/videos">Fashion Design Video Lessons</a>
  `,
  "/about": `
    <h1>About OGIFT — Best Fashion Design College in Bangalore Since 2010</h1>
    <p>Onati Global Institute of Fashion Technology (OGIFT) was founded in 2010 with a single purpose: to provide Bangalore's aspiring fashion designers and garment technologists with the practical, industry-ready skills needed to build lasting careers. Over 15 years, OGIFT has trained thousands of students from across Karnataka and beyond, establishing itself as Bangalore's most trusted and highest-rated fashion institute. The institute holds a 4.9-star rating based on over 250 verified Google reviews.</p>
    <p>The OGIFT campus is located in Vinayakanagar, Bengaluru — well-connected by public transport from South, Central, and West Bangalore. The campus includes professional pattern making labs, sewing ateliers, draping studios, a fabric and textile library, and dedicated design workspaces. All programmes are taught by faculty with active industry experience in fashion design houses, garment export companies, and retail brands across India. Classes are conducted in English, Hindi, and Kannada.</p>
    <h2>Our Programmes</h2>
    <p>OGIFT offers a complete spectrum of fashion education — from the free FASHUP 10-day taster to 1-month Express Mastery courses, 3-month vocational programmes, a 6-month diploma, and a 1-year advanced diploma in fashion designing. Subjects covered include fashion illustration, flat pattern making (basic and advanced), draping technology, garment construction, fabric and textile science, surface ornamentation, fashion styling, graphic design for fashion, boutique and retail management, digital portfolio development, and an AI-powered online course accessible from across India.</p>
    <h2>Placement Support</h2>
    <p>OGIFT's 100% placement support is one of the institute's most valued outcomes. An active network of industry partners — including Fabindia, Raymond, Myntra, Lifestyle, Zara, H&amp;M, and boutique design studios across Bangalore — provides graduates with access to real employment opportunities. The OGIFT careers team works with every graduate individually to match their skills, interests, and location preferences to relevant job openings. Admissions for 2026 are open; contact the institute at +91 90369 28799.</p>
    <a href="/">OGIFT Home — Best Fashion Design Institute Bangalore</a>
    <a href="/courses">Explore Our Courses</a>
    <a href="/admissions">Admissions 2026</a>
    <a href="/verify">Verify OGIFT Certificate</a>
    <a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a>
    <a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a>
    <a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a>
    <a href="/courses/fashion-illustration">Fashion Illustration Course</a>
  `,
  "/placements": `
    <h1>100% Placement Support — Fashion Design Jobs Bangalore | OGIFT 2026</h1>
    <p>OGIFT's 100% placement support programme is available to every graduate of the institute's courses and diploma programmes. The fashion industry in India is growing rapidly — driven by e-commerce, domestic retail expansion, export garment manufacturing, and the increasing global demand for Indian design talent — and OGIFT's placement network is built to connect graduates directly with the opportunities created by this growth. Industry partners include Fabindia, Raymond, Myntra, Lifestyle, Zara, H&amp;M, and boutique design studios across Bangalore and Karnataka.</p>
    <p>Placement support at OGIFT begins before graduation. As students complete their programmes, the OGIFT careers team reviews their portfolio, discusses their career goals, and begins matching them to suitable openings. Mock interviews, résumé preparation, and professional presentation sessions are part of the placement preparation process. Graduates interested in freelancing, entrepreneurship, or boutique ownership also receive guidance on how to establish themselves independently.</p>
    <h2>Career Paths for OGIFT Graduates</h2>
    <p>OGIFT graduates pursue careers across the full breadth of the Indian fashion industry. Common career paths include fashion designer, assistant designer, pattern maker, garment technician, production executive, fashion stylist, visual merchandiser, boutique manager, fashion illustrator, costume designer, fashion educator, and e-commerce product photographer. Graduates with entrepreneurial ambitions launch their own boutiques, tailoring units, or freelance styling and design consultancies.</p>
    <a href="/courses">View Our Courses</a>
    <a href="/admissions">Apply Now</a>
    <h2>Fashion Careers and Community at OGIFT</h2>
    <p>Beyond in-studio placement, OGIFT supports graduates who prefer flexible working arrangements through its <a href="/careers/work-from-home">Work From Home fashion jobs programme</a> — connecting qualified graduates with remote assignments in illustration, digital pattern making, and fashion content creation. The <a href="/community">OGIFT fashion design community</a> is a hub for peer learning, portfolio sharing, and staying connected with OGIFT's growing network of 500+ alumni. Graduates who want to develop commercially valuable digital skills benefit from the <a href="/courses/graphic-designing-for-fashion">Graphic Design for Fashion course</a> and the <a href="/courses/fashion-styling">Fashion Styling course</a>, both of which are directly linked to the highest-demand job roles in OGIFT's placement network.</p>
  `,
  "/portfolio": `
    <h1>AI Fashion Portfolio Builder Bangalore 2026 — OGIFT Free for Students</h1>
    <p>OGIFT's AI Fashion Portfolio Builder is a free digital tool that helps fashion design students and graduates create a professional portfolio to showcase their work to employers, clients, and design schools. A strong portfolio is essential for any fashion career — it is the primary way that designers, illustrators, stylists, and pattern makers demonstrate their skills and creative sensibility to potential employers. The OGIFT Portfolio Builder uses AI to guide you through the process of selecting, organising, and presenting your best work in a format that meets current industry expectations.</p>
    <p>The Portfolio Builder is available free to all OGIFT students and graduates as part of the institute's 100% placement support programme. It supports multiple types of portfolio content — fashion illustrations, technical flat drawings, garment photographs, mood boards, fabric swatches, and written design rationales. Each section includes guidance on what employers in specific roles are looking for, so you can tailor your portfolio to the opportunities you are targeting.</p>
    <h2>Portfolio Courses at OGIFT</h2>
    <p>If you want structured, faculty-guided support for building your portfolio, OGIFT offers dedicated portfolio courses — the Digital Portfolio Making course (1 month) and the Design Pattern Making Portfolio 3-Month course. These programmes combine technical skill development with professional presentation training, and every student graduates with a completed, employer-ready portfolio. To learn more, visit the OGIFT campus in Vinayakanagar or call +91 90369 28799.</p>
    <h2>Fashion Portfolio Courses at OGIFT Bangalore</h2>
    <p>OGIFT offers two dedicated portfolio programmes for students who want structured, faculty-guided support for building their portfolio. The <a href="/courses/digital-portfolio-making">Digital Portfolio Making course</a> is a 1-month Express Mastery programme covering portfolio strategy, layout design, digital tools, and online presentation — ideal for students who already have fashion skills and want to present them professionally. The <a href="/courses/design-pattern-making-portfolio-3months">Design, Pattern Making and Portfolio 3-month course (DPPMP)</a> combines creative design, pattern making skills, and complete portfolio development in an integrated three-month qualification — for students who want to build both their skills and their portfolio at the same time.</p>
    <a href="/courses">Start a Course to Build Your Portfolio</a>
  `,
  "/careers/work-from-home": `
    <h1>Work From Home Fashion Design Opportunities — OGIFT Bangalore</h1>
    <p>OGIFT's Work From Home programme offers qualified fashion design graduates and skilled fashion professionals the opportunity to earn an income from home by taking on fashion design and garment-related work assignments through OGIFT's employer network. The programme is designed for graduates who have the skills to deliver professional-quality fashion work but prefer the flexibility of home-based freelance work — whether due to family commitments, location constraints, or a preference for independent working.</p>
    <p>Work-from-home assignments available through the OGIFT network include fashion illustration, digital pattern making, trend research and reporting, graphic design for fashion brands, social media content creation for boutiques and fashion labels, online fashion tutoring, garment specification writing, and quality review of design documents.</p>
    <h2>Who Can Register?</h2>
    <p>The Work From Home programme is open to OGIFT graduates and to qualified fashion professionals who can demonstrate relevant skills through a portfolio review. Registration is free for OGIFT graduates. To register, complete the application form and upload your portfolio and OGIFT qualification details. For questions, contact the OGIFT careers team at +91 90369 28799 or admissions@ogiftbangalore.com. OGIFT's Work From Home opportunities are available to students across Karnataka and India — making it an ideal income-generating option for those who have completed OGIFT's 3-month online fashion course from other cities and want to apply their skills without relocating to Bangalore.</p>
    <a href="/courses/onlinecourse">Start the 3-Month Online Fashion Course</a>
    <a href="/courses">View All Courses</a>
    <a href="/placements">100% Placement Support</a>
    <a href="/courses/fashion-styling">Fashion Styling Course</a>
    <a href="/courses/graphic-designing-for-fashion">Graphic Design for Fashion Course</a>
    <a href="/videos">Fashion Design Video Lessons</a>
    <a href="/community">Fashion Design Community</a>
  `,
  "/quicktour": `
    <h1>Best Online Fashion Design Course India 2026 — OGIFT 3-Month AI-Powered Tour</h1>
    <p>OGIFT's Quick Tour is an AI-powered interactive introduction to the institute's 3-month online fashion design course — designed for anyone across India who wants to experience online fashion education at OGIFT before committing to a full enrolment. The Quick Tour gives you a structured preview of the course content, teaching style, and learning outcomes so you can make a fully informed decision about whether OGIFT's online programme is right for you. It is completely free and takes approximately 20–30 minutes to complete.</p>
    <p>The 3-month online course at OGIFT covers fashion fundamentals, design elements and principles, colour theory, fabric knowledge, pattern making basics, garment construction concepts, fashion illustration, and introduction to fashion business and retail. All content is delivered through OGIFT's AI-powered interactive platform, which includes video lessons, quizzes, downloadable resources, and access to live faculty sessions. The course is taught in English, Hindi, and Kannada. On completion, students receive an OGIFT certificate recognised by the Indian fashion industry.</p>
    <h2>Who Is the Online Course For?</h2>
    <p>OGIFT's 3-month online course is ideal for students in cities and towns outside Bangalore who cannot attend in person, working professionals who want to learn fashion design at their own pace, homemakers who want to develop fashion skills from home, and anyone who wants to assess online learning with OGIFT before applying for an in-person course at the Bangalore campus. No prior fashion experience is required. Eligibility is Class 10 (SSC) and above. Contact the OGIFT admissions team at +91 90369 28799 or admissions@ogiftbangalore.com.</p>
    <a href="/courses/onlinecourse">Enroll in the 3-Month Online Course</a>
    <a href="/courses">Explore Our Courses</a>
    <a href="/videos">Fashion Design Video Lessons</a>
    <a href="/interactive-training">Interactive Fashion Training</a>
  `,
  "/courses/fashup-free-taster-sessions": `
    <h1>FASHUP Free Fashion Design Course Bangalore 2026 — OGIFT | Enroll Now</h1>
    <p>FASHUP is OGIFT's signature free introductory programme — a 10-day taster experience designed for anyone curious about fashion design but not yet ready to commit to a full course. Across ten hands-on sessions at the OGIFT campus in Vinayakanagar, Bengaluru, students explore the fundamentals of fashion education, get introduced to industry opportunities, and actually create their first garment piece: a fully stitched basic bodice block. Every FASHUP student receives a certificate at the end of the programme, entirely free of charge.</p>
    <p>The programme moves quickly through the entire design-to-stitch process. In the first few days, students discover how fashion designers build collections, what different course pathways look like, and how the fashion industry is structured in India. From Day 4 onwards, sessions become practical: students learn to take body measurements, draft a basic bodice block pattern, and then stitch and finish the block themselves. Classes are available in English, Hindi, and Kannada.</p>
    <h2>Who Is This For?</h2>
    <p>FASHUP is ideal for school and college students exploring career options in fashion, homemakers who want to experience structured fashion education before enrolling in a longer programme, working professionals considering a career change into fashion design, and parents who want their child to try fashion education before committing to a diploma. No prior experience or qualifications are required. Many FASHUP graduates go on to enrol in OGIFT's full programmes — the 3-month vocational course, the 6-month diploma, or the 1-year advanced diploma. Contact OGIFT at +91 90369 28799 to register.</p>
    <a href="/admissions">Enroll Now — It's FREE</a>
    <a href="/">OGIFT Home — Best Fashion Design Institute Bangalore</a>
    <a href="/courses">View All Courses</a>
    <a href="/verify">Verify OGIFT Certificate</a>
    <a href="/about">About OGIFT</a>
    <a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a>
    <a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a>
    <a href="/courses/fashion-illustration">Fashion Illustration Course</a>`,
  "/courses/fashion-illustration": `
    <h1>Best Fashion Illustration Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>Fashion Illustration is the language of fashion design — the skill that allows designers to communicate their creative ideas quickly, accurately, and with visual impact. OGIFT's 1-month Express Mastery Fashion Illustration course is designed for students who want to master the core techniques of fashion drawing rapidly, with hands-on practice in every session. The course covers everything from the basics of figure proportion and croqui development to advanced fabric rendering and collection illustration, all under the guidance of OGIFT faculty with active experience in fashion design studios and editorial environments in Bangalore.</p>
    <p>The course begins with foundational figure drawing — learning the 9-head proportion standard used in professional fashion illustration, understanding balance and pose, and developing a personal drawing style. Students practise sketching fashion figures in a range of poses: standing, walking, and dynamic editorial poses. Once the figure foundation is established, students move to face and accessory rendering, including hair, footwear, and jewellery detailing. The second half of the course focuses on garments — how to indicate different fabric textures and weights through line quality and shading, how to render prints and embellishments, and how to illustrate both flat technical drawings and three-dimensional fashion plates for portfolio use.</p>
    <h2>What You Will Learn</h2>
    <p>By the end of the course, students can draw confident fashion figures, render a wide range of garment types and fabric textures, and create multi-look collection illustrations suitable for a professional portfolio. The course uses both hand illustration (pencil, marker, and ink techniques) and introduces digital illustration tools for students who want to extend their skills into digital fashion design. Every student completes the course with a portfolio of illustrated fashion plates ready for professional use. OGIFT provides 100% placement support to graduates.</p>
    <h2>Who Is This Course For?</h2>
    <p>This course is ideal for students who want to develop a specific, marketable skill quickly — aspiring fashion designers, textile design students, art and craft enthusiasts moving into fashion, or working professionals who want to add fashion illustration to their creative toolkit. No prior experience in fashion or art is required — only a genuine interest in design and drawing. Eligibility is Class 10 (SSC) and above. Contact the OGIFT admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to enrol.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/">OGIFT Home — Best Fashion Design Institute Bangalore</a>
    <a href="/courses">View All Courses</a>
    <a href="/verify">Verify OGIFT Certificate</a>
    <a href="/about">About OGIFT</a>
    <a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a>
    <a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a>
    <a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a>`,
  "/courses/pattern-making-basic": `
    <h1>Best Pattern Making Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>Pattern making is the technical foundation of fashion design — the skill that converts design ideas into production-ready garment templates. OGIFT's 1-month Express Mastery Pattern Making Basic course teaches the complete foundational pattern making skill set: accurate body measurement, block construction, dart manipulation, and the drafting of nine standard garment patterns. The course is taught at OGIFT's campus in Vinayakanagar, Bengaluru, by faculty with hands-on experience in pattern making for garment export companies and fashion design studios across India.</p>
    <p>The course begins with body measurement — learning to take accurate measurements, calculate ease allowances for different garment types, and understand how fit is built into a pattern before stitching begins. Students then construct the foundational blocks: the basic bodice block, the skirt block, and the sleeve block. These three blocks are the starting point for virtually every garment pattern in women's wear. From these blocks, students learn to draft nine complete patterns — the bodice, kurta, full-length salwar, patiala salwar, palazzo trousers, churidar, leggings, skirt, and blouse. Each pattern is developed on paper in the pattern making lab, checked for fit, and graded for standard sizes.</p>
    <h2>Career Outcomes</h2>
    <p>Graduates of the Pattern Making Basic course are job-ready for entry-level positions in garment production, alteration and fitting services, tailoring businesses, and boutique operations. Pattern making is one of the most consistently in-demand skills in the Indian garment industry. OGIFT graduates with pattern making skills are regularly hired by garment export houses, design studios, boutiques, and retail brands across Bangalore, including industry partners of OGIFT such as Fabindia, Raymond, and leading boutique chains. OGIFT provides 100% placement support to all graduates.</p>
    <h2>Course Eligibility and Admissions</h2>
    <p>No prior experience in sewing, tailoring, or fashion is required. Eligibility is Class 10 (SSC) and above. Many students use this course as the starting point for a longer programme at OGIFT — progressing to the 3-month or 6-month diploma after completing the Express Mastery. Batch sizes are limited. Contact the OGIFT admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to check availability and enrol for 2026.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses">View All Courses</a>
    <a href="/courses/pattern-making-blouses-advanced">Advanced Blouse Pattern Making Course</a>
    <a href="/courses/pattern-making-western-advanced">Advanced Western Pattern Making</a>
    <a href="/courses/pattern-making-kids-clothing">Kids Clothing Pattern Making</a>
    <a href="/courses/art-of-garment-foundation">Art of Garment Foundation</a>
    <a href="/courses/design-process-pattern-making-3months">3-Month DPPM Course</a>`,
  "/courses/pattern-making-blouses-advanced": `
    <h1>Best Advanced Blouse Pattern Making Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>The blouse is one of the most technically complex and commercially significant garments in Indian fashion — a single blouse design can transform the entire look of a saree or lehenga, and skilled blouse pattern makers are in constant demand from boutiques, fashion designers, and tailoring studios across Bangalore. OGIFT's Advanced Blouse Pattern Making course is a specialised 1-month programme that teaches eight advanced blouse pattern styles in depth, giving students a production-ready skill set for creating high-quality, well-fitted blouses for commercial and bespoke clients.</p>
    <p>The course covers eight distinct blouse styles: the princess cut blouse, the boat neck blouse, the cape sleeve blouse, the puff sleeve blouse, the peplum blouse, the cold shoulder blouse, the backless blouse, and the halter neck blouse. For each style, students learn the pattern construction from scratch — adjusting the basic bodice block, adding design elements, and preparing the production-ready pattern with all seam allowances, notches, and grain lines marked. Students also learn professional fitting and alteration techniques for each style, which is essential for working with real clients in a boutique or tailoring environment.</p>
    <h2>Who Is This Course For?</h2>
    <p>This course is designed for students who have already completed a basic pattern making course and want to specialise in blouse construction, as well as experienced tailors and boutique owners who want to expand their repertoire with more complex and fashionable blouse styles. It is also suitable for professional fashion designers who are adding Indian wear to their portfolio. A basic understanding of pattern making is recommended but the OGIFT admissions team can assess your experience and advise on whether this course is suitable for your background.</p>
    <h2>Admissions and Placement</h2>
    <p>OGIFT provides 100% placement support to all graduates. Blouse pattern makers with advanced skills are placed with boutiques, fashion designers, and tailoring businesses across Bangalore. Contact the OGIFT admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to check batch availability and enrol for 2026.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/pattern-making-basic">Pattern Making Basic Course</a>
    <a href="/courses">View All Courses</a>
    <a href="/courses/pattern-making-western-advanced">Advanced Western Pattern Making</a>
    <a href="/courses/pattern-making-kids-clothing">Kids Clothing Pattern Making</a>
    <a href="/courses/art-of-garment-foundation">Art of Garment Foundation</a>
    <a href="/courses/design-process-pattern-making-3months">3-Month DPPM Course</a>`,
  "/courses/pattern-making-western-advanced": `
    <h1>Best Advanced Western Pattern Making Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>Western wear is the fastest-growing segment of the Indian fashion market — driven by the expanding corporate work culture, the growth of e-commerce fashion brands, and the increasing adoption of casual and occasion western styles across Karnataka and the rest of India. OGIFT's Advanced Western Pattern Making course is a specialised 1-month programme that teaches the pattern construction of seven key western garment styles in depth, preparing students for professional work in western wear design, production, and retail alteration.</p>
    <p>The course covers seven patterns: the basic skirt block and variations, the A-line skirt, the cascade skirt, the high-waisted trouser, the empire waist dress, the shift dress, and the reversible jacket. For each style, students learn the pattern construction methodology, the fitting considerations specific to western garment silhouettes, and the alteration techniques used in professional alterations services and made-to-measure boutiques. The course builds on foundational pattern making skills — students are expected to be familiar with basic bodice and skirt block construction before joining, either through OGIFT's Pattern Making Basic course or equivalent experience.</p>
    <h2>Career Outcomes for Western Pattern Makers</h2>
    <p>Western pattern making graduates from OGIFT work across a wide range of roles in Bangalore's fashion industry — as production assistants and pattern room assistants at garment export companies, as in-house pattern makers at fashion labels and design studios, as alterations specialists at high-end boutiques and tailoring studios, and as freelance pattern makers serving the growing market of independent fashion designers in Bangalore. OGIFT's placement network includes fashion brands, boutiques, and export houses that specifically seek western wear pattern making skills.</p>
    <h2>Admissions 2026</h2>
    <p>OGIFT provides 100% placement support to all graduates of this programme. Contact the admissions team at +91 90369 28799 or admissions@ogiftbangalore.com. The OGIFT campus is located in Vinayakanagar, Bengaluru, Karnataka 560017.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/pattern-making-basic">Pattern Making Basic Course</a>
    <a href="/courses">View All Courses</a>
    <a href="/courses/pattern-making-blouses-advanced">Advanced Blouse Pattern Making</a>
    <a href="/courses/pattern-making-kids-clothing">Kids Clothing Pattern Making</a>
    <a href="/courses/art-of-garment-foundation">Art of Garment Foundation</a>
    <a href="/courses/design-process-pattern-making-3months">3-Month DPPM Course</a>`,
  "/courses/art-of-garment-foundation": `
    <h1>Best Garment Construction Course Bangalore 2026 — OGIFT | Art of Garment Foundation</h1>
    <p>Garment construction is the essential practical skill that connects design and pattern making to a finished wearable garment. OGIFT's Art of Garment Foundation course is a 1-month Express Mastery programme that teaches the complete garment construction process — from setting up and maintaining a sewing machine through fabric cutting, seam construction, finishing techniques, and the assembly of complete garment pieces. The course is taught in OGIFT's fully equipped sewing ateliers in Vinayakanagar, Bengaluru, with dedicated machines and cutting tables for each student, and faculty who bring industry experience from garment manufacturing and fashion design studios.</p>
    <p>The course is structured as a progressive build from individual skills to complete garment assembly. In the first module, students learn sewing machine operation and maintenance — threading, tension adjustment, stitch selection, and basic troubleshooting. The second module covers fabric preparation — understanding grain lines, pattern layout on fabric, cutting techniques for different fabric types, and the critical pre-stitching steps that determine the quality of the finished garment. The third and fourth modules cover construction in detail: seam types and their appropriate uses, seam finishes for different fabric types, dart stitching, zipper and button insertion, hem finishing, and collar and sleeve attachment techniques. The final module brings everything together in the assembly of a complete garment — a blouse or kurta — from fabric to finished product.</p>
    <h2>Who Should Take This Course?</h2>
    <p>The Art of Garment Foundation course is designed for beginners who want a strong, structured introduction to garment construction — students with no prior sewing experience who want to enter the fashion industry, homemakers who want to develop professional-level sewing skills, and anyone who wants to understand how garments are made before progressing to pattern making or design courses. The course is also an excellent complement to the Pattern Making Basic course for students who want to both draft patterns and construct garments. Eligibility is Class 10 (SSC) and above. Contact the OGIFT admissions team at +91 90369 28799 to enrol.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/pattern-making-basic">Pattern Making Basic Course</a>
    <a href="/courses">View All Courses</a>
    <a href="/courses/pattern-making-blouses-advanced">Advanced Blouse Pattern Making</a>
    <a href="/courses/pattern-making-western-advanced">Advanced Western Pattern Making</a>
    <a href="/courses/pattern-making-kids-clothing">Kids Clothing Pattern Making</a>
    <a href="/courses/design-process-pattern-making-3months">3-Month DPPM Course</a>`,
  "/courses/fabric-knowledge-textile-designing": `
    <h1>Best Fabric &amp; Textile Designing Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>Every garment begins with fabric — and every fashion professional, whether a designer, pattern maker, stylist, or boutique owner, needs a thorough understanding of fabrics and textiles to make effective decisions about design, construction, and presentation. OGIFT's Fabric Knowledge and Textile Designing course is a 1-month Express Mastery programme that teaches the complete science and practice of textile knowledge — from fiber origins and yarn construction through fabric behaviour, fabric sourcing, and the creative application of textile design to fashion and garment design projects.</p>
    <p>The course covers four main areas. The first is fiber science — students learn the properties of all major natural fibers (cotton, silk, wool, linen, jute) and synthetic fibers (polyester, nylon, viscose, lycra, acrylic), understanding how fiber origin determines the final behaviour of the fabric in wear and construction. The second area is yarn and fabric construction — students learn how yarns are spun and how weave structures (plain, twill, satin, leno, jacquard) and knitting methods create different fabric types with distinct properties. The third area covers dyeing, printing, and finishing — the processes that give fabric its colour, pattern, and surface characteristics, including block printing, screen printing, batik, tie-and-dye, discharge printing, and embroidery. The fourth area is textile design — students learn to create surface patterns, repeat designs, and textile motifs, both by hand and using digital tools.</p>
    <h2>How This Course Supports Your Fashion Career</h2>
    <p>Fabric and textile knowledge is a foundation skill for every fashion professional. For designers, it informs every design decision — which fabrics will drape, which will hold structure, which will work with specific construction methods. For pattern makers, it determines ease allowances and construction approaches. For stylists and merchandisers, it governs garment care, presentation, and commercial positioning. Graduates of this course go on to work in design studios, buying offices, fabric retail, garment export, and fashion education. OGIFT provides 100% placement support to all graduates. Admissions 2026 are open — contact the team at +91 90369 28799.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <h2>Related Fabric Technology Courses and Tools at OGIFT</h2>
    <p>Students of the Fabric Knowledge course often continue with the <a href="/courses/draping-technology">Draping Technology course</a>, which applies fabric understanding directly to 3D garment construction on professional dress forms — combining knowledge of how different fabrics behave with the practical skill of shaping them into finished garments. OGIFT also provides a free <a href="/fabric-sim">Interactive 3D Fabric Simulation Tool</a> that lets you visualise drape, weight, stiffness, and wind response before handling real materials in the studio.</p>
    <a href="/courses">View All Courses</a>`,
  "/courses/draping-technology": `
    <h1>Best Draping Technology Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>Draping is the art of creating garment shapes directly on a dress form using fabric — the three-dimensional alternative to flat pattern making, and the method that gives high fashion and couture their distinctive, body-conscious silhouettes. OGIFT's Draping Technology course is a 1-month Express Mastery programme that teaches the complete process of fashion draping: from preparing and setting up a dress form through basic bodice, skirt, and sleeve draping to advanced techniques including bias draping, cowl necklines, and asymmetric designs. The course is taught in OGIFT's dedicated draping studios in Vinayakanagar, Bengaluru, using professional dress forms and the muslin draping fabrics used in industry practice.</p>
    <p>The course is structured in progressive stages. The first module covers dress form preparation — padding and adjusting a standard dress form to represent an individual client's measurements, and understanding how grain lines and balance lines guide draping work. The second module covers basic flat draping — learning to drape a standard bodice block, a skirt, and a sleeve directly on the form, then transferring these drapes to paper patterns. The third module introduces advanced draping concepts: bias cut techniques, which produce fabric's characteristic diagonal drape and stretch; cowl necklines, which require understanding how fabric falls when hung from specific anchor points; gathers and ruching; and asymmetric and one-shoulder designs. The final module challenges students with a creative draping project — designing and draping an original garment design of their choice and transferring it to a production-ready flat pattern.</p>
    <h2>Career Outcomes for Draping Graduates</h2>
    <p>Draping technology is a specialised skill that is particularly valued in bridal wear, evening wear, couture, and high-end boutique fashion. Graduates of this course work as draping specialists in design studios and boutiques, as pattern makers with three-dimensional visualisation skills, and as assistant designers who can realise complex creative silhouettes. OGIFT provides 100% placement support to all graduates. Contact the admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to enrol for 2026.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/fabric-knowledge-textile-designing">Fabric &amp; Textile Designing Course</a>
    <a href="/fabric-sim">Interactive 3D Fabric Simulation Tool</a>
    <a href="/courses">View All Courses</a>`,
  "/courses/digital-portfolio-making": `
    <h1>Best Fashion Portfolio Course Bangalore 2026 — OGIFT | Digital Portfolio Making</h1>
    <p>In today's fashion industry, a professional digital portfolio is not optional — it is the primary tool through which designers, illustrators, pattern makers, and stylists demonstrate their skills and creative vision to employers, clients, and collaborators. OGIFT's Digital Portfolio Making course is a 1-month Express Mastery programme that teaches fashion students and professionals how to create, curate, and present a compelling digital portfolio that meets current industry standards and gets results in job applications, freelance pitches, and design school applications.</p>
    <p>The course begins with portfolio strategy — understanding what different employers and institutions look for in a fashion portfolio, how to select and sequence your best work, and how to frame your creative identity consistently across every page. Students learn to use industry-standard design tools to lay out and present their work professionally: Canva and Adobe InDesign for layout and presentation, Adobe Photoshop for image editing and refinement, and platforms such as Behance and portfolio websites for online presentation and sharing. The course covers the technical aspects of digital portfolio creation — resolution, file formats, colour management, and print versus screen presentation — as well as the creative aspects of branding your portfolio with a consistent visual language, typography, and colour palette.</p>
    <h2>What Is Included in Your Portfolio</h2>
    <p>The OGIFT Digital Portfolio Making course includes sessions on creating and presenting five key portfolio sections: fashion illustration plates, technical flat drawings and tech packs, mood boards and concept boards, garment and construction photography, and a professional designer bio and artist statement. By the end of the course, every student has a complete, employer-ready digital portfolio in both print and online formats. OGIFT also provides access to the AI Portfolio Builder tool, which offers AI-powered critique and recommendations for improving your portfolio's commercial effectiveness. For full career placement support, contact the OGIFT admissions team at +91 90369 28799 or admissions@ogiftbangalore.com.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/portfolio">AI Portfolio Builder Tool</a>
    <a href="/courses/design-pattern-making-portfolio-3months">DPPMP 3-Month Course</a>
    <a href="/courses">View All Courses</a>`,
  "/courses/graphic-designing-for-fashion": `
    <h1>Best Graphic Design for Fashion Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>Digital design tools have become as important to the modern fashion professional as scissors and a sewing machine. Whether you are creating technical flat drawings for a garment specification sheet, designing mood boards for a client presentation, developing a fabric print repeat, or building the visual identity of a fashion brand, professional graphic design skills give you the ability to work faster, communicate more clearly, and produce more polished, commercially viable work. OGIFT's Graphic Designing for Fashion course is a 1-month Express Mastery programme that teaches the core digital design tools and techniques used specifically in the fashion industry, at OGIFT's campus in Vinayakanagar, Bengaluru.</p>
    <p>The course is structured around three core tool areas: Adobe Illustrator for fashion, Adobe Photoshop for fashion, and digital presentation and branding. In the Illustrator module, students learn to use the Pen Tool to create precise flat technical drawings of garments, develop fabric swatch presentations, and create repeat pattern designs for textiles and print applications. In the Photoshop module, students learn fashion image editing — retouching garment photographs, creating digital mood boards, compositing flat lay images, and applying fabric textures to fashion illustrations. The presentation and branding module covers the design of lookbooks, social media fashion content, and brand identity materials for fashion labels and boutiques.</p>
    <h2>Career Opportunities in Fashion Graphic Design</h2>
    <p>Fashion graphic design skills open up a range of career paths that are often overlooked by fashion students — technical designer, graphic designer at a fashion brand, in-house designer at a boutique or retail chain, fashion content creator, print and pattern designer for textile companies, and freelance fashion brand designer. These roles combine creative and technical skills and are consistently well-compensated in Bangalore's fashion industry. OGIFT graduates with graphic design skills are placed across design studios, fashion brands, and digital agencies. OGIFT provides 100% placement support. Contact the admissions team at +91 90369 28799 to enrol for 2026.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses">View All Courses</a>
    <a href="/placements">100% Placement Support</a>
    <a href="/careers/work-from-home">Work From Home Fashion Jobs</a>
    <a href="/courses/fashion-styling">Fashion Styling Course</a>
    <a href="/community">Fashion Design Community</a>`,
  "/courses/fashion-designing-boutique-management": `
    <h1>Best Boutique Management Course Bangalore 2026 — OGIFT | Fashion Designing &amp; Boutique Management</h1>
    <p>Running a successful fashion boutique requires two distinct sets of skills: the creative ability to design and curate a compelling product range, and the business acumen to manage a profitable retail operation. OGIFT's Fashion Designing and Boutique Management course is a 1-month Express Mastery programme that develops both skill sets simultaneously — giving aspiring boutique owners and fashion entrepreneurs in Bangalore the complete toolkit to launch and operate a successful fashion business.</p>
    <p>The fashion design component of the course covers the process of building a boutique collection — trend research and identification, design concept development, fabric and material sourcing for boutique product lines, and the creation of a cohesive collection that appeals to a clearly defined customer. Students also learn the basics of garment construction relevant to boutique production — how to communicate effectively with tailors and production units, how to specify garment requirements, and how to quality-check finished garments before they reach the shop floor. The boutique management component covers the practical business of retail: boutique layout and visual merchandising principles, inventory management and stock buying, pricing strategy and margin calculation, fashion marketing and social media content for boutiques, and customer service and client relationship management in a high-end fashion retail context.</p>
    <h2>Who Should Take This Course?</h2>
    <p>This course is designed for aspiring boutique owners who want to open their own fashion boutique in Bangalore, for existing tailoring business owners who want to transition into branded boutique retail, for fashion graduates who want to add business skills to their design knowledge, and for homemakers with fashion and design creativity who want to build an income-generating boutique venture. OGIFT provides 100% placement support to graduates who want to pursue employment rather than entrepreneurship — boutique management roles are regularly available through OGIFT's employer network. Contact the admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to enrol.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/pattern-making-boutique-management-3months">3-Month Pattern Making &amp; Boutique Course</a>
    <a href="/courses">View All Courses</a>`,
  "/courses/fashion-styling": `
    <h1>Best Fashion Styling Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>Fashion styling is one of the most visible and rapidly growing career paths in the Indian fashion industry — driven by the explosion of social media fashion content, the growth of e-commerce brands that need product styling for photography, and the expansion of personal styling and image consulting as a professional service across India's growing urban middle class. OGIFT's Fashion Styling course is a 1-month Express Mastery programme that teaches the complete skill set of a professional fashion stylist: from body type analysis and dressing principles through editorial styling, trend forecasting, and the business of building a personal styling clientele in Bangalore.</p>
    <p>The course covers four main areas of professional styling practice. The first is personal styling — understanding the six primary body types and how to use silhouette, proportion, colour, and detail to create flattering and confidence-building looks for individual clients. Students practise body type analysis, wardrobe audit and editing, and the creation of personalised capsule wardrobe plans. The second area is editorial and commercial styling — how to style garments and accessories for photographic shoots, advertising campaigns, and lookbooks, including how to source and borrow garments, how to prepare a shoot call sheet, and how to direct a model on set. The third area is trend forecasting — how to read fashion trends from global runway reports, retail market data, and cultural signals, and translate them into actionable styling decisions for clients and commercial projects. The fourth area is the business of styling — setting up as a freelance stylist, pricing your services, building a client base, and creating a professional portfolio.</p>
    <h2>Career Outcomes for Fashion Styling Graduates</h2>
    <p>OGIFT styling graduates work as personal stylists, wardrobe consultants, editorial stylists for magazines and social media brands, e-commerce stylists for fashion apps and retail brands, and fashion content creators. Some graduates launch independent styling consultancy businesses, while others join fashion brands or retail companies in styling and visual merchandising roles. OGIFT provides 100% placement support to all graduates. Contact the admissions team at +91 90369 28799 to enrol for 2026.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses">View All Courses</a>
    <a href="/placements">100% Placement Support</a>
    <a href="/careers/work-from-home">Work From Home Fashion Jobs</a>
    <a href="/courses/graphic-designing-for-fashion">Graphic Design for Fashion Course</a>
    <a href="/community">Fashion Design Community</a>`,
  "/courses/pattern-making-kids-clothing": `
    <h1>Best Kids Clothing Pattern Making Course Bangalore 2026 — OGIFT | 1-Month Express Mastery</h1>
    <p>Children's wear is a distinct and specialised segment of the Indian fashion industry — with its own sizing systems, construction considerations, safety requirements, and design sensibility. OGIFT's Kids Clothing Pattern Making course is a 1-month Express Mastery programme that teaches the complete skill set for drafting and constructing patterns for children's garments, covering the key garment types that are most in demand in India's children's wear market. The course is taught by OGIFT faculty with direct experience in children's garment design and production at the campus in Vinayakanagar, Bengaluru.</p>
    <p>Children's pattern making differs from adult pattern making in several important ways. Children's proportions change significantly across age groups — a toddler's proportions are completely different from a 10-year-old's, which are different again from a teenager's — and pattern makers must understand how to adjust construction for each age category. Growth allowances are critical in children's wear: garments need to be constructed with room for the child to grow without looking oversized. Safety is paramount — fastenings, embellishments, and structural elements that might be hazardous for children require specific construction approaches. The course covers all five key children's garment types at OGIFT: the A-line frock, the gathered frock, the umbrella frock, the layered skirt, and the jabla (infant's wear). For each garment, students draft the pattern, adjust for size ranges from 1 year to 12 years, and stitch a sample garment to test the fit.</p>
    <h2>Career Opportunities in Children's Wear</h2>
    <p>Children's wear pattern makers are in high demand at garment manufacturers supplying major children's retail brands, at boutiques and tailoring studios that produce bespoke children's wear, and at children's fashion brands that are growing rapidly in India's expanding children's wear market. Many graduates of this course combine their children's wear skills with adult pattern making (from the OGIFT Pattern Making Basic course) to become versatile pattern makers who can work across the full range of garment categories. OGIFT provides 100% placement support to all graduates. Contact the admissions team at +91 90369 28799 to enrol for 2026.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/pattern-making-basic">Pattern Making Basic Course</a>
    <a href="/courses">View All Courses</a>
    <a href="/courses/pattern-making-blouses-advanced">Advanced Blouse Pattern Making</a>
    <a href="/courses/pattern-making-western-advanced">Advanced Western Pattern Making</a>
    <a href="/courses/art-of-garment-foundation">Art of Garment Foundation</a>
    <a href="/courses/design-process-pattern-making-3months">3-Month DPPM Course</a>`,
  "/courses/pattern-making-boutique-management-3months": `
    <h1>Best 3-Month Pattern Making &amp; Boutique Management Course Bangalore 2026 — OGIFT</h1>
    <p>OGIFT's Pattern Making and Boutique Management 3-Month Diploma is a comprehensive vocational programme that combines two of the most commercially valuable skills in Bangalore's fashion industry: professional pattern making and boutique operations management. This course is designed for students who want to build a complete foundation for starting their own fashion boutique or working as a skilled pattern maker and boutique manager in an established fashion retail business. In three months, students develop the technical garment skills and business management knowledge needed to succeed in both design-led and retail-focused fashion careers.</p>
    <p>The pattern making component of the course covers the complete OGIFT pattern making curriculum — starting with body measurement, basic block construction, and dart manipulation, then moving into a comprehensive range of garment patterns for Indian and western styles, blouse pattern variations, and pattern grading and alteration techniques. Students practise pattern drafting in the OGIFT pattern making labs, progressing to increasingly complex patterns across the three months. The boutique management component covers the practical business of fashion retail: boutique setup and interior layout, inventory management and stock buying, supplier relationships and fabric sourcing, visual merchandising, pricing and profit margin management, social media marketing for fashion boutiques, and customer relationship management. The two components are integrated throughout the course, so students understand how design decisions affect business outcomes and how retail requirements shape design and production choices.</p>
    <h2>Who This Course Is For and What Happens After</h2>
    <p>This course is ideal for aspiring boutique owners who want both the design skills and business skills to run their venture independently; for students who want a thorough vocational qualification in a shorter time than a full diploma; and for experienced tailors who want to formalise and expand their skills into a full boutique operation. OGIFT provides 100% placement support to all graduates who want to pursue employment in boutique management, retail buying, or pattern room roles. Contact the admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to enrol for 2026. The OGIFT campus is located in Vinayakanagar, Bengaluru, Karnataka 560017.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/fashion-designing-boutique-management">1-Month Boutique Management Course</a>
    <a href="/courses">View All Courses</a>`,
  "/courses/design-process-pattern-making-3months": `
    <h1>Best Fashion Design &amp; Pattern Making 3-Month Course Bangalore 2026 — OGIFT | DPPM</h1>
    <p>OGIFT's Design Process and Pattern Making 3-Month Course (DPPM) is a comprehensive vocational diploma that develops two of the most essential skill sets in fashion design — the creative design process and the technical pattern making skills that allow design ideas to be realised in production-ready garments. The DPPM course provides 107 hours of structured, faculty-led instruction across three months at the OGIFT campus in Vinayakanagar, Bengaluru. It is one of OGIFT's most popular programmes for students who want a thorough fashion qualification without committing to a full 6-month or 1-year diploma.</p>
    <p>The design process component of the DPPM course teaches students the complete methodology of professional fashion design — from initial inspiration and research through concept development, design drawing, collection building, and final presentation. Students learn to read and analyse fashion trends, create mood boards and concept boards, develop a cohesive design brief, sketch garment designs in accurate fashion illustration style, select appropriate fabrics and trims for their designs, and present their creative work in a professional format. The pattern making component covers the complete OGIFT pattern making curriculum: body measurement and ease, basic block construction (bodice, skirt, sleeve), dart manipulation and pattern shaping, kurta, salwar, palazzo, and blouse pattern drafting, western garment patterns, and the principles of grading and alteration for different size ranges. Students integrate both skill sets through a design-to-pattern project that forms the capstone of the programme.</p>
    <h2>Career Outcomes and Admissions</h2>
    <p>DPPM graduates at OGIFT pursue careers as junior fashion designers, design assistants, pattern room assistants, production executives, and technical designers across Bangalore's fashion industry. The combination of design and technical skills makes DPPM graduates particularly attractive to employers who need staff who can work across the full design-to-production process. OGIFT provides 100% placement support to all DPPM graduates. Admissions for 2026 are open. Contact the admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to enrol.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses">View All Courses</a>
    <h2>Pattern Making Courses at OGIFT Bangalore</h2>
    <p>The DPPM 3-month course includes the full OGIFT pattern making curriculum, which is also taught as standalone 1-month programmes for students who want to develop a specific skill. The <a href="/courses/pattern-making-basic">Pattern Making Basic course</a> covers foundational block drafting for bodice, skirt, and sleeve. The <a href="/courses/pattern-making-blouses-advanced">Advanced Blouse Pattern Making course</a> develops specialist skills in complex blouse and kameez patterns. The <a href="/courses/pattern-making-western-advanced">Advanced Western Pattern Making course</a> covers trousers, denims, and western silhouettes. The <a href="/courses/art-of-garment-foundation">Art of Garment Foundation course</a> builds garment construction knowledge alongside pattern drafting. The <a href="/courses/pattern-making-kids-clothing">Kids Clothing Pattern Making course</a> teaches children's wear patterns from infant to 12-year sizes.</p>`,
  "/courses/design-pattern-making-portfolio-3months": `
    <h1>Best Fashion Design, Pattern Making &amp; Portfolio 3-Month Course Bangalore 2026 — OGIFT | DPPMP</h1>
    <p>OGIFT's Design, Pattern Making and Portfolio 3-Month Course (DPPMP) is the most comprehensive vocational programme in OGIFT's Express Mastery series — combining three essential professional skill sets in a single three-month diploma: creative design process, technical pattern making, and professional portfolio development. The DPPMP is designed for students who want to emerge from their course not just with skills but with a complete, employer-ready portfolio that they can use immediately in job applications, freelance pitches, and design school applications. It is one of OGIFT's highest-rated vocational programmes among both students and employer partners.</p>
    <p>The design component covers the full creative process: trend research, concept development, design sketching, collection building, and fabric and material sourcing. The pattern making component covers the complete OGIFT pattern drafting curriculum — basic blocks, dart manipulation, Indian and western garment patterns, blouse variations, and grading and alteration principles. Students work through both components in parallel across the three months, so that design and technical skills develop together in an integrated way rather than in separate silos. The portfolio component is structured across all three months — students are guided by OGIFT faculty to build their portfolio progressively, adding each completed project in a professional format. The portfolio component covers portfolio strategy, layout, digital presentation, personal branding, and online portfolio creation. Every DPPMP student graduates with a complete portfolio of 10 to 15 professional pieces that demonstrate both creative and technical competence.</p>
    <h2>Why Choose DPPMP</h2>
    <p>DPPMP graduates are among the most placement-ready students OGIFT produces. The combination of design skills, pattern making skills, and a professional portfolio means that DPPMP graduates can apply for a wider range of roles, demonstrate their abilities at interview, and command better starting positions than students with only one area of competence. OGIFT provides 100% placement support to all DPPMP graduates. Admissions for 2026 are open. Contact the admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to enrol. The OGIFT campus is located in Vinayakanagar, Bengaluru, Karnataka 560017.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/portfolio">AI Portfolio Builder Tool</a>
    <a href="/courses/digital-portfolio-making">Digital Portfolio Making Course</a>
    <a href="/courses">View All Courses</a>`,
  "/courses/six-months-diploma-fashion-designing": `
    <h1>Best 6-Month Fashion Designing Diploma Bangalore 2026 — OGIFT | Admissions Open</h1>
    <p>OGIFT's 6-Month Diploma in Fashion Designing is a comprehensive, industry-recognised qualification that covers every essential discipline of professional fashion education in a focused, rigorous six-month programme. It is the most popular full qualification at OGIFT and is specifically designed for students who want a thorough, practical fashion education that prepares them for real employment in the Indian fashion industry — in less time than a full 1-year programme, but with significantly greater depth than a short course. The 6-month diploma includes 100% placement support and is taught by faculty with active industry experience at the OGIFT campus in Vinayakanagar, Bengaluru.</p>
    <p>The 6-month diploma curriculum is structured across six integrated units. Unit 1 covers Design Fundamentals — design elements and principles, fashion history and trends, design research, mood board creation, and the development of a cohesive design vocabulary. Unit 2 covers Fashion Illustration — figure proportion, croqui development, garment sketching, fabric rendering, and the creation of professional fashion plates. Unit 3 covers Fabric and Textile Science — fiber types, fabric construction, dyeing and printing, fabric selection, and care and handling. Unit 4 covers Pattern Making — body measurement, basic block construction, dart manipulation, and the drafting of a comprehensive range of Indian and western garment patterns. Unit 5 covers Garment Construction — sewing techniques, seam construction and finishing, complete garment assembly from cut to finished product. Unit 6 covers Fashion Styling and Portfolio Development — body type analysis, styling principles, trend application, and the creation of a complete professional portfolio ready for employment.</p>
    <h2>Placement Record and Admissions</h2>
    <p>OGIFT's 6-month diploma graduates are consistently among the most sought-after candidates in Bangalore's fashion industry. Employer partners regularly hiring OGIFT 6-month diploma graduates include Fabindia, Raymond, Myntra, Lifestyle, and leading boutique design studios across Bangalore. The OGIFT admissions process is straightforward — no entrance exam, eligibility of Class 10 (SSC) and above. Batch sizes are limited and fill quickly. Contact the OGIFT admissions team at +91 90369 28799 or admissions@ogiftbangalore.com to check availability and enrol for 2026.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma</a>
    <a href="/placements">View Placement Record</a>
    <a href="/courses">View All Courses</a>
    <a href="/">OGIFT Home — Best Fashion Design Institute Bangalore</a>
    <a href="/about">About OGIFT</a>
    <a href="/verify">Verify OGIFT Certificate</a>
    <a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster</a>
    <a href="/courses/fashion-illustration">Fashion Illustration Course</a>`,
  "/courses/one-year-advanced-diploma-fashion-designing": `
    <h1>Best 1-Year Advanced Fashion Designing Diploma Bangalore 2026 — OGIFT | Admissions Open</h1>
    <p>OGIFT's 1-Year Advanced Diploma in Fashion Designing is the institute's flagship programme — the most comprehensive fashion education available at OGIFT, and one of the most thorough fashion diplomas available at any institute in Bangalore. Over twelve months of intensive, hands-on training, students develop mastery in every discipline of professional fashion education: creative design, technical drawing, fashion illustration, fabric and textile science, flat pattern making, draping technology, garment construction, fashion styling, boutique management, graphic design for fashion, digital portfolio development, and career management. The 1-year diploma includes 100% placement support and is taught entirely by faculty with active industry experience in fashion design, garment technology, and fashion business.</p>
    <p>The 1-year diploma programme at OGIFT is structured in two semesters. The first semester develops the foundational skills: design elements and principles, fashion history and market analysis, fashion illustration, body measurement and basic pattern blocks, fabric and textile science, fundamental sewing techniques, and introduction to fashion styling. The second semester builds on these foundations with advanced content: advanced pattern making for complex garment types, draping technology, garment construction for complex designs, advanced fashion styling and image consulting, graphic design for fashion using professional software, boutique and retail management, digital portfolio creation, and an integrated industry project that brings all disciplines together in a real-world fashion design brief. The programme also includes access to OGIFT's AI-powered Interactive Training platform, the AI Career Counsellor, and the AI Portfolio Builder — digital learning tools that extend the depth and reach of the in-class curriculum.</p>
    <h2>Industry Connections and Placement</h2>
    <p>1-year diploma graduates from OGIFT are the most comprehensively qualified students the institute produces, and they attract consistently strong interest from employer partners across Bangalore's fashion industry. Graduates pursue roles as fashion designers, assistant designers, pattern makers, garment technicians, fashion stylists, visual merchandisers, boutique managers, and production executives. Some graduates launch their own fashion labels, boutiques, or design studios. OGIFT provides 100% placement support throughout the programme, including portfolio reviews, mock interviews, and direct introductions to employer partners. Admissions for 2026 are open — contact the admissions team at +91 90369 28799 or admissions@ogiftbangalore.com. The OGIFT campus is at Vinayakanagar, Bengaluru, Karnataka 560017.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma Option</a>
    <a href="/placements">View Placement Record</a>
    <a href="/courses">View All Courses</a>
    <a href="/">OGIFT Home — Best Fashion Design Institute Bangalore</a>
    <a href="/verify">Verify OGIFT Certificate</a>
    <a href="/about">About OGIFT</a>
    <a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a>
    <a href="/courses/fashion-illustration">Fashion Illustration Course</a>`,
  "/courses/onlinecourse": `
    <h1>Best Online Fashion Design Course India 2026 — OGIFT | 3-Month AI-Powered Certificate</h1>
    <p>OGIFT's 3-Month Online Fashion Design Course is India's most accessible and technologically advanced online fashion programme — designed to bring the quality of OGIFT's Bangalore campus education to students anywhere in India. Built on an AI-powered interactive learning platform and supported by live faculty sessions, the online course covers the core disciplines of fashion design education across three months of structured, self-paced learning. Students who complete the course receive an OGIFT certificate recognised by the Indian fashion industry and are eligible for OGIFT's 100% placement support programme. Admissions for 2026 are open.</p>
    <p>The online course curriculum is divided into eight modules. Module 1 covers Design Fundamentals — elements of design, principles of fashion, colour theory, and design inspiration and research. Module 2 covers Fashion Illustration — fashion figure proportions, basic garment sketching, and fabric rendering techniques, taught through video demonstrations and guided practice exercises. Module 3 covers Fabric and Textile Knowledge — fiber types, fabric construction methods, and fabric selection for different garment applications. Module 4 covers Pattern Making Basics — body measurement, the basic bodice block, and introductory pattern drafting. Module 5 covers Garment Construction Concepts — sewing techniques, seam types, and the construction sequence for standard garments. Module 6 covers Fashion Styling Fundamentals — body type analysis, colour coordination, and outfit building principles. Module 7 covers Fashion Business — boutique management basics, fashion retail operations, and building a fashion career in India. Module 8 is the Portfolio and Career module — building a digital portfolio of work completed during the course and preparing for job applications and career conversations.</p>
    <h2>Multilingual Learning and Technology</h2>
    <p>All content is available in English, Hindi, and Kannada — making OGIFT's online course genuinely accessible to students across India who are more comfortable learning in their native language. The AI-powered learning platform adapts to each student's pace, tracks progress, and provides personalised recommendations for additional practice in areas where students need reinforcement. Live faculty Q&amp;A sessions are available weekly, so online students always have access to real expert guidance. To enrol in the 2026 online course intake, contact the OGIFT admissions team at +91 90369 28799 or admissions@ogiftbangalore.com. The online course is also available to students outside India.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses">View All Courses</a>
    <h2>Online Fashion Learning Tools at OGIFT</h2>
    <p>Before committing to the full online course, explore OGIFT's free online resources. The <a href="/quicktour">Online Fashion Course Quick Tour</a> is a 20-minute AI-guided preview of the 3-month curriculum — free, no registration required. The <a href="/videos">Fashion Design Video Lessons library</a> offers on-demand lessons in pattern making, garment construction, and styling, available in English, Hindi, and Kannada. The <a href="/interactive-training">Interactive Fashion Training platform</a> provides AI-powered immersive exercises that reinforce what is learned in the 3-month structured curriculum.</p>`,
  "/admissions": `
    <h1>Fashion Design Admissions 2026 — OGIFT Bangalore | Enroll Now</h1>
    <p>Admissions to OGIFT's 2026 fashion design programmes are now open. Onati Global Institute of Fashion Technology (OGIFT) is Bangalore's highest-rated fashion institute, with a 4.9-star rating based on 250+ verified Google reviews and a track record of 100% graduate placement. The admissions process is simple and straightforward — there are no entrance exams and no prior experience required. Eligibility is Class 10 (SSC) and above for all programmes.</p>
    <p>OGIFT offers programmes at every level and duration. New students often begin with the free FASHUP 10-day taster course, which gives you hands-on experience before you commit to a full programme. From there, students typically progress to a 1-month Express Mastery course, a 3-month vocational programme, or directly to the 6-month or 1-year diploma. All programmes are taught in-person at the OGIFT campus in Vinayakanagar, Bengaluru, in English, Hindi, and Kannada.</p>
    <h2>What Happens After You Enrol</h2>
    <p>Once you enrol, you will be assigned to a batch with a confirmed schedule. You will receive access to OGIFT's professionally equipped labs, design studios, and pattern making facilities. Faculty with active industry experience will guide you through both the creative and technical aspects of your programme. On completion, you will receive a certificate or diploma and be enrolled in OGIFT's 100% placement support programme.</p>
    <h2>Contact the Admissions Team</h2>
    <p>To begin the admissions process, visit the OGIFT campus in Vinayakanagar, Bengaluru, call the admissions team at +91 90369 28799, or email admissions@ogiftbangalore.com. Admissions for the 2026 intake are currently open — early registration is recommended as batch sizes are limited.</p>
    <h2>Programs Available</h2>
    <ul>
      <li><a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a></li>
      <li><a href="/courses/fashion-illustration">1-Month Express Mastery Courses</a></li>
      <li><a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a></li>
      <li><a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma</a></li>
    </ul>
    <a href="/courses">View All Courses</a>
    <h2>About OGIFT Bangalore and Programme Options</h2>
    <p>Before enrolling, many prospective students begin by learning more about OGIFT as an institution. The <a href="/about">About OGIFT page</a> covers the institute's history, faculty, facilities, and philosophy — and includes employer testimonials from 500+ alumni across Bangalore's fashion industry. Graduates and employers can confirm qualification authenticity through the <a href="/verify">OGIFT Certificate Verification tool</a>. For students at the start of their journey, the free <a href="/courses/fashup-free-taster-sessions">FASHUP 10-day taster course</a> provides hands-on studio experience before any financial commitment. Students ready to go deeper can choose between the <a href="/courses/fashion-illustration">Fashion Illustration 1-month course</a>, the comprehensive <a href="/courses/six-months-diploma-fashion-designing">6-Month Fashion Designing Diploma</a>, or the flagship <a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma</a> — OGIFT's most thorough fashion education programme. Return to the <a href="/">OGIFT homepage</a> for a full overview of every programme and tool available.</p>`,
  "/counsellor": `
    <h1>Free AI Fashion Career Counsellor — OGIFT Bangalore | Admissions 2026</h1>
    <p>OGIFT's Free AI Fashion Career Counsellor is an interactive tool designed to help prospective students understand which fashion course or career path is right for them. The OGIFT AI Counsellor asks about your background, interests, goals, and availability, then recommends the most suitable programme from OGIFT's range of short courses, vocational programmes, and diplomas. It is completely free to use and requires no registration or personal details.</p>
    <p>The counsellor covers all major areas of fashion education — design, pattern making, garment technology, styling, boutique management, portfolio development, and online learning. It also provides information about eligibility, course duration, fees structure, and placement outcomes for each programme, so you can make a fully informed decision before contacting the admissions team.</p>
    <h2>Who Should Use the AI Counsellor?</h2>
    <p>The OGIFT AI Counsellor is ideal for school and college students exploring fashion as a career, working professionals considering a career change into fashion design or garment technology, homemakers who want to build a skill and income stream from their creativity, and parents researching educational options for their children. After using the AI Counsellor, prospective students are encouraged to book a free campus visit at the OGIFT campus in Vinayakanagar. Call +91 90369 28799 or email admissions@ogiftbangalore.com.</p>
    <a href="/admissions">Apply for Admissions 2026</a>
    <a href="/courses">View All Courses</a>`,
  "/videos": `
    <h1>Fashion Design Video Lessons Bangalore — OGIFT | Free Learning 2026</h1>
    <p>OGIFT's Fashion Design Video Gallery is a free resource of fashion education video lessons covering key topics from across OGIFT's course curriculum — available to current students, graduates, and anyone curious about fashion design. The videos cover fashion illustration techniques, pattern making demonstrations, draping and fabric manipulation, garment construction methods, styling tips, and faculty insights from OGIFT's experienced teaching team. Each video is produced at the OGIFT campus in Vinayakanagar, Bengaluru. All videos are in English, Hindi, and Kannada.</p>
    <p>The video library is regularly updated with new content from OGIFT faculty across all course specialisations. Short tutorial videos make it easy to learn a specific skill quickly — how to draft a basic bodice block, how to sketch a fashion figure, how to identify fabric types by hand feel, or how to create a mood board. Longer documentary-style videos give an inside view of OGIFT's teaching philosophy, campus culture, and graduate success stories.</p>
    <h2>Take Your Learning Further</h2>
    <p>If you enjoy the video content and want a structured, faculty-guided fashion education, OGIFT's full range of courses — from the free FASHUP 10-day taster to diploma programmes — is available at the campus in Vinayakanagar, Bengaluru. You can also enrol in OGIFT's 3-month online fashion course, which brings structured curriculum and live faculty access to students anywhere in India. To learn more or book a campus visit, contact the OGIFT admissions team at +91 90369 28799 or email admissions@ogiftbangalore.com.</p>
    <a href="/admissions">Enroll for Full Course Access</a>
    <a href="/courses">View All Courses</a>
    <a href="/quicktour">Online Fashion Course Quick Tour</a>
    <a href="/interactive-training">Interactive Fashion Training</a>
    <a href="/courses/onlinecourse">3-Month Online Fashion Course</a>`,
  "/community": `
    <h1>Fashion Design Community Bangalore — OGIFT | Share &amp; Learn 2026</h1>
    <p>The OGIFT Fashion Design Community is a dedicated space for fashion students, graduates, and fashion enthusiasts to connect, share their work, ask questions, and build professional relationships in the Indian fashion industry. The OGIFT Community brings together thousands of current students, alumni, and industry professionals across Bangalore and Karnataka, creating a rich network of connections that extends far beyond the classroom.</p>
    <p>In the Community, members share fashion illustrations, garment photographs, mood boards, and design projects; ask questions about techniques and career decisions; offer feedback on each other's work; and post about industry events, job openings, and styling inspiration. OGIFT faculty and alumni are active members of the community, providing professional guidance and mentorship to newer students.</p>
    <h2>Who Can Join?</h2>
    <p>The OGIFT Community is open to all current OGIFT students and graduates, as well as fashion enthusiasts across India who want to connect with a like-minded creative community. Members do not need to be enrolled in a course to join. Being active in the Community is one of the most effective things a fashion student or early-career professional can do to accelerate their career in Bangalore's fashion industry. To enrol at OGIFT and join the full community experience, contact admissions at +91 90369 28799.</p>
    <a href="/admissions">Join OGIFT — Admissions 2026</a>
    <a href="/courses">View All Courses</a>
    <a href="/placements">100% Placement Support</a>
    <a href="/careers/work-from-home">Work From Home Fashion Jobs</a>
    <a href="/courses/graphic-designing-for-fashion">Graphic Design for Fashion Course</a>
    <a href="/courses/fashion-styling">Fashion Styling Course</a>`,
  "/interactive-training": `
    <h1>Interactive Fashion Training — OGIFT Bangalore | AI-Powered 2026</h1>
    <p>OGIFT's Interactive Fashion Training platform is an AI-powered learning environment that brings fashion education to life through dynamic, personalised instruction. Unlike traditional video-based e-learning, OGIFT's interactive training adapts to your responses, pace, and learning style — presenting content in the sequence and format that works best for you. The platform covers key fashion design topics including design fundamentals, colour theory, fabric identification, pattern making principles, and fashion styling, with interactive exercises and instant feedback at every step.</p>
    <p>Each session involves more than watching videos or reading text. Students answer questions, make design decisions, evaluate garments and fabrics, and receive immediate feedback from the AI — creating the kind of active engagement that leads to better knowledge retention. The AI tutor tracks your progress across sessions and picks up exactly where you left off when you return. The platform is available in English, Hindi, and Kannada.</p>
    <h2>Who Is This For?</h2>
    <p>The Interactive Training platform is ideal for current OGIFT students who want to practise and reinforce what they are learning in class, prospective students who want a guided introduction to fashion education before enrolling, and anyone across India who wants to develop fashion design knowledge at their own pace. For students who want the full structured curriculum with faculty support, OGIFT's in-person and online courses are available at Vinayakanagar, Bengaluru — contact the admissions team at +91 90369 28799.</p>
    <a href="/admissions">Enroll Now — Admissions 2026</a>
    <a href="/courses">View All Courses</a>
    <a href="/quicktour">Online Fashion Course Quick Tour</a>
    <a href="/videos">Fashion Design Video Lessons</a>
    <a href="/courses/onlinecourse">3-Month Online Fashion Course</a>`,
  "/faqavatar": `
    <h1>Fashion Design FAQ Avatar — OGIFT Bangalore | Get Answers 2026</h1>
    <p>OGIFT's Fashion Design FAQ Avatar is an AI-powered interactive tool that answers questions about fashion design careers, OGIFT's courses, the admissions process, fees, eligibility, and life as a fashion professional in India. The FAQ Avatar is available 24/7 and can answer hundreds of common questions instantly — so you can get the information you need at any time, without waiting for the admissions office to open.</p>
    <p>The FAQ Avatar is particularly useful for prospective students who are in the early stages of researching fashion education and want to understand what different courses lead to, how much they cost, who they are suitable for, and what the fashion industry looks like for graduates in Bangalore. It is also useful for parents and guardians who want factual information about career outcomes before supporting a student's enrolment decision.</p>
    <h2>What Can the FAQ Avatar Answer?</h2>
    <p>The FAQ Avatar can answer questions including: which course is right for my background and goals; what are the fees and payment options; what do graduates earn in their first year; is there placement support and which companies hire OGIFT graduates; how long do courses take and what are the batch timings; is there an online option; and what is the eligibility requirement. If the Avatar cannot answer a specific question, it will direct you to the OGIFT admissions team. For personalised guidance, use OGIFT's Free AI Career Counsellor at ogiftbangalore.com/counsellor or call +91 90369 28799.</p>
    <a href="/admissions">Apply Now — Admissions 2026</a>
    <a href="/counsellor">Talk to AI Counsellor</a>`,
  "/fabric-sim": `
    <h1>Interactive 3D Fabric Simulation Tool — OGIFT Bangalore | Fashion Technology</h1>
    <p>OGIFT's Interactive 3D Fabric Simulation tool is a free digital learning resource that allows fashion design students and fabric enthusiasts to explore how different fabric types behave under real-world conditions — draping, folding, stretching, and moving in response to gravity, wind, and structural tension — without needing a physical fabric sample. The tool is powered by physics-based simulation technology and is designed to help fashion students build intuitive knowledge of fabric behaviour that supports better decision-making in garment design, pattern making, and draping projects.</p>
    <p>Understanding how fabric behaves is one of the most practically important skills in fashion education — and one of the most difficult to develop without hands-on experience with a wide range of materials. A student learning to draft a draping pattern needs to understand how a bias-cut silk behaves differently from a structured linen before they can make accurate design decisions. A pattern maker calculating ease allowances needs to understand how a jersey fabric stretches versus how a woven cotton holds its shape. OGIFT's Fabric Simulation tool provides a controlled environment where students can adjust fabric properties — weight, stiffness, stretch, drape, and wind response — and observe the results in real time, building a mental model of fabric behaviour that they can apply in the studio.</p>
    <h2>How to Use the Tool</h2>
    <p>The simulation tool offers a range of fabric presets corresponding to common garment materials — silk, cotton, linen, polyester, jersey, chiffon, denim, and net. Each preset loads the physical properties typical of that material, and students can adjust individual parameters to explore how changes in weight or stiffness affect the drape. The wind simulation feature allows students to see how lightweight fabrics move — relevant for understanding evening wear and bridal garment behaviour. The AI analysis feature provides written commentary on the fabric's properties and suggests garment types for which the simulated fabric would be most appropriate. The tool is free for all OGIFT students and visitors. For structured study of fabric and textile science, see OGIFT's Fabric Knowledge and Textile Designing course. For hands-on draping training, see the Draping Technology course. Contact the OGIFT admissions team at +91 90369 28799.</p>
    <a href="/courses/draping-technology">Draping Technology Course</a>
    <a href="/courses/fabric-knowledge-textile-designing">Fabric &amp; Textile Designing Course</a>
    <a href="/courses">View All Courses</a>`,
  "/verify": `
    <h1>Verify Fashion Design Certificate — OGIFT Bangalore | Blockchain Verified</h1>
    <p>OGIFT's Certificate Verification tool allows employers, educational institutions, and anyone else to verify the authenticity of a fashion design certificate or diploma issued by Onati Global Institute of Fashion Technology (OGIFT) in Bangalore. Certificate verification is an important step in confirming that a candidate's qualification is genuine and was awarded by OGIFT for the completion of a recognised programme. OGIFT is committed to the integrity of its qualifications and provides this verification service to support hiring decisions across the Indian fashion industry.</p>
    <p>To verify a certificate, enter the certificate number printed on the OGIFT certificate or diploma document. The system will confirm whether the certificate is authentic, which programme it was awarded for, and the date of completion. Employers are encouraged to verify certificates as part of their standard recruitment process.</p>
    <h2>About OGIFT Qualifications</h2>
    <p>OGIFT (Onati Global Institute of Fashion Technology) is Bangalore's highest-rated fashion institute, founded in 2010, with a 4.9-star rating based on 250+ Google reviews. The institute awards certificates and diplomas across a comprehensive range of fashion programmes — from 1-month Express Mastery courses to 6-month and 1-year diploma programmes. All OGIFT qualifications are recognised across the Indian fashion industry and are accepted by employers including Fabindia, Raymond, Myntra, Lifestyle, Zara, H&amp;M, and leading boutique design studios across Bangalore. For certificates issued before 2020, or if you have any concerns, contact the OGIFT registrar at admissions@ogiftbangalore.com or call +91 90369 28799.</p>
    <a href="/courses">View All Courses</a>
    <a href="/admissions">Apply for Admissions 2026</a>
    <a href="/">OGIFT Home — Best Fashion Design Institute Bangalore</a>
    <a href="/about">About OGIFT</a>
    <a href="/courses/one-year-advanced-diploma-fashion-designing">1-Year Advanced Diploma in Fashion Designing</a>
    <a href="/courses/six-months-diploma-fashion-designing">6-Month Diploma in Fashion Designing</a>
    <a href="/courses/fashup-free-taster-sessions">FASHUP Free 10-Day Taster Course</a>
    <a href="/courses/fashion-illustration">Fashion Illustration Course</a>`,
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
