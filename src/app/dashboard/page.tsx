'use client';

import { DashboardHeader } from "@/components/dashboard-header";
import {
  OverviewCards,
  PerformanceChartCard,
  AIInsightsCard,
} from "./cards";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col h-full">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCards />
        </div>
        <div className="grid gap-6 mt-6">
            <AIInsightsCard />
            <PerformanceChartCard />
        </div>
      </main>
    </div>
  );
}
