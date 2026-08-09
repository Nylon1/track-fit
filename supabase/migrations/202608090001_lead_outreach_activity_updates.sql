-- Outreach attempts reserve one activity row before calling Resend. Allow the
-- same administrator to finalise that row as successful or failed.
grant update on public.trackfit_enquiry_activity to authenticated;

drop policy if exists "TrackFit admins can update their outreach activity"
  on public.trackfit_enquiry_activity;
create policy "TrackFit admins can update their outreach activity"
  on public.trackfit_enquiry_activity
  for update
  to authenticated
  using (
    public.is_trackfit_admin()
    and actor_id = auth.uid()
    and activity_type = 'customer_email'
  )
  with check (
    public.is_trackfit_admin()
    and actor_id = auth.uid()
    and activity_type = 'customer_email'
  );
