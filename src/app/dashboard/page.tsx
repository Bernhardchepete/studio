import { DashboardHeader } from "@/components/dashboard-header";
import {
  OverviewCards,
  RecentTransactionsCard,
  BudgetProgressCard,
  CashflowChartCard,
  AIInsightsCard
} from "./cards";

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Dashboard" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCards />
           <div className="lg:col-span-4">
            <AIInsightsCard />
          </div>
          <div className="lg:col-span-2">
            <CashflowChartCard />
          </div>
          <div className="lg:col-span-2">
            <RecentTransactionsCard />
          </div>
          <div className="lg:col-span-2">
             <BudgetProgressCard />
          </div>
        </div>
      </main>
    </div>
  );
}
