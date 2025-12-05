import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { cn } from "@/lib/utils";

type DashboardHeaderProps = {
    title: string;
    className?: string;
}

export function DashboardHeader({ title, className }: DashboardHeaderProps) {
  return (
    <header className={cn("sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6", className)}>
      <SidebarTrigger className="md:hidden" />
      <h1 className="flex-1 text-2xl font-semibold">{title}</h1>
      <div className="ml-auto flex items-center gap-4">
        <UserNav />
      </div>
    </header>
  );
}
