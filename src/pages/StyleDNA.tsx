import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, RotateCcw, Sparkles, BookOpen, Users, ChevronRight } from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

type Group = 'S2' | 'S3' | 'S5' | 'S7';

interface Question {
  id: number;
  group: Group;
  groupName: string;
  text: string;
  optionA: string;
  optionB: string;
  /** true = choosing A contributes to the High score for this dimension */
  aIsHigh: boolean;
}

const QUESTIONS: Question[] = [
  // Group 1 — Style Direction (S2)
  {
    id: 0,
    group: 'S2',
    groupName: 'Style Direction',
    text: 'Which environment speaks to you?',
    optionA: 'A serene white room with one sculptural statement piece',
    optionB: 'A rich layered space full of texture, art, and collected objects',
    aIsHigh: true,
  },
  {
    id: 1,
    group: 'S2',
    groupName: 'Style Direction',
    text: 'Your ideal everyday look is...',
    optionA: 'Monochromatic, architectural — one colour, clean silhouette',
    optionB: 'A playful mix of prints, layers, and expressive pieces',
    aIsHigh: true,
  },
  {
    id: 2,
    group: 'S2',
    groupName: 'Style Direction',
    text: 'Your ideal wardrobe is...',
    optionA: '10 perfectly chosen versatile pieces that work for everything',
    optionB: 'A full, occasion-specific wardrobe with something for every mood',
    aIsHigh: true,
  },
  {
    id: 3,
    group: 'S2',
    groupName: 'Style Direction',
    text: 'In design, you are drawn to...',
    optionA: 'Form following function — no unnecessary detail',
    optionB: 'Ornamentation as meaning — every motif tells a story',
    aIsHigh: true,
  },
  {
    id: 4,
    group: 'S2',
    groupName: 'Style Direction',
    text: 'Your ideal festive look is...',
    optionA: 'A fluid silk kurta, no embellishment, perfect drape',
    optionB: 'An embroidered jacket, layered dupattas, rich pattern-on-pattern',
    aIsHigh: true,
  },
  // Group 2 — Colour & Mood (S3)
  {
    id: 5,
    group: 'S3',
    groupName: 'Colour & Mood',
    text: 'You reach for...',
    optionA: 'Warm earthy tones — terracotta, amber, turmeric, sand',
    optionB: 'Cool neutral tones — slate, sage, ivory, dusty blue',
    aIsHigh: true,
  },
  {
    id: 6,
    group: 'S3',
    groupName: 'Colour & Mood',
    text: 'Your colour energy is...',
    optionA: 'Bold and saturated — colour that commands attention',
    optionB: 'Muted and tonal — colour that rewards a second look',
    aIsHigh: true,
  },
  {
    id: 7,
    group: 'S3',
    groupName: 'Colour & Mood',
    text: 'Your dressing approach...',
    optionA: 'Seasonal — my wardrobe shifts with festivals, weather, and mood',
    optionB: 'Perennial — a core palette I build and refine year-round',
    aIsHigh: true,
  },
  {
    id: 8,
    group: 'S3',
    groupName: 'Colour & Mood',
    text: 'Getting dressed feels like...',
    optionA: 'Creative expression — what does today\'s mood look like?',
    optionB: 'Confident efficiency — put-together without thinking about it',
    aIsHigh: true,
  },
  {
    id: 9,
    group: 'S3',
    groupName: 'Colour & Mood',
    text: 'For a wedding, you choose...',
    optionA: 'A coral-sunset lehenga — layered warm tones, vibrant presence',
    optionB: 'A dusty mauve georgette saree — one-colour, ethereal',
    aIsHigh: true,
  },
  // Group 3 — Fabric & Texture (S5)
  {
    id: 10,
    group: 'S5',
    groupName: 'Fabric & Texture',
    text: 'When you touch fabric, you love...',
    optionA: 'Natural fibres — cotton, linen, pure silk, handloom',
    optionB: 'Technical fabrics — crepe, jersey, performance weaves',
    aIsHigh: true,
  },
  {
    id: 11,
    group: 'S5',
    groupName: 'Fabric & Texture',
    text: 'Your light preference is...',
    optionA: 'Matte fabrics that absorb light and feel grounded',
    optionB: 'Fabrics with sheen, lustre, or surface luminosity',
    aIsHigh: true,
  },
  {
    id: 12,
    group: 'S5',
    groupName: 'Fabric & Texture',
    text: 'You want your clothes to...',
    optionA: 'Flow and drape — fluid, soft, moving with you',
    optionB: 'Hold their shape — structured, architectural, controlled',
    aIsHigh: true,
  },
  {
    id: 13,
    group: 'S5',
    groupName: 'Fabric & Texture',
    text: 'The surface texture that draws you...',
    optionA: 'Visible handloom irregularity — slub, nep, artisan variation',
    optionB: 'Smooth, uniform surface — perfectly consistent finish',
    aIsHigh: true,
  },
  {
    id: 14,
    group: 'S5',
    groupName: 'Fabric & Texture',
    text: 'Your design instinct pulls toward...',
    optionA: 'Womenswear and drapery — sarees, anarkalis, bias-cut',
    optionB: 'Tailoring and construction — blazers, trousers, precision cut',
    aIsHigh: true,
  },
  // Group 4 — Ornament & Craft (S7)
  {
    id: 15,
    group: 'S7',
    groupName: 'Ornament & Craft',
    text: 'Your fastening preference...',
    optionA: 'Clean and invisible — seamless construction, no hardware',
    optionB: 'Hardware as design — jewel buttons, chains, statement closures',
    aIsHigh: false,
  },
  {
    id: 16,
    group: 'S7',
    groupName: 'Ornament & Craft',
    text: 'Construction quality reads as...',
    optionA: 'Machine precision — uniform, perfect seam consistency',
    optionB: 'Handcraft presence — visible hand stitching, artisan irregularity',
    aIsHigh: false,
  },
  {
    id: 17,
    group: 'S7',
    groupName: 'Ornament & Craft',
    text: 'Your aesthetic influences...',
    optionA: 'International — Scandinavian minimalism, Japanese precision',
    optionB: 'Rooted — Indian regional textiles, craft heritage, local makers',
    aIsHigh: false,
  },
  {
    id: 18,
    group: 'S7',
    groupName: 'Ornament & Craft',
    text: 'In an outfit, the story is told by...',
    optionA: 'The silhouette itself — drape is the statement',
    optionB: 'The embellishment — zari, mirror work, block print, kantha',
    aIsHigh: false,
  },
  {
    id: 19,
    group: 'S7',
    groupName: 'Ornament & Craft',
    text: 'Your embroidery feeling...',
    optionA: 'Barely there or none — let the fabric breathe',
    optionB: 'Rich and immersive — phulkari, zardozi, mirror work, intricate craft',
    aIsHigh: false,
  },
];

interface StyleIdentity {
  key: string;
  name: string;
  tagline: string;
  course: string;
  link: string;
  peers: string[];
}

const IDENTITIES: Record<string, StyleIdentity> = {
  HHHH: {
    key: 'HHHH',
    name: 'Structured Minimalist',
    tagline: 'Precise intentional design with warm colour and natural material. Architecture meets feeling.',
    course: '1-Year Advanced Diploma',
    link: '/courses/one-year-advanced-diploma-fashion-designing',
    peers: ['Sabyasachi (early work)', 'Anita Dongre', 'Studio Rubric'],
  },
  HHHL: {
    key: 'HHHL',
    name: 'Architectural Purist',
    tagline: 'Structure and warmth, minimal embellishment — a well-draped garment needs nothing added.',
    course: 'Draping Technology',
    link: '/courses/draping-technology',
    peers: ['Issey Miyake', 'Rimzim Dadu', 'But Natural Studio'],
  },
  HHLH: {
    key: 'HHLH',
    name: 'Modern Classicist',
    tagline: 'Structured and colour-forward with craft as punctuation. Regional heritage as quiet signifier.',
    course: 'Boutique Management',
    link: '/courses/fashion-designing-boutique-management',
    peers: ['Masaba Gupta', 'Abraham & Thakore', 'Raw Mango'],
  },
  HHLL: {
    key: 'HHLL',
    name: 'Clean Contemporary',
    tagline: 'Colour and structure as primary tools, clean editorial finish. You think in looks, not pieces.',
    course: 'Fashion Illustration',
    link: '/courses/fashion-illustration',
    peers: ['Calvin Klein', 'Pero', 'Bodice Studio'],
  },
  HLHH: {
    key: 'HLHH',
    name: 'Tonal Texturist',
    tagline: 'Muted palettes with extraordinary material depth and craft punctuation.',
    course: 'Fabric Knowledge & Textile Designing',
    link: '/courses/fabric-knowledge-textile-designing',
    peers: ['Rajesh Pratap Singh', 'Injiri', 'The Loom'],
  },
  HLHL: {
    key: 'HLHL',
    name: 'Quiet Luxurian',
    tagline: 'Understated sophistication. Minimal palette, natural materials, the quiet that speaks loudest.',
    course: 'Fashion Styling',
    link: '/courses/fashion-styling',
    peers: ['The Row', 'Pero', 'Payal Khandwala'],
  },
  HLLH: {
    key: 'HLLH',
    name: 'Muted Modernist',
    tagline: 'Cool silence punctuated by craft detail. Clean structure meets handmade heritage.',
    course: 'Advanced Pattern Making',
    link: '/courses/pattern-making-western-advanced',
    peers: ['Amit Aggarwal', 'Shift by Nimish Shah', 'Urvashi Kaur'],
  },
  HLLL: {
    key: 'HLLL',
    name: 'Essentialist',
    tagline: 'Pure form. No colour drama, no texture excess, no embellishment. Beauty in the irreducible.',
    course: 'Pattern Making Basic',
    link: '/courses/pattern-making-basic',
    peers: ['Jil Sander', 'Akaaro', 'Eleven Eleven'],
  },
  LHHH: {
    key: 'LHHH',
    name: 'Textured Heritage',
    tagline: 'Rich colour, natural material, regional craft — full expression of Indian fashion heritage in a contemporary frame.',
    course: '1-Year Advanced Diploma',
    link: '/courses/one-year-advanced-diploma-fashion-designing',
    peers: ['Sabyasachi', 'Gaurang Shah', 'Anavila'],
  },
  LHHL: {
    key: 'LHHL',
    name: 'Sensory Expressionist',
    tagline: 'Colour and material layered into sensation — warm tones, natural textures, expressive silhouettes.',
    course: 'Fashion Illustration',
    link: '/courses/fashion-illustration',
    peers: ['Tarun Tahiliani', 'Manish Arora', 'Rina Dhaka'],
  },
  LHLH: {
    key: 'LHLH',
    name: 'Colour Artisan',
    tagline: 'Expressive palette with heritage craft at the core. Celebrating Indian colour tradition through embellishment.',
    course: 'Graphic Design for Fashion',
    link: '/courses/graphic-designing-for-fashion',
    peers: ['Anita Dongre', 'Ritu Kumar', 'Anju Modi'],
  },
  LHLL: {
    key: 'LHLL',
    name: 'Vivid Minimalist',
    tagline: 'One bold colour, clean structure. The palette is enough — strong, editorial, immediately recognisable.',
    course: 'Fashion Illustration',
    link: '/courses/fashion-illustration',
    peers: ['Wendell Rodricks', 'Kanika Goyal', 'Bibhu Mohapatra'],
  },
  LLHH: {
    key: 'LLHH',
    name: 'Craft Maximalist',
    tagline: 'Texture and embellishment are everything. Natural materials layered with rich craft — garments as living objects.',
    course: 'Boutique Management',
    link: '/courses/fashion-designing-boutique-management',
    peers: ['Abu Jani Sandeep Khosla', 'Sabyasachi', 'Shyam Narayan Prasad'],
  },
  LLHL: {
    key: 'LLHL',
    name: 'Organic Romantic',
    tagline: 'Fluid, natural, effortless. You let the fabric make the statement.',
    course: 'Draping Technology',
    link: '/courses/draping-technology',
    peers: ['Anavila', 'Payal Khandwala', 'Eleven Eleven'],
  },
  LLLH: {
    key: 'LLLH',
    name: 'Global Eclectic',
    tagline: 'Cultural cross-pollination is your creative engine. You move across traditions with instinctive curatorial eye.',
    course: '6-Month Diploma',
    link: '/courses/six-months-diploma-fashion-designing',
    peers: ['Manish Arora', 'Namrata Joshipura', 'Ashish N Soni'],
  },
  LLLL: {
    key: 'LLLL',
    name: 'Intuitive Layerist',
    tagline: 'Your aesthetic is still forming — and that\'s a strength. The most open and curious creative space.',
    course: 'FASHUP Free Taster',
    link: '/courses/fashup-free-taster-sessions',
    peers: ['Rei Kawakubo', 'M.M. LaFleur', 'Explore everything first'],
  },
};

const DIMENSION_LABELS: Record<Group, { high: string; low: string; label: string }> = {
  S2: {
    label: 'Style Direction',
    high: 'Your style direction is minimalist and architectural — you gravitate to clean silhouettes, considered restraint, and the power of a single well-chosen form.',
    low: 'Your style direction is expressive and layered — you find energy in complexity, pattern play, and the richness of multiple elements in conversation.',
  },
  S3: {
    label: 'Colour & Mood',
    high: 'Your colour and mood signature is warm and seasonal — you dress in response to the moment, with rich, saturated tones that reflect your inner weather.',
    low: 'Your colour and mood signature is cool and perennial — you build in muted, enduring palettes that evolve slowly and speak quietly.',
  },
  S5: {
    label: 'Fabric & Texture',
    high: 'Your fabric and texture affinity is natural and draping — you are drawn to materials that breathe, move, and carry the history of their making.',
    low: 'Your fabric and texture affinity is structured and technical — you are drawn to fabrics that hold form, support construction, and deliver precision.',
  },
  S7: {
    label: 'Ornament & Craft',
    high: 'Your ornament and craft signature is rich and heritage-rooted — you believe embellishment, handcraft, and regional tradition are the highest form of fashion intelligence.',
    low: 'Your ornament and craft signature is minimal and globally influenced — you find beauty in reduction, precision, and the absence of excess.',
  },
};

// ─── Radar Chart ─────────────────────────────────────────────────────────────

interface RadarChartProps {
  scores: Record<Group, number>;
}

function RadarChart({ scores }: RadarChartProps) {
  const cx = 100;
  const cy = 100;
  const maxR = 75;

  // Axes: S2=top(270°), S3=right(0°), S5=bottom(90°), S7=left(180°)
  // In SVG, angles are measured clockwise from 3 o'clock (right)
  // top = -90° = 270deg, right = 0°, bottom = 90°, left = 180°
  const axes: { group: Group; angle: number; label: string; labelX: number; labelY: number }[] = [
    { group: 'S2', angle: -90, label: 'Style', labelX: cx, labelY: cy - maxR - 12 },
    { group: 'S3', angle: 0,   label: 'Colour', labelX: cx + maxR + 14, labelY: cy },
    { group: 'S5', angle: 90,  label: 'Fabric', labelX: cx, labelY: cy + maxR + 16 },
    { group: 'S7', angle: 180, label: 'Craft', labelX: cx - maxR - 14, labelY: cy },
  ];

  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const axisEndpoints = axes.map(({ angle }) => ({
    x: cx + maxR * Math.cos(toRad(angle)),
    y: cy + maxR * Math.sin(toRad(angle)),
  }));

  const scorePoints = axes.map(({ group, angle }) => {
    const r = scores[group] * maxR;
    return {
      x: cx + r * Math.cos(toRad(angle)),
      y: cy + r * Math.sin(toRad(angle)),
    };
  });

  const polygonPoints = scorePoints.map(p => `${p.x},${p.y}`).join(' ');

  const gridRadii = [maxR * (1 / 3), maxR * (2 / 3), maxR];

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-xs mx-auto" aria-label="Style DNA radar chart">
      {/* Grid circles */}
      {gridRadii.map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="0.8"
          strokeDasharray={i < 2 ? '3 3' : undefined}
        />
      ))}

      {/* Axis lines */}
      {axisEndpoints.map((end, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={end.x}
          y2={end.y}
          stroke="hsl(var(--border))"
          strokeWidth="0.8"
        />
      ))}

      {/* Score polygon */}
      <polygon
        points={polygonPoints}
        fill="rgb(139 92 246 / 0.25)"
        stroke="rgb(139 92 246)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Score dots */}
      {scorePoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="rgb(139 92 246)" />
      ))}

      {/* Axis labels */}
      {axes.map(({ label, labelX, labelY, angle }) => {
        let anchor: 'middle' | 'start' | 'end' = 'middle';
        if (angle === 0) anchor = 'start';
        else if (angle === 180) anchor = 'end';
        return (
          <text
            key={label}
            x={labelX}
            y={labelY}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="9"
            fontWeight="600"
            fill="hsl(var(--foreground))"
          >
            {label}
          </text>
        );
      })}
    </svg>
  );
}

// ─── Score computation helpers ───────────────────────────────────────────────

const GROUP_INDICES: Record<Group, number[]> = {
  S2: [0, 1, 2, 3, 4],
  S3: [5, 6, 7, 8, 9],
  S5: [10, 11, 12, 13, 14],
  S7: [15, 16, 17, 18, 19],
};

function computeScores(responses: (boolean | null)[]): Record<Group, number> {
  const calc = (group: Group): number => {
    const indices = GROUP_INDICES[group];
    let highCount = 0;
    for (const idx of indices) {
      const q = QUESTIONS[idx];
      const chose = responses[idx];
      if (chose === null) continue;
      const isHigh = q.aIsHigh ? chose === true : chose === false;
      if (isHigh) highCount++;
    }
    return highCount / 5;
  };
  return { S2: calc('S2'), S3: calc('S3'), S5: calc('S5'), S7: calc('S7') };
}

function identityKey(scores: Record<Group, number>): string {
  const h = (s: number) => (s >= 0.5 ? 'H' : 'L');
  return h(scores.S2) + h(scores.S3) + h(scores.S5) + h(scores.S7);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ScoreBar({ label, score }: { label: string; score: number }) {
  const pct = Math.round(score * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground text-xs">{pct}%</span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Phase: Intro ─────────────────────────────────────────────────────────────

interface IntroProps {
  onStart: () => void;
}

function IntroScreen({ onStart }: IntroProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-violet-50 via-background to-fuchsia-50">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center space-y-8 py-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          OGIFT Style DNA Profiling
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Discover Your{' '}
          <span className="text-primary">Style DNA</span>
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
          20 carefully crafted visual choices reveal your 4-dimensional aesthetic profile —
          your unique style identity across direction, colour, fabric, and craft.
          Discover what your instincts already know.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
          {['20 Questions', '4 Dimensions', '16 Identities', '~5 Minutes'].map(item => (
            <div key={item} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-background/60 border border-border/40 shadow-sm">
              <span className="font-semibold text-foreground">{item.split(' ')[0]}</span>
              <span>{item.split(' ').slice(1).join(' ')}</span>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="gap-2 px-8 py-4 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
          onClick={onStart}
        >
          Begin Your Profile
          <ArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-xs text-muted-foreground">
          No sign-up required · Results are instant · Completely free
        </p>
      </div>
    </div>
  );
}

// ─── Phase: Quiz ──────────────────────────────────────────────────────────────

interface QuizProps {
  currentQ: number;
  responses: (boolean | null)[];
  onAnswer: (chooseA: boolean) => void;
}

function QuizScreen({ currentQ, responses, onAnswer }: QuizProps) {
  const q = QUESTIONS[currentQ];
  const progress = currentQ / 20;
  const groupIndex = Math.floor(currentQ / 5) + 1;

  // Group colour accents
  const groupColours: Record<Group, string> = {
    S2: 'bg-violet-100 text-violet-700 border-violet-200',
    S3: 'bg-amber-100 text-amber-700 border-amber-200',
    S5: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    S7: 'bg-rose-100 text-rose-700 border-rose-200',
  };

  const groupDot: Record<Group, string> = {
    S2: 'bg-violet-500',
    S3: 'bg-amber-500',
    S5: 'bg-emerald-500',
    S7: 'bg-rose-500',
  };

  const chosen = responses[currentQ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur border-b border-border/40 px-4 py-3">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Question {currentQ + 1} of 20</span>
            <span>{Math.round(progress * 100)}% complete</span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          {/* Group dots */}
          <div className="flex items-center gap-1.5">
            {(['S2', 'S3', 'S5', 'S7'] as Group[]).map((g, i) => (
              <div
                key={g}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i < groupIndex - 1
                    ? groupDot[g]
                    : i === groupIndex - 1
                    ? groupDot[g] + ' opacity-60'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl space-y-6">
          {/* Group badge */}
          <div className="flex items-center gap-2">
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${groupColours[q.group]}`}
            >
              {q.groupName}
            </span>
            <span className="text-xs text-muted-foreground">Group {groupIndex} of 4</span>
          </div>

          {/* Question */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
            {q.text}
          </h2>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {([true, false] as const).map(isA => {
              const label = isA ? 'A' : 'B';
              const text = isA ? q.optionA : q.optionB;
              const isSelected = chosen === isA;
              return (
                <button
                  key={label}
                  onClick={() => onAnswer(isA)}
                  className={`
                    group relative text-left p-5 rounded-xl border-2 transition-all duration-200
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                    ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border bg-card hover:border-primary/50 hover:bg-muted/30 hover:shadow-sm'
                    }
                  `}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`
                        flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors
                        ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary'}
                      `}
                    >
                      {label}
                    </span>
                    <p className={`text-sm leading-relaxed ${isSelected ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                      {text}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {chosen !== null && (
            <p className="text-center text-xs text-muted-foreground animate-in fade-in duration-300">
              Great choice — moving to the next question...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Phase: Result ────────────────────────────────────────────────────────────

interface ResultProps {
  responses: (boolean | null)[];
  onRetake: () => void;
}

function ResultScreen({ responses, onRetake }: ResultProps) {
  const scores = computeScores(responses);
  const key = identityKey(scores);
  const identity = IDENTITIES[key];
  const groups: Group[] = ['S2', 'S3', 'S5', 'S7'];

  return (
    <div className="min-h-screen bg-background">
      {/* Result hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white/90 text-sm font-medium backdrop-blur-sm border border-white/20">
            <Sparkles className="w-4 h-4" />
            Your Style DNA
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{identity.name}</h1>
          <p className="text-lg text-white/80 max-w-xl mx-auto leading-relaxed">{identity.tagline}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-white/60">
            <span>Identity code:</span>
            <code className="px-2 py-0.5 rounded bg-white/10 font-mono font-bold text-white">{key}</code>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-10">

        {/* Score bars */}
        <Card className="p-6 shadow-lg rounded-xl">
          <h2 className="text-lg font-semibold text-foreground mb-5">Your Dimension Scores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {groups.map(g => (
              <ScoreBar
                key={g}
                label={DIMENSION_LABELS[g].label}
                score={scores[g]}
              />
            ))}
          </div>
        </Card>

        {/* Radar chart + dimension descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 shadow-lg rounded-xl flex flex-col items-center justify-center">
            <h2 className="text-lg font-semibold text-foreground mb-4 self-start">Aesthetic Radar</h2>
            <RadarChart scores={scores} />
          </Card>

          <Card className="p-6 shadow-lg rounded-xl space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Dimension Breakdown</h2>
            {groups.map(g => {
              const isHigh = scores[g] >= 0.5;
              const desc = isHigh ? DIMENSION_LABELS[g].high : DIMENSION_LABELS[g].low;
              const dotColour: Record<Group, string> = {
                S2: 'bg-violet-500',
                S3: 'bg-amber-500',
                S5: 'bg-emerald-500',
                S7: 'bg-rose-500',
              };
              return (
                <div key={g} className="flex gap-3">
                  <div className={`mt-1.5 flex-shrink-0 w-2 h-2 rounded-full ${dotColour[g]}`} />
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </Card>
        </div>

        {/* Programme recommendation */}
        <Card className="p-6 shadow-lg rounded-xl bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">Recommended Programme</p>
              <h3 className="text-xl font-bold text-foreground">{identity.course}</h3>
              <p className="text-sm text-muted-foreground">
                Based on your Style DNA profile, this course is the best-matched starting point for your creative journey at OGIFT.
              </p>
              <div className="pt-3 flex flex-wrap gap-3">
                <Link to={identity.link}>
                  <Button className="gap-2 shadow-sm">
                    Explore this Course
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/admissions">
                  <Button variant="outline" className="gap-2">
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Style peers */}
        <Card className="p-6 shadow-lg rounded-xl">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-fuchsia-100 flex items-center justify-center">
              <Users className="w-5 h-5 text-fuchsia-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Your Style Peers</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Designers and houses whose aesthetic sensibility resonates with your Style DNA.
              </p>
              <div className="flex flex-wrap gap-2">
                {identity.peers.map(peer => (
                  <span
                    key={peer}
                    className="px-3 py-1.5 rounded-full bg-muted/60 border border-border text-sm font-medium text-foreground"
                  >
                    {peer}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* CTA — talk to counsellor */}
        <Card className="p-6 shadow-lg rounded-xl bg-gradient-to-r from-violet-50 to-fuchsia-50 border-violet-200/60">
          <div className="text-center space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Ready to bring your Style DNA to life?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Our admissions counsellors can walk you through the right programme, schedule a studio visit, and help you start your fashion journey at OGIFT.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <Link to="/admissions">
                <Button size="lg" className="gap-2 shadow-md hover:shadow-lg transition-all px-6">
                  Talk to a Counsellor
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 text-muted-foreground hover:text-foreground"
                onClick={onRetake}
              >
                <RotateCcw className="w-4 h-4" />
                Retake the Quiz
              </Button>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'quiz' | 'result';

const StyleDNA = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [responses, setResponses] = useState<(boolean | null)[]>(Array(20).fill(null));

  const handleStart = () => {
    setPhase('quiz');
    setCurrentQ(0);
    setResponses(Array(20).fill(null));
  };

  const handleAnswer = (chooseA: boolean) => {
    const updated = [...responses];
    updated[currentQ] = chooseA;
    setResponses(updated);

    // Auto-advance after a short delay so the user sees their selection
    setTimeout(() => {
      if (currentQ < 19) {
        setCurrentQ(prev => prev + 1);
      } else {
        setPhase('result');
      }
    }, 400);
  };

  const handleRetake = () => {
    setPhase('intro');
    setCurrentQ(0);
    setResponses(Array(20).fill(null));
  };

  const pageTitle = 'Style DNA Quiz — Discover Your Aesthetic Identity | OGIFT Bangalore';
  const pageDescription =
    'Take the free OGIFT Style DNA quiz — 20 visual questions that reveal your 4-dimensional aesthetic profile across style direction, colour, fabric, and craft. Find your identity and the right fashion course for you.';

  return (
    <main className="min-h-screen" role="main">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="style DNA quiz, aesthetic profile, fashion identity quiz, OGIFT bangalore, style quiz, fashion quiz, minimalist maximalist, colour personality, fabric preference, craft aesthetic" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/style-dna" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://www.ogiftbangalore.com/style-dna" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="OGIFT Bangalore" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      {phase === 'intro' && <IntroScreen onStart={handleStart} />}
      {phase === 'quiz' && (
        <QuizScreen
          currentQ={currentQ}
          responses={responses}
          onAnswer={handleAnswer}
        />
      )}
      {phase === 'result' && (
        <ResultScreen responses={responses} onRetake={handleRetake} />
      )}
    </main>
  );
};

export default StyleDNA;
