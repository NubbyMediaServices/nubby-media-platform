import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/auth/AuthContext";

type RegisterForm = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterForm>();
  const { register: registerAccount } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function onSubmit(values: RegisterForm) {
    try {
      setError("");
      await registerAccount(values);
      navigate("/");
    } catch {
      setError("Registration failed. Confirm registration is enabled in the backend.");
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-br from-slate-50 via-white to-brand-50 px-4">
      <div className="w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">SCMSP</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">Provision a new console user for the current environment.</p>

        <form className="mt-8 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">First name</label>
            <Input {...register("firstName", { required: true })} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Last name</label>
            <Input {...register("lastName", { required: true })} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
            <Input {...register("username", { required: true })} />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <Input {...register("email", { required: true })} type="email" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <Input {...register("password", { required: true })} type="password" />
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
