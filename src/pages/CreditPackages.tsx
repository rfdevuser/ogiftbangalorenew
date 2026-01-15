import * as React from "react";
import { Helmet } from "react-helmet-async";

import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Sparkles, Zap, Crown, Check, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import emailjs from "@emailjs/browser";
import { cn } from "@/lib/utils";

const { useState, useEffect } = React;

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_7r8sia9";
const EMAILJS_TEMPLATE_ID = "template_order_confirmation";
const EMAILJS_PUBLIC_KEY = "user_QBs08JbvqdXivIagZeWFH";

interface Package {
  id: string;
  name: string;
  credits: number;
  monthlyPrice: number;
  icon: React.ReactNode;
  color: string;
  features: string[];
  popular?: boolean;
}

const packages: Package[] = [
  {
    id: "basic",
    name: "Basic",
    credits: 250,
    monthlyPrice: 25,
    icon: <Sparkles className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-400",
    features: [
      "250 Credits per month",
      "Access to all video content",
      "Basic support",
      "Mobile friendly"
    ]
  },
  {
    id: "advanced",
    name: "Advanced",
    credits: 750,
    monthlyPrice: 55,
    icon: <Zap className="h-8 w-8" />,
    color: "from-purple-500 to-pink-500",
    popular: true,
    features: [
      "750 Credits per month",
      "Priority access to new content",
      "Email support",
      "Download materials",
      "Certificate of completion"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    credits: 1200,
    monthlyPrice: 85,
    icon: <Crown className="h-8 w-8" />,
    color: "from-amber-500 to-orange-500",
    features: [
      "1200 Credits per month",
      "Unlimited content access",
      "Priority support",
      "Exclusive workshops",
      "1-on-1 mentoring sessions",
      "Industry certificates"
    ]
  }
];

const CreditPackages = () => {
  const navigate = useNavigate();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Load stored student info
  useEffect(() => {
    const storedInfo = localStorage.getItem("avatar_student_info");
    if (storedInfo) {
      try {
        const parsed = JSON.parse(storedInfo);
        if (parsed.student_id) setStudentId(parsed.student_id);
        if (parsed.email) setStudentEmail(parsed.email);
      } catch (e) {
        console.error("Failed to parse stored student info:", e);
      }
    }
  }, []);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const getPrice = (pkg: Package) => {
    const monthly = pkg.monthlyPrice;
    if (billingCycle === "annual") {
      return Math.round(monthly * 0.85); // 15% discount
    }
    return monthly;
  };

  const getTotalPrice = (pkg: Package) => {
    const monthly = getPrice(pkg);
    if (billingCycle === "annual") {
      return monthly * 12;
    }
    return monthly;
  };

  const handleSelectPackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setShowForm(true);
  };

  const sendReceiptEmail = async (paymentDetails: { packageName: string; amount: number; paymentId: string }) => {
    try {
      const templateParams = {
        to_email: studentEmail,
        to_name: studentId,
        order_id: paymentDetails.paymentId,
        thank_you_message: `Thank you for purchasing the ${paymentDetails.packageName} package!`,
        order_items_table: `
<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr style="background-color: #f8f9fa;">
    <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Package</th>
    <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">Amount</th>
  </tr>
  <tr>
    <td style="border: 1px solid #dee2e6; padding: 12px;">${paymentDetails.packageName} (${billingCycle === "annual" ? "Annual" : "Monthly"})</td>
    <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">₹${paymentDetails.amount}</td>
  </tr>
</table>`,
        subtotal: `₹${paymentDetails.amount}`,
        shipping_cost: "N/A",
        total_amount: `₹${paymentDetails.amount}`,
        shipping_address: "Digital Delivery",
        phone: "N/A",
        payment_method: "Online Payment (Razorpay)",
        order_notes: `Student ID: ${studentId}`,
      };

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      console.log("Receipt email sent successfully");
    } catch (error) {
      console.error("Failed to send receipt email:", error);
    }
  };

  const handlePayment = async () => {
    if (!selectedPackage || !studentId.trim()) {
      toast.error("Please enter your Student ID");
      return;
    }

    if (!studentEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsProcessing(true);

    try {
      const amount = getTotalPrice(selectedPackage);

      // Use direct fetch to production URL for localhost compatibility
      const response = await fetch('https://azfyktcspmhcaqbhozuw.supabase.co/functions/v1/create-razorpay-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6ZnlrdGNzcG1oY2FxYmhvenV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTg4NDIsImV4cCI6MjA4MTczNDg0Mn0.qvGq90_IQxWjNjKTdqRzFO63DIuSUMCPCiFcA7qG7fM',
        },
        body: JSON.stringify({
          amount: amount,
          currency: "INR",
          receipt: `credits_${studentId}_${Date.now()}`,
          notes: {
            student_id: studentId,
            package: selectedPackage.name,
            billing_cycle: billingCycle,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.error || "Failed to create order");
      }

      const options = {
        key: data.key_id,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "OGIFT Bangalore",
        description: `${selectedPackage.name} Package - ${selectedPackage.credits} Credits`,
        order_id: data.order.id,
        handler: async function (response: any) {
          console.log("Payment successful:", response);

          // Update student credits in the database
          try {
            console.log("Adding credits to student account:", selectedPackage.credits);
            const { data: creditsData, error: creditsError } = await supabase.functions.invoke("verify-student", {
              body: {
                studentId: studentId,
                action: "add_credits",
                credits: selectedPackage.credits,
              },
            });

            if (creditsError) {
              console.error("Error adding credits:", creditsError);
              toast.error("Payment successful but failed to add credits. Please contact support.");
            } else if (creditsData?.success) {
              console.log("Credits added successfully:", creditsData);
              toast.success(`${selectedPackage.credits} credits added to your account!`);
            } else {
              console.error("Credits addition failed:", creditsData);
              toast.error("Payment successful but failed to add credits. Please contact support.");
            }
          } catch (creditsErr) {
            console.error("Exception adding credits:", creditsErr);
            toast.error("Payment successful but failed to add credits. Please contact support.");
          }

          // Send receipt email
          await sendReceiptEmail({
            packageName: selectedPackage.name,
            amount: amount,
            paymentId: response.razorpay_payment_id,
          });

          toast.success("Payment successful! Receipt sent to your email.");
          setShowForm(false);
          setSelectedPackage(null);
          setIsProcessing(false);
        },
        prefill: {
          name: studentId,
          email: studentEmail,
        },
        notes: {
          student_id: studentId,
          package: selectedPackage.name,
        },
        theme: {
          color: "#7c3aed",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.error("Payment cancelled");
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error: any) {
      console.error("Razorpay error:", error);
      toast.error(error.message || "Payment initialization failed");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Credit Packages | OGIFT Bangalore</title>
        <meta name="description" content="Purchase credit packages for OGIFT Bangalore students. Choose from Basic, Advanced, or Premium packages." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* <Header /> */}

        <main className="pt-6 pb-20">
          {/* Breadcrumb */}
          <nav className="container mx-auto px-4 mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <ChevronRight className="h-4 w-4" />
              <li className="text-foreground">Credit Packages</li>
            </ol>
          </nav>

          <div className="container mx-auto px-4">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Credit Packages for Students
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Unlock your learning potential with our flexible credit packages at OGIFT Bangalore.
                Choose the plan that fits your needs and start learning today!
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center bg-secondary rounded-full p-1 gap-1">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all",
                    billingCycle === "monthly"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                    billingCycle === "annual"
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  Annual
                  <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Save 15%
                  </span>
                </button>
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={cn(
                    "relative bg-card rounded-3xl p-8 shadow-elegant transition-all duration-300 hover:shadow-hover hover:-translate-y-2",
                    pkg.popular && "ring-2 ring-primary"
                  )}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 bg-gradient-to-br",
                      pkg.color
                    )}
                  >
                    {pkg.icon}
                  </div>

                  {/* Package Name */}
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {pkg.name}
                  </h3>

                  {/* Credits */}
                  <p className="text-muted-foreground mb-4">
                    <span className="text-3xl font-bold text-foreground">{pkg.credits}</span> credits/month
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-foreground">₹{getPrice(pkg)}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                    {billingCycle === "annual" && (
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="line-through">₹{pkg.monthlyPrice}</span>
                        <span className="text-green-600 ml-2">15% off</span>
                      </p>
                    )}
                    {billingCycle === "annual" && (
                      <p className="text-sm text-primary font-medium mt-2">
                        Billed annually: ₹{getTotalPrice(pkg)}/year
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleSelectPackage(pkg)}
                    className={cn(
                      "w-full py-3.5 rounded-xl font-semibold transition-all duration-300",
                      pkg.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-secondary text-foreground hover:bg-secondary/80"
                    )}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-center text-foreground mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div className="bg-card rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-2">How do credits work?</h3>
                  <p className="text-muted-foreground">
                    Credits are used to access video content and learning materials. Each video or resource has a credit cost, and credits are deducted when you access them.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-2">Can I change my plan later?</h3>
                  <p className="text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will take effect from your next billing cycle.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-foreground mb-2">Do unused credits roll over?</h3>
                  <p className="text-muted-foreground">
                    Credits are valid for the billing period. We recommend choosing a package that matches your learning pace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Purchase Form Modal */}
        {showForm && selectedPackage && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-3xl p-8 max-w-md w-full shadow-2xl animate-fade-in">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Complete Your Purchase
              </h2>

              {/* Package Summary */}
              <div className="bg-secondary rounded-xl p-4 mb-6">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br",
                      selectedPackage.color
                    )}
                  >
                    {selectedPackage.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedPackage.name} Package</h3>
                    <p className="text-sm text-muted-foreground">{selectedPackage.credits} credits</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Student ID *
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter your Student ID"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={studentEmail}
                    onChange={(e) => setStudentEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Amount to Pay
                  </label>
                  <div className="px-4 py-3 rounded-xl bg-secondary text-foreground font-bold text-xl">
                    ₹{getTotalPrice(selectedPackage)}
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      ({billingCycle === "annual" ? "per year" : "per month"})
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSelectedPackage(null);
                  }}
                  className="flex-1 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-secondary transition-colors"
                  disabled={isProcessing}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Pay Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreditPackages;
