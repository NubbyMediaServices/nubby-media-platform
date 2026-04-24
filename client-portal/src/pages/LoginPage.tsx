import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/auth/AuthContext";

type LoginForm = {
  usernameOrEmail: string;
  password: string;
};

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(values: LoginForm) {
    try {
      setError("");
      await login(values);
      const redirect = (location.state as { from?: string } | null)?.from ?? "/";
      navigate(redirect);
    } catch {
      setError("Unable to sign in with the current credentials.");
    }
  }

  return (
    <div className="grid min-h-screen bg-bg-primary lg:grid-cols-[420px,1fr]">
      <section className="relative flex items-center justify-center overflow-hidden border-r border-white/6 bg-bg-secondary px-6 py-10">
        <div className="relative z-10 w-full max-w-sm">
          <div className="text-center">
            <img src="/nubby-media-logo.jpg" alt="Nubby Media" className="mx-auto h-28 w-28 rounded-3xl object-cover ring-1 ring-white/10" />
            <h1 className="mt-6 font-display text-5xl font-semibold text-accent">Nubby Media</h1>
            <p className="mt-3 text-sm uppercase tracking-[0.35em] text-text-muted">Client Portal</p>
            <p className="mt-8 text-lg text-text-primary">Secure. Private. Professional.</p>
            <p className="mt-2 text-base leading-7 text-text-muted">
              Your media, delivered with care and protected through a premium client experience.
            </p>
          </div>

          <div className="mt-10 rounded-[28px] border border-white/8 bg-white/[0.03] p-6 shadow-soft">
            <h2 className="font-display text-3xl font-semibold text-text-primary">Welcome Back</h2>
            <p className="mt-2 text-sm text-text-muted">Sign in to access your private media library.</p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">Email or username</label>
                <Input {...register("usernameOrEmail", { required: true })} placeholder="you@example.com" />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-text-primary">Password</label>
                <div className="relative">
                  <Input
                    {...register("password", { required: true })}
                    className="pr-12"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-soft transition hover:text-text-primary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error ? <p className="text-sm text-rose-400">{error}</p> : null}

              <Button type="submit" className="w-full py-3 text-base">Sign In</Button>
            </form>

            <p className="mt-6 text-center text-sm text-text-muted">
              Need access? <Link className="font-medium text-gold hover:text-gold-soft" to="/register">Create account</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="relative hidden overflow-hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.08),transparent_24%),linear-gradient(180deg,rgba(11,11,13,0.55),rgba(5,5,5,0.9))]" />
        <div className="absolute inset-0 bg-[url('/nubby-media-logo.jpg')] bg-cover bg-center opacity-[0.08]" />
        <div className="relative z-10 flex h-full items-end p-12">
          <div className="max-w-2xl">
            <p className="section-kicker">Premium delivery experience</p>
            <h2 className="mt-4 font-display text-5xl font-semibold leading-tight">
              Photography backed by a private delivery platform.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-text-muted">
              Events, portraits, and creative work delivered through a secure portal with upload controls,
              private access, and a polished client-facing experience.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
