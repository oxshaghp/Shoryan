"use client";

import { logIn } from "@/server/auth";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
type LogInProps = {
  labels: LoginLabels;
  lang: string;
};

type LoginLabels = {
  badge: string;
  title: string;
  description: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  rememberMe: string;
  forgotPassword: string;
  submit: string;
  sideTitle: string;
  sideDescription: string;
  benefitOne: string;
  benefitTwo: string;
  benefitThree: string;
  showPassword: string;
  hidePassword: string;
};

function LogIn({ labels, lang }: LogInProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      const message = "Email and password are required";
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const result = await logIn({ email, password });

if (!result.ok) {
  toast.error(result.message);
  setLoading(false);
  return;
}

      const directToken = result.data.token;
      const nestedData = result.data.data;
      const nestedToken =
        typeof nestedData === "object" &&
        nestedData !== null &&
        "token" in nestedData
          ? (nestedData as { token?: unknown }).token
          : undefined;

      const token =
        typeof directToken === "string"
          ? directToken
          : typeof nestedToken === "string"
            ? nestedToken
            : "";

      if (token) {
        localStorage.setItem("token", token);
      }

      toast.success("Logged in successfully!");
      router.replace(`/${lang}/dashboard`);
    } catch (err) {
      toast.error("Login failed!");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f1f3f5] py-16 sm:py-20 lg:py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 inset-e-8 h-64 w-64 rounded-full bg-(--hero-soft-accent)/70 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 inset-s-8 h-72 w-72 rounded-full bg-white/75 blur-3xl"
      />

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-stretch">
        <article className="rounded-3xl border border-[#e2e6ec] bg-white p-8 shadow-[0_10px_28px_rgb(19_31_57/0.06)] sm:p-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-(--hero-soft-accent) px-4 py-2 text-sm font-semibold text-(--hero-accent)">
            <ShieldCheck className="size-4" />
            {labels.badge}
          </span>

          <h1 className="mt-5 text-5xl font-extrabold tracking-tight text-(--hero-ink)">{labels.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-(--hero-copy)">{labels.description}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--hero-ink)">{labels.emailLabel}</span>
              <div className="group flex h-13 items-center rounded-xl border border-[#dde3ea] bg-white px-4 transition focus-within:border-(--hero-accent) focus-within:ring-3 focus-within:ring-(--hero-soft-accent)">
                <Mail className="size-5 text-(--hero-copy) transition group-focus-within:text-(--hero-accent)" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={labels.emailPlaceholder}
                  className="h-full w-full bg-transparent px-3 text-base text-(--hero-ink) outline-none placeholder:text-(--hero-copy)/80"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-(--hero-ink)">{labels.passwordLabel}</span>
              <div className="group flex h-13 items-center rounded-xl border border-[#dde3ea] bg-white px-4 transition focus-within:border-(--hero-accent) focus-within:ring-3 focus-within:ring-(--hero-soft-accent)">
                <LockKeyhole className="size-5 text-(--hero-copy) transition group-focus-within:text-(--hero-accent)" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={labels.passwordPlaceholder}
                  className="h-full w-full bg-transparent px-3 text-base text-(--hero-ink) outline-none placeholder:text-(--hero-copy)/80"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? labels.hidePassword : labels.showPassword}
                  className="inline-flex size-9 items-center justify-center rounded-lg text-(--hero-copy) transition hover:bg-(--hero-soft-accent) hover:text-(--hero-accent)"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-(--hero-copy)">
                <input
                  type="checkbox"
                  className="size-4 rounded border-[#cbd4df] text-(--hero-accent) accent-(--hero-accent)"
                />
                {labels.rememberMe}
              </label>

              <button type="button" className="text-sm font-semibold text-(--hero-accent) hover:underline">
                {labels.forgotPassword}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-14 w-full items-center justify-center rounded-xl bg-(--hero-accent) px-6 text-xl font-bold text-white shadow-[0_12px_28px_-14px_var(--hero-shadow-strong)] transition hover:bg-(--hero-accent-strong)"
            >
              {loading ? "Please wait..." : labels.submit}
            </button>
          </form>
        </article>

        <aside className="rounded-3xl border border-[#e2e6ec] bg-white p-8 shadow-[0_10px_28px_rgb(19_31_57/0.06)] sm:p-10">
          <h2 className="text-4xl font-extrabold tracking-tight text-(--hero-ink)">{labels.sideTitle}</h2>
          <p className="mt-4 text-lg leading-8 text-(--hero-copy)">{labels.sideDescription}</p>

          <ul className="mt-8 space-y-4">
            <li className="rounded-2xl border border-[#e2e6ec] bg-[#f9fbfc] p-5 text-lg font-semibold text-(--hero-ink)">
              {labels.benefitOne}
            </li>
            <li className="rounded-2xl border border-[#e2e6ec] bg-[#f9fbfc] p-5 text-lg font-semibold text-(--hero-ink)">
              {labels.benefitTwo}
            </li>
            <li className="rounded-2xl border border-[#e2e6ec] bg-[#f9fbfc] p-5 text-lg font-semibold text-(--hero-ink)">
              {labels.benefitThree}
            </li>
          </ul>
        </aside>
      </div>
      <ToastContainer />
    </section>
  );
}

export default LogIn;