alter table public.trackfit_invoices
  add column if not exists invoice_discount_type text not null default 'none'
    check (invoice_discount_type in ('none','percentage','fixed')),
  add column if not exists invoice_discount_value bigint not null default 0
    check (invoice_discount_value >= 0);

comment on column public.trackfit_invoices.invoice_discount_value is
  'Fixed discounts are integer pennies; percentage discounts are basis points (1000 = 10%).';
