import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/**
 * The columns this notification reads from a `leads` row. The unified
 * contact form (2026-08-26) collects name, email, role, and note (stored as
 * `message`) plus hidden source/page metadata; the legacy qualification
 * columns still exist on the table but are no longer collected or rendered.
 */
interface LeadRecord {
  id: number;
  created_at: string;
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  message: string | null;
  source: string | null;
  page: string | null;
}

interface WebhookPayload {
  type: "INSERT";
  table: string;
  schema: string;
  record: LeadRecord;
  old_record: null;
}

Deno.serve(async (req: Request) => {
  const requestId = crypto.randomUUID();
  console.log("send-contact-notification: start", { requestId });

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      console.error("RESEND_API_KEY missing", { requestId });
      return new Response(
        JSON.stringify({ ok: false, error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const payload: WebhookPayload = await req.json();
    const lead = payload.record;

    console.log("Lead received:", {
      requestId,
      id: lead.id,
      name: `${lead.first_name} ${lead.last_name}`,
      role: lead.role,
    });

    const name = `${lead.first_name} ${lead.last_name}`.trim();

    const row = (label: string, value: string | null) =>
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0; font-weight: bold;">${label}</td>
        <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${value || "—"}</td>
      </tr>`;

    const emailHtml = `
      <h2>New JiTpro Contact Form Lead</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        ${row("Name", name)}
        ${row("Email", lead.email)}
        ${row("Role", lead.role)}
        ${row("Note", lead.message)}
        ${row("Source", `${lead.source || "—"} / ${lead.page || "—"}`)}
        ${row("Submitted", lead.created_at)}
      </table>
    `;

    console.log("Sending email via Resend", { requestId });

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "JITpro Leads <jeff@jit-pro.com>",
        to: ["info@jit-pro.com"],
        subject: "New JiTpro Contact Form Lead",
        html: emailHtml,
      }),
    });

    const resendBody = await emailResponse.text();
    console.log("Resend response:", {
      requestId,
      status: emailResponse.status,
      body: resendBody,
    });

    if (!emailResponse.ok) {
      console.error("Resend API error", { requestId, status: emailResponse.status, body: resendBody });
      return new Response(
        JSON.stringify({ ok: false, error: "Email send failed", details: resendBody }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, request_id: requestId }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("send-contact-notification: exception", error, { requestId });
    return new Response(
      JSON.stringify({ ok: false, error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
