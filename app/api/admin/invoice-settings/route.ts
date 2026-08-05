import { NextResponse } from "next/server";
import { invoiceContext } from "@/lib/invoices/server";
import { z } from "zod";
const schema = z
  .object({
    business_name: z.string().min(1),
    trading_name: z.literal("TrackFit"),
    business_address: z.object({
      line1: z.string(),
      line2: z.string().optional(),
      city: z.string().optional(),
      county: z.string().optional(),
      postcode: z.string().optional(),
    }),
    telephone: z.string(),
    email: z.union([z.literal(""), z.email()]),
    website: z.string(),
    company_number: z.string(),
    bank_details: z.object({
      account_name: z.string().optional(),
      sort_code: z.string().optional(),
      account_number: z.string().optional(),
    }),
    payment_instructions: z.string(),
    invoice_footer: z.string(),
    logo_path: z.string(),
  })
  .refine((x) => x.business_name === "Apex Curtains Ltd", {
    message: "Legal business name must be Apex Curtains Ltd",
    path: ["business_name"],
  });
export async function PUT(req: Request) {
  const ctx = await invoiceContext();
  if (!ctx)
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  const p = schema.safeParse(await req.json());
  if (!p.success)
    return NextResponse.json(
      { error: p.error.issues[0]?.message },
      { status: 400 },
    );
  const { error } = await ctx.supabase
    .from("trackfit_invoice_settings")
    .upsert({
      id: true,
      ...p.data,
      updated_by: ctx.user.id,
      updated_at: new Date().toISOString(),
    });
  return error
    ? NextResponse.json({ error: error.message }, { status: 400 })
    : NextResponse.json({ success: true });
}
