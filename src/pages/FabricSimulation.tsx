import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Wind, Weight, Zap, RotateCcw, Play, Pause, MessageSquare, Loader2, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/* ───────── physics constants ───────── */
const GRID = 25; // 25×25 particles
const REST = 0.4; // rest length between particles
const DAMPING = 0.97;
const ITERATIONS = 5; // constraint solver iterations

interface Particle {
  pos: THREE.Vector3;
  prev: THREE.Vector3;
  pinned: boolean;
}

type WeaveType = 'plain' | 'twill' | 'satin' | 'basket' | 'herringbone' | 'jacquard';

interface SimParams {
  gravity: number;
  wind: number;
  stiffness: number;
  mass: number;
  damping: number;
  gsm: number;
  weave: WeaveType;
}

const WEAVE_LABELS: Record<WeaveType, string> = {
  plain: 'Plain Weave',
  twill: 'Twill Weave',
  satin: 'Satin Weave',
  basket: 'Basket Weave',
  herringbone: 'Herringbone',
  jacquard: 'Jacquard',
};

// Weave affects stiffness and damping multipliers
const WEAVE_MODIFIERS: Record<WeaveType, { stiffMul: number; dampMul: number }> = {
  plain:       { stiffMul: 1.0,  dampMul: 1.0 },
  twill:       { stiffMul: 1.15, dampMul: 1.01 },
  satin:       { stiffMul: 0.8,  dampMul: 0.98 },
  basket:      { stiffMul: 1.2,  dampMul: 1.02 },
  herringbone: { stiffMul: 1.25, dampMul: 1.01 },
  jacquard:    { stiffMul: 1.1,  dampMul: 1.0 },
};

/* ───────── Per-fabric color palettes ───────── */
const FABRIC_COLORS: Record<string, { base: [number, number, number]; accent: [number, number, number] }> = {
  Silk:            { base: [0.95, 0.85, 0.75], accent: [1.0, 0.92, 0.82] },
  Chiffon:         { base: [0.95, 0.88, 0.92], accent: [1.0, 0.80, 0.85] },
  Cotton:          { base: [0.90, 0.88, 0.82], accent: [0.80, 0.75, 0.65] },
  'Cotton Blend':  { base: [0.85, 0.82, 0.75], accent: [0.75, 0.70, 0.62] },
  'Organic Cotton':{ base: [0.82, 0.80, 0.70], accent: [0.72, 0.68, 0.55] },
  Satin:           { base: [0.80, 0.65, 0.75], accent: [0.90, 0.70, 0.85] },
  Hemp:            { base: [0.75, 0.70, 0.55], accent: [0.65, 0.60, 0.45] },
  Denim:           { base: [0.30, 0.42, 0.65], accent: [0.25, 0.35, 0.55] },
  Tweed:           { base: [0.55, 0.48, 0.40], accent: [0.65, 0.55, 0.45] },
  Brocade:         { base: [0.70, 0.50, 0.30], accent: [0.85, 0.65, 0.35] },
};

/* ───────── Cloth mesh component ───────── */
function ClothMesh({ params, running, onMetrics, resetKey, preset }: {
  params: SimParams;
  running: boolean;
  onMetrics: (m: { avgDrape: number; maxStretch: number; settlingSpeed: number }) => void;
  resetKey: number;
  preset: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameCount = useRef(0);

  // initialise particles
  useEffect(() => {
    const ps: Particle[] = [];
    for (let j = 0; j < GRID; j++) {
      for (let i = 0; i < GRID; i++) {
        const x = (i - GRID / 2) * REST;
        const y = 4;
        const z = (j - GRID / 2) * REST;
        const pos = new THREE.Vector3(x, y, z);
        ps.push({ pos: pos.clone(), prev: pos.clone(), pinned: j === 0 });
      }
    }
    particlesRef.current = ps;
  }, []);

  const resetCloth = useCallback(() => {
    particlesRef.current.forEach((p, idx) => {
      const i = idx % GRID;
      const j = Math.floor(idx / GRID);
      p.pos.set((i - GRID / 2) * REST, 4, (j - GRID / 2) * REST);
      p.prev.copy(p.pos);
      p.pinned = j === 0;
    });
  }, []);

  // reset when params change significantly or reset is triggered
  useEffect(() => { resetCloth(); }, [params.mass, resetKey, resetCloth]);

  useFrame((_, delta) => {
    if (!running || !meshRef.current) return;
    const dt = Math.min(delta, 0.02);
    const ps = particlesRef.current;
    if (ps.length === 0) return;

    // Apply weave modifiers to physics
    const weaveMod = WEAVE_MODIFIERS[params.weave] || WEAVE_MODIFIERS.plain;
    const effectiveMass = Math.max(0.35, params.gsm / 250); // floor so light fabrics still fall naturally
    const effectiveStiffness = params.stiffness * weaveMod.stiffMul;
    const effectiveDamping = Math.min(params.damping * weaveMod.dampMul, 0.999);

    const grav = new THREE.Vector3(0, -params.gravity * effectiveMass, 0);
    const windForce = new THREE.Vector3(
      Math.sin(frameCount.current * 0.03) * params.wind,
      0,
      Math.cos(frameCount.current * 0.05) * params.wind * 0.5
    );
    frameCount.current++;

    // Verlet integration
    for (const p of ps) {
      if (p.pinned) continue;

      const vel = p.pos.clone().sub(p.prev);
      const speed = vel.length();
      const onGround = p.pos.y <= -1.99;

      // Freeze particles resting on ground with negligible velocity
      if (onGround && speed < 0.005) {
        p.prev.copy(p.pos);
        p.pos.y = -2;
        p.prev.y = -2;
        continue;
      }

      const dampedVel = vel.multiplyScalar(onGround ? 0.8 : effectiveDamping);
      p.prev.copy(p.pos);
      p.pos.add(dampedVel);
      p.pos.add(grav.clone().multiplyScalar(dt * dt));
      if (!onGround) {
        p.pos.add(windForce.clone().multiplyScalar(dt * dt));
      }

      // Ground collision — kill all velocity on impact
      if (p.pos.y < -2) {
        p.pos.y = -2;
        p.prev.copy(p.pos);
      }

    }

    // satisfy constraints
    const satisfy = (a: Particle, b: Particle) => {
      const diff = b.pos.clone().sub(a.pos);
      const dist = diff.length();
      if (dist === 0) return;
      const correction = diff.multiplyScalar((1 - REST / dist) * effectiveStiffness * 0.5);
      if (!a.pinned) a.pos.add(correction);
      if (!b.pinned) b.pos.sub(correction);
    };

    for (let iter = 0; iter < ITERATIONS; iter++) {
      for (let j = 0; j < GRID; j++) {
        for (let i = 0; i < GRID; i++) {
          const idx = j * GRID + i;
          if (i < GRID - 1) satisfy(ps[idx], ps[idx + 1]);
          if (j < GRID - 1) satisfy(ps[idx], ps[idx + GRID]);
        }
      }
      // Re-enforce collisions after each solver pass
      for (const p of ps) {
        if (p.pinned) continue;
        if (p.pos.y < -2) {
          p.pos.y = -2;
          p.prev.y = -2;
        }
      }
    }

    // update geometry
    const geo = meshRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geo.getAttribute('position');
    for (let k = 0; k < ps.length; k++) {
      posAttr.setXYZ(k, ps[k].pos.x, ps[k].pos.y, ps[k].pos.z);
    }
    posAttr.needsUpdate = true;
    geo.computeVertexNormals();

    // compute metrics every 30 frames
    if (frameCount.current % 30 === 0) {
      let totalY = 0;
      let maxStr = 0;
      let totalVel = 0;
      for (let k = 0; k < ps.length; k++) {
        totalY += ps[k].pos.y;
        totalVel += ps[k].pos.distanceTo(ps[k].prev);
        if (k % GRID < GRID - 1) {
          const d = ps[k].pos.distanceTo(ps[k + 1].pos);
          maxStr = Math.max(maxStr, Math.abs(d - REST) / REST);
        }
      }
      onMetrics({
        avgDrape: totalY / ps.length,
        maxStretch: maxStr,
        settlingSpeed: totalVel / ps.length,
      });
    }
  });

  // build geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(GRID * GRID * 3);
    for (let j = 0; j < GRID; j++) {
      for (let i = 0; i < GRID; i++) {
        const idx = (j * GRID + i) * 3;
        positions[idx] = (i - GRID / 2) * REST;
        positions[idx + 1] = 4;
        positions[idx + 2] = (j - GRID / 2) * REST;
      }
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const indices: number[] = [];
    for (let j = 0; j < GRID - 1; j++) {
      for (let i = 0; i < GRID - 1; i++) {
        const a = j * GRID + i;
        const b = a + 1;
        const c = a + GRID;
        const d = c + 1;
        indices.push(a, b, c, b, d, c);
      }
    }
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  // Update vertex colors when preset changes
  useEffect(() => {
    const palette = FABRIC_COLORS[preset] || FABRIC_COLORS.Cotton;
    const colors = new Float32Array(GRID * GRID * 3);
    for (let j = 0; j < GRID; j++) {
      for (let i = 0; i < GRID; i++) {
        const idx = (j * GRID + i) * 3;
        const u = i / (GRID - 1);
        const v = j / (GRID - 1);
        const t = (u + v) * 0.5;
        colors[idx]     = palette.base[0] + (palette.accent[0] - palette.base[0]) * t;
        colors[idx + 1] = palette.base[1] + (palette.accent[1] - palette.base[1]) * t;
        colors[idx + 2] = palette.base[2] + (palette.accent[2] - palette.base[2]) * t;
      }
    }
    const colorAttr = new THREE.BufferAttribute(colors, 3);
    geometry.setAttribute('color', colorAttr);
    colorAttr.needsUpdate = true;
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.vertexColors = true;
      mat.needsUpdate = true;
    }
  }, [geometry, preset]);

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial
        vertexColors
        side={THREE.DoubleSide}
        wireframe={false}
        roughness={0.6}
        metalness={0.08}
      />
    </mesh>
  );
}

/* ───────── Presets ───────── */
const PRESETS: Record<string, SimParams> = {
  Silk:            { gravity: 9.8, wind: 1.5, stiffness: 0.3,  mass: 0.3,  damping: 0.96, gsm: 35,  weave: 'satin' },
  Chiffon:         { gravity: 9.8, wind: 2.0, stiffness: 0.2,  mass: 0.15, damping: 0.95, gsm: 25,  weave: 'plain' },
  Cotton:          { gravity: 9.8, wind: 1.0, stiffness: 0.6,  mass: 0.6,  damping: 0.97, gsm: 150, weave: 'plain' },
  'Cotton Blend':  { gravity: 9.8, wind: 1.0, stiffness: 0.55, mass: 0.5,  damping: 0.97, gsm: 130, weave: 'plain' },
  'Organic Cotton':{ gravity: 9.8, wind: 1.0, stiffness: 0.58, mass: 0.55, damping: 0.97, gsm: 140, weave: 'plain' },
  Satin:           { gravity: 9.8, wind: 1.8, stiffness: 0.25, mass: 0.35, damping: 0.95, gsm: 80,  weave: 'satin' },
  Hemp:            { gravity: 9.8, wind: 0.7, stiffness: 0.8,  mass: 0.9,  damping: 0.98, gsm: 280, weave: 'plain' },
  Denim:           { gravity: 9.8, wind: 0.5, stiffness: 0.9,  mass: 1.2,  damping: 0.98, gsm: 350, weave: 'twill' },
  Tweed:           { gravity: 9.8, wind: 0.4, stiffness: 0.85, mass: 1.0,  damping: 0.98, gsm: 300, weave: 'herringbone' },
  Brocade:         { gravity: 9.8, wind: 0.8, stiffness: 0.7,  mass: 0.8,  damping: 0.97, gsm: 220, weave: 'jacquard' },
};

/* ───────── Main page ───────── */
const FabricSimulation = () => {
  const [params, setParams] = useState<SimParams>(PRESETS.Cotton);
  const [running, setRunning] = useState(true);
  const [metrics, setMetrics] = useState({ avgDrape: 4, maxStretch: 0, settlingSpeed: 0 });
  const [aiAdvice, setAiAdvice] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [activePreset, setActivePreset] = useState('Cotton');
  const [resetKey, setResetKey] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const mouthIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const applyPreset = (name: string) => {
    setActivePreset(name);
    setParams(PRESETS[name]);
  };

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setMouthOpen(false);
    if (mouthIntervalRef.current) {
      clearInterval(mouthIntervalRef.current);
      mouthIntervalRef.current = null;
    }
  }, []);

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) {
      toast.error('Speech synthesis not supported in this browser');
      return;
    }
    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.1;
    utteranceRef.current = utterance;

    // Pick a natural female voice if available
    const voices = speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.toLowerCase().includes('samantha') ||
      v.name.toLowerCase().includes('veena') ||
      (v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
    ) || voices.find(v => v.lang.startsWith('en'));
    if (preferred) utterance.voice = preferred;

    // Lip-sync: toggle mouth rapidly while speaking
    utterance.onstart = () => {
      setIsSpeaking(true);
      mouthIntervalRef.current = setInterval(() => {
        setMouthOpen(prev => !prev);
      }, 120);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setMouthOpen(false);
      if (mouthIntervalRef.current) {
        clearInterval(mouthIntervalRef.current);
        mouthIntervalRef.current = null;
      }
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setMouthOpen(false);
      if (mouthIntervalRef.current) clearInterval(mouthIntervalRef.current);
    };

    speechSynthesis.speak(utterance);
  }, [stopSpeaking]);

  // Clean up on unmount
  useEffect(() => {
    return () => stopSpeaking();
  }, [stopSpeaking]);

  const askAI = async () => {
    setAiLoading(true);
    stopSpeaking();
    try {
      const { data, error } = await supabase.functions.invoke('fabric-ai-advisor', {
        body: {
          params,
          metrics,
          preset: activePreset,
        },
      });
      if (error) throw error;
      setAiAdvice(data.reply);
      // Auto-speak the response
      speakText(data.reply);
    } catch (e) {
      console.error(e);
      toast.error('Could not get AI advice. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Interactive 3D Fabric Simulation Tool | OGIFT Bangalore | Fashion Technology</title>
        <meta name="description" content="Explore fabric physics with OGIFT's interactive 3D simulation — test draping, weight, wind & stiffness with AI analysis. Free tool for fashion design students at Bangalore's 4.9★ best fashion institute." />
        <meta name="keywords" content="fabric physics simulation bangalore, 3D fabric draping tool, fashion technology tool bangalore, fabric simulation fashion design, AI fabric analysis, OGIFT fabric sim, Onati Global fashion technology, interactive fashion tool bangalore" />
        <link rel="canonical" href="https://www.ogiftbangalore.com/fabric-sim" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen pt-16 sm:pt-24 pb-8 sm:pb-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-4 sm:mb-8">
            <Badge variant="secondary" className="mb-2 sm:mb-3">AI-Powered Lab</Badge>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-1 sm:mb-2">Fabric Physics Simulation</h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Experiment with real-time cloth physics. Adjust weight, wind and stiffness — then ask the AI advisor for fabric insights.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 3D Viewport */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-2 border-primary/20">
                <div className="h-[300px] sm:h-[400px] lg:h-[500px] bg-gradient-to-b from-muted/30 to-muted/60">
                  <Canvas camera={{ position: [0, 3, 8], fov: 50 }}>
                    <ambientLight intensity={0.6} />
                    <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
                    <pointLight position={[-3, 2, -3]} intensity={0.4} color="#ffd4a0" />
                    <ClothMesh params={params} running={running} onMetrics={setMetrics} resetKey={resetKey} preset={activePreset} />
                    <OrbitControls enablePan={false} maxDistance={15} minDistance={3} />
                  </Canvas>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 sm:p-3 gap-2 border-t border-border bg-card">
                  <div className="flex gap-2">
                    <Button size="sm" variant={running ? "destructive" : "default"} onClick={() => setRunning(!running)}>
                      {running ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                      {running ? 'Pause' : 'Play'}
                    </Button>
                    <Button size="sm" variant="outline" onClick={(e) => {
                      e.stopPropagation();
                      setResetKey(k => k + 1);
                    }}>
                      <RotateCcw className="h-4 w-4 mr-1" /> Reset
                    </Button>
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Drape: {metrics.avgDrape.toFixed(1)}m</span>
                    <span>Stretch: {(metrics.maxStretch * 100).toFixed(0)}%</span>
                    <span>Motion: {metrics.settlingSpeed.toFixed(3)}</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Controls Panel */}
            <div className="space-y-4">
              {/* Presets */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Fabric Presets</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {Object.keys(PRESETS).map((name) => (
                    <Button
                      key={name}
                      size="sm"
                      variant={activePreset === name ? 'default' : 'outline'}
                      onClick={() => applyPreset(name)}
                    >
                      {name}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Sliders */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Weight className="h-4 w-4" /> Parameters
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Gravity</span>
                      <span className="font-mono">{params.gravity.toFixed(1)} m/s²</span>
                    </div>
                    <Slider min={0} max={20} step={0.1} value={[params.gravity]}
                      onValueChange={([v]) => setParams(p => ({ ...p, gravity: v }))} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground flex items-center gap-1"><Wind className="h-3 w-3" /> Wind</span>
                      <span className="font-mono">{params.wind.toFixed(1)}</span>
                    </div>
                    <Slider min={0} max={5} step={0.1} value={[params.wind]}
                      onValueChange={([v]) => setParams(p => ({ ...p, wind: v }))} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Mass</span>
                      <span className="font-mono">{params.mass.toFixed(2)} kg</span>
                    </div>
                    <Slider min={0.05} max={2} step={0.05} value={[params.mass]}
                      onValueChange={([v]) => setParams(p => ({ ...p, mass: v }))} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground flex items-center gap-1"><Zap className="h-3 w-3" /> Stiffness</span>
                      <span className="font-mono">{params.stiffness.toFixed(2)}</span>
                    </div>
                    <Slider min={0.1} max={1} step={0.05} value={[params.stiffness]}
                      onValueChange={([v]) => setParams(p => ({ ...p, stiffness: v }))} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Damping</span>
                      <span className="font-mono">{params.damping.toFixed(2)}</span>
                    </div>
                    <Slider min={0.9} max={1} step={0.005} value={[params.damping]}
                      onValueChange={([v]) => setParams(p => ({ ...p, damping: v }))} />
                  </div>
                  <Separator className="my-2" />
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">GSM (weight)</span>
                      <span className="font-mono">{params.gsm} g/m²</span>
                    </div>
                    <Slider min={10} max={500} step={5} value={[params.gsm]}
                      onValueChange={([v]) => setParams(p => ({ ...p, gsm: v }))} />
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {params.gsm < 60 ? 'Ultra-light (chiffon, organza)' :
                       params.gsm < 120 ? 'Light (silk, voile)' :
                       params.gsm < 200 ? 'Medium (cotton, linen)' :
                       params.gsm < 320 ? 'Heavy (canvas, tweed)' : 'Extra-heavy (denim, upholstery)'}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted-foreground">Weave Pattern</span>
                      <span className="font-mono text-[10px]">{WEAVE_LABELS[params.weave]}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(Object.keys(WEAVE_LABELS) as WeaveType[]).map((w) => (
                        <Button
                          key={w}
                          size="sm"
                          variant={params.weave === w ? 'default' : 'outline'}
                          className="text-[11px] h-7 px-2"
                          onClick={() => setParams(p => ({ ...p, weave: w }))}
                        >
                          {WEAVE_LABELS[w]}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Advisor with Avatar */}
              <Card className="border-primary/30">
                <CardHeader className="pb-3">
                   <CardTitle className="text-sm flex items-center gap-2">
                     <MessageSquare className="h-4 w-4" /> Amy — Fabric Advisor
                   </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Avatar Face */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 shrink-0">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 ${isSpeaking ? 'animate-pulse' : ''}`} />
                      <div className="absolute inset-1 rounded-full bg-primary-foreground/90 flex items-center justify-center">
                        <div className="relative w-9 h-9">
                          {/* Eyes */}
                         <div className={`absolute top-2 left-1.5 w-2 h-2 bg-purple-600 rounded-full ${isSpeaking ? '' : 'fabric-blink'}`} />
                          <div className={`absolute top-2 right-1.5 w-2 h-2 bg-purple-600 rounded-full ${isSpeaking ? '' : 'fabric-blink'}`} />
                          {/* Mouth with lip-sync */}
                          <div
                            className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-purple-600 rounded-full transition-all duration-100"
                            style={{
                              width: mouthOpen ? '0.6rem' : '0.75rem',
                              height: mouthOpen ? '0.6rem' : '0.2rem',
                            }}
                          />
                        </div>
                      </div>
                      {/* Sound waves */}
                      {isSpeaking && (
                        <>
                         <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-1 h-3 bg-purple-400/60 rounded fabric-sound-wave" />
                          <div className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-1 h-4 bg-purple-400/40 rounded fabric-sound-wave fabric-delay-100" />
                          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-1 h-3 bg-purple-400/25 rounded fabric-sound-wave fabric-delay-200" />
                        </>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {isSpeaking ? '🔊 Speaking…' : aiLoading ? '🤔 Analysing…' : 'Fabric Advisor'}
                      </p>
                    </div>
                    {isSpeaking && (
                      <Button size="icon" variant="ghost" onClick={stopSpeaking} className="shrink-0">
                        <VolumeX className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <Button className="w-full" onClick={askAI} disabled={aiLoading || isSpeaking}>
                    {aiLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Volume2 className="h-4 w-4 mr-2" />}
                    {aiLoading ? 'Analysing…' : 'Analyse & Speak'}
                  </Button>

                  {aiAdvice && (
                    <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 max-h-48 overflow-y-auto whitespace-pre-wrap">
                      {aiAdvice}
                    </div>
                  )}

                  {aiAdvice && !isSpeaking && !aiLoading && (
                    <Button variant="outline" size="sm" className="w-full" onClick={() => speakText(aiAdvice)}>
                      <Volume2 className="h-3 w-3 mr-1" /> Replay
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar lip-sync animations */}
      <style>{`
        @keyframes fabricBlink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes fabricSoundWave {
          0%, 100% { transform: translateY(-50%) scaleY(0.5); opacity: 0.6; }
          50% { transform: translateY(-50%) scaleY(1); opacity: 1; }
        }
        .fabric-blink { animation: fabricBlink 3s infinite; }
        .fabric-sound-wave { animation: fabricSoundWave 0.5s infinite; }
        .fabric-delay-100 { animation-delay: 0.1s; }
        .fabric-delay-200 { animation-delay: 0.2s; }
      `}</style>

      {/* Related Pages */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Related Pages at OGIFT Bangalore</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link to="/courses/fabric-knowledge-textile-designing" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Fabric &amp; Textile Course</span></Link>
            <Link to="/courses/draping-technology" className="block p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all text-center"><span className="font-medium text-sm">Draping Technology Course</span></Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default FabricSimulation;
