import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: { email?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }
  const raw = (body.email ?? "").trim().toLowerCase();
  if (!raw || !EMAIL_RE.test(raw) || raw.length > 254) {
    return NextResponse.json({ error: "Correo inválido" }, { status: 400 });
  }

  let already = false;
  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("waitlist")
      .insert({ email: raw, source: "landing" });
    if (error) {
      if (error.code === "23505") {
        already = true;
      } else {
        console.error("supabase insert error", error);
        return NextResponse.json(
          { error: "No pudimos guardar tu correo. Probá de nuevo." },
          { status: 500 }
        );
      }
    }
  } catch (e) {
    console.error("supabase init error", e);
    return NextResponse.json(
      { error: "Servicio no configurado todavía." },
      { status: 500 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM ?? "Stars Alike <hola@starsalike.app>";
  if (apiKey && !already) {
    try {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from,
        to: raw,
        subject: "Gracias por sumarte a Stars Alike",
        html: confirmationHtml(),
        text: confirmationText(),
      });
    } catch (e) {
      console.error("resend send error", e);
    }
  }

  return NextResponse.json({ ok: true, already });
}

function confirmationHtml() {
  return `<!doctype html>
<html><body style="margin:0;background:#050505;color:#F1ECD9;font-family:Inter,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 0;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#0A0A0A;border:1px solid #1C1C1C;border-radius:16px;padding:32px;">
        <tr><td style="color:#40E0D0;font-family:'VT323',monospace;letter-spacing:3px;font-size:13px;text-transform:uppercase;">STARS ALIKE · LISTA DE ESPERA</td></tr>
        <tr><td style="padding-top:18px;font-family:'Fraunces',Georgia,serif;font-size:28px;line-height:1.2;color:#F1ECD9;">Gracias por sumarte.</td></tr>
        <tr><td style="padding-top:14px;font-size:15px;line-height:1.6;color:rgba(241,236,217,0.75);">Te vamos a avisar el día que la app esté disponible. Sin spam, sin ruido — un solo correo.</td></tr>
        <tr><td style="padding-top:28px;font-size:13px;color:rgba(241,236,217,0.5);">Hasta pronto entre estrellas. ✦</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function confirmationText() {
  return [
    "Stars Alike — Lista de espera",
    "",
    "Gracias por sumarte.",
    "Te vamos a avisar el día que la app esté disponible.",
    "Sin spam — un solo correo.",
  ].join("\n");
}
