import * as React from 'react';
import { useFrame, useThree, GroupProps } from '@react-three/fiber';
import { SkeletonUtils, KTX2Loader } from 'three-stdlib';
import { useAnimations, useFBX, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { AvatarRef, AvatarState, Viseme } from '@/types/avatar';

const { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } = React;

const KTX2_TRANSCODER_PATH = 'https://unpkg.com/three@0.160.1/examples/jsm/libs/basis/';
const ktx2Loader = new KTX2Loader().setTranscoderPath(KTX2_TRANSCODER_PATH);

// Common Ready Player Me visemes (when exported with visemes)
const RPM_VISEMES: string[] = [
  'viseme_sil',
  'viseme_PP',
  'viseme_FF',
  'viseme_TH',
  'viseme_DD',
  'viseme_kk',
  'viseme_CH',
  'viseme_SS',
  'viseme_nn',
  'viseme_RR',
  'viseme_aa',
  'viseme_E',
  'viseme_I',
  'viseme_O',
  'viseme_U',
];

// Simple mapping from characters to visemes (fallback)
const CHAR_TO_VISEME: Record<string, string> = {
  A: 'viseme_aa',
  E: 'viseme_E',
  I: 'viseme_I',
  O: 'viseme_O',
  U: 'viseme_U',
  B: 'viseme_PP',
  P: 'viseme_PP',
  M: 'viseme_PP',
  F: 'viseme_FF',
  V: 'viseme_FF',
  T: 'viseme_DD',
  D: 'viseme_DD',
  N: 'viseme_nn',
  L: 'viseme_nn',
  K: 'viseme_kk',
  G: 'viseme_kk',
  S: 'viseme_SS',
  Z: 'viseme_SS',
  R: 'viseme_RR',
  ' ': 'viseme_sil',
  '.': 'viseme_sil',
  ',': 'viseme_sil',
  '!': 'viseme_sil',
  '?': 'viseme_sil',
};

function findBestMouthOpenBlendshape(dict: Record<string, number> | undefined): string | null {
  if (!dict) return null;
  const keys = Object.keys(dict);
  return (
    keys.find((k) => /jawOpen/i.test(k)) ||
    keys.find((k) => /mouthOpen/i.test(k)) ||
    keys.find((k) => /mouth(open)?|jaw(open)?/i.test(k)) ||
    null
  );
}

function findJawBoneInObject3D(root: THREE.Object3D | null): THREE.Bone | null {
  if (!root) return null;
  let found: THREE.Bone | null = null;
  root.traverse((obj) => {
    if (found) return;
    if ((obj as THREE.Bone).isBone && /jaw/i.test(obj.name)) {
      found = obj as THREE.Bone;
    }
  });
  return found;
}

// Find the root bone (typically Hips or Armature)
function findRootBone(root: THREE.Object3D | null): THREE.Bone | null {
  if (!root) return null;
  let found: THREE.Bone | null = null;
  root.traverse((obj) => {
    if (found) return;
    if ((obj as THREE.Bone).isBone && /hips|armature|root/i.test(obj.name)) {
      found = obj as THREE.Bone;
    }
  });
  return found;
}

// Find head mesh for morph targets
function findHeadMesh(root: THREE.Object3D | null): THREE.SkinnedMesh | null {
  if (!root) return null;
  let found: THREE.SkinnedMesh | null = null;
  root.traverse((obj) => {
    if (found) return;
    const mesh = obj as THREE.SkinnedMesh;
    if (mesh.isSkinnedMesh && /head|face/i.test(obj.name) && mesh.morphTargetDictionary) {
      found = mesh;
    }
  });
  // If not found by name, find any mesh with morph targets
  if (!found) {
    root.traverse((obj) => {
      if (found) return;
      const mesh = obj as THREE.SkinnedMesh;
      if (mesh.isSkinnedMesh && mesh.morphTargetDictionary && Object.keys(mesh.morphTargetDictionary).length > 0) {
        found = mesh;
      }
    });
  }
  return found;
}

// Find teeth mesh for morph targets
function findTeethMesh(root: THREE.Object3D | null): THREE.SkinnedMesh | null {
  if (!root) return null;
  let found: THREE.SkinnedMesh | null = null;
  root.traverse((obj) => {
    if (found) return;
    const mesh = obj as THREE.SkinnedMesh;
    if (mesh.isSkinnedMesh && /teeth/i.test(obj.name)) {
      found = mesh;
    }
  });
  return found;
}

type LipSyncStyle = 'default' | 'calm';
interface NeocortexAvatarProps extends Omit<GroupProps, 'ref'> {
  onStateChange?: (state: AvatarState) => void;
  /** Controls how fast/smooth the fallback (text-based) lip sync behaves. */
  lipSyncStyle?: LipSyncStyle;
}

interface VisemeQueueEntry {
  viseme: string;
  time: number;
  duration: number;
}

export const NeocortexAvatar = forwardRef<AvatarRef, NeocortexAvatarProps>(function NeocortexAvatar(props, ref) {
  const { onStateChange, lipSyncStyle = 'default', ...restProps } = props;

  const { gl } = useThree();

  const gltf = useGLTF('/models/avatar.glb', false, false, (loader) => {
    // Enable KTX2/Basis-compressed textures if the model uses them
    loader.setKTX2Loader(ktx2Loader.detectSupport(gl));
  }) as any;

  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene);
    // Ensure all materials and textures are properly applied
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        // Enable shadows
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        // Ensure material is not wireframe and textures are visible
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || mat instanceof THREE.MeshPhysicalMaterial) {
              mat.needsUpdate = true;
              // Ensure proper encoding for textures
              if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
              if (mat.emissiveMap) mat.emissiveMap.colorSpace = THREE.SRGBColorSpace;
            }
          });
        }
      }
    });
    return cloned;
  }, [gltf.scene]);

  // Load idle animation only
  const idleFBX = useFBX('/animations/Idle.fbx');
  
  const idleAnimationClip = useMemo(() => {
    if (idleFBX?.animations?.[0]) {
      const clip = idleFBX.animations[0].clone();
      clip.name = 'Idle';
      return [clip];
    }
    return [];
  }, [idleFBX]);

  const [isTalking, setIsTalking] = useState<boolean>(false);
  const [modelOffset, setModelOffset] = useState<[number, number, number]>([0, 0, 0]);
  const [modelScale, setModelScale] = useState<number>(1);

  const group = useRef<THREE.Group>(null);
  const headMesh = useRef<THREE.SkinnedMesh | null>(null);
  const teethMesh = useRef<THREE.SkinnedMesh | null>(null);
  const jawBone = useRef<THREE.Bone | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const idleActionRef = useRef<THREE.AnimationAction | null>(null);

  // What blendshapes exist in this avatar?
  const availableVisemes = useRef<string[]>([]);
  const mouthOpenBlendshape = useRef<string | null>(null);

  // Lipsync timing
  const speechStart = useRef<number>(0);
  const speechDuration = useRef<number>(0);
  const visemeQueue = useRef<VisemeQueueEntry[]>([]);

  // Create and manage animation mixer for idle animation only
  useEffect(() => {
    if (!clone || idleAnimationClip.length === 0) return;

    // Create mixer if not exists
    if (!mixerRef.current) {
      mixerRef.current = new THREE.AnimationMixer(clone);
    }

    const mixer = mixerRef.current;
    const clip = idleAnimationClip[0];

    // Create and play the idle animation
    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.clampWhenFinished = false;
    action.play();
    
    idleActionRef.current = action;

    console.log('[AI Avatar] Idle animation started');

    return () => {
      action.stop();
      mixer.uncacheClip(clip);
    };
  }, [clone, idleAnimationClip]);

  // Update mixer on each frame
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    // Eye blink animation
    const now = performance.now() / 1000;
    const timeSinceLastBlink = now - lastBlinkTime.current;

    if (blinkPhase.current === 'idle') {
      // Check if it's time to blink
      if (timeSinceLastBlink >= nextBlinkInterval.current) {
        blinkPhase.current = 'closing';
        blinkProgress.current = 0;
      }
    } else if (blinkPhase.current === 'closing') {
      // Close eyes quickly
      blinkProgress.current += delta * 12; // Fast close
      const blinkValue = Math.min(1, blinkProgress.current);
      applyBlink(blinkValue);

      if (blinkProgress.current >= 1) {
        blinkPhase.current = 'opening';
        blinkProgress.current = 1;
      }
    } else if (blinkPhase.current === 'opening') {
      // Open eyes slightly slower
      blinkProgress.current -= delta * 8; // Slightly slower open
      const blinkValue = Math.max(0, blinkProgress.current);
      applyBlink(blinkValue);

      if (blinkProgress.current <= 0) {
        blinkPhase.current = 'idle';
        lastBlinkTime.current = now;
        // Random interval between 2-5 seconds for next blink
        nextBlinkInterval.current = 2 + Math.random() * 3;
      }
    }
  });

  // Auto-fit: center X/Z, put feet on ground (Y=0), and normalize height.
  useEffect(() => {
    try {
      clone.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(clone);
      const center = new THREE.Vector3();
      box.getCenter(center);

      const size = new THREE.Vector3();
      box.getSize(size);

      const height = Math.max(0.0001, size.y);
      const targetHeight = 1.7; // meters-ish
      const scale = THREE.MathUtils.clamp(targetHeight / height, 0.01, 10);

      // Move model so its base sits at Y=0 and its center is at X/Z=0
      setModelOffset([-center.x, -box.min.y, -center.z]);
      setModelScale(scale);

      console.log('[AI Avatar] bbox size:', size.toArray(), 'scale:', scale);
    } catch (e) {
      console.warn('[AI Avatar] Failed to auto-fit model', e);
    }
  }, [clone]);

  // Discover morphs from headMesh once the model is ready
  useEffect(() => {
    // --- Diagnostics: find out whether the GLB actually contains texture images/maps ---
    try {
      const json = gltf?.parser?.json;
      const images = (json?.images || []).map((img: any) => img?.uri ?? '[embedded]');
      console.log('[AI Avatar] gltf images:', images);
    } catch (e) {
      console.warn('[AI Avatar] failed to inspect gltf images', e);
    }

    try {
      const materialSummary: Array<{ mesh: string; material: string; map: boolean; normalMap: boolean; mrMap: boolean }> = [];
      clone.traverse((obj) => {
        if (!(obj as any).isMesh) return;
        const mesh = obj as THREE.Mesh;
        const mats = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        mats.forEach((m) => {
          const mat: any = m;
          materialSummary.push({
            mesh: mesh.name || '(unnamed)',
            material: mat?.type || 'Unknown',
            map: !!mat?.map,
            normalMap: !!mat?.normalMap,
            mrMap: !!mat?.metalnessMap || !!mat?.roughnessMap,
          });
        });
      });
      console.log('[AI Avatar] material summary (first 25):', materialSummary.slice(0, 25));
    } catch (e) {
      console.warn('[AI Avatar] failed to inspect materials', e);
    }

    // Find head and teeth meshes dynamically
    headMesh.current = findHeadMesh(clone);
    teethMesh.current = findTeethMesh(clone);

    const dict = headMesh.current?.morphTargetDictionary;
    availableVisemes.current = RPM_VISEMES.filter((v) => dict?.[v] !== undefined);
    mouthOpenBlendshape.current = findBestMouthOpenBlendshape(dict);

    // Jaw bone fallback (search the whole cloned scene)
    jawBone.current = findJawBoneInObject3D(clone);

    console.log('[AI Avatar] morph targets:', Object.keys(dict || {}));
    console.log('[AI Avatar] available visemes:', availableVisemes.current);
    console.log('[AI Avatar] mouthOpen blendshape:', mouthOpenBlendshape.current);
    console.log('[AI Avatar] jaw bone:', jawBone.current?.name || null);
    console.log('[AI Avatar] head mesh:', headMesh.current?.name || null);
    console.log('[AI Avatar] teeth mesh:', teethMesh.current?.name || null);
  }, [clone, gltf]);

  // (Idle animation is now managed directly via mixerRef above)

  // Eye blink state
  const lastBlinkTime = useRef<number>(0);
  const blinkPhase = useRef<'idle' | 'closing' | 'opening'>('idle');
  const blinkProgress = useRef<number>(0);
  const nextBlinkInterval = useRef<number>(2 + Math.random() * 3); // Random 2-5 seconds

  // Apply a subtle smile to the avatar's face
  useEffect(() => {
    const applySmile = (): void => {
      const dict = headMesh.current?.morphTargetDictionary;
      const influences = headMesh.current?.morphTargetInfluences;
      if (!dict || !influences) return;

      // Try common smile blendshape names
      const smileKeys = ['mouthSmile', 'mouthSmileLeft', 'mouthSmileRight', 'mouthSmile_L', 'mouthSmile_R'];
      smileKeys.forEach((key) => {
        const idx = dict[key];
        if (idx !== undefined) {
          influences[idx] = 0.35; // Subtle smile
        }
      });
    };

    // Apply after a short delay to ensure mesh is ready
    const timer = setTimeout(applySmile, 100);
    return () => clearTimeout(timer);
  }, [clone]);

  // Eye blink animation helper
  const applyBlink = useCallback((blinkValue: number): void => {
    const dict = headMesh.current?.morphTargetDictionary;
    const influences = headMesh.current?.morphTargetInfluences;
    if (!dict || !influences) return;

    // Common eye blink blendshape names
    const blinkKeys = [
      'eyeBlinkLeft', 'eyeBlinkRight',
      'eyeBlink_L', 'eyeBlink_R',
      'eyesBlinkLeft', 'eyesBlinkRight',
      'blink_L', 'blink_R',
      'eyeClosed_L', 'eyeClosed_R',
      'EyeBlink_L', 'EyeBlink_R'
    ];

    blinkKeys.forEach((key) => {
      const idx = dict[key];
      if (idx !== undefined) {
        influences[idx] = blinkValue;
      }
    });
  }, []);

  const resetMorphs = useCallback((mesh: THREE.SkinnedMesh | null): void => {
    if (!mesh?.morphTargetDictionary || !mesh?.morphTargetInfluences) return;
    Object.keys(mesh.morphTargetDictionary).forEach((k) => {
      const idx = mesh.morphTargetDictionary![k];
      if (idx !== undefined) mesh.morphTargetInfluences![idx] = 0;
    });
  }, []);

  const generateQueueFromText = useCallback(
    (text: string, seconds: number): VisemeQueueEntry[] => {
      const clean = (text || '').toUpperCase();

      // Keep the original behavior for existing pages (AI Avatar), so we don't change anything unintentionally.
      if (lipSyncStyle === 'default') {
        const len = Math.max(1, clean.length);
        const charDur = seconds / len;

        const queue: VisemeQueueEntry[] = [];
        for (let i = 0; i < clean.length; i++) {
          const c = clean[i];
          const v = CHAR_TO_VISEME[c] || 'viseme_sil';
          queue.push({ viseme: v, time: i * charDur, duration: charDur });
        }
        return queue;
      }

      // "calm" profile: reduce viseme switching frequency and smooth timing.
      const targetVisemesPerSecond = 6; // slower, calmer
      const targetSteps = Math.max(1, Math.round(seconds * targetVisemesPerSecond));

      // Prefer letters/spaces only; collapse whitespace for stable sampling.
      const normalized = clean.replace(/[^A-Z ]/g, ' ').replace(/\s+/g, ' ').trim();
      const source = normalized.length > 0 ? normalized : ' ';

      // Evenly sample characters so we don't flip visemes too frequently when transcript is long.
      const sampledChars: string[] = [];
      if (targetSteps === 1) {
        sampledChars.push(source[0] ?? ' ');
      } else {
        for (let i = 0; i < targetSteps; i++) {
          const idx = Math.round((i / (targetSteps - 1)) * (source.length - 1));
          sampledChars.push(source[idx] ?? ' ');
        }
      }

      // Map -> visemes and collapse consecutive duplicates to avoid jitter.
      const visemesCollapsed: string[] = [];
      for (const ch of sampledChars) {
        const v = CHAR_TO_VISEME[ch] || 'viseme_sil';
        if (visemesCollapsed.length === 0 || visemesCollapsed[visemesCollapsed.length - 1] !== v) {
          visemesCollapsed.push(v);
        }
      }

      const stepDur = seconds / Math.max(1, visemesCollapsed.length);
      const queue: VisemeQueueEntry[] = [];
      for (let i = 0; i < visemesCollapsed.length; i++) {
        queue.push({ viseme: visemesCollapsed[i], time: i * stepDur, duration: stepDur });
      }
      return queue;
    },
    [lipSyncStyle]
  );

  const startTalking = useCallback(
    (visemesOrText: Viseme[] | string, estimatedSeconds?: number): void => {
      setIsTalking(true);
      onStateChange?.('talking');

      speechStart.current = performance.now();

      // If backend provided visemes, trust them.
      if (Array.isArray(visemesOrText)) {
        const queue: VisemeQueueEntry[] = visemesOrText
          .filter((v): v is Viseme => v && typeof v.time === 'number' && typeof v.viseme === 'string')
          .map((v) => ({
            viseme: v.viseme,
            time: v.time,
            duration: typeof v.duration === 'number' ? v.duration : 0.08,
          }));

        visemeQueue.current = queue;

        const last = queue[queue.length - 1];
        const computedDuration = last ? last.time + (last.duration ?? 0.08) : 2;
        speechDuration.current = Math.max(0.8, computedDuration);
        return;
      }

      // Fallback: estimate duration and map text -> visemes
      const text = String(visemesOrText || '');
      const words = text.trim().split(/\s+/).filter(Boolean).length;
      const seconds =
        typeof estimatedSeconds === 'number' && estimatedSeconds > 0
          ? estimatedSeconds
          : Math.max(1.2, words / 2.5);

      speechDuration.current = seconds;
      visemeQueue.current = generateQueueFromText(text, seconds);
    },
    [generateQueueFromText, onStateChange]
  );

  const stopTalking = useCallback((): void => {
    setIsTalking(false);
    onStateChange?.('idle');

    visemeQueue.current = [];
    resetMorphs(headMesh.current);
    resetMorphs(teethMesh.current);

    if (jawBone.current) jawBone.current.rotation.x = 0;
  }, [onStateChange, resetMorphs]);

  useImperativeHandle(
    ref,
    (): AvatarRef => ({
      startTalking,
      stopTalking,
      setListening: (): void => {
        onStateChange?.('listening');
      },
    }),
    [startTalking, stopTalking, onStateChange]
  );

  useFrame((_, delta) => {
    if (!isTalking) return;

    const t = (performance.now() - speechStart.current) / 1000;
    if (t > speechDuration.current + 0.4) {
      stopTalking();
      return;
    }

    // Find active viseme
    let currentViseme = 'viseme_sil';
    let blendProgress = 0;

    for (let i = visemeQueue.current.length - 1; i >= 0; i--) {
      const entry = visemeQueue.current[i];
      if (t >= entry.time) {
        currentViseme = entry.viseme;
        blendProgress = entry.duration > 0 ? Math.min(1, (t - entry.time) / entry.duration) : 0;
        break;
      }
    }

    const isSilent = currentViseme === 'viseme_sil';

    // Amplitude profile - pronounced jaw movement for clearer speech
    let amp = 0.05;
    if (lipSyncStyle === 'calm') {
      const baseAmp = isSilent ? 0.05 : 0.92; // Higher base for speaking, lower for silence
      const wave1 = Math.sin(t * 5) * 0.15; // Faster, stronger modulation
      const wave2 = Math.sin(t * 3) * 0.10; // Secondary rhythm
      const breathingWave = Math.sin(t * 1.5) * 0.05;
      amp = Math.max(0.02, Math.min(1.0, baseAmp + wave1 + wave2 + breathingWave));
    } else {
      const baseAmp = isSilent ? 0.1 : 0.95;
      const wave1 = Math.sin(t * 14) * 0.18;
      const wave2 = Math.sin(t * 8) * 0.12;
      amp = Math.max(0.05, Math.min(1.0, baseAmp + wave1 + wave2));
    }

    const dict = headMesh.current?.morphTargetDictionary;
    const hasVisemes = availableVisemes.current.length > 0;

    if (dict) {
      // If the exact viseme doesn't exist, use mouthOpen blendshape
      const targetName =
        (hasVisemes && dict[currentViseme] !== undefined && currentViseme) ||
        (mouthOpenBlendshape.current && dict[mouthOpenBlendshape.current] !== undefined
          ? mouthOpenBlendshape.current
          : null);

      if (targetName) {
        const influences = headMesh.current?.morphTargetInfluences;
        const teethInfluences = teethMesh.current?.morphTargetInfluences;

        const lerpSpeed = Math.min(1, (lipSyncStyle === 'calm' ? 14 : 40) * delta);
        const fadeSpeed = Math.min(1, (lipSyncStyle === 'calm' ? 12 : 40) * delta);

        if (influences) {
          // Fade down other visemes first
          availableVisemes.current.forEach((v) => {
            const idx = dict[v];
            if (idx !== undefined && v !== targetName) {
              influences[idx] = THREE.MathUtils.lerp(influences[idx], 0, fadeSpeed);
            }
          });

          const idx = dict[targetName];
          if (idx !== undefined) {
            const targetAmp =
              lipSyncStyle === 'calm'
                ? amp * (0.5 + 0.5 * Math.sin((blendProgress - 0.5) * Math.PI)) // gentle ease-in/out
                : amp;

            influences[idx] = THREE.MathUtils.lerp(influences[idx], targetAmp, lerpSpeed);
          }
        }

        if (teethInfluences && teethMesh.current?.morphTargetDictionary) {
          const teethIdx = teethMesh.current.morphTargetDictionary[targetName];
          if (teethIdx !== undefined) {
            const teethAmp = lipSyncStyle === 'calm' ? amp * 0.65 : amp;
            teethInfluences[teethIdx] = THREE.MathUtils.lerp(teethInfluences[teethIdx], teethAmp, lerpSpeed);
          }
        }
        return;
      }
    }

    // Final fallback: drive jaw bone rotation - pronounced movement for visible speech
    if (jawBone.current) {
      const jawTarget = lipSyncStyle === 'calm' ? -0.55 * amp : -0.5 * amp; // More pronounced jaw drop
      const jawLerp = Math.min(1, (lipSyncStyle === 'calm' ? 14 : 35) * delta); // Faster response
      jawBone.current.rotation.x = THREE.MathUtils.lerp(jawBone.current.rotation.x, jawTarget, jawLerp);
    }
  });

  // Render the cloned scene directly - this handles any GLB structure
  return (
    <group {...restProps} dispose={null} ref={group}>
      <group position={modelOffset} scale={modelScale}>
        <primitive object={clone} />
      </group>
    </group>
  );
});

useGLTF.preload('/models/avatar.glb');
