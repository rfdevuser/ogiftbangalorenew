import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'verify';

    if (action === 'verify') {
      // Verify full chain integrity
      const { data, error } = await supabase.rpc('verify_chain_integrity', { p_limit: 1000 });
      if (error) throw error;

      return new Response(JSON.stringify({
        status: 'success',
        chain: data?.[0] || { total_blocks: 0, verified_blocks: 0, is_valid: true, first_invalid_block: null },
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    if (action === 'lookup') {
      // Look up a specific block or token
      const blockHash = url.searchParams.get('hash');
      const tokenId = url.searchParams.get('token');
      const blockNumber = url.searchParams.get('block');

      let query = supabase.from('blockchain_blocks').select('*');

      if (blockHash) {
        query = query.eq('hash', blockHash);
      } else if (blockNumber) {
        query = query.eq('block_number', parseInt(blockNumber));
      } else {
        return new Response(JSON.stringify({ error: 'Provide hash, token, or block parameter' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      const { data: blocks, error: blockError } = await query.limit(1).single();
      if (blockError) {
        return new Response(JSON.stringify({ status: 'not_found' }), {
          status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // If looking up by token, find the associated asset
      let asset = null;
      if (tokenId) {
        const { data: assetData } = await supabase
          .from('digital_assets')
          .select('id, title, asset_type, created_at, block_hash, block_number, token_id')
          .eq('token_id', tokenId)
          .limit(1)
          .single();
        asset = assetData;
      }

      return new Response(JSON.stringify({ status: 'found', block: blocks, asset }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (action === 'stats') {
      const { count: totalBlocks } = await supabase
        .from('blockchain_blocks')
        .select('*', { count: 'exact', head: true });

      const { count: totalAssets } = await supabase
        .from('digital_assets')
        .select('*', { count: 'exact', head: true });

      const { count: totalPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });

      const { data: latestBlock } = await supabase
        .from('blockchain_blocks')
        .select('block_number, hash, timestamp')
        .order('block_number', { ascending: false })
        .limit(1)
        .single();

      return new Response(JSON.stringify({
        status: 'success',
        stats: {
          total_blocks: totalBlocks || 0,
          total_assets: totalAssets || 0,
          total_posts: totalPosts || 0,
          latest_block: latestBlock,
        },
      }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Invalid action. Use: verify, lookup, or stats' }), {
      status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Chain verification error:', error);
    return new Response(JSON.stringify({ error: 'Verification failed' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
