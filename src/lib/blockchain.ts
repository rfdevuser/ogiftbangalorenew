// Simulated Educational Blockchain Implementation
// This is a simplified blockchain for learning purposes - not for production crypto

export interface Block {
  blockNumber: number;
  previousHash: string;
  hash: string;
  timestamp: Date;
  data: BlockData;
  nonce: number;
}

export interface BlockData {
  type: 'post' | 'asset' | 'digital_asset' | 'genesis' | 'like' | 'comment';
  id: string;
  userId: string;
  content?: string;
  metadata?: Record<string, unknown>;
}

// Simple hash function for educational purposes
// In production, you'd use SHA-256 or similar
export function simpleHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  // Convert to hex and pad
  const hexHash = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hexHash}${Date.now().toString(16)}`;
}

// Generate a unique wallet address for a user
export function generateWalletAddress(userId: string): string {
  const baseHash = simpleHash(userId + Date.now().toString());
  return `0xOGIFT${baseHash.slice(2, 38)}`;
}

// Generate a unique token ID for digital assets
export function generateTokenId(assetId: string, userId: string): string {
  const hash = simpleHash(assetId + userId + Date.now().toString());
  return `OGIFT-${hash.slice(2, 10).toUpperCase()}`;
}

// Create a new block hash
export function createBlockHash(
  blockNumber: number,
  previousHash: string,
  timestamp: Date,
  data: BlockData,
  nonce: number
): string {
  const blockString = JSON.stringify({
    blockNumber,
    previousHash,
    timestamp: timestamp.toISOString(),
    data,
    nonce,
  });
  return simpleHash(blockString);
}

// Mining simulation (simplified - just finds a valid nonce)
export function mineBlock(
  blockNumber: number,
  previousHash: string,
  data: BlockData,
  difficulty: number = 2
): { hash: string; nonce: number } {
  let nonce = 0;
  let hash = '';
  const timestamp = new Date();
  const prefix = '0'.repeat(difficulty);

  // Simple proof of work - find a hash starting with zeros
  // In real blockchain this would be much more complex
  do {
    nonce++;
    hash = createBlockHash(blockNumber, previousHash, timestamp, data, nonce);
  } while (!hash.slice(2, 2 + difficulty).startsWith(prefix) && nonce < 10000);

  return { hash, nonce };
}

// Verify a block's integrity
export function verifyBlock(block: Block, previousHash: string): boolean {
  const calculatedHash = createBlockHash(
    block.blockNumber,
    block.previousHash,
    block.timestamp,
    block.data,
    block.nonce
  );
  return block.hash === calculatedHash && block.previousHash === previousHash;
}

// Format timestamp for display
export function formatBlockTimestamp(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Shorten hash for display
export function shortenHash(hash: string, chars: number = 6): string {
  if (hash.length <= chars * 2 + 3) return hash;
  return `${hash.slice(0, chars + 2)}...${hash.slice(-chars)}`;
}
