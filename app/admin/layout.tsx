import type { ReactNode } from "react"; import { requireTrackfitAdmin } from "@/lib/supabase/server"; import AdminShell from "@/components/admin/AdminShell"; import "./admin.css";
export default async function Layout({children}:{children:ReactNode}) { const {user}=await requireTrackfitAdmin(); return <AdminShell email={user.email}>{children}</AdminShell>; }
