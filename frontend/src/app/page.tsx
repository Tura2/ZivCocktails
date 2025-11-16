import Sidebar from '@/components/dashboard/Sidebar';
import TopBar from '@/components/dashboard/TopBar';
import KpiGrid from '@/components/dashboard/KpiGrid';
import EventsOverviewCard from '@/components/dashboard/EventsOverviewCard';
import UpcomingEventsCard from '@/components/dashboard/UpcomingEventsCard';
import TopHostsCard from '@/components/dashboard/TopHostsCard';
import PopularPackagesCard from '@/components/dashboard/PopularPackagesCard';
import type { TrendDirection } from '@/components/dashboard/KpiCard';

type KpiItem = {
  label: string;
  value: string;
  trendLabel: string;
  trendDirection: TrendDirection;
};

type UpcomingEvent = {
  name: string;
  date: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
};

type Host = {
  name: string;
  role: string;
  events: number;
  rating: number;
  tips: string;
};

type PackageStat = {
  name: string;
  bookings: number;
  progress: number;
};

const kpiItems: KpiItem[] = [
  { label: 'Total Events (This Week)', value: '24', trendLabel: '+18%', trendDirection: 'up' },
  { label: 'Confirmed Guests', value: '312', trendLabel: '+9%', trendDirection: 'up' },
  { label: 'Revenue (This Week)', value: '₪18,450', trendLabel: '+12%', trendDirection: 'up' },
  { label: 'Average Rating', value: '4.8 / 5', trendLabel: '+0.3', trendDirection: 'up' },
];

const upcomingEvents: UpcomingEvent[] = [
  {
    name: 'Team Building – Tech Corp',
    date: 'Nov 18',
    type: 'Corporate Workshop',
    status: 'confirmed',
  },
  {
    name: 'Birthday – Noa’s 30th',
    date: 'Nov 19',
    type: 'Private Event',
    status: 'pending',
  },
  {
    name: 'Company Party – FinPlus',
    date: 'Nov 21',
    type: 'Corporate Workshop',
    status: 'confirmed',
  },
  {
    name: 'Anniversary – Lior & Maya',
    date: 'Nov 24',
    type: 'Private Event',
    status: 'cancelled',
  },
];

const topHosts: Host[] = [
  { name: 'Dana Levi', role: 'Lead Bartender', events: 18, rating: 4.9, tips: '₪3,200' },
  { name: 'Itay Cohen', role: 'Mixology Coach', events: 14, rating: 4.8, tips: '₪2,850' },
  { name: 'May Tal', role: 'Workshop Host', events: 12, rating: 4.7, tips: '₪2,120' },
  { name: 'Romi Adler', role: 'Guest Experience', events: 9, rating: 4.9, tips: '₪1,980' },
];

const popularPackages: PackageStat[] = [
  { name: 'Classic Cocktail Workshop', bookings: 12, progress: 82 },
  { name: 'Premium Mixology Night', bookings: 9, progress: 64 },
  { name: 'Zero-Proof Craft Session', bookings: 7, progress: 48 },
  { name: 'Signature Pairing Experience', bookings: 5, progress: 36 },
];

const chartValues = [96, 128, 118, 146, 132, 162, 150, 176];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-900">
      <Sidebar activeItem="dashboard" />

      <div className="flex flex-1 flex-col">
        <TopBar title="Dashboard" subtitle="Overview of your workshops & events" />

        <main className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
            <section aria-labelledby="dashboard-kpis" className="space-y-4">
              <h3 id="dashboard-kpis" className="sr-only">
                Key metrics
              </h3>
              <KpiGrid
                items={kpiItems.map((item) => ({
                  key: item.label,
                  label: item.label,
                  value: item.value,
                  trendLabel: item.trendLabel,
                  trendDirection: item.trendDirection,
                }))}
              />
            </section>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <EventsOverviewCard
                className="lg:col-span-2"
                title="Events & Revenue Overview"
                subtitle="Last 30 days"
                summary="24 events · ₪54,320 revenue · 312 guests"
                chartValues={chartValues}
              />
              <UpcomingEventsCard events={upcomingEvents} />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <TopHostsCard hosts={topHosts} className="lg:col-span-2" />
              <PopularPackagesCard packages={popularPackages} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
