
'use client';

import { DashboardHeader } from "@/components/dashboard-header";
import {
  FinancialPulseCard,
  AICopilotCard,
  PerformanceChartCard,
  OverviewCards
} from "./cards";
import { GoalProgressCard } from "./goal-progress-card";
import { useDemoUser } from "@/contexts/demo-user-context";

export default function Dashboard() {
  const { data } = useDemoUser();

  if (!data) return null;

  // Find the most important goal (highest target or closest deadline, for example)
  // For this demo, we'll just pick the first one.
  const primaryGoal = data.goals[0];

  return (
    <div className="flex flex-1 flex-col h-full">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="grid gap-6">
          {/* 1. Financial Pulse */}
          <FinancialPulseCard />

          {/* 2. AI Co-pilot */}
          <AICopilotCard />

          {/* 3. Goal Progress */}
          {primaryGoal && <GoalProgressCard goal={primaryGoal} />}

          {/* 4. Key Metrics & Performance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <OverviewCards />
          </div>
          <PerformanceChartCard />
        </div>
      </main>
    </div>
  );
}
