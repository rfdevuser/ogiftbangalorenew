import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  TrendingDown,
  AlertCircle,
  BookOpen,
  MessageCircle,
  ChevronLeft,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BandScores {
  s2: number; // Macro   12–24 months
  s3: number; // Seasonal 3–6 months
  s5: number; // Micro    4–8 weeks
  s7: number; // Viral    1–2 weeks
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
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const topTrends: TopTrend[] = [
  {
    name: 'Digital Sari',
    tfs: 13.4,
    bands: { s2: 0.82, s3: 0.71, s5: 0.88, s7: 0.76 },
    interpretation:
      "The fusion of traditional saree silhouettes with technical performance fabrics is crossing from runway concept into Bangalore's retail mainstream. OGIFT graduates tracking e-commerce data are seeing digital-print handloom hybrids reaching top-5 category rankings on Myntra. The trend is structurally strong across all four bands — a macro shift in how Indian women reconcile heritage identity with modern material innovation.",
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
    description:
      'High visibility in market but signal momentum has reversed. Mirror-work embellishment is reaching saturation. Consumer attention is moving to the Festive Minimalism counter-signal above.',
  },
  {
    name: 'Neon Streetwear',
    tfsNow: 4.9,
    tfsPrev: 9.1,
    description:
      "The viral peak passed in Q1. Neon is now appearing in mass-market contexts — typically the final phase before mainstream fatigue. Streetwear's leading edge has moved toward earth tones and vintage neutrals.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Large TFS score badge */
const TFSBadge = ({ score, size = 'lg' }: { score: number; size?: 'sm' | 'lg' }) => {
  const large = size === 'lg';
  return (
    <div
      className={`inline-flex flex-col items-center justify-center rounded-xl border border-amber-500/40 bg-amber-500/10 shrink-0 ${
        large ? 'px-5 py-3 min-w-[80px]' : 'px-3 py-2 min-w-[64px]'
      }`}
    >
      <span
        className={`font-extrabold leading-none text-amber-400 ${large ? 'text-3xl' : 'text-xl'}`}
      >
        {score.toFixed(1)}
      </span>
      <span className="text-[10px] text-amber-500/60 mt-0.5 tracking-wider">/ 16</span>
    </div>
  );
};

/** Single labelled progress bar for one frequency band */
const BandBar = ({
  label,
  value,
  barColour,
}: {
  label: string;
  value: number;
  barColour: string;
}) => (
  <div className="flex items-center gap-2">
    <span className="w-24 text-[11px] font-mono text-gray-400 shrink-0 leading-none">{label}</span>
    <div
      className="flex-1 h-2 rounded-full bg-gray-700/70 overflow-hidden"
      role="progressbar"
      aria-valuenow={Math.round(value * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label} signal strength ${Math.round(value * 100)}%`}
    >
      <div
        className={`h-full rounded-full ${barColour}`}
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
    <span className="w-9 text-[11px] font-mono text-gray-400 text-right shrink-0">
      {value.toFixed(2)}
    </span>
  </div>
);

/** Four-band breakdown block */
const BandBreakdown = ({ bands }: { bands: BandScores }) => (
  <div className="rounded-lg bg-gray-950/50 border border-gray-700/40 px-4 py-3 space-y-2">
    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500 mb-2.5">
      Band Breakdown
    </p>
    <BandBar label="S₂  Macro" value={bands.s2} barColour="bg-amber-500" />
    <BandBar label="S₃  Seasonal" value={bands.s3} barColour="bg-yellow-400" />
    <BandBar label="S₅  Micro" value={bands.s5} barColour="bg-orange-400" />
    <BandBar label="S₇  Viral" value={bands.s7} barColour="bg-rose-400" />
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const TrendForecasting = () => {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100" role="main">
      <Helmet>
        <title>Bangalore Fashion Frequency Report — May 2026 | OGIFT Trend Intelligence</title>
        <meta
          name="description"
          content="The Bangalore Fashion Frequency Report (BFFR) May 2026 — monthly fashion trend intelligence for the Indian market powered by CANON hierarchical signal analysis. Top trends: Digital Sari (TFS 13.4), Tech-Casual Elevation (12.1), Heritage Khadi Revival (11.8). Published by OGIFT Bangalore."
        />
        <meta
          name="keywords"
          content="bangalore fashion trends 2026, india fashion trend report, BFFR May 2026, OGIFT trend forecasting, CANON fashion signal analysis, Indian fashion forecast, fashion trend intelligence India, bangalore fashion market, digital sari trend, tech casual workwear bangalore, khadi revival 2026, festive minimalism, fashion frequency score, TFS fashion report"
        />
        <link rel="canonical" href="https://www.ogiftbangalore.com/trend-forecasting" />
        <meta
          property="og:title"
          content="Bangalore Fashion Frequency Report — May 2026 | OGIFT"
        />
        <meta
          property="og:description"
          content="Monthly fashion trend intelligence for the Indian market. Top trends, emerging signals, fading signals, and career direction for fashion professionals in Bangalore. Published 1 May 2026."
        />
        <meta property="og:url" content="https://www.ogiftbangalore.com/trend-forecasting" />
        <meta property="og:type" content="article" />
        <meta property="og:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
        <meta property="og:site_name" content="OGIFT Bangalore" />
        <meta property="og:locale" content="en_IN" />
        <meta property="article:published_time" content="2026-05-01T00:00:00+05:30" />
        <meta
          property="article:author"
          content="OGIFT — Onati Global Institute of Fashion Technology"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bangalore Fashion Frequency Report — May 2026 | OGIFT"
        />
        <meta
          name="twitter:description"
          content="Monthly fashion trend intelligence. Digital Sari leads at TFS 13.4. Powered by CANON signal analysis. Published by OGIFT Bangalore."
        />
        <meta name="twitter:image" content="https://www.ogiftbangalore.com/og-image.jpg" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Onati Global Institute of Fashion Technology" />
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
      </Helmet>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO HEADER
      ════════════════════════════════════════════════════════════════════════ */}
      <header
        className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden"
        aria-label="Report header"
      >
        {/* top gold rule */}
        <div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-600"
          aria-hidden="true"
        />
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 39px,#f59e0b 39px,#f59e0b 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,#f59e0b 39px,#f59e0b 40px)',
          }}
          aria-hidden="true"
        />

        <div className="relative container mx-auto max-w-5xl px-4 py-20 md:py-28">
          {/* edition pill + date */}
          <div className="flex flex-wrap items-center gap-3 mb-7">
            <span className="inline-block rounded-full bg-amber-500 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-gray-950">
              May 2026 Edition
            </span>
            <span className="text-gray-500 text-sm">Published 1 May 2026</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-5">
            <span className="text-white">Bangalore Fashion</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
              Frequency Report
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed mb-8">
            Multi-scale trend intelligence for the Indian fashion market. Powered by CANON
            hierarchical signal analysis.
          </p>

          <p className="text-sm text-gray-500">
            Published monthly by{' '}
            <Link
              to="/"
              className="text-amber-400/80 hover:text-amber-400 transition-colors underline underline-offset-2"
            >
              OGIFT — Onati Global Institute of Fashion Technology
            </Link>
          </p>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          BODY
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20 space-y-20">

        {/* ── SECTION 1: TOP 5 TRENDS BY TFS ─────────────────────────────── */}
        <section aria-labelledby="top-trends-heading">
          <div className="flex items-start gap-3 mb-9">
            <TrendingUp className="h-6 w-6 text-amber-400 mt-0.5 shrink-0" aria-hidden="true" />
            <div>
              <h2 id="top-trends-heading" className="text-2xl md:text-3xl font-bold text-white">
                Top 5 Trends by TFS
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Trend Frequency Score — composite signal strength, maximum 16
              </p>
            </div>
          </div>

          <ol className="space-y-6" role="list" aria-label="Top trends ranked by TFS score">
            {topTrends.map((trend, i) => (
              <li key={trend.name}>
                <Card className="bg-gray-900 border-gray-800 hover:border-amber-500/30 transition-colors overflow-hidden">
                  <div className="p-6 md:p-8">
                    {/* header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                      <div className="flex items-center gap-4">
                        <span
                          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 font-bold text-sm shrink-0 select-none"
                          aria-label={`Rank ${i + 1}`}
                        >
                          {i + 1}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                          {trend.name}
                        </h3>
                      </div>
                      <TFSBadge score={trend.tfs} size="lg" />
                    </div>

                    {/* band breakdown */}
                    <div className="mb-5">
                      <BandBreakdown bands={trend.bands} />
                    </div>

                    {/* interpretation */}
                    <p className="text-gray-300 leading-relaxed text-[15px]">
                      {trend.interpretation}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </section>

        {/* ── SECTION 2: EMERGING SIGNALS ──────────────────────────────────── */}
        <section aria-labelledby="emerging-heading">
          <div className="flex items-start gap-3 mb-9">
            <AlertCircle
              className="h-6 w-6 text-yellow-400 mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <h2 id="emerging-heading" className="text-2xl md:text-3xl font-bold text-white">
                Emerging Signals
              </h2>
              <p className="text-sm text-gray-400 mt-1">Watch these in the next 60 days</p>
            </div>
          </div>

          <ul className="space-y-4" role="list">
            {emergingSignals.map((signal) => (
              <li key={signal.name}>
                <Card className="bg-gray-900 border-gray-800 border-l-4 border-l-amber-400 hover:border-amber-400/60 transition-colors overflow-hidden">
                  <div className="p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                      <h3 className="text-lg font-bold text-white">{signal.name}</h3>
                      <TFSBadge score={signal.tfs} size="sm" />
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm">{signal.description}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        {/* ── SECTION 3: FADING SIGNALS ────────────────────────────────────── */}
        <section aria-labelledby="fading-heading">
          <div className="flex items-start gap-3 mb-9">
            <TrendingDown
              className="h-6 w-6 text-rose-400 mt-0.5 shrink-0"
              aria-hidden="true"
            />
            <div>
              <h2 id="fading-heading" className="text-2xl md:text-3xl font-bold text-white">
                Fading Signals
              </h2>
              <p className="text-sm text-gray-400 mt-1">The curve has peaked</p>
            </div>
          </div>

          <ul className="space-y-4" role="list">
            {fadingSignals.map((signal) => (
              <li key={signal.name}>
                <Card className="bg-gray-900 border-gray-800 border-l-4 border-l-rose-500 hover:border-rose-500/60 transition-colors overflow-hidden">
                  <div className="p-5 md:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-1">
                      <h3 className="text-lg font-bold text-white">{signal.name}</h3>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right leading-tight">
                          <p className="text-xs text-gray-500 line-through">
                            {signal.tfsPrev.toFixed(1)} six months ago
                          </p>
                          <p className="text-rose-400 font-bold text-sm">
                            {signal.tfsNow.toFixed(1)}&thinsp;/&thinsp;16 now
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm mt-2">
                      {signal.description}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        {/* ── SECTION 4: BANGALORE SPOTLIGHT ──────────────────────────────── */}
        <section aria-labelledby="spotlight-heading">
          <div className="mb-8">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-2">
              Bangalore Spotlight
            </span>
            <h2
              id="spotlight-heading"
              className="text-2xl md:text-3xl font-bold text-white leading-snug"
            >
              Tech-Casual Elevation:{' '}
              <span className="text-amber-400">Bangalore's Indigenous Trend Signal</span>
            </h2>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-amber-500/20 overflow-hidden">
            <div className="p-7 md:p-10">
              <p className="text-gray-200 leading-relaxed text-base md:text-lg">
                Bangalore occupies a unique position in India's fashion signal landscape. The city's
                2.5 million-strong tech workforce creates fashion demand patterns visible nowhere
                else in India — elevated casual, performance-comfort hybrids, and a distinctly
                understated professional aesthetic that rewards quality over ostentation. This
                month's Bangalore-specific spotlight is the emergence of 'smart occasion
                casualwear' — garments that function as professional dress in a startup environment
                while reading as fashion-forward in social contexts. OGIFT graduates entering
                fashion retail, styling, and product development roles are well-positioned to serve
                this market segment, which no major Indian fashion brand has yet addressed at scale.
              </p>
            </div>
          </Card>
        </section>

        {/* ── SECTION 5: COLOUR OF THE MONTH ──────────────────────────────── */}
        <section aria-labelledby="colour-heading">
          <div className="mb-8">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-2">
              Colour of the Month
            </span>
            <h2
              id="colour-heading"
              className="text-2xl md:text-3xl font-bold text-white"
            >
              Warm Terracotta
            </h2>
          </div>

          <Card className="bg-gray-900 border-gray-800 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-0">
              {/* Colour swatch */}
              <div className="flex flex-col items-center justify-center py-10 px-8 md:w-56 shrink-0 gap-4 bg-gray-950/30">
                <div
                  className="w-36 h-36 rounded-full shadow-2xl ring-4 ring-black/30"
                  style={{ backgroundColor: '#C2714F' }}
                  role="img"
                  aria-label="Warm Terracotta colour swatch — hex #C2714F"
                />
                <div className="text-center">
                  <p className="text-sm font-semibold text-white">Warm Terracotta</p>
                  <p className="text-xs font-mono text-gray-400 mt-0.5 select-all">#C2714F</p>
                </div>
              </div>

              {/* Analysis */}
              <div className="flex-1 p-7 md:p-8 flex flex-col justify-center">
                <div className="inline-flex items-baseline gap-2 bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2.5 mb-5 w-fit">
                  <span className="text-xs font-mono text-gray-400">S₃ × S₅ =</span>
                  <span className="text-sm font-mono text-gray-300">0.74 × 0.92</span>
                  <span className="text-base font-bold text-amber-400">=&nbsp;0.68</span>
                  <span className="text-xs text-gray-500 ml-1">highest this month</span>
                </div>

                <p className="text-gray-200 leading-relaxed text-base">
                  Terracotta scores highest on the product of mood-band and material-band signals
                  this month. Warm, saturated, and deeply rooted in Indian craft tradition, it reads
                  as simultaneously festive and modern. Expect to see it dominate festive season
                  buying from July.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* ── SECTION 6: CAREER SIGNAL ─────────────────────────────────────── */}
        <section aria-labelledby="career-heading">
          <div className="mb-8">
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-amber-400 mb-2">
              Career Signal
            </span>
            <h2
              id="career-heading"
              className="text-2xl md:text-3xl font-bold text-white leading-snug"
            >
              This Month's Leading Trend&nbsp;→&nbsp;Your Career Direction
            </h2>
          </div>

          <Card className="bg-gray-900 border-amber-500/30 overflow-hidden">
            <div className="p-7 md:p-10">
              <div className="flex items-center gap-3 mb-5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400">
                  <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                  #1 TFS — May 2026
                </span>
                <h3 className="text-xl font-bold text-white">Digital Sari</h3>
              </div>

              <p className="text-gray-200 leading-relaxed mb-7">
                Digital Sari — the month's top TFS score — sits at the intersection of textile
                knowledge, draping skill, and digital design fluency. The careers being created by
                this trend are not traditional roles: they include digital textile designers who
                understand both handloom construction and digital print processes, and product
                developers who can translate between artisan weaving communities and fashion-tech
                brands. OGIFT's Fabric Knowledge &amp; Textile Designing course builds the
                foundation for this exact career direction.
              </p>

              <Button
                asChild
                className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold gap-2"
              >
                <Link to="/courses/fabric-knowledge-textile-designing">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  Fabric Knowledge &amp; Textile Designing
                </Link>
              </Button>
            </div>
          </Card>
        </section>

        {/* ── SECTION 7: METHODOLOGY ───────────────────────────────────────── */}
        <section
          aria-labelledby="methodology-heading"
          className="border-t border-gray-800 pt-10"
        >
          <Card className="bg-gray-900/40 border-gray-800/50">
            <div className="p-6 md:p-7">
              <h2
                id="methodology-heading"
                className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-3"
              >
                Methodology
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
                The BFFR applies CANON hierarchical signal decomposition across four frequency bands
                (macro 12–24 months, seasonal 3–6 months, micro 4–8 weeks, viral 1–2 weeks).
                TFS&nbsp;=&nbsp;∏(1&nbsp;+&nbsp;S<sub>p</sub>) for p&nbsp;∈&nbsp;{'{'}2,3,5,7{'}'}.
                Signal inputs: Google Trends India, public Instagram hashtag volume, Myntra/AJIO
                trending data, FDCI and Lakmé Fashion Week signals. Maximum TFS&nbsp;=&nbsp;16 (all
                bands at full strength).
              </p>
            </div>
          </Card>
        </section>

        {/* ── SECTION 8: SUBSCRIBE CTA ─────────────────────────────────────── */}
        <section
          aria-labelledby="subscribe-heading"
          className="rounded-2xl bg-gradient-to-br from-amber-950/40 via-gray-900 to-gray-900 border border-amber-500/25 p-8 md:p-12 text-center"
        >
          <h2
            id="subscribe-heading"
            className="text-2xl md:text-3xl font-bold text-white mb-3"
          >
            Receive the BFFR Every Month
          </h2>
          <p className="text-gray-300 max-w-md mx-auto mb-8">
            Join 2,000+ fashion professionals, students, and journalists who receive the Bangalore
            Fashion Frequency Report on the first of every month.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-semibold gap-2"
              asChild
            >
              <a
                href="https://wa.me/919036928799"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to BFFR via WhatsApp"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Subscribe via WhatsApp
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-amber-500/40 text-amber-400 hover:bg-amber-500/10 hover:border-amber-400 bg-transparent"
              asChild
            >
              <Link to="/admissions">Admissions 2026 →</Link>
            </Button>
          </div>
        </section>

        {/* ── FOOTER NOTE ──────────────────────────────────────────────────── */}
        <footer
          className="flex items-center gap-2 pb-6 text-gray-600"
          role="contentinfo"
          aria-label="Archive note"
        >
          <ChevronLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
          <p className="text-sm">Previous editions coming soon.</p>
        </footer>

      </div>
    </main>
  );
};

export default TrendForecasting;
