import { NextResponse } from "next/server";
import { Resend } from "resend";
import { invoiceContext } from "@/lib/invoices/server";
import { invoicePdf } from "@/lib/invoices/pdf";
import { formatGBP } from "@/lib/invoices/money";
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const ctx = await invoiceContext();
  if (!ctx)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const { id } = await params,
    { recipient, subject, message } = await req.json();
  if (!recipient)
    return NextResponse.json(
      { error: "Customer email is missing" },
      { status: 400 },
    );
  const [{ data: inv }, { data: items }, { data: settings }] =
    await Promise.all([
      ctx.supabase.from("trackfit_invoices").select("*").eq("id", id).single(),
      ctx.supabase
        .from("trackfit_invoice_items")
        .select("*")
        .eq("invoice_id", id)
        .order("position"),
      ctx.supabase
        .from("trackfit_invoice_settings")
        .select("*")
        .eq("id", true)
        .single(),
    ]);
  if (!inv || !settings)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  const key = process.env.RESEND_API_KEY;
  if (!key){await logFailure(ctx,id,"Email failed: Resend is not configured");return NextResponse.json({error:"RESEND_API_KEY is not configured"},{status:503})}
  const pdf = Buffer.from(invoicePdf(inv, items || [], settings));
  const from = process.env.RESEND_FROM_EMAIL || settings.email;
  if (!from)
    return NextResponse.json(
      { error: "Sender email is not configured" },
      { status: 503 },
    );
  const { error } = await new Resend(key).emails.send({
    from,
    to: recipient,
    subject: subject || `TrackFit invoice ${inv.invoice_number}`,
    replyTo: settings.email || undefined,
    html: `<p>Dear ${escapeHtml(inv.customer_details.name)},</p><p>${escapeHtml(message || `Please find attached invoice ${inv.invoice_number} for ${formatGBP(inv.balance_due_pence)}, due ${inv.due_date}.`)}</p><p>${escapeHtml(settings.trading_name)}<br>${escapeHtml(settings.telephone)}<br>${escapeHtml(settings.email)}</p><p><small>TrackFit is a trading name operated by Apex Curtains Ltd.</small></p>`,
    attachments: [{ filename: `${inv.invoice_number}.pdf`, content: pdf }],
  });
  if (error){await logFailure(ctx,id,"Invoice email failed");return NextResponse.json({error:error.message},{status:400})}
  await ctx.supabase
    .from("trackfit_invoice_activity")
    .insert({
      invoice_id: id,
      actor_id: ctx.user.id,
      activity_type: "emailed",
      description: `Invoice emailed to ${recipient}`,
      metadata: { recipient, subject, send_date: new Date().toISOString() },
    });
  return NextResponse.json({ success: true });
}
function escapeHtml(value:unknown){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[c]!) }
async function logFailure(ctx:Awaited<ReturnType<typeof invoiceContext>> & {},invoiceId:string,description:string){if(!ctx)return;await ctx.supabase.from("trackfit_invoice_activity").insert({invoice_id:invoiceId,actor_id:ctx.user.id,activity_type:"email_failed",description,metadata:{failed_at:new Date().toISOString()}})}
