'use client';

import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PiggyBank,
  Wallet,
  BrainCircuit,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/dashboard/investments", label: "Investments", icon: TrendingUp },
  { href: "/dashboard/digital-twin", label: "Digital Twin", icon: BrainCircuit },
  { href: "/dashboard/assets", label: "Assets", icon: Wallet },
];

export function BottomNav() {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  if (!isMobile) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm md:hidden">
      <div className="grid h-16 grid-cols-5 items-center justify-center text-xs">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
