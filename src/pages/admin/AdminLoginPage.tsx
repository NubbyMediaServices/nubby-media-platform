import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await login(usernameOrEmail, password);
      navigate("/admin/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to sign in. Check your admin credentials.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="min-h-screen bg-[#050505] px-6 py-20 text-white">
      <div className="mx-auto max-w-md">
        <p className="text-sm uppercase tracking-[0.35em] text-emerald-400">
          Nubby Media
        </p>

        <h1 className="mt-4 text-4xl font-bold">Admin Portal</h1>

        <p className="mt-4 leading-7 text-white/60">
          Sign in to manage galleries, uploads, clients, invoices, and audit
          logs.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
        >
          <label className="block">
            <span className="text-sm text-white/70">Email or Username</span>
            <input
              value={usernameOrEmail}
              onChange={(event) => setUsernameOrEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-emerald-400"
              placeholder="admin@nubbymedia.com"
              autoComplete="username"
              required
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm text-white/70">Password</span>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-white outline-none focus:border-emerald-400"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {errorMessage && (
            <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-xl bg-emerald-400 px-5 py-3 font-semibold text-black hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}