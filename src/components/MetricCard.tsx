import { memo, type ReactNode } from 'react';
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  icon: ReactNode;
}

function formatTrend(trend: number): string {
  if (!Number.isFinite(trend)) return '0%';
  const clamped = Math.max(-999.9, Math.min(999.9, trend));
  return `${Math.abs(clamped).toFixed(1)}%`;
}

export const MetricCard = memo(function MetricCard({ title, value, trend, icon }: MetricCardProps) {
  const safeTrend = Number.isFinite(trend) ? trend : 0;
  const isPositive = safeTrend > 0;
  const isFlat = safeTrend === 0;

  const trendColor = isFlat ? 'text-gray-500' : isPositive ? 'text-green-600' : 'text-red-600';
  const TrendIcon = isFlat ? MinusIcon : isPositive ? ArrowUpIcon : ArrowDownIcon;

  return (
    <article className="min-w-0 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5 transition-shadow hover:shadow-md sm:p-6">
      <div className="mb-3 flex min-w-0 items-center justify-between gap-2 sm:mb-4">
        <span className="min-w-0 truncate text-xs font-medium text-gray-500 sm:text-sm">{title}</span>
        <div className="shrink-0 text-gray-500" aria-hidden="true">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="min-w-0 truncate text-xl font-bold tabular-nums text-gray-900 sm:text-2xl">
          {value}
        </span>
        <div className={`flex shrink-0 items-center ${trendColor}`} title={`Trend: ${formatTrend(safeTrend)}`}>
          <TrendIcon size={16} strokeWidth={2.5} aria-hidden="true" />
          <span className="ml-1 text-xs font-semibold tabular-nums sm:text-sm">
            {formatTrend(safeTrend)}
          </span>
          <span className="sr-only">{isFlat ? 'no change' : isPositive ? 'up' : 'down'}</span>
        </div>
      </div>
    </article>
  );
});
