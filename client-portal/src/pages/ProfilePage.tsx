import { Card } from "@/components/ui/Card";
import { useAuth } from "@/auth/AuthContext";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">Account</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Profile</h1>
        <p className="mt-2 text-sm text-slate-500">Current authenticated user context from the backend session.</p>
      </div>

      <Card title="Current user" subtitle="Loaded from /users/me">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div><dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Username</dt><dd className="mt-1 text-sm text-slate-900">{user?.username ?? "—"}</dd></div>
          <div><dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</dt><dd className="mt-1 text-sm text-slate-900">{user?.email ?? "—"}</dd></div>
          <div><dt className="text-xs uppercase tracking-[0.2em] text-slate-400">First name</dt><dd className="mt-1 text-sm text-slate-900">{user?.firstName ?? "—"}</dd></div>
          <div><dt className="text-xs uppercase tracking-[0.2em] text-slate-400">Last name</dt><dd className="mt-1 text-sm text-slate-900">{user?.lastName ?? "—"}</dd></div>
        </dl>
      </Card>
    </div>
  );
}
