import { memo } from 'react';
import type { Supplier } from '../types';

interface SupplierTableProps {
  suppliers: Supplier[];
}

function reliabilityBadge(reliability: number): string {
  if (!Number.isFinite(reliability)) return 'bg-gray-100 text-gray-600';
  if (reliability >= 0.92) return 'bg-green-100 text-green-800';
  if (reliability >= 0.88) return 'bg-amber-100 text-amber-800';
  return 'bg-red-100 text-red-800';
}

function formatReliability(reliability: number): string {
  if (!Number.isFinite(reliability)) return '—';
  return `${(reliability * 100).toFixed(1)}%`;
}

export const SupplierTable = memo(function SupplierTable({ suppliers }: SupplierTableProps) {
  if (!suppliers || suppliers.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-950/5">
        <p className="text-sm font-medium text-gray-900">No suppliers found</p>
        <p className="mt-1 text-sm text-gray-500">Suppliers will appear here once added.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full divide-y divide-gray-200">
          <caption className="sr-only">Supplier performance overview</caption>
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Supplier
              </th>
              <th scope="col" className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:table-cell sm:px-6">
                Location
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Reliability
              </th>
              <th scope="col" className="hidden px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell sm:px-6">
                Lead Time
              </th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Cost/Unit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="transition-colors hover:bg-gray-50">
                <td className="max-w-[140px] px-4 py-3.5 sm:max-w-none sm:px-6 sm:py-4">
                  <div className="truncate text-sm font-medium text-gray-900" title={supplier.name}>
                    {supplier.name}
                  </div>
                  <div className="truncate text-xs text-gray-500 sm:hidden">{supplier.location}</div>
                </td>
                <td className="hidden whitespace-nowrap px-4 py-4 text-sm text-gray-500 sm:table-cell sm:px-6">
                  {supplier.location}
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 sm:px-6 sm:py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums ${reliabilityBadge(supplier.reliability)}`}
                  >
                    {formatReliability(supplier.reliability)}
                  </span>
                  <span className="mt-1 hidden text-xs text-gray-400 md:hidden">
                    {supplier.leadTime} days
                  </span>
                </td>
                <td className="hidden whitespace-nowrap px-4 py-4 text-sm tabular-nums text-gray-500 md:table-cell sm:px-6">
                  {supplier.leadTime} days
                </td>
                <td className="whitespace-nowrap px-4 py-3.5 text-right text-sm tabular-nums text-gray-700 sm:px-6 sm:py-4">
                  ${supplier.costPerUnit.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
