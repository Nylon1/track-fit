import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isTrackfitAdminUser } from "@/lib/admin/auth";
export async function invoiceContext() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!isTrackfitAdminUser(user)) return null;
  return { supabase, user: user! };
}
export function dbInvoice(input: any, totals: any) {
  return {
    lead_id: input.leadId || null,
    status: input.status,
    invoice_type: input.invoiceType,
    // Invoice-level discounts are temporarily disabled.
    invoice_discount_type: "none",
    invoice_discount_value: 0,
    customer_details: {
      name: input.customerName,
      company: input.companyName,
      email: input.customerEmail,
      telephone: input.customerTelephone,
    },
    billing_address: input.billingAddress,
    installation_address: input.installationAddress,
    invoice_date: input.invoiceDate,
    due_date: input.dueDate,
    purchase_order: input.purchaseOrder || null,
    customer_reference: input.customerReference || null,
    job_description: input.jobDescription || null,
    currency: "GBP",
    subtotal_pence: totals.subtotalPence,
    discount_pence: 0,
    vat_pence: totals.vatPence,
    total_pence: totals.subtotalPence + totals.vatPence,
    amount_paid_pence: totals.amountPaidPence,
    balance_due_pence:
      totals.subtotalPence + totals.vatPence - totals.amountPaidPence,
    customer_notes: input.customerNotes || null,
    internal_notes: input.internalNotes || null,
    payment_terms: input.paymentTerms || null,
    payment_details: {
      message: input.paymentMessage,
      reference: input.paymentReference,
      method: input.paymentMethod,
      deposit_required_pence: input.depositRequiredPence,
    },
  };
}
