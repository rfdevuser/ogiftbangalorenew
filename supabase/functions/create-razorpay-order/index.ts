import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, currency = 'INR', receipt, notes } = await req.json();

    if (!amount) {
      throw new Error('Amount is required');
    }

    const razorpayKeyId = Deno.env.get('RAZORPAY_KEY_ID');
    const razorpayKeySecret = Deno.env.get('RAZORPAY_KEY_SECRET');

    if (!razorpayKeyId || !razorpayKeySecret) {
      throw new Error('Razorpay credentials not configured');
    }

    // Create Basic Auth header
    const authString = btoa(`${razorpayKeyId}:${razorpayKeySecret}`);

    console.log('Creating Razorpay order for amount:', amount, currency);

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // Razorpay expects amount in paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
        notes: notes || {},
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Razorpay API error:', data);
      throw new Error(data.error?.description || 'Failed to create Razorpay order');
    }

    console.log('Razorpay order created:', data.id);

    return new Response(JSON.stringify({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      keyId: razorpayKeyId, // Send key ID to frontend for checkout
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('Error creating Razorpay order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
