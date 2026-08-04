"use client";

import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { safeAdminRedirect } from "@/lib/admin/redirect";
import { isTrackfitAdminUser } from "@/lib/admin/auth";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import "../../../admin/admin.css";

const unauthorisedMessage = "This account is not authorised for TrackFit administration";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    async function checkExistingSession() {
      if (new URLSearchParams(window.location.search).get("error") === "unauthorised") setError(unauthorisedMessage);
      const supabase = getSupabaseBrowserClient();
      const { data } = await supabase.auth.refreshSession();
      if (!active || !data.user) return;
      if (isTrackfitAdminUser(data.user)) {
        window.location.replace(getDestination());
        return;
      }
      await supabase.auth.signOut();
      if (active) setError(unauthorisedMessage);
    }
    void checkExistingSession();
    return () => { active = false; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const supabase = getSupabaseBrowserClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });
    if (signInError) {
      setError("The email address or password is incorrect.");
      setBusy(false);
      return;
    }

    const { data, error: refreshError } = await supabase.auth.refreshSession();
    const user = data.user;
    const isAdmin = isTrackfitAdminUser(user);
    if (refreshError || !user || !isAdmin) {
      await supabase.auth.signOut();
      setError(unauthorisedMessage);
      setBusy(false);
      return;
    }

    window.location.assign(getDestination());
  }

  return <main className="admin-login"><form onSubmit={submit} className="admin-login-card"><Image src="/logos/trackfit-logo.svg" alt="TrackFit" width={180} height={54}/><p className="admin-kicker">Secure operations</p><h1>Admin sign in</h1><label>Email<input required type="email" name="email" autoComplete="email"/></label><label>Password<input required type="password" name="password" autoComplete="current-password"/></label>{error && <p className="admin-error" role="alert">{error}</p>}<button disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button></form></main>;
}

function getDestination() {
  return safeAdminRedirect(new URLSearchParams(window.location.search).get("next"));
}
