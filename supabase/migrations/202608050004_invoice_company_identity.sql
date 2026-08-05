alter table public.trackfit_invoice_settings
  alter column business_name set default 'Apex Curtains Ltd',
  alter column trading_name set default 'TrackFit',
  alter column bank_details set default '{"account_name":"Apex Curtains Ltd"}'::jsonb;

update public.trackfit_invoice_settings
set business_name = 'Apex Curtains Ltd',
    trading_name = 'TrackFit',
    bank_details = case
      when coalesce(bank_details ->> 'account_name', '') = ''
        then jsonb_set(coalesce(bank_details, '{}'::jsonb), '{account_name}', '"Apex Curtains Ltd"'::jsonb, true)
      else bank_details
    end,
    updated_at = now()
where id = true;
