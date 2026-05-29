import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, AlertCircle, Palette, Briefcase, BookOpen, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BandScores {
  s2: number;
  s3: number;
  s5: number;
  s7: number;
}

interface TopTrend {
  name: string;
  tfs: number;
  bands: BandScores;
  interpretation: string;
}

interface EmergingSignal {
  name: string;
  tfs: number;
  description: string;
}

interface FadingSignal {
  name: string;
  tfsNow: number;
  tfsPrev: number;
  prevLabel: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const topTrends: TopTrend[] = [
  {
    name: 'Digital Sari',
    tfs: 13.4,
    bands: { s2: 0.82, s3: 0.71, s5: 0.88, s7: 0.76 },
    interpretation:
      'The fusion of traditional saree silhouettes with technical performance fabrics is crossing from runway concept into Bangalore\'s retail mainstream. OGIFT graduates tracking e-commerce data are seeing digital-print handloom hybrids reaching top-5 category rankings on Myntra. The trend is structurally strong across all four bands — a macro shift in how Indian women reconcile heritage identity with modern material innovation.',
  },
  {
    name: 'Tech-Casual Elevation',
    tfs: 12.1,
    bands: { s2: 0.79, s3: 0.58, s5: 0.81, s7: 0.42 },
    interpretation:
      "Bangalore's IT workforce is driving a distinct local signal: the demand for elevated casual workwear that moves between laptop and lunch with equal authority. This is not athleisure — it is structured casualwear with quality fabric and reduced formality. Strong in micro and macro bands, with weak embellishment signal confirming the clean-line direction.",
  },
  {
    name: 'Heritage Khadi Revival',
    tfs: 11.8,
    bands: { s2: 0.65, s3: 0.74, s5: 0.92, s7: 0.68 },
    interpretation:
      "Sustainability-driven khadi is completing its transition from political symbol to fashion premium. The material band signal (S5: 0.92) is the highest in this month's tracked vocabulary — consumers are responding to khadi's tactile distinctiveness and environmental provenance simultaneously. A structural multi-season trend, not a viral moment.",
  },
  {
    name: 'Festive Minimalism',
    tfs: 11.2,
    bands: { s2: 0.88, s3: 0.72, s5: 0.61, s7: 0.38 },
    interpretation:
      'The counter-movement to maximalist wedding and festival wear is generating genuine market signal. Consumers fatigued by embellishment excess are seeking one-garment statements in premium fabric — a well-cut silk kurta, an architectural chanderi drape. High macro and seasonal band scores confirm this is not a single-season correction but a structural shift in festive dressing.',
  },
  {
    name: 'Startup Colour',
    tfs: 9.8,
    bands: { s2: 0.52, s3: 0.89, s5: 0.55, s7: 0.44 },
    interpretation:
      "Bangalore's startup culture is generating a distinct colour signal: bold, optimistic palettes in workwear contexts where corporate dress codes once demanded neutrals. Cobalt, burnt orange, and forest green are appearing in office contexts at measurably accelerating rates in social content from the Bangalore tech corridor.",
  },
];

const emergingSignals: EmergingSignal[] = [
  {
    name: 'Upcycled Handloom',
    tfs: 8.6,
    description:
      'Accelerating multi-scale alignment. Vintage handloom reworked into contemporary silhouettes is moving from niche sustainability into aspirational mainstream.',
  },
  {
    name: 'Athleisure-Ethnic Fusion',
    tfs: 8.2,
    description:
      "Yoga pants under kurtas, sneakers with anarkalis — the signal is accelerating in Bangalore's younger demographic across micro and viral bands.",
  },
  {
    name: 'Muted Bridal Palette',
    tfs: 7.9,
    description:
      'Ivory, sage, and dusty rose are entering the bridal signal. The traditional red monopoly on wedding colour is showing its first serious challenge in search volume data.',
  },
];

const fadingSignals: FadingSignal[] = [
  {
    name: 'Maximalist Mirror Work',
    tfsNow: 5.8,
    tfsPrev: 11.2,
    prevLabel: 'six months ago',
    description:
      'High visibility in market but signal momentum has reversed. Mirror-work embellishment is reaching saturation. Consumer attention is moving to the Festive Minimalism counter-signal above.',
  },
  {
    name: 'Neon Streetwear',
    tfsNow: 4.9,
    tfsPrev: 9.1,
    prevLabel: 'six months ago',
    description:
      'The viral peak passed in Q1. Neon is now appearing in mass-market contexts — typically the final phase before mainstream fatigue. Streetwear\'s leading edge has moved toward earth tones and vintage neutrals.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const TFSBadge = ({ score }: { score: number }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-sm border border-amber-300">
    <span className="text-lg font-extrabold tracking-tight">{score.toFixed(1)}</span>
    <span className="text-amber-600 font-normal">/ 16</span>
  </span>
);

const BandBar = ({
  label,
  value,
  colour,
}: {
  label: string;
  value: number;
  colour: string;
}) => (
  <div className="flex items-center gap-2">
    <span className="w-20 text-xs font-medium text-slate-500 shrink-0">{label}</span>
    <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
      <div
        className={`h-full rounded-full ${colour}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
    <span className="w-10 text-xs text-slate-500 text-right shrink-0">{value.toFixed(2)}</span>
  </div>
);

const BandBreakdown = ({ bands }: { bands: BandScores }) => (
  <div className="space-y-1.5 my-4 p-3 rounded-lg bg-slate-50 border border-slate-100">
    <BandBar label="S₂ Macro" value={bands.s2} colour="bg-violet-500" />
    <BandBar label="S₃ Seasonal" value={bands.s3} colour="bg-blue-500" />
    <BandBar label="S₅ Micro" value={bands.s5} colour="bg-emerald-500" />
    <BandBar label="S₇ Viral" value={bands.s7} colour="bg-rose-400" />
  </div>
);

const TopTrendCard = ({ trend, rank }: { trend: TopTrend; rank: number }) => (
  <Card className="p-6 hover:shadow-md transition-shadow border border-slate-200">
    <div className="flex items-start justify-between gap-4 mb-3">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm shrink-0">
          {rank}
        </span>
        <h3 className="text-xl font-bold text-slate-900 leading-tight">{trend.name}</h3>
      </div>
      <TFSBadge score={trend.tfs} />
    </div>
    <BandBreakdown bands={trend.bands} />
    <p className="text-slate-600 text-sm leading-relaxed">{trend.interpretation}</p>
  </Card>
);

const EmergingCard = ({ signal }: { signal: EmergingSignal }) => (
  <Card className="p-5 border-l-4 border-l-amber-400 border-t border-r border-b border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-base font-bold text-slate-900">{signal.name}</h3>
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold text-xs border border-amber-200">
        TFS {signal.tfs.toFixed(1)}
      </span>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">{signal.description}</p>
  </Card>
);

const FadingCard = ({ signal }: { signal: FadingSignal }) => (
  <Card className="p-5 border-l-4 border-l-rose-400 border-t border-r border-b border-slate-200 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-base font-bold text-slate-900">{signal.name}</h3>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400 line-through">{signal.tfsPrev.toFixed(1)}</span>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-800 font-semibold text-xs border border-rose-200">
          TFS {signal.tfsNow.toFixed(1)}
        </span>
      </div>
    </div>
    <p className="text-xs text-rose-600 mb-2 font-medium">
      Was {signal.tfsPrev.toFixed(1)} {signal.prevLabel}
    </p>
    <p className="text-slate-600 text-sm leading-relaxed">{signal.description}</p>
  </Card>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const TrendForecasting = () => {
  return (
    <main className="min-h-screen bg-white" role="main">
      <Helmet>
        <title>Bangalore Fashion Frequency Report — May 2026 | OGIFT Trend Intelligence</title>
        <meta
          name="description"
          content="The Bangalore Fashion Frequency Report (BFFR) — May 2026. Monthly fashion trend intelligence for the Indian market powered by CANON hierarchical signal analysis. Published by OGIFT Bangalore."
        />
        <meta
          name="keywords"
          content="Bangalore fashion trends 2026, India fashion trend report, BFFR May 2026, OGIFT trend forecasting, CANON fashion signal analysis, Indian fashion forecast, fashion trend intelligence India, Bangalore fashion market, digital sari trend, tech casual workwear Bangalore"
        />
        <link rel="canonical" href="https://www.ogiftbangalore.com/trend-forecasting" />
        <meta property="og:title" content="Bangalore Fashion Frequency Report — May 2026 | OGIFT" />
        <meta
          property="og:description"
          content="Monthly fashion trend intelligence for the Indian market. Top trends, emerging signals, fading signals, and career direction for fashion professionals in Bangalore."
        />
        <meta property="og:url" content="https://www.ogiftbangalore.com/trend-forecasting" />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="OGIFT Bangalore" />
        <meta property="og:locale" content="en_IN" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bangalore Fashion Frequency Report — May 2026 | OGIFT" />
        <meta
          name="twitter:description"
          content="Monthly fashion trend intelligence. Top 5 trends by TFS score, emerging signals, fading trends, and the Colour of the Month — for fashion professionals and students in Bangalore."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta property="article:published_time" content="2026-05-01T00:00:00+05:30" />
        <meta property="article:author" content="OGIFT — Onati Global Institute of Fashion Technology" />
      </Helmet>

      {/* ── HERO ── */}
      <header
        className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 overflow-hidden"
        aria-label="Report header"
      >
        {/* decorative gold accent lines */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-yellow-300 to-amber-500" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-500/30" />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-widest uppercase">
              May 2026 Edition
            </span>
            <span className="text-slate-500 text-sm">Published 1 May 2026</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Bangalore Fashion{' '}
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Frequency Report
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mb-8 leading-relaxed">
            Multi-scale trend intelligence for the Indian fashion market. Powered by CANON
            hierarchical signal analysis.
          </p>

          <p className="text-slate-400 text-sm">
            Published monthly by{' '}
            <span className="text-amber-400 font-medium">
              OGIFT — Onati Global Institute of Fashion Technology
            </span>
          </p>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-20">

        {/* ── SECTION 1: TOP 5 TRENDS ── */}
        <section aria-labelledby="top-trends-heading">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-amber-500 shrink-0" aria-hidden="true" />
            <div>
              <h2 id="top-trends-heading" className="text-2xl font-bold text-slate-900">
                Top 5 Trends by TFS
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Trend Frequency Score — composite signal strength, max 16
              </p>
            </div>
          </div>

          <ol className="space-y-6" role="list" aria-label="Top trends ranked by TFS">
            {topTrends.map((trend, i) => (
              <li key={trend.name}>
                <TopTrendCard trend={trend} rank={i + 1} />
              </li>
            ))}
          </ol>
        </section>

        {/* ── SECTION 2: EMERGING SIGNALS ── */}
        <section aria-labelledby="emerging-heading">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="h-6 w-6 text-amber-500 shrink-0" aria-hidden="true" />
            <h2 id="emerging-heading" className="text-2xl font-bold text-slate-900">
              Emerging Signals
            </h2>
          </div>
          <p className="text-slate-500 text-sm mb-6 ml-9">Watch these in the next 60 days</p>

          <ul className="space-y-4" role="list">
            {emergingSignals.map((signal) => (
              <li key={signal.name}>
                <EmergingCard signal={signal} />
              </li>
            ))}
          </ul>
        </section>

        {/* ── SECTION 3: FADING SIGNALS ── */}
        <section aria-labelledby="fading-heading">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="h-6 w-6 text-rose-500 shrink-0" aria-hidden="true" />
            <h2 id="fading-heading" className="text-2xl font-bold text-slate-900">
              Fading Signals
            </h2>
          </div>
          <p className="text-slate-500 text-sm mb-6 ml-9">The curve has peaked</p>

          <ul className="space-y-4" role="list">
            {fadingSignals.map((signal) => (
              <li key={signal.name}>
                <FadingCard signal={signal} />
              </li>
            ))}
          </ul>
        </section>

        {/* ── SECTION 4: BANGALORE SPOTLIGHT ── */}
        <section aria-labelledby="spotlight-heading">
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 md:p-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-widest uppercase">
                Bangalore Spotlight
              </span>
            </div>
            <h2
              id="spotlight-heading"
              className="text-2xl md:text-3xl font-bold mt-4 mb-2 leading-tight"
            >
              Tech-Casual Elevation:{' '}
              <span className="text-amber-400">Bangalore's Indigenous Trend Signal</span>
            </h2>
            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              Bangalore occupies a unique position in India's fashion signal landscape. The city's
              2.5 million-strong tech workforce creates fashion demand patterns visible nowhere else
              in India — elevated casual, performance-comfort hybrids, and a distinctly understated
              professional aesthetic that rewards quality over ostentation. This month's
              Bangalore-specific spotlight is the emergence of 'smart occasion casualwear' —
              garments that function as professional dress in a startup environment while reading as
              fashion-forward in social contexts. OGIFT graduates entering fashion retail, styling,
              and product development roles are well-positioned to serve this market segment, which
              no major Indian fashion brand has yet addressed at scale.
            </p>
          </div>
        </section>

        {/* ── SECTION 5: COLOUR OF THE MONTH ── */}
        <section aria-labelledby="colour-heading">
          <div className="flex items-center gap-3 mb-8">
            <Palette className="h-6 w-6 text-amber-500 shrink-0" aria-hidden="true" />
            <h2 id="colour-heading" className="text-2xl font-bold text-slate-900">
              Colour of the Month
            </h2>
          </div>

          <Card className="overflow-hidden border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row">
              {/* Swatch */}
              <div
                className="w-full md:w-48 h-48 md:h-auto shrink-0 flex items-center justify-center"
                style={{ backgroundColor: '#C2714F' }}
                aria-label="Colour swatch: Warm Terracotta #C2714F"
              >
                <span className="text-white/80 font-mono text-sm font-medium select-all">
                  #C2714F
                </span>
              </div>

              {/* Info */}
              <div className="p-6 md:p-8 flex-1">
                <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                  <h3 className="text-2xl font-bold text-slate-900">Warm Terracotta</h3>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-sm border border-amber-300">
                    <span className="font-extrabold">0.68</span>
                    <span className="text-amber-600 font-normal text-xs">S₃×S₅</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4 font-mono">
                  Signal product: S₃ (0.74) × S₅ (0.92) = 0.68 — highest this month
                </p>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  Terracotta scores highest on the product of mood-band and material-band signals
                  this month. Warm, saturated, and deeply rooted in Indian craft tradition, it reads
                  as simultaneously festive and modern. Expect to see it dominate festive season
                  buying from July.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ── SECTION 6: CAREER SIGNAL ── */}
        <section aria-labelledby="career-heading">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="h-6 w-6 text-amber-500 shrink-0" aria-hidden="true" />
            <div>
              <h2 id="career-heading" className="text-2xl font-bold text-slate-900">
                Career Signal
              </h2>
              <p className="text-sm text-slate-500 mt-0.5">
                This month's leading trend → your career direction
              </p>
            </div>
          </div>

          <Card className="p-6 md:p-8 border border-slate-200 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-700 text-xs font-semibold">
                #1 TFS this month
              </span>
              <h3 className="text-xl font-bold text-slate-900">Digital Sari</h3>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6">
              Digital Sari — the month's top TFS score — sits at the intersection of textile
              knowledge, draping skill, and digital design fluency. The careers being created by
              this trend are not traditional roles: they include digital textile designers who
              understand both handloom construction and digital print processes, and product
              developers who can translate between artisan weaving communities and fashion-tech
              brands. OGIFT's Fabric Knowledge &amp; Textile Designing course builds the foundation
              for this exact career direction.
            </p>
            <Button asChild className="gap-2">
              <Link to="/courses/fabric-knowledge-textile-designing">
                <BookOpen className="h-4 w-4" aria-hidden="true" />
                Fabric Knowledge &amp; Textile Designing Course
              </Link>
            </Button>
          </Card>
        </section>

        {/* ── SECTION 7: METHODOLOGY ── */}
        <section
          aria-labelledby="methodology-heading"
          className="border-t border-slate-100 pt-10"
        >
          <h2
            id="methodology-heading"
            className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3"
          >
            Methodology
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-3xl">
            The BFFR applies CANON hierarchical signal decomposition across four frequency bands
            (macro 12–24 months, seasonal 3–6 months, micro 4–8 weeks, viral 1–2 weeks).
            TFS&nbsp;=&nbsp;∏(1&nbsp;+&nbsp;S<sub>p</sub>) for p&nbsp;∈&nbsp;{'{'}2,3,5,7{'}'}. Signal inputs: Google Trends India,
            public Instagram hashtag volume, Myntra/AJIO trending data, FDCI and Lakmé Fashion Week
            signals. Maximum TFS&nbsp;=&nbsp;16 (all bands at full strength).
          </p>
        </section>

        {/* ── SECTION 8: SUBSCRIBE CTA ── */}
        <section
          aria-labelledby="subscribe-heading"
          className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 p-8 md:p-10 text-center"
        >
          <MessageCircle
            className="h-8 w-8 text-amber-500 mx-auto mb-4"
            aria-hidden="true"
          />
          <h2
            id="subscribe-heading"
            className="text-2xl md:text-3xl font-bold text-slate-900 mb-2"
          >
            Receive the BFFR Every Month
          </h2>
          <p className="text-slate-600 mb-8 text-base">
            Join 2,000+ fashion professionals, students, and journalists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <a
                href="https://wa.me/919036928799"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to BFFR via WhatsApp"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Subscribe on WhatsApp
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-amber-400 text-amber-800 hover:bg-amber-100">
              <Link to="/admissions">Apply to OGIFT</Link>
            </Button>
          </div>
        </section>

        {/* ── FOOTER NOTE ── */}
        <footer className="border-t border-slate-100 pt-8 pb-4 text-center" role="contentinfo">
          <p className="text-slate-400 text-sm italic">
            ← Previous editions coming soon
          </p>
          <p className="text-slate-300 text-xs mt-2">
            © 2026 OGIFT — Onati Global Institute of Fashion Technology, Bengaluru.
            All rights reserved.
          </p>
        </footer>

      </div>
    </main>
  );
};

export default TrendForecasting;
