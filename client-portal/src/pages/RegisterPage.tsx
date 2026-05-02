import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/auth/AuthContext";

export function RegisterPage() {
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log("REGISTER BUTTON CLICKED", form);

    try {
  setError("");
  await registerAccount(form);
  navigate("/login"); // ✅ FIX
} catch (err) {
  console.error("REGISTER FAILED", err);
  setError("Registration failed. Check backend response or logs.");
}
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-50 via-white to-brand-50 px-4">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">SCMSP</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">Provision a new console user for the current environment.</p>

        <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
            <Input value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
            <Input value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
            <Input value={form.username} onChange={(e) => updateField("username", e.target.value)} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <Input type="password" value={form.password} onChange={(e) => updateField("password", e.target.value)} />
          </div>

          {error ? <p className="sm:col-span-2 text-sm text-rose-600">{error}</p> : null}

          <div className="sm:col-span-2">
            <Button type="submit" className="w-full">Create account</Button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have access? <Link className="font-medium text-brand-700" to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
