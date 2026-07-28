import type { Supplier, Inventory, ShipmentStatus, PerformanceMetric } from './types';

export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechComponents Inc',
    reliability: 0.95,
    leadTime: 5,
    costPerUnit: 120,
    location: 'San Francisco, CA',
  },
  {
    id: '2',
    name: 'Global Parts Ltd',
    reliability: 0.88,
    leadTime: 8,
    costPerUnit: 95,
    location: 'Shanghai, China',
  },
  {
    id: '3',
    name: 'EuroSupply GmbH',
    reliability: 0.92,
    leadTime: 7,
    costPerUnit: 110,
    location: 'Munich, Germany',
  },
  {
    id: '4',
    name: 'Pacific Logistics',
    reliability: 0.89,
    leadTime: 6,
    costPerUnit: 105,
    location: 'Singapore',
  },
];

export const inventory: Inventory[] = [
  {
    id: '1',
    productName: 'Microprocessors',
    stockLevel: 2500,
    reorderPoint: 1000,
    maxCapacity: 5000,
    turnoverRate: 0.85,
  },
  {
    id: '2',
    productName: 'Memory Modules',
    stockLevel: 3800,
    reorderPoint: 1500,
    maxCapacity: 6000,
    turnoverRate: 0.75,
  },
  {
    id: '3',
    productName: 'Power Units',
    stockLevel: 1200,
    reorderPoint: 800,
    maxCapacity: 3000,
    turnoverRate: 0.92,
  },
  {
    id: '4',
    productName: 'Display Panels',
    stockLevel: 900,
    reorderPoint: 600,
    maxCapacity: 2000,
    turnoverRate: 0.88,
  },
];

export const shipments: ShipmentStatus[] = [
  {
    id: '1',
    origin: 'San Francisco, CA',
    destination: 'Austin, TX',
    status: 'in-transit',
    estimatedArrival: '2026-07-28',
    delay: 0,
  },
  {
    id: '2',
    origin: 'Shanghai, China',
    destination: 'Los Angeles, CA',
    status: 'delayed',
    estimatedArrival: '2026-07-18',
    actualArrival: '2026-07-20',
    delay: 2,
  },
  {
    id: '3',
    origin: 'Munich, Germany',
    destination: 'Paris, France',
    status: 'delivered',
    estimatedArrival: '2026-07-15',
    actualArrival: '2026-07-15',
    delay: 0,
  },
];

// Deterministic weekly series across June-July 2026 (stable across reloads,
// no Math.random at module scope which causes flaky renders).
const metricDates: string[] = [
  '2026-06-01',
  '2026-06-08',
  '2026-06-15',
  '2026-06-22',
  '2026-06-29',
  '2026-07-06',
  '2026-07-13',
  '2026-07-20',
  '2026-07-27',
];
const fulfillment: number[] = [0.863, 0.871, 0.884, 0.892, 0.901, 0.895, 0.912, 0.918, 0.924];
const turnover: number[] = [4.1, 4.3, 4.6, 4.8, 5.0, 5.1, 4.9, 5.2, 5.4];
const reliability: number[] = [0.885, 0.892, 0.901, 0.905, 0.912, 0.915, 0.908, 0.918, 0.926];
const efficiency: number[] = [0.831, 0.845, 0.856, 0.862, 0.873, 0.869, 0.881, 0.889, 0.894];

export const performanceMetrics: PerformanceMetric[] = metricDates.map((date, i) => ({
  date,
  orderFulfillmentRate: fulfillment[i] as number,
  inventoryTurnover: turnover[i] as number,
  supplierReliability: reliability[i] as number,
  costEfficiency: efficiency[i] as number,
}));
