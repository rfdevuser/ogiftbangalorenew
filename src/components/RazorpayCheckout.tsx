import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayCheckoutProps {
  amount: number;
  currency?: string;
  name: string;
  description?: string;
  prefillName?: string;
  prefillEmail?: string;
  prefillContact?: string;
  onSuccess?: (response: RazorpaySuccessResponse) => void;
  onFailure?: (error: any) => void;
  buttonText?: string;
  className?: string;
}

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const RazorpayCheckout = ({
  amount,
  currency = "INR",
  name,
  description = "",
  prefillName = "",
  prefillEmail = "",
  prefillContact = "",
  onSuccess,
  onFailure,
  buttonText = "Pay Now",
  className = "",
}: RazorpayCheckoutProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      setScriptLoaded(loaded);
      if (!loaded) {
        console.error("Failed to load Razorpay script");
      }
    });
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded) {
      toast({
        title: "Error",
        description: "Payment system is not ready. Please try again.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create order via edge function
      const { data, error } = await supabase.functions.invoke("create-razorpay-order", {
        body: {
          amount,
          currency,
          notes: {
            name,
            description,
          },
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to create order");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Open Razorpay checkout
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name,
        description,
        order_id: data.orderId,
        prefill: {
          name: prefillName,
          email: prefillEmail,
          contact: prefillContact,
        },
        theme: {
          color: "#6366f1",
        },
        handler: async (response: RazorpaySuccessResponse) => {
          // Verify payment on server
          try {
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke(
              "verify-razorpay-payment",
              {
                body: {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                },
              }
            );

            if (verifyError || !verifyData?.success) {
              throw new Error(verifyData?.error || "Payment verification failed");
            }

            toast({
              title: "Payment Successful",
              description: `Payment ID: ${response.razorpay_payment_id}`,
            });
            onSuccess?.(response);
          } catch (verifyErr: any) {
            toast({
              title: "Verification Failed",
              description: verifyErr.message || "Could not verify payment",
              variant: "destructive",
            });
            onFailure?.(verifyErr);
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on("payment.failed", (response: any) => {
        toast({
          title: "Payment Failed",
          description: response.error?.description || "Something went wrong",
          variant: "destructive",
        });
        onFailure?.(response.error);
        setIsLoading(false);
      });

      razorpay.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to initiate payment",
        variant: "destructive",
      });
      onFailure?.(error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isLoading || !scriptLoaded}
      className={className}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};
