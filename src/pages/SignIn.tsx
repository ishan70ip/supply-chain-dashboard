import { useState, type FormEvent } from 'react';
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  User,
  AlertCircle,
  ClipboardCopy,
  CheckCircle2,
} from 'lucide-react';
import { signIn, DEMO_USERNAME } from '../auth';

interface SignInProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function SignIn({ onBack, onSuccess }: SignInProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [working, setWorking] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (working) return;
    setError(null);
    setWorking(true);
    // Small delay so the loading state is perceptible and the UI stays smooth.
    window.setTimeout(() => {
      const result = signIn(username, password);
      setWorking(false);
      if (result.ok) {
        onSuccess();
      } else {
        setError(result.error ?? 'Sign in failed.');
      }
    }, 450);
  };

  const autofill = () => {
    setUsername(DEMO_USERNAME);
    setPassword('12345');
    setError(null);
  };

  const copyCreds = async () => {
    try {
      await navigator.clipboard.writeText(`${DEMO_USERNAME} / 12345`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex min-h-dvh bg-ink-950 font-sans text-white">
      {/* Brand panel — hidden on mobile */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden p-10 lg:flex xl:p-14">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(60% 50% at 20% 10%, rgba(201,161,90,0.22) 0%, transparent 60%), radial-gradient(50% 40% at 85% 85%, rgba(64,110,255,0.18) 0%, transparent 60%), linear-gradient(180deg, #0a1633 0%, #0d1b3f 100%)',
          }}
        />
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-champagne-400 font-display text-xl font-bold text-ink-950">
            M
          </div>
          <div>
            <p className="font-display text-lg font-semibold tracking-tight">Meridian</p>
            <p className="text-[11px] uppercase tracking-widest2 text-white/50">Supply Chain Atelier</p>
          </div>
        </div>

        <div className="relative max-w-md">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles size={13} className="text-champagne-300" aria-hidden="true" />
            Trusted by operations teams worldwide
          </p>
          <blockquote className="font-display text-3xl font-medium leading-tight tracking-tight xl:text-4xl">
            “Meridian turned our scattered suppliers into a single, calm command center.”
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne-400/20 font-display text-sm font-semibold text-champagne-200 ring-1 ring-champagne-400/40">
              AR
            </div>
            <div>
              <p className="text-sm font-semibold">Amara Reyes</p>
              <p className="text-xs text-white/55">VP Operations, Northwind</p>
            </div>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            {[
              ['92.4%', 'Fulfillment'],
              ['4', 'Suppliers live'],
              ['24/7', 'Tracking'],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="sr-only">{l}</dt>
                <dd className="font-display text-2xl font-semibold text-champagne-200">{v}</dd>
                <dd className="text-xs text-white/50">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="relative text-xs text-white/40">© 2026 Meridian Atelier · Crafted for operators</p>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-1 items-center justify-center bg-gray-50 px-4 py-10 text-gray-900 sm:px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <button
            type="button"
            onClick={onBack}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft size={15} aria-hidden="true" /> Back to home
          </button>

          <div className="rounded-2xl bg-white p-6 shadow-xl shadow-gray-950/5 ring-1 ring-gray-950/5 sm:p-8">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-950 font-display text-xl font-bold text-champagne-300">
                M
              </div>
              <div>
                <p className="font-display text-lg font-semibold">Meridian</p>
                <p className="text-[11px] uppercase tracking-widest2 text-gray-400">Supply Chain Atelier</p>
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-widest2 text-champagne-600">Welcome back</p>
            <h1 className="font-display mt-2 text-3xl font-semibold tracking-tight text-gray-900">
              Sign in to Meridian
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Enter your credentials to open the command center.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div>
                <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Username
                </label>
                <div className="relative">
                  <User size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. ishan123"
                    className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900/15"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="•••••"
                    className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-11 text-sm text-gray-900 placeholder:text-gray-400 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900/15"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 px-3.5 py-3 text-sm text-red-700 ring-1 ring-red-200">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={working}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-ink-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-ink-950/20 transition-all hover:bg-ink-900 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {working ? (
                  <>
                    <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                    Verifying…
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} aria-hidden="true" />
                    Sign in securely
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 rounded-xl border border-dashed border-champagne-500/50 bg-champagne-100/50 p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-widest2 text-champagne-600">
                  Demo access
                </p>
                <button
                  type="button"
                  onClick={copyCreds}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-white hover:text-gray-800"
                >
                  {copied ? <CheckCircle2 size={13} className="text-green-600" /> : <ClipboardCopy size={13} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <p className="mt-1.5 font-mono text-sm text-gray-800">
                {DEMO_USERNAME} <span className="text-gray-400">/</span> 12345
              </p>
              <button
                type="button"
                onClick={autofill}
                className="mt-2.5 w-full rounded-lg bg-white px-3 py-2 text-sm font-semibold text-ink-900 ring-1 ring-ink-950/10 transition-colors hover:bg-ink-950 hover:text-white"
              >
                Autofill demo credentials
              </button>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-gray-400">
            Static demo build · credentials are checked locally in your browser
          </p>
        </div>
      </div>
    </div>
  );
}
