import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Settings" />
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Demo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="User" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="demo@wealthwise.app" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>
                Customize your dashboard experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="theme" className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                </div>
                <Switch id="theme" />
              </div>
              <Separator />
               <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="currency" className="text-base">Currency</Label>
                    <p className="text-sm text-muted-foreground">Set your preferred currency.</p>
                </div>
                {/* This would be a Select component in a real app */}
                <Input defaultValue="USD" className="w-24" />
              </div>
            </CardContent>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage how you receive alerts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="budget-alerts">Budget Overshoot Alerts</Label>
                     <p className="text-sm text-muted-foreground">Get notified when you exceed a budget.</p>
                </div>
                <Switch id="budget-alerts" defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="milestone-alerts">Savings Milestone Alerts</Label>
                    <p className="text-sm text-muted-foreground">Celebrate when you reach a savings goal.</p>
                </div>
                <Switch id="milestone-alerts" defaultChecked/>
              </div>
               <Separator />
              <div className="flex items-center justify-between">
                <div>
                    <Label htmlFor="invoice-alerts">Invoice Due Reminders</Label>
                    <p className="text-sm text-muted-foreground">Get reminders for upcoming bills.</p>
                </div>
                <Switch id="invoice-alerts" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
