import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type AttemptLog = {
  name: string;
  status: number;
  contentType: string;
  bytes: number;
  preview: string;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const endpoint = "https://www.onatiglobal.com/QueryStudentProgress.php";

  try {
    const body = await req.json().catch(() => ({} as any));

    const studentId = String(
      body?.student_id ?? body?.studentId ?? body?.studentid ?? "",
    ).trim();

    if (!studentId) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing student_id" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const attempts: AttemptLog[] = [];

    const readAttempt = async (name: string, res: Response) => {
      const text = await res.text();
      const contentType = res.headers.get("content-type") || "";
      const preview = text.slice(0, 400);
      attempts.push({
        name,
        status: res.status,
        contentType,
        bytes: text.length,
        preview,
      });
      return { res, text, contentType };
    };

    const tryJson = async () => {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        body: JSON.stringify({ student_id: studentId, studentid: studentId }),
      });
      return readAttempt("post_json", res);
    };

    const tryForm = async () => {
      const form = new URLSearchParams();
      form.append("student_id", studentId);
      form.append("studentid", studentId);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          Accept: "application/json, text/plain, */*",
        },
        body: form.toString(),
      });
      return readAttempt("post_form", res);
    };

    const tryGet = async () => {
      const url = `${endpoint}?student_id=${encodeURIComponent(studentId)}`;
      const res = await fetch(url, {
        method: "GET",
        headers: { Accept: "application/json, text/plain, */*" },
      });
      return readAttempt("get_query", res);
    };

    // Attempt 1: JSON
    let { res, text } = await tryJson();

    // Attempt 2: form-encoded
    if (!text || text.trim().length === 0) {
      ({ res, text } = await tryForm());
    }

    // Attempt 3: GET querystring
    if (!text || text.trim().length === 0) {
      ({ res, text } = await tryGet());
    }

    if (!text || text.trim().length === 0) {
      console.error("[student-progress] Empty response from remote", {
        endpoint,
        studentId,
        attempts,
      });

      return new Response(
        JSON.stringify({
          success: false,
          message: `Remote endpoint returned an empty response (HTTP ${res.status}).`,
          endpoint,
          attempts,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // Parse JSON (or fail with debug context)
    try {
      const parsed = JSON.parse(text);
      return new Response(JSON.stringify(parsed), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error("[student-progress] Non-JSON response from remote", {
        endpoint,
        studentId,
        attempts,
      });

      return new Response(
        JSON.stringify({
          success: false,
          message: `Remote endpoint returned non-JSON (HTTP ${res.status}).`,
          endpoint,
          attempts,
        }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
  } catch (error) {
    console.error("[student-progress] Unexpected error", error);

    return new Response(
      JSON.stringify({ success: false, message: "Unexpected server error" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
