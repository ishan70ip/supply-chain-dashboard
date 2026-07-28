import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  Globe2,
  Menu,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Warehouse,
  X,
  Zap,
} from 'lucide-react';
import { suppliers, shipments, performanceMetrics } from '../data';

interface LandingProps {
  onSignIn: () => void;
  onEnterApp: () => void;
  isAuthed: boolean;
}

const features = [
  {
    icon: BarChart3,
    title: 'Live KPI Command',
    text: 'Fulfillment, turnover, reliability and cost efficiency — recomputed every month, readable at a glance.',
  },
  {
    icon: Globe2,
    title: 'Global Supplier Graph',
    text: 'Every supplier, lead time and cost per unit in one calm table — from San Francisco to Singapore.',
  },
  {
    icon: Warehouse,
    title: 'Inventory Instinct',
    text: 'Stock levels, reorder points and capacity bars flag what needs attention before it hurts.',
  },
  {
    icon: Truck,
    title: 'Shipment Serenity',
    text: 'In-transit, delayed or delivered — ETAs, delays and arrivals with zero noise.',
  },
  {
    icon: Bell,
    title: 'Quiet Alerts',
    text: 'Low-stock and delay badges surface only what matters. No alarm fatigue.',
  },
  {
    icon: ShieldCheck,
    title: 'Reliable by Design',
    text: 'Error boundaries, empty states and deterministic data — it simply does not crash.',
  },
];

const steps = [
  { n: '01', title: 'Connect your network', text: 'Suppliers, warehouses and lanes load into one model in minutes.' },
  { n: '02', title: 'Watch it breathe', text: 'KPIs, stock bars and shipment cards update into a living picture.' },
  { n: '03', title: 'Act before it breaks', text: 'Reorder flags and delay badges tell you exactly where to move.' },
];

export function Landing({ onSignIn, onEnterApp, isAuthed }: LandingProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const latest = performanceMetrics[performanceMetrics.length - 1];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-dvh bg-ink-950 font-sans text-white antialiased">
      {/* ── Nav ─────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5" aria-label="Meridian home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-champagne-400 font-display text-lg font-bold text-ink-950">
              M
            </span>
            <span className="text-left leading-none">
              <span className="font-display block text-[17px] font-semibold tracking-tight">Meridian</span>
              <span className="block text-[10px] uppercase tracking-widest2 text-white/45">Supply Atelier</span>
            </span>
          </button>

          <div className="hidden items-center gap-7 text-sm text-white/70 md:flex">
            {[
              ['Platform', 'platform'],
              ['Network', 'network'],
              ['Method', 'method'],
              ['Praise', 'praise'],
            ].map(([label, id]) => (
              <button key={id} type="button" onClick={() => scrollTo(id)} className="transition-colors hover:text-white">
                {label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-2.5 md:flex">
            {isAuthed ? (
              <button
                type="button"
                onClick={onEnterApp}
                className="inline-flex items-center gap-1.5 rounded-full bg-champagne-400 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:bg-champagne-300"
              >
                Open dashboard <ArrowRight size={15} aria-hidden="true" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="rounded-full px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="inline-flex items-center gap-1.5 rounded-full bg-champagne-400 px-5 py-2.5 text-sm font-semibold text-ink-950 transition-all hover:bg-champagne-300"
                >
                  Enter atelier <ArrowRight size={15} aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 md:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 bg-ink-950/95 px-4 pb-5 pt-3 backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-1 text-[15px]">
              {[
                ['Platform', 'platform'],
                ['Network', 'network'],
                ['Method', 'method'],
                ['Praise', 'praise'],
              ].map(([label, id]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="rounded-lg px-3 py-2.5 text-left text-white/75 hover:bg-white/5 hover:text-white"
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={isAuthed ? onEnterApp : onSignIn}
                className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-champagne-400 px-5 py-3 text-sm font-semibold text-ink-950"
              >
                {isAuthed ? 'Open dashboard' : 'Enter atelier'} <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero ────────────────────────────────────────── */}
      <header className="relative overflow-hidden pb-14 pt-28 sm:pt-36">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(55% 40% at 50% 0%, rgba(201,161,90,0.16) 0%, transparent 65%), radial-gradient(40% 35% at 90% 30%, rgba(64,110,255,0.14) 0%, transparent 60%), radial-gradient(35% 30% at 8% 40%, rgba(201,161,90,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mx-auto inline-flex w-fit items-center gap-2 rounded-full border border-champagne-400/30 bg-champagne-400/10 px-4 py-1.5 text-xs font-medium text-champagne-200">
              <Sparkles size={13} aria-hidden="true" />
              The premium supply chain command center
            </p>
            <h1 className="font-display mt-6 text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Operate your supply chain{' '}
              <em className="bg-gradient-to-r from-champagne-200 via-champagne-400 to-champagne-200 bg-clip-text italic text-transparent">
                like a masterpiece
              </em>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Suppliers, inventory and shipments — composed into one calm, beautiful
              dashboard that works flawlessly on desktop and mobile.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={isAuthed ? onEnterApp : onSignIn}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-champagne-400 px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-xl shadow-champagne-500/20 transition-all hover:bg-champagne-300 active:scale-[0.99] sm:w-auto"
              >
                {isAuthed ? 'Open dashboard' : 'Sign in to begin'} <ArrowRight size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollTo('platform')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
              >
                Explore the craft
              </button>
            </div>
            <p className="mt-4 text-xs text-white/40">Demo access · username <span className="font-mono text-champagne-300">ishan123</span> · password <span className="font-mono text-champagne-300">12345</span></p>
          </div>

          {/* Dashboard preview — pure CSS mock, responsive */}
          <div className="relative mx-auto mt-12 max-w-5xl sm:mt-16" aria-hidden="true">
            <div className="absolute -inset-x-8 -top-8 bottom-0 rounded-[2rem] bg-gradient-to-b from-champagne-400/15 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1c42]/95 shadow-2xl shadow-black/50">
              <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-3 hidden rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-white/40 sm:block">
                  meridian.app/dashboard
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2.5 p-3 sm:gap-3 sm:p-5 lg:grid-cols-4">
                {[
                  [`${(latest.orderFulfillmentRate * 100).toFixed(1)}%`, 'Fulfillment', '+2.1', true],
                  [latest.inventoryTurnover.toFixed(2), 'Turnover', '+1.4', true],
                  [`${(latest.supplierReliability * 100).toFixed(1)}%`, 'Reliability', '+0.8', true],
                  [`${(latest.costEfficiency * 100).toFixed(1)}%`, 'Efficiency', '+1.1', true],
                ].map(([v, l, t, up]) => (
                  <div key={l as string} className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10 sm:p-4">
                    <p className="truncate text-[11px] text-white/45">{l}</p>
                    <p className="font-display mt-1 text-lg font-semibold tabular-nums sm:text-2xl">{v}</p>
                    <p className={`mt-1 text-[11px] font-semibold ${up ? 'text-emerald-400' : 'text-red-400'}`}>{t}%</p>
                  </div>
                ))}
              </div>
              <div className="hidden grid-cols-3 gap-3 px-5 pb-5 sm:grid">
                <div className="col-span-2 rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                  {suppliers.slice(0, 3).map((s) => (
                    <div key={s.id} className="flex items-center justify-between border-b border-white/5 py-2.5 text-xs last:border-0">
                      <span className="truncate text-white/80">{s.name}</span>
                      <span className="ml-2 shrink-0 rounded-full bg-emerald-400/10 px-2 py-0.5 font-semibold tabular-nums text-emerald-300">
                        {(s.reliability * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/10">
                  {shipments.map((s) => (
                    <div key={s.id} className="flex items-center gap-2 border-b border-white/5 py-2.5 text-xs last:border-0">
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.status === 'delivered' ? 'bg-emerald-400' : s.status === 'delayed' ? 'bg-red-400' : 'bg-sky-400'}`} />
                      <span className="truncate text-white/70">{s.origin} → {s.destination}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Trusted strip ───────────────────────────────── */}
      <section className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-6 sm:px-6">
          <span className="text-[11px] uppercase tracking-widest2 text-white/35">Powering lanes for</span>
          {['Northwind', 'EuroSupply', 'Pacific & Co.', 'TechComponents', 'Global Parts'].map((b) => (
            <span key={b} className="font-display text-sm italic text-white/50 sm:text-base">{b}</span>
          ))}
        </div>
      </section>

      {/* ── Stats band ──────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
          {[
            [`${(latest.orderFulfillmentRate * 100).toFixed(1)}%`, 'Order fulfillment', 'Twelve-month high'],
            [latest.inventoryTurnover.toFixed(2) + '×', 'Inventory turnover', 'Faster every quarter'],
            [`${(latest.supplierReliability * 100).toFixed(1)}%`, 'Supplier reliability', `${suppliers.length} partners live`],
            [`${(latest.costEfficiency * 100).toFixed(1)}%`, 'Cost efficiency', 'Lean, not mean'],
          ].map(([v, l, s]) => (
            <div key={l as string} className="bg-ink-950 p-6 text-center sm:p-8">
              <p className="font-display text-3xl font-semibold tabular-nums text-champagne-200 sm:text-4xl">{v}</p>
              <p className="mt-2 text-sm font-medium text-white/80">{l}</p>
              <p className="mt-0.5 text-xs text-white/40">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section id="platform" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-champagne-400">The platform</p>
          <h2 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-5xl">
            Everything, composed beautifully
          </h2>
          <p className="mt-4 text-white/55 sm:text-lg">Six instruments, one orchestra. Each crafted for speed on any screen.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-champagne-400/40 hover:bg-white/[0.05] sm:p-7"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-champagne-400/10 text-champagne-300 ring-1 ring-champagne-400/25 transition-transform group-hover:scale-105">
                <f.icon size={20} aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Network ─────────────────────────────────────── */}
      <section id="network" className="border-y border-white/10 bg-white/[0.02] scroll-mt-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest2 text-champagne-400">The network</p>
            <h2 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              From San Francisco to Singapore, in one glance
            </h2>
            <p className="mt-4 leading-relaxed text-white/55">
              Reliability scores, lead times and unit costs sit side by side — so the
              right supplier is always obvious, on a phone or a wall display.
            </p>
            <ul className="mt-6 space-y-3">
              {['Lead-time aware ordering', 'Cost-per-unit clarity', 'Reliability you can trust'].map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-white/75">
                  <CheckCircle2 size={17} className="shrink-0 text-emerald-400" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={isAuthed ? onEnterApp : onSignIn}
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-champagne-400/40 bg-champagne-400/10 px-6 py-3 text-sm font-semibold text-champagne-200 transition-colors hover:bg-champagne-400/20"
            >
              See it live <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60">
            {suppliers.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4 last:border-0 hover:bg-white/[0.03]">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{s.name}</p>
                  <p className="truncate text-xs text-white/45">{s.location} · {s.leadTime} days</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-display text-lg font-semibold tabular-nums text-champagne-200">{(s.reliability * 100).toFixed(0)}%</p>
                  <p className="text-[11px] tabular-nums text-white/40">${s.costPerUnit}/unit</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Method ──────────────────────────────────────── */}
      <section id="method" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest2 text-champagne-400">The method</p>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-5xl">
            Calm operations in three movements
          </h2>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 sm:p-8">
              <p className="font-display text-5xl font-semibold text-champagne-400/25">{s.n}</p>
              <h3 className="font-display mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/50">
          <Zap size={15} className="text-champagne-300" aria-hidden="true" />
          Median time to first insight: under five minutes
        </div>
      </section>

      {/* ── Praise ──────────────────────────────────────── */}
      <section id="praise" className="border-t border-white/10 bg-white/[0.02] scroll-mt-20">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest2 text-champagne-400">Praise</p>
            <h2 className="font-display mt-3 text-3xl font-medium tracking-tight sm:text-4xl">Loved by operators</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {[
              ['The first dashboard our warehouse team actually opens every morning. It never lags, even on old tablets.', 'Jonas Weber', 'Logistics Lead, EuroSupply'],
              ['Delay season used to mean chaos. Now we see it coming a week early and reroute in minutes.', 'Priya Nair', 'Supply Manager, Pacific & Co.'],
              ['It looks like a luxury brand and performs like infrastructure. Our board asks for its numbers by name.', 'Amara Reyes', 'VP Operations, Northwind'],
            ].map(([q, n, r]) => (
              <figure key={n} className="flex flex-col justify-between rounded-2xl border border-white/10 bg-ink-900/50 p-6">
                <blockquote className="font-display text-[17px] italic leading-relaxed text-white/85">“{q}”</blockquote>
                <figcaption className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-semibold">{n}</p>
                  <p className="text-xs text-white/45">{r}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-champagne-400/25 bg-gradient-to-br from-ink-800 via-ink-950 to-ink-950 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{ background: 'radial-gradient(50% 60% at 50% 0%, rgba(201,161,90,0.25) 0%, transparent 70%)' }}
          />
          <div className="relative">
            <Package size={28} className="mx-auto text-champagne-300" aria-hidden="true" />
            <h2 className="font-display mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              Your supply chain, at its most elegant
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/60">
              Step inside with the demo credentials and feel the calm for yourself.
            </p>
            <p className="mx-auto mt-3 w-fit rounded-full bg-white/5 px-4 py-1.5 font-mono text-sm text-champagne-200 ring-1 ring-white/10">
              ishan123 / 12345
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={isAuthed ? onEnterApp : onSignIn}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-champagne-400 px-8 py-3.5 text-sm font-semibold text-ink-950 shadow-xl shadow-champagne-500/20 transition-all hover:bg-champagne-300 sm:w-auto"
              >
                {isAuthed ? 'Open dashboard' : 'Sign in now'} <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-champagne-400 font-display text-base font-bold text-ink-950">M</span>
            <span className="font-display text-[15px] font-semibold">Meridian</span>
            <span className="text-xs text-white/35">© 2026</span>
          </div>
          <div className="flex items-center gap-5 text-sm text-white/50">
            {[
              ['Platform', 'platform'],
              ['Network', 'network'],
              ['Method', 'method'],
            ].map(([label, id]) => (
              <button key={id} type="button" onClick={() => scrollTo(id)} className="transition-colors hover:text-white">
                {label}
              </button>
            ))}
            <button type="button" onClick={onSignIn} className="transition-colors hover:text-white">
              Sign in
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
