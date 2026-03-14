import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { studentId, action, credits: creditsToDeduct } = await req.json();

    const createStudentCredits = async (sidRaw: string) => {
      const sid = sidRaw.trim();
      const creditsUrl = "https://www.onatiglobal.com/Create_Student_Credits.php";

      console.log("Calling credits creation URL:", creditsUrl);

      const formData = new URLSearchParams();
      formData.append("student_id", sid);

      const creditsResponse = await fetch(creditsUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "text/plain, application/json",
        },
        body: formData.toString(),
      });

      const creditsText = await creditsResponse.text();
      console.log("Credits init status:", creditsResponse.status);
      console.log("Credits init raw response:", creditsText);

      return { ok: creditsResponse.ok, status: creditsResponse.status, text: creditsText };
    };

    // Handle privacy acceptance update
    if (action === "update_privacy") {
      console.log("Updating privacy acceptance for student ID:", studentId);
      
      const updateUrl = `https://www.onatiglobal.com/Student_Privacy_Update.php?studentId=${studentId.trim()}&privacy_accepted=Accepted`;
      console.log("Calling privacy update URL:", updateUrl);
      
      try {
        const updateResponse = await fetch(updateUrl, {
          method: "GET",
          headers: { Accept: "text/plain, application/json" },
        });
        
        console.log("Privacy update response status:", updateResponse.status);
        const updateText = await updateResponse.text();
        console.log("Privacy update raw response:", updateText);
        
        // After privacy is accepted, create student credits
        console.log("Creating student credits for student ID:", studentId);
        try {
          await createStudentCredits(studentId);
        } catch (creditsError) {
          console.error("Error creating student credits:", creditsError);
          // Don't fail the whole request if credits creation fails - privacy was already updated
        }
        
        return new Response(
          JSON.stringify({ success: true, message: "Privacy acceptance updated and credits created" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (updateError) {
        console.error("Error updating privacy:", updateError);
        return new Response(
          JSON.stringify({ success: false, message: "Failed to update privacy acceptance" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Handle privacy check request
    if (action === "check_privacy") {
      console.log("Checking privacy status for student ID:", studentId);
      
      const privacyUrl = `https://www.onatiglobal.com/Query_Student_Privacy.php?studentId=${studentId.trim()}`;
      console.log("Calling privacy check URL:", privacyUrl);
      
      try {
        const privacyResponse = await fetch(privacyUrl, {
          method: "GET",
          headers: { Accept: "text/plain, application/json" },
        });
        
        console.log("Privacy check response status:", privacyResponse.status);
        const privacyText = await privacyResponse.text();
        console.log("Privacy check raw response:", privacyText);
        
        // Check if response is empty/space (needs T&C acceptance)
        const cleanedPrivacy = privacyText.trim();
        const needsAcceptance = cleanedPrivacy === "" || cleanedPrivacy.length === 0;
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            needsAcceptance,
            privacyStatus: cleanedPrivacy
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (privacyError) {
        console.error("Error checking privacy:", privacyError);
        return new Response(
          JSON.stringify({ success: false, needsAcceptance: false }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Handle get credits request
    if (action === "get_credits") {
      console.log("Fetching credits for student ID:", studentId);
      
      const creditsUrl = `https://www.onatiglobal.com/Query_Student_Credits.php?studentId=${studentId.trim()}`;
      console.log("Calling credits query URL:", creditsUrl);
      
      try {
        const creditsResponse = await fetch(creditsUrl, {
          method: "GET",
          headers: { Accept: "text/plain, application/json" },
        });
        
        console.log("Credits query response status:", creditsResponse.status);
        const creditsText = await creditsResponse.text();
        console.log("Credits query raw response:", creditsText);
        
        // Parse the credits value (strip slashes and whitespace)
        const creditsValue = creditsText.trim().replace(/\//g, '');
        const credits = parseInt(creditsValue, 10);
        
        return new Response(
          JSON.stringify({ 
            success: true, 
            credits: isNaN(credits) ? 0 : credits,
            rawResponse: creditsValue
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (creditsError) {
        console.error("Error fetching credits:", creditsError);
        return new Response(
          JSON.stringify({ success: false, credits: 0 }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Handle deduct credits request (for video playback)
    if (action === "deduct_credits") {
      const credits = creditsToDeduct || 0;
      console.log(`Deducting ${credits} credits for student ID:`, studentId);
      
      const updateCreditsUrl = "https://www.onatiglobal.com/Update_Student_Credits.php";
      console.log("Calling credits update URL:", updateCreditsUrl);
      
      try {
        const formData = new URLSearchParams();
        formData.append("studentid", studentId.trim());
        formData.append("credits", String(credits));
        
        console.log("Sending form data - studentid:", studentId.trim(), "credits:", String(credits));
        
        const updateResponse = await fetch(updateCreditsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "text/plain, application/json",
          },
          body: formData.toString(),
        });
        
        console.log("Credits update response status:", updateResponse.status);
        const updateText = await updateResponse.text();
        console.log("Credits update raw response:", updateText);
        
        // Check for success response
        const success = updateText.includes('CREDITSUPDATED') || updateText.includes('CREDITSUPDATES');
        
        return new Response(
          JSON.stringify({ 
            success,
            message: success ? "Credits deducted successfully" : "Failed to deduct credits",
            rawResponse: updateText
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (updateError) {
        console.error("Error deducting credits:", updateError);
        return new Response(
          JSON.stringify({ success: false, message: "Error deducting credits" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Handle add credits request (for credit package purchases)
    if (action === "add_credits") {
      const credits = creditsToDeduct || 0; // reusing the same param for credits to add
      console.log(`Adding ${credits} credits for student ID:`, studentId);
      
      const updateCreditsUrl = "https://www.onatiglobal.com/Update_Student_Credits.php";
      console.log("Calling credits update URL for addition:", updateCreditsUrl);
      
      try {
        const formData = new URLSearchParams();
        formData.append("studentid", studentId.trim());
        formData.append("credits", String(-credits)); // Negative to add (since PHP subtracts)
        
        console.log("Sending form data - studentid:", studentId.trim(), "credits:", String(-credits));
        
        const updateResponse = await fetch(updateCreditsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "text/plain, application/json",
          },
          body: formData.toString(),
        });
        
        console.log("Credits add response status:", updateResponse.status);
        const updateText = await updateResponse.text();
        console.log("Credits add raw response:", updateText);
        
        // Check for success response
        const success = updateText.includes('CREDITSUPDATED') || updateText.includes('CREDITSUPDATES');
        
        return new Response(
          JSON.stringify({ 
            success,
            message: success ? "Credits added successfully" : "Failed to add credits",
            rawResponse: updateText
          }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (updateError) {
        console.error("Error adding credits:", updateError);
        return new Response(
          JSON.stringify({ success: false, message: "Error adding credits" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    console.log("Verifying student ID:", studentId);

    if (!studentId || typeof studentId !== "string" || studentId.trim() === "") {
      console.log("Invalid student ID provided");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Please provide a valid Student ID",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Call the external PHP script to verify student
    // Pass studentId as plain string (not URL encoded)
    const verifyUrl = `https://www.onatiglobal.com/Student.php?studentId=${studentId.trim()}`;

    console.log("Calling verification URL:", verifyUrl);

    const response = await fetch(verifyUrl, {
      method: "GET",
      headers: {
        Accept: "text/plain, application/json",
      },
    });

    console.log("External API response status:", response.status);

    if (!response.ok) {
      console.error("External API error:", response.status, response.statusText);
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unable to verify student ID. Please try again later.",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Get raw text response first since the PHP might return non-JSON
    const rawText = await response.text();
    console.log("Raw response:", rawText);

    // Try to parse as JSON first
    let data: Record<string, unknown> | null = null;

    try {
      // Try direct JSON parse
      data = JSON.parse(rawText);
    } catch {
      // If not JSON, try to extract JSON from the response
      // Look for JSON-like patterns in the response
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          data = JSON.parse(jsonMatch[0]);
        } catch {
          console.log("Could not extract JSON from response");
        }
      }

      // If still no JSON, try to parse key-value pairs or comma-separated values
      if (!data) {
        // Check if response contains student info in a simple format
        // Format: /StudentID/FirstName/LastName/Email/Phone/ or //Name/Email/Phone/
        // Remove leading slashes and trim
        const cleanedText = rawText.replace(/^\/+\s*/, "").trim();

        if (cleanedText && cleanedText.length > 0) {
          // Try slash-separated format
          if (cleanedText.includes("/")) {
            const parts = cleanedText
              .split("/")
              .map((p) => p.trim())
              .filter((p) => p.length > 0);
            console.log("Parsed parts:", parts);

            if (parts.length >= 2) {
              // Check if first part is the student ID (numeric)
              const firstPartIsId = /^\d+$/.test(parts[0]);

              if (firstPartIsId && parts.length >= 3) {
                // Format: StudentID/FirstName/LastName/Email/Phone/CourseType (exact order as per user specification)
                // parts[0] = Student ID
                // parts[1] = First Name
                // parts[2] = Last Name
                // parts[3] = Email ID
                // parts[4] = Phone Number
                // parts[5] = Course Type
                const firstName = parts[1] || "";
                const lastName = parts[2] || "";
                const fullName = `${firstName} ${lastName}`.trim();
                const email = parts[3] || "";
                const phone = parts[4] || "";
                const courseType = parts[5] || "";

                data = {
                  name: fullName || firstName,
                  email: email,
                  phone: phone,
                  courseType: courseType,
                };
                console.log("Parsed from ID/Name format:", data, "courseType:", courseType);
              } else {
                // Format: Name/Email/Phone (original format)
                data = {
                  name: parts[0],
                  email: parts[1] || "",
                  phone: parts[2] || "",
                };
                console.log("Parsed from slash-separated:", data);
              }
            } else if (parts.length === 1 && parts[0]) {
              data = {
                name: parts[0],
                email: "",
                phone: "",
              };
              console.log("Parsed single name:", data);
            }
          } else {
            // Try comma-separated format: name,email,phone
            const parts = cleanedText.split(",").map((p) => p.trim());

            if (parts.length >= 1 && parts[0]) {
              data = {
                name: parts[0],
                email: parts[1] || "",
                phone: parts[2] || "",
              };
              console.log("Parsed from comma-separated:", data);
            }
          }
        }
      }
    }

    console.log("Parsed data:", JSON.stringify(data));

    // Check for "NOTFOUND" response from PHP script
    const notFoundIndicators = ["notfound", "not found", "not_found", "invalid", "error"];
    const nameValue = String(data?.name || data?.Name || data?.student_name || data?.studentName || "")
      .toLowerCase()
      .trim();

    if (notFoundIndicators.includes(nameValue)) {
      console.log("Student not found - received NOTFOUND indicator");
      return new Response(
        JSON.stringify({
          success: false,
          message: "Student ID not found. Please check and try again.",
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Helper function to check payment status
    const checkPaymentStatus = async (studentIdToCheck: string): Promise<{ paid: boolean; error?: string }> => {
      try {
        const paymentUrl = `https://www.onatiglobal.com/Student_Paid.php?studentId=${studentIdToCheck.trim()}`;
        console.log("Checking payment status at:", paymentUrl);

        const paymentResponse = await fetch(paymentUrl, {
          method: "GET",
          headers: {
            Accept: "text/plain, application/json",
          },
        });

        console.log("Payment API response status:", paymentResponse.status);

        if (!paymentResponse.ok) {
          console.error("Payment API error:", paymentResponse.status);
          return { paid: false, error: "Unable to verify payment status" };
        }

        const paymentRawText = await paymentResponse.text();
        console.log("Payment raw response:", paymentRawText);

        // Clean the response - remove slashes and whitespace
        const cleanedPayment = paymentRawText.replace(/\//g, "").trim();
        const paymentLower = cleanedPayment.toLowerCase();

        console.log("Cleaned payment response:", cleanedPayment);

        // Check for explicit "not found" indicators (exact match only for short responses)
        const notPaidExactIndicators = [
          "notfound",
          "not found",
          "not_found",
          "no",
          "false",
          "unpaid",
          "not paid",
          "error",
          "invalid",
          "",
        ];

        // If response is empty after cleaning, consider it not paid
        if (cleanedPayment.length === 0) {
          console.log("Empty payment response - not paid");
          return { paid: false };
        }

        // Check if the cleaned response exactly matches a "not paid" indicator
        if (notPaidExactIndicators.includes(paymentLower)) {
          console.log("Payment not found for student (exact match)");
          return { paid: false };
        }

        // Check if response contains the student ID - this means they're in the payment table (paid)
        if (cleanedPayment.includes(studentIdToCheck.trim())) {
          console.log("Payment verified - student ID found in response");
          return { paid: true };
        }

        // If we get any other non-empty response, consider it paid
        if (cleanedPayment.length > 0) {
          console.log("Payment verified for student");
          return { paid: true };
        }

        return { paid: false };
      } catch (paymentError) {
        console.error("Error checking payment:", paymentError);
        return { paid: false, error: "Error checking payment status" };
      }
    };

    // Helper function to check privacy status
    const checkPrivacyStatus = async (studentIdToCheck: string): Promise<{ needsAcceptance: boolean }> => {
      try {
        const privacyUrl = `https://www.onatiglobal.com/Query_Student_Privacy.php?studentId=${studentIdToCheck.trim()}`;
        console.log("Checking privacy status at:", privacyUrl);

        const privacyResponse = await fetch(privacyUrl, {
          method: "GET",
          headers: { Accept: "text/plain, application/json" },
        });

        console.log("Privacy check response status:", privacyResponse.status);
        const privacyRawText = await privacyResponse.text();
        console.log("Privacy raw response:", JSON.stringify(privacyRawText));

        // Check if privacy_accepted is empty/space
        // Remove slashes and check if result is empty
        const cleanedPrivacy = privacyRawText.replace(/\//g, '').trim();
        console.log("Cleaned privacy response:", JSON.stringify(cleanedPrivacy));
        
        // Needs acceptance if the response is empty or just spaces
        const needsAcceptance = cleanedPrivacy === "" || cleanedPrivacy.length === 0;
        
        console.log("needsAcceptance:", needsAcceptance);
        
        return { needsAcceptance };
      } catch (privacyError) {
        console.error("Error checking privacy:", privacyError);
        return { needsAcceptance: false };
      }
    };

    // Check if we have valid student data
    if (data && (data.name || data.Name || data.student_name || data.studentName)) {
      // Student found in admissions - now check payment
      const paymentCheck = await checkPaymentStatus(studentId);

      if (!paymentCheck.paid) {
        console.log("Student enrolled but not paid:", studentId);
        return new Response(
          JSON.stringify({
            success: false,
            message: "You have enrolled but not paid. Please make a payment using the Make-Payment button on menu.",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Payment verified - now check course type
      const courseType = String(data.courseType || data.course_type || "").trim();
      console.log("Student course type:", courseType);

      if (courseType.toLowerCase() !== "online") {
        console.log("Student not enrolled in online course:", studentId, "courseType:", courseType);
        return new Response(
          JSON.stringify({
            success: false,
            message: "You have enrolled and paid but not opted for online courses. Please contact support for assistance.",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Course type verified - now check privacy status
      const privacyCheck = await checkPrivacyStatus(studentId);

      // If privacy was already accepted, initialize credits here (the UI won't call update_privacy)
      if (!privacyCheck.needsAcceptance) {
        console.log("Privacy already accepted; ensuring student credits exist for:", studentId);
        try {
          await createStudentCredits(studentId);
        } catch (creditsError) {
          console.error("Error creating student credits during verification:", creditsError);
        }
      }

      const studentData = {
        success: true,
        name: String(data.name || data.Name || data.student_name || data.studentName || "Student"),
        email: String(data.email || data.Email || data.student_email || data.studentEmail || ""),
        phone: String(data.phone || data.Phone || data.mobile || data.Mobile || data.student_phone || ""),
        needsPrivacyAcceptance: privacyCheck.needsAcceptance,
      };

      console.log("Student verified and payment confirmed:", studentData.name, "needs privacy:", privacyCheck.needsAcceptance);

      return new Response(JSON.stringify(studentData), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else if (rawText && rawText.trim().length > 0) {
      // If we got a non-empty response, check if it's a "not found" indicator
      const rawLower = rawText.toLowerCase().trim();
      if (
        rawLower === "notfound" ||
        rawLower.includes("not found") ||
        rawLower.includes("not_found") ||
        rawLower.includes("error") ||
        rawLower.includes("invalid")
      ) {
        console.log("Student not found - raw response indicates not found");
        return new Response(
          JSON.stringify({
            success: false,
            message: "Student ID not found. Please check and try again.",
          }),
          {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Treat valid response as the student name
      let cleanedName = rawText.replace(/^\/\/\s*/, "").trim();

      // Extract name before first "/" if present
      if (cleanedName.includes("/")) {
        cleanedName = cleanedName.split("/")[0].trim();
      } else if (cleanedName.includes(",")) {
        cleanedName = cleanedName.split(",")[0].trim();
      }

      if (
        cleanedName &&
        cleanedName.length > 0 &&
        cleanedName.length < 100 &&
        cleanedName.toLowerCase() !== "notfound"
      ) {
        // Check payment for this student too
        const paymentCheck = await checkPaymentStatus(studentId);

        if (!paymentCheck.paid) {
          console.log("Student enrolled but not paid (raw response):", studentId);
          return new Response(
            JSON.stringify({
              success: false,
              message: "You have enrolled but not paid. Please make a payment using the Make-Payment button on menu.",
            }),
            {
              status: 200,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        // Payment verified - now check privacy status
        const privacyCheck = await checkPrivacyStatus(studentId);

        const studentData = {
          success: true,
          name: cleanedName,
          email: "",
          phone: "",
          needsPrivacyAcceptance: privacyCheck.needsAcceptance,
        };

        console.log("Using raw response as student name, payment confirmed:", studentData.name, "needs privacy:", privacyCheck.needsAcceptance);

        return new Response(JSON.stringify(studentData), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    console.log("Student not found or invalid response");
    return new Response(
      JSON.stringify({
        success: false,
        message: "Student ID not found. Please check and try again.",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error in verify-student function:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while verifying your Student ID.",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
