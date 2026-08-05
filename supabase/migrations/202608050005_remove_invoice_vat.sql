alter table if exists public.trackfit_invoice_settings
  drop column if exists vat_number,
  drop column if exists vat_enabled;

-- Preserve issued accounting records. Only drafts may be normalised safely.
update public.trackfit_invoice_items i
set vat_rate_bps = 0
from public.trackfit_invoices invoice
where i.invoice_id = invoice.id and invoice.status = 'draft' and i.vat_rate_bps <> 0;

update public.trackfit_invoices
set vat_pence = 0,
    total_pence = subtotal_pence - discount_pence,
    balance_due_pence = subtotal_pence - discount_pence - amount_paid_pence,
    updated_at = now()
where status = 'draft' and vat_pence <> 0;
