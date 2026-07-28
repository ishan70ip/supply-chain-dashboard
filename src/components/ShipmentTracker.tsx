import { memo } from 'react';
import type { ShipmentStatus } from '../types';
import { Truck, CheckCircle2, AlertCircle } from 'lucide-react';

interface ShipmentTrackerProps {
  shipments: ShipmentStatus[];
}

const statusMeta: Record<ShipmentStatus['status'], { label: string; badge: string }> = {
  'in-transit': { label: 'In transit', badge: 'bg-blue-100 text-blue-800' },
  delivered: { label: 'Delivered', badge: 'bg-green-100 text-green-800' },
  delayed: { label: 'Delayed', badge: 'bg-red-100 text-red-800' },
};

function getStatusIcon(status: ShipmentStatus['status']) {
  switch (status) {
    case 'delivered':
      return <CheckCircle2 size={20} className="text-green-500" aria-hidden="true" />;
    case 'delayed':
      return <AlertCircle size={20} className="text-red-500" aria-hidden="true" />;
    default:
      return <Truck size={20} className="text-blue-500" aria-hidden="true" />;
  }
}

function formatDate(value: string): string {
  if (!value) return '—';
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export const ShipmentTracker = memo(function ShipmentTracker({ shipments }: ShipmentTrackerProps) {
  if (!shipments || shipments.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-950/5">
        <Truck size={28} className="mx-auto text-gray-300" aria-hidden="true" />
        <p className="mt-2 text-sm font-medium text-gray-900">No active shipments</p>
        <p className="mt-1 text-sm text-gray-500">New shipments will show up here.</p>
      </div>
    );
  }

  return (
    <section aria-label="Active shipments" className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-950/5 sm:p-6">
      <h3 className="mb-4 text-base font-semibold text-gray-900 sm:text-lg">Active Shipments</h3>
      <ul className="space-y-3 sm:space-y-4">
        {shipments.map((shipment) => {
          const meta = statusMeta[shipment.status] ?? statusMeta['in-transit'];
          return (
            <li
              key={shipment.id}
              className="flex gap-3 rounded-lg border border-gray-200 p-3 transition-colors hover:border-gray-300 hover:bg-gray-50/50 sm:p-4"
            >
              <div className="mt-0.5 shrink-0">{getStatusIcon(shipment.status)}</div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                  <p className="min-w-0 break-words text-sm font-medium leading-snug text-gray-900">
                    {shipment.origin} <span aria-hidden="true">→</span> {shipment.destination}
                  </p>
                  <span
                    className={`inline-flex w-fit shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-semibold ${meta.badge}`}
                  >
                    {meta.label}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">ETA: {formatDate(shipment.estimatedArrival)}</p>
                {Number(shipment.delay) > 0 && (
                  <p className="mt-1 text-xs font-medium text-red-600 sm:text-sm">
                    Delayed by {shipment.delay} {shipment.delay === 1 ? 'day' : 'days'}
                    {shipment.actualArrival ? ` · Arrived ${formatDate(shipment.actualArrival)}` : ''}
                  </p>
                )}
                {shipment.status === 'delivered' && shipment.actualArrival && (
                  <p className="mt-1 text-xs text-green-700 sm:text-sm">
                    Arrived {formatDate(shipment.actualArrival)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
});
