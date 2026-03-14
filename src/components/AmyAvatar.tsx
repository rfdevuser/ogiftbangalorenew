import * as React from 'react';
import { useFrame, useThree, GroupProps } from '@react-three/fiber';
import { SkeletonUtils, KTX2Loader } from 'three-stdlib';
import { useFBX, useGLTF } from '@react-three/drei';
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
interface AmyAvatarProps extends Omit<GroupProps, 'ref'> {
  onStateChange?: (state: AvatarState) => void;
  lipSyncStyle?: LipSyncStyle;
}

interface VisemeQueueEntry {
  viseme: string;
  time: number;
  duration: number;
}

export const AmyAvatar = forwardRef<AvatarRef, AmyAvatarProps>(function AmyAvatar(props, ref) {
  const { onStateChange, lipSyncStyle = 'default', ...restProps } = props;

  const { gl } = useThree();

  const gltf = useGLTF('/models/avatar.glb', false, false, (loader) => {
    loader.setKTX2Loader(ktx2Loader.detectSupport(gl));
  }) as any;

  const clone = useMemo(() => {
    const cloned = SkeletonUtils.clone(gltf.scene);
    console.log('[Amy Avatar] Processing model materials...');
    
    // Fallback colors for Ready Player Me avatars when textures are missing
    const fallbackColors: Record<string, string> = {
      'Wolf3D_Skin': '#e8b094',     // Natural skin tone
      'Wolf3D_Head': '#e8b094',     // Face
      'Wolf3D_Body': '#e8b094',     // Body skin
      'Wolf3D_Eye': '#4a90d9',      // Blue eyes
      'Wolf3D_Teeth': '#f5f5f0',    // White teeth
      'Wolf3D_Hair': '#2d1b0e',     // Dark brown hair
      'Wolf3D_Outfit_Top': '#3d5a80',    // Professional blue top
      'Wolf3D_Outfit_Bottom': '#293241', // Dark pants
      'Wolf3D_Outfit_Footwear': '#2b2b2b', // Dark shoes
      'Wolf3D_Glasses': '#1a1a1a',  // Black glasses frame
    };
    
    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          
          materials.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial || 
                mat instanceof THREE.MeshPhysicalMaterial) {
              mat.needsUpdate = true;
              mat.visible = true;
              mat.side = THREE.DoubleSide;
              
              // If no texture map, apply fallback colors
              if (!mat.map) {
                const matName = mat.name;
                const fallbackColor = fallbackColors[matName];
                
                if (fallbackColor) {
                  mat.color = new THREE.Color(fallbackColor);
                  console.log('[Amy Avatar] Applied fallback color for:', matName, fallbackColor);
                }
                
                // Improve material appearance for skin
                if (matName.includes('Skin') || matName.includes('Head') || matName.includes('Body')) {
                  mat.roughness = 0.6;
                  mat.metalness = 0.0;
                }
                // Hair settings
                if (matName.includes('Hair')) {
                  mat.roughness = 0.8;
                  mat.metalness = 0.1;
                }
                // Eye settings
                if (matName.includes('Eye')) {
                  mat.roughness = 0.2;
                  mat.metalness = 0.0;
                }
                // Teeth settings
                if (matName.includes('Teeth')) {
                  mat.roughness = 0.3;
                  mat.metalness = 0.0;
                }
                // Outfit settings
                if (matName.includes('Outfit')) {
                  mat.roughness = 0.7;
                  mat.metalness = 0.0;
                }
                // Glasses settings
                if (matName.includes('Glasses')) {
                  mat.roughness = 0.1;
                  mat.metalness = 0.8;
                }
              } else {
                // Texture exists - ensure proper color space
                mat.map.colorSpace = THREE.SRGBColorSpace;
                mat.map.needsUpdate = true;
              }
              
              if ((mat as THREE.MeshStandardMaterial).emissiveMap) {
                (mat as THREE.MeshStandardMaterial).emissiveMap!.colorSpace = THREE.SRGBColorSpace;
              }
            }
          });
        }
      }
    });
    return cloned;
  }, [gltf.scene]);

  const idleFBX = useFBX('/animations/Idle.fbx');
  
  const avatarBoneNames = useMemo(() => {
    const bones: string[] = [];
    const allObjects: string[] = [];
    
    clone.traverse((obj) => {
      allObjects.push(`${obj.type}: ${obj.name}`);
      
      // Check for bones in multiple ways
      if ((obj as THREE.Bone).isBone) {
        bones.push(obj.name);
      }
      // Also check if it's part of a skeleton
      if (obj.type === 'Bone' || obj.name.match(/Hips|Spine|Arm|Leg|Hand|Foot|Head|Neck/i)) {
        if (!bones.includes(obj.name)) {
          bones.push(obj.name);
        }
      }
    });
    
    console.log('[Amy Avatar] All objects:', allObjects.slice(0, 50));
    console.log('[Amy Avatar] Detected bones:', bones);
    
    // If no bones found via isBone, try to find them from SkinnedMesh skeleton
    if (bones.length === 0) {
      clone.traverse((obj) => {
        const mesh = obj as THREE.SkinnedMesh;
        if (mesh.isSkinnedMesh && mesh.skeleton?.bones) {
          mesh.skeleton.bones.forEach(bone => {
            if (!bones.includes(bone.name)) {
              bones.push(bone.name);
            }
          });
        }
      });
      console.log('[Amy Avatar] Bones from skeleton:', bones);
    }
    
    return bones;
  }, [clone]);

  const boneNameMapping = useMemo(() => {
    const mapping: Record<string, string> = {};
    
    // Extended mapping for Ready Player Me / Wolf3D avatars
    const mixamoToStandard: Record<string, string[]> = {
      'Hips': ['Hips', 'hip', 'pelvis', 'root', 'mixamorigHips'],
      'Spine': ['Spine', 'spine', 'spine1', 'mixamorigSpine'],
      'Spine1': ['Spine1', 'spine1', 'chest', 'mixamorigSpine1'],
      'Spine2': ['Spine2', 'spine2', 'upperchest', 'mixamorigSpine2'],
      'Neck': ['Neck', 'neck', 'mixamorigNeck'],
      'Head': ['Head', 'head', 'mixamorigHead'],
      'LeftShoulder': ['LeftShoulder', 'leftshoulder', 'l_shoulder', 'shoulder_l', 'mixamorigLeftShoulder'],
      'LeftArm': ['LeftArm', 'leftarm', 'l_arm', 'arm_l', 'leftupperarm', 'mixamorigLeftArm'],
      'LeftForeArm': ['LeftForeArm', 'leftforearm', 'l_forearm', 'forearm_l', 'leftlowerarm', 'mixamorigLeftForeArm'],
      'LeftHand': ['LeftHand', 'lefthand', 'l_hand', 'hand_l', 'mixamorigLeftHand'],
      'RightShoulder': ['RightShoulder', 'rightshoulder', 'r_shoulder', 'shoulder_r', 'mixamorigRightShoulder'],
      'RightArm': ['RightArm', 'rightarm', 'r_arm', 'arm_r', 'rightupperarm', 'mixamorigRightArm'],
      'RightForeArm': ['RightForeArm', 'rightforearm', 'r_forearm', 'forearm_r', 'rightlowerarm', 'mixamorigRightForeArm'],
      'RightHand': ['RightHand', 'righthand', 'r_hand', 'hand_r', 'mixamorigRightHand'],
      'LeftUpLeg': ['LeftUpLeg', 'leftupleg', 'l_thigh', 'thigh_l', 'leftthigh', 'mixamorigLeftUpLeg'],
      'LeftLeg': ['LeftLeg', 'leftleg', 'l_calf', 'calf_l', 'leftcalf', 'leftshin', 'mixamorigLeftLeg'],
      'LeftFoot': ['LeftFoot', 'leftfoot', 'l_foot', 'foot_l', 'mixamorigLeftFoot'],
      'LeftToeBase': ['LeftToeBase', 'lefttoebase', 'l_toe', 'toe_l', 'lefttoe', 'mixamorigLeftToeBase'],
      'RightUpLeg': ['RightUpLeg', 'rightupleg', 'r_thigh', 'thigh_r', 'rightthigh', 'mixamorigRightUpLeg'],
      'RightLeg': ['RightLeg', 'rightleg', 'r_calf', 'calf_r', 'rightcalf', 'rightshin', 'mixamorigRightLeg'],
      'RightFoot': ['RightFoot', 'rightfoot', 'r_foot', 'foot_r', 'mixamorigRightFoot'],
      'RightToeBase': ['RightToeBase', 'righttoebase', 'r_toe', 'toe_r', 'righttoe', 'mixamorigRightToeBase'],
    };
    
    Object.entries(mixamoToStandard).forEach(([mixamoBone, alternatives]) => {
      for (const alt of alternatives) {
        const found = avatarBoneNames.find(b => 
          b.toLowerCase() === alt.toLowerCase() ||
          b.toLowerCase().endsWith(alt.toLowerCase()) ||
          b.toLowerCase().includes(alt.toLowerCase())
        );
        if (found) {
          mapping[mixamoBone] = found;
          break;
        }
      }
    });
    
    console.log('[Amy Avatar] Bone mapping:', mapping);
    return mapping;
  }, [avatarBoneNames]);

  const idleAnimationClip = useMemo(() => {
    if (idleFBX?.animations?.[0]) {
      const clip = idleFBX.animations[0].clone();
      clip.name = 'Idle';
      
      let mappedCount = 0;
      let unmappedTracks: string[] = [];
      
      clip.tracks.forEach((track) => {
        const dotIndex = track.name.indexOf('.');
        if (dotIndex === -1) return;
        
        const originalBoneName = track.name.substring(0, dotIndex);
        const property = track.name.substring(dotIndex);
        
        // Remove "mixamorig:" prefix
        const baseName = originalBoneName.replace(/^mixamorig:?/i, '');
        
        if (boneNameMapping[baseName]) {
          track.name = boneNameMapping[baseName] + property;
          mappedCount++;
        } else {
          // Try direct match with avatar bones
          const directMatch = avatarBoneNames.find(b => 
            b.toLowerCase() === baseName.toLowerCase() ||
            b === originalBoneName
          );
          if (directMatch) {
            track.name = directMatch + property;
            mappedCount++;
          } else {
            unmappedTracks.push(originalBoneName);
          }
        }
      });

      // Filter out position and scale tracks to keep avatar stationary
      clip.tracks = clip.tracks.filter((t) => !t.name.endsWith('.position') && !t.name.endsWith('.scale'));
      
      console.log('[Amy Avatar] Animation retargeting: mapped=' + mappedCount + ', unmapped tracks:', [...new Set(unmappedTracks)]);
      return [clip];
    }
    return [];
  }, [idleFBX, avatarBoneNames, boneNameMapping]);

  const [isTalking, setIsTalking] = useState<boolean>(false);
  const [modelOffset, setModelOffset] = useState<[number, number, number]>([0, 0, 0]);
  const [modelScale, setModelScale] = useState<number>(1);

  const group = useRef<THREE.Group>(null);
  const headMesh = useRef<THREE.SkinnedMesh | null>(null);
  const teethMesh = useRef<THREE.SkinnedMesh | null>(null);
  const jawBone = useRef<THREE.Bone | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const idleActionRef = useRef<THREE.AnimationAction | null>(null);

  const availableVisemes = useRef<string[]>([]);
  const mouthOpenBlendshape = useRef<string | null>(null);

  const speechStart = useRef<number>(0);
  const speechDuration = useRef<number>(0);
  const visemeQueue = useRef<VisemeQueueEntry[]>([]);

  // Blink state
  const lastBlinkTime = useRef<number>(0);
  const nextBlinkInterval = useRef<number>(3);
  const blinkPhase = useRef<'idle' | 'closing' | 'opening'>('idle');
  const blinkProgress = useRef<number>(0);

  const applyBlink = useCallback((value: number) => {
    const mesh = headMesh.current;
    if (!mesh?.morphTargetDictionary || !mesh.morphTargetInfluences) return;
    
    const leftIdx = mesh.morphTargetDictionary['eyeBlinkLeft'] ?? mesh.morphTargetDictionary['eyeBlink_L'];
    const rightIdx = mesh.morphTargetDictionary['eyeBlinkRight'] ?? mesh.morphTargetDictionary['eyeBlink_R'];
    
    if (leftIdx !== undefined) mesh.morphTargetInfluences[leftIdx] = value;
    if (rightIdx !== undefined) mesh.morphTargetInfluences[rightIdx] = value;
  }, []);

  useEffect(() => {
    if (!clone || idleAnimationClip.length === 0) return;

    if (!mixerRef.current) {
      mixerRef.current = new THREE.AnimationMixer(clone);
    }

    const mixer = mixerRef.current;
    const clip = idleAnimationClip[0];

    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.clampWhenFinished = false;
    action.play();
    
    idleActionRef.current = action;

    return () => {
      action.stop();
      mixer.uncacheClip(clip);
    };
  }, [clone, idleAnimationClip]);

  // Apply idle mouth closed helper
  const applyIdleMouthClosed = useCallback((delta: number) => {
    const lerp = Math.min(1, 18 * delta);
    const lerpFast = Math.min(1, 26 * delta);

    const mouthOpenKeys = ['mouthOpen', 'jawOpen', 'jawForward'];
    const mouthCloseKeys = ['mouthClose', 'jawClose'];
    const smileKeys = ['mouthSmile', 'mouthSmileLeft', 'mouthSmileRight'];

    const mesh = headMesh.current;
    const dict = mesh?.morphTargetDictionary;
    const influences = mesh?.morphTargetInfluences;
    if (!dict || !influences) return;

    // Reduce smile at rest
    smileKeys.forEach((k) => {
      const idx = dict[k];
      if (idx !== undefined) influences[idx] = THREE.MathUtils.lerp(influences[idx] ?? 0, 0.05, lerp);
    });

    // Close mouth / jaw
    mouthOpenKeys.forEach((k) => {
      const idx = dict[k];
      if (idx !== undefined) influences[idx] = THREE.MathUtils.lerp(influences[idx] ?? 0, 0, lerpFast);
    });

    // Bias mouthClose morph on during idle
    mouthCloseKeys.forEach((k) => {
      const idx = dict[k];
      if (idx !== undefined) influences[idx] = THREE.MathUtils.lerp(influences[idx] ?? 0, 1, lerp);
    });

    if (jawBone.current) {
      jawBone.current.rotation.x = THREE.MathUtils.lerp(jawBone.current.rotation.x, 0, lerpFast);
    }
  }, []);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    const now = performance.now() / 1000;
    const timeSinceLastBlink = now - lastBlinkTime.current;

    // Eye blink animation
    if (blinkPhase.current === 'idle') {
      if (timeSinceLastBlink >= nextBlinkInterval.current) {
        blinkPhase.current = 'closing';
        blinkProgress.current = 0;
      }
    } else if (blinkPhase.current === 'closing') {
      blinkProgress.current += delta * 12;
      const blinkValue = Math.min(1, blinkProgress.current);
      applyBlink(blinkValue);

      if (blinkProgress.current >= 1) {
        blinkPhase.current = 'opening';
        blinkProgress.current = 1;
      }
    } else if (blinkPhase.current === 'opening') {
      blinkProgress.current -= delta * 8;
      const blinkValue = Math.max(0, blinkProgress.current);
      applyBlink(blinkValue);

      if (blinkProgress.current <= 0) {
        blinkPhase.current = 'idle';
        lastBlinkTime.current = now;
        nextBlinkInterval.current = 2 + Math.random() * 3;
      }
    }

    // Subtle head/body sway and breathing during idle
    if (!isTalking && group.current) {
      const swayX = Math.sin(now * 0.5) * 0.012;
      const swayZ = Math.sin(now * 0.3) * 0.008;
      const breathY = Math.sin(now * 1.2) * 0.003;
      group.current.rotation.z = swayX;
      group.current.rotation.x = swayZ;
      group.current.position.y = breathY;
    }
  });

  useEffect(() => {
    try {
      clone.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(clone);
      const center = new THREE.Vector3();
      box.getCenter(center);

      const size = new THREE.Vector3();
      box.getSize(size);

      const height = Math.max(0.0001, size.y);
      const targetHeight = 1.7;
      const scale = THREE.MathUtils.clamp(targetHeight / height, 0.01, 10);

      const faceOffset = height * 0.35 * scale;
      setModelOffset([-center.x, -box.min.y - faceOffset, -center.z]);
      setModelScale(scale);
    } catch (e) {
      console.warn('[Amy Avatar] Failed to auto-fit model', e);
    }
  }, [clone]);

  useEffect(() => {
    console.log('[Amy Avatar] === MORPH TARGET DIAGNOSTICS ===');
    
    let bestMorphMesh: THREE.SkinnedMesh | null = null;
    let maxMorphCount = 0;
    
    clone.traverse((obj) => {
      const mesh = obj as THREE.SkinnedMesh;
      if (mesh.isSkinnedMesh && mesh.morphTargetDictionary) {
        const count = Object.keys(mesh.morphTargetDictionary).length;
        console.log('[Amy Avatar] Mesh with morphs:', mesh.name, 'count:', count);
        if (count > maxMorphCount) {
          maxMorphCount = count;
          bestMorphMesh = mesh;
        }
      }
    });
    
    headMesh.current = bestMorphMesh;
    teethMesh.current = findTeethMesh(clone);

    const dict = headMesh.current?.morphTargetDictionary;
    
    if (dict) {
      console.log('[Amy Avatar] All morph targets:', Object.keys(dict));
      
      // Check for ARKit blendshapes (Ready Player Me uses these)
      const arkitShapes = ['jawOpen', 'mouthOpen', 'mouthFunnel', 'mouthPucker', 
        'mouthSmileLeft', 'mouthSmileRight', 'mouthLeft', 'mouthRight',
        'eyeBlinkLeft', 'eyeBlinkRight', 'browDownLeft', 'browDownRight'];
      const foundArkit = arkitShapes.filter(s => dict[s] !== undefined);
      console.log('[Amy Avatar] Found ARKit blendshapes:', foundArkit);
    }
    
    availableVisemes.current = RPM_VISEMES.filter((v) => dict?.[v] !== undefined);
    console.log('[Amy Avatar] Available visemes:', availableVisemes.current);
    
    mouthOpenBlendshape.current = findBestMouthOpenBlendshape(dict);
    console.log('[Amy Avatar] Mouth open blendshape:', mouthOpenBlendshape.current);
    
    jawBone.current = findJawBoneInObject3D(clone);
    console.log('[Amy Avatar] Jaw bone:', jawBone.current?.name || 'not found');

    // Close mouth at rest
    if (dict && headMesh.current?.morphTargetInfluences) {
      const closeShapes = ['mouthClose', 'jawClose', 'mouthPucker'];
      closeShapes.forEach(name => {
        const idx = dict[name];
        if (idx !== undefined && headMesh.current?.morphTargetInfluences) {
          headMesh.current.morphTargetInfluences[idx] = 0.1;
        }
      });
    }
  }, [clone]);

  const generateVisemeQueue = useCallback((text: string, durationSec: number): VisemeQueueEntry[] => {
    const queue: VisemeQueueEntry[] = [];
    const upper = text.toUpperCase().replace(/[^A-Z .,!?]/g, '');
    if (!upper) return queue;

    const charTime = durationSec / upper.length;
    let time = 0;

    for (const ch of upper) {
      const viseme = CHAR_TO_VISEME[ch] || 'viseme_sil';
      queue.push({ viseme, time, duration: charTime });
      time += charTime;
    }

    return queue;
  }, []);

  const applyViseme = useCallback((visemeName: string, weight: number) => {
    const mesh = headMesh.current;
    if (!mesh?.morphTargetDictionary || !mesh.morphTargetInfluences) return;

    const amplitude = 0.45;
    const adjustedWeight = weight * amplitude;

    if (availableVisemes.current.includes(visemeName)) {
      const idx = mesh.morphTargetDictionary[visemeName];
      if (idx !== undefined) {
        mesh.morphTargetInfluences[idx] = adjustedWeight;
      }
    }

    const dict = mesh.morphTargetDictionary;
    const arkitMap: Record<string, { shapes: string[]; factor: number }> = {
      'viseme_aa': { shapes: ['jawOpen'], factor: 0.6 },
      'viseme_E': { shapes: ['jawOpen', 'mouthSmileLeft', 'mouthSmileRight'], factor: 0.4 },
      'viseme_I': { shapes: ['mouthSmileLeft', 'mouthSmileRight'], factor: 0.35 },
      'viseme_O': { shapes: ['jawOpen', 'mouthFunnel'], factor: 0.5 },
      'viseme_U': { shapes: ['mouthPucker', 'mouthFunnel'], factor: 0.45 },
      'viseme_PP': { shapes: ['mouthPucker', 'mouthPress'], factor: 0.4 },
      'viseme_FF': { shapes: ['mouthFunnel'], factor: 0.35 },
      'viseme_TH': { shapes: ['jawOpen', 'tongueOut'], factor: 0.3 },
      'viseme_DD': { shapes: ['jawOpen'], factor: 0.25 },
      'viseme_kk': { shapes: ['jawOpen'], factor: 0.2 },
      'viseme_CH': { shapes: ['mouthFunnel', 'jawOpen'], factor: 0.35 },
      'viseme_SS': { shapes: ['mouthSmileLeft', 'mouthSmileRight'], factor: 0.2 },
      'viseme_nn': { shapes: ['jawOpen'], factor: 0.15 },
      'viseme_RR': { shapes: ['mouthFunnel'], factor: 0.25 },
      'viseme_sil': { shapes: [], factor: 0 },
    };

    const mapping = arkitMap[visemeName];
    if (mapping && mesh.morphTargetInfluences) {
      mapping.shapes.forEach(shapeName => {
        const idx = dict[shapeName];
        if (idx !== undefined) {
          mesh.morphTargetInfluences[idx] = adjustedWeight * mapping.factor;
        }
      });
    }
  }, []);

  const resetMouth = useCallback(() => {
    const mesh = headMesh.current;
    if (!mesh?.morphTargetInfluences || !mesh.morphTargetDictionary) return;
    
    const dict = mesh.morphTargetDictionary;
    
    availableVisemes.current.forEach(v => {
      const idx = dict[v];
      if (idx !== undefined) mesh.morphTargetInfluences![idx] = 0;
    });

    const arkitShapes = ['jawOpen', 'mouthOpen', 'mouthFunnel', 'mouthPucker', 
      'mouthLeft', 'mouthRight', 'mouthSmileLeft', 'mouthSmileRight', 
      'mouthPress', 'mouthShrugLower', 'mouthShrugUpper'];
    arkitShapes.forEach(shape => {
      const idx = dict[shape];
      if (idx !== undefined) mesh.morphTargetInfluences![idx] = 0;
    });

    if (jawBone.current) {
      jawBone.current.rotation.x = 0;
    }
  }, []);

  const startTalking = useCallback((visemesOrText: Viseme[] | string, estimatedSeconds?: number) => {
    setIsTalking(true);
    onStateChange?.('talking');
    speechStart.current = performance.now() / 1000;

    if (typeof visemesOrText === 'string') {
      const dur = estimatedSeconds ?? Math.max(2, visemesOrText.split(/\s+/).length / 2.5);
      speechDuration.current = dur;
      visemeQueue.current = generateVisemeQueue(visemesOrText, dur);
    } else {
      visemeQueue.current = visemesOrText.map(v => ({
        viseme: v.viseme,
        time: v.time,
        duration: v.duration,
      }));
      const last = visemeQueue.current[visemeQueue.current.length - 1];
      speechDuration.current = last ? last.time + last.duration : 2;
    }
  }, [onStateChange, generateVisemeQueue]);

  const stopTalking = useCallback(() => {
    setIsTalking(false);
    onStateChange?.('idle');
    visemeQueue.current = [];
    resetMouth();
  }, [onStateChange, resetMouth]);

  const setListening = useCallback(() => {
    setIsTalking(false);
    onStateChange?.('listening');
    visemeQueue.current = [];
    resetMouth();
  }, [onStateChange, resetMouth]);

  useImperativeHandle(ref, () => ({
    startTalking,
    stopTalking,
    setListening,
  }), [startTalking, stopTalking, setListening]);

  useFrame((_, delta) => {
    if (!isTalking) {
      applyIdleMouthClosed(delta);
      return;
    }

    if (visemeQueue.current.length === 0) return;

    const t = (performance.now() / 1000) - speechStart.current;

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
    
    // Amplitude - stronger when speaking, zero when silent
    const baseAmp = isSilent ? 0.0 : 0.38;
    const wave1 = Math.sin(t * 14) * 0.07;
    const wave2 = Math.sin(t * 8) * 0.04;
    const amp = Math.max(0.0, Math.min(0.50, baseAmp + wave1 + wave2));

    const dict = headMesh.current?.morphTargetDictionary;
    const influences = headMesh.current?.morphTargetInfluences;
    const hasVisemes = availableVisemes.current.length > 0;

    if (dict && influences) {
      const lerpSpeed = Math.min(1, 40 * delta);
      const fadeSpeed = Math.min(1, 40 * delta);

      // Target blendshape to drive
      const targetName =
        (hasVisemes && dict[currentViseme] !== undefined && currentViseme) ||
        (mouthOpenBlendshape.current && dict[mouthOpenBlendshape.current] !== undefined
          ? mouthOpenBlendshape.current
          : null);

      if (targetName) {
        // Fade down other visemes
        availableVisemes.current.forEach((v) => {
          const idx = dict[v];
          if (idx !== undefined && v !== targetName) {
            influences[idx] = THREE.MathUtils.lerp(influences[idx], 0, fadeSpeed);
          }
        });

        const idx = dict[targetName];
        if (idx !== undefined) {
          const isMouthOpenShape = /^(mouthOpen|jawOpen)$/i.test(targetName);
          const targetAmp = isMouthOpenShape ? amp * 0.45 : amp;
          influences[idx] = THREE.MathUtils.lerp(influences[idx], targetAmp, lerpSpeed);
        }
      }

      // Also apply ARKit mappings for richer lip sync
      const arkitMap: Record<string, { shapes: string[]; factor: number }> = {
        'viseme_aa': { shapes: ['jawOpen'], factor: 0.6 },
        'viseme_E': { shapes: ['jawOpen', 'mouthSmileLeft', 'mouthSmileRight'], factor: 0.4 },
        'viseme_I': { shapes: ['mouthSmileLeft', 'mouthSmileRight'], factor: 0.35 },
        'viseme_O': { shapes: ['jawOpen', 'mouthFunnel'], factor: 0.5 },
        'viseme_U': { shapes: ['mouthPucker', 'mouthFunnel'], factor: 0.45 },
        'viseme_PP': { shapes: ['mouthPucker'], factor: 0.4 },
        'viseme_FF': { shapes: ['mouthFunnel'], factor: 0.35 },
        'viseme_DD': { shapes: ['jawOpen'], factor: 0.25 },
        'viseme_kk': { shapes: ['jawOpen'], factor: 0.2 },
        'viseme_SS': { shapes: ['mouthSmileLeft', 'mouthSmileRight'], factor: 0.2 },
        'viseme_nn': { shapes: ['jawOpen'], factor: 0.15 },
        'viseme_RR': { shapes: ['mouthFunnel'], factor: 0.25 },
      };

      const mapping = arkitMap[currentViseme];
      if (mapping) {
        mapping.shapes.forEach(shapeName => {
          const shapeIdx = dict[shapeName];
          if (shapeIdx !== undefined) {
            influences[shapeIdx] = THREE.MathUtils.lerp(
              influences[shapeIdx], 
              amp * mapping.factor, 
              lerpSpeed
            );
          }
        });
      }
      return;
    }

    // Fallback: drive jaw bone rotation
    if (jawBone.current) {
      const jawTarget = -0.5 * amp;
      const jawLerp = Math.min(1, 35 * delta);
      jawBone.current.rotation.x = THREE.MathUtils.lerp(jawBone.current.rotation.x, jawTarget, jawLerp);
    }
  });

  return (
    <group ref={group} {...restProps}>
      <primitive 
        object={clone} 
        position={modelOffset} 
        scale={modelScale}
      />
    </group>
  );
});

useGLTF.preload('/models/avatar.glb');
