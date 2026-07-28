import { useCallback, useMemo, useState } from 'react';
import { MetricCard } from '../components/MetricCard';
import { SupplierTable } from '../components/SupplierTable';
import { ShipmentTracker } from '../components/ShipmentTracker';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { suppliers, inventory, shipments, performanceMetrics } from '../data';
import { currentUser } from '../auth';
import {
  BarChart3,
  TrendingUp,
  Package,
  DollarSign,
  Download,
  Loader2,
  CheckCircle2,
  Warehouse,
  LogOut,
  ArrowLeft,
} from 'lucide-react';
import { downloadReportPdf } from '../lib/report';

function safeTrend(current: number, previous: number): number {
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) return 0;
  const pct = ((current - previous) / Math.abs(previous)) * 100;
  if (!Number.isFinite(pct)) return 0;
  return Number(pct.toFixed(1));
}

function formatPercent(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return '—';
  return `${(value * 100).toFixed(digits)}%`;
}

function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '—';
  return value.toFixed(digits);
}

interface DashboardProps {
  onSignOut: () => void;
  onHome: () => void;
}

export function Dashboard({ onSignOut, onHome }: DashboardProps) {
  const [reportState, setReportState] = useState<'idle' | 'working' | 'done'>('idle');

  const { latest, previous } = useMemo(() => {
    const len = performanceMetrics.length;
    return {
      latest: performanceMetrics[len - 1],
      previous: performanceMetrics[len - 2] ?? performanceMetrics[len - 1],
    };
  }, []);

  const metrics = useMemo(() => {
    if (!latest || !previous) return [];
    return [
      {
        title: 'Order Fulfillment Rate',
        value: formatPercent(latest.orderFulfillmentRate),
        trend: safeTrend(latest.orderFulfillmentRate, previous.orderFulfillmentRate),
        icon: <BarChart3 size={20} aria-hidden="true" />,
      },
      {
        title: 'Inventory Turnover',
        value: formatNumber(latest.inventoryTurnover),
        trend: safeTrend(latest.inventoryTurnover, previous.inventoryTurnover),
        icon: <TrendingUp size={20} aria-hidden="true" />,
      },
      {
        title: 'Supplier Reliability',
        value: formatPercent(latest.supplierReliability),
        trend: safeTrend(latest.supplierReliability, previous.supplierReliability),
        icon: <Package size={20} aria-hidden="true" />,
      },
      {
        title: 'Cost Efficiency',
        value: formatPercent(latest.costEfficiency),
        trend: safeTrend(latest.costEfficiency, previous.costEfficiency),
        icon: <DollarSign size={20} aria-hidden="true" />,
      },
    ];
  }, [latest, previous]);

  const lowStockCount = useMemo(
    () => inventory.filter((i) => i.stockLevel <= i.reorderPoint).length,
    []
  );

  const handleReport = useCallback(() => {
    if (reportState === 'working') return;
    setReportState('working');
    // Build the PDF off the critical path so the UI stays responsive,
    // then trigger a real file download.
    window.setTimeout(() => {
      const ok = downloadReportPdf();
      setReportState(ok ? 'done' : 'idle');
      if (ok) window.setTimeout(() => setReportState('idle'), 4000);
    }, 500);
  }, [reportState]);

  return (
    <div className="min-h-dvh bg-gray-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>

      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
        <header className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <button
              type="button"
              onClick={onHome}
              className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-gray-500 transition-colors hover:text-gray-800"
            >
              <ArrowLeft size={13} aria-hidden="true" /> Back to site
            </button>
            <h1 className="font-display truncate text-xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              Supply Chain Dashboard
            </h1>
            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Welcome, <span className="font-semibold text-gray-700">{currentUser()}</span>
              {latest?.date
                ? ` · ${new Date(`${latest.date}T00:00:00`).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}`
                : ''}
              {lowStockCount > 0 && (
                <span className="ml-2 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                  {lowStockCount} low-stock
                </span>
              )}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleReport}
              disabled={reportState === 'working'}
              aria-live="polite"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
            >
              {reportState === 'working' ? (
                <>
                  <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                  Preparing…
                </>
              ) : reportState === 'done' ? (
                <>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  Downloaded
                </>
              ) : (
                <>
                  <Download size={16} aria-hidden="true" />
                  Download Report
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-auto"
            >
              <LogOut size={16} aria-hidden="true" />
              Sign out
            </button>
          </div>
        </header>

        <main id="main-content" className="min-w-0">
          <section aria-label="Key metrics" className="mb-6 sm:mb-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 lg:gap-6">
              <ErrorBoundary>
                {metrics.map((m) => (
                  <MetricCard key={m.title} title={m.title} value={m.value} trend={m.trend} icon={m.icon} />
                ))}
              </ErrorBoundary>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            <section aria-label="Supplier performance" className="min-w-0 lg:col-span-2">
              <h2 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">
                Supplier Performance
              </h2>
              <ErrorBoundary>
                <SupplierTable suppliers={suppliers} />
              </ErrorBoundary>

              <h2 className="mb-3 mt-6 flex items-center gap-2 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">
                <Warehouse size={18} className="text-gray-500" aria-hidden="true" />
                Inventory Snapshot
              </h2>
              <ErrorBoundary>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                  {inventory.map((item) => {
                    const pct = item.maxCapacity > 0 ? Math.min(100, (item.stockLevel / item.maxCapacity) * 100) : 0;
                    const low = item.stockLevel <= item.reorderPoint;
                    return (
                      <div
                        key={item.id}
                        className="min-w-0 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5 sm:p-5"
                      >
                        <div className="flex min-w-0 items-start justify-between gap-2">
                          <p className="min-w-0 truncate text-sm font-medium text-gray-900">{item.productName}</p>
                          {low ? (
                            <span className="shrink-0 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                              Reorder
                            </span>
                          ) : (
                            <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                              Healthy
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs tabular-nums text-gray-500">
                          {item.stockLevel.toLocaleString()} / {item.maxCapacity.toLocaleString()} units
                        </p>
                        <div
                          className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100"
                          role="progressbar"
                          aria-valuenow={Math.round(pct)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${item.productName} stock level`}
                        >
                          <div
                            className={`h-full rounded-full transition-[width] ${low ? 'bg-red-500' : 'bg-blue-600'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ErrorBoundary>
            </section>

            <aside aria-label="Shipment tracking" className="min-w-0">
              <h2 className="mb-3 text-base font-semibold text-gray-900 sm:mb-4 sm:text-lg">
                Shipment Tracking
              </h2>
              <ErrorBoundary>
                <ShipmentTracker shipments={shipments} />
              </ErrorBoundary>
            </aside>
          </div>
        </main>

        <footer className="mt-8 border-t border-gray-200 pt-4 text-center text-xs text-gray-400 sm:text-left">
          Supply Chain Dashboard · {suppliers.length} suppliers · {shipments.length} shipments tracked
        </footer>
      </div>
    </div>
  );
}
