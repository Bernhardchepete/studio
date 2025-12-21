'use client';

import { useState, useTransition } from 'react';
import { DashboardHeader } from '@/components/dashboard-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Loader2 } from 'lucide-react';
import { assets, liabilities, transactions } from '@/lib/data';
import { simulateFinancialScenario } from '@/ai/flows/financial-scenario-simulator';

export default function SimulatorPage() {
  const [scenario, setScenario] = useState('');
  const [isPending, startTransition] = useTransition();
  const [prediction, setPrediction] = useState('');

  const currentFinancials = JSON.stringify({
    assets,
    liabilities,
    transactions,
    financialGoals: "Saving for a trip to Cape Town at the end of the year.",
  }, null, 2);

  const handleSimulate = () => {
    if (!scenario) return;

    startTransition(async () => {
      const result = await simulateFinancialScenario({
        currentFinancials: currentFinancials,
        scenario: scenario,
      });
      setPrediction(result.prediction);
    });
  };

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Scenario Simulator" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Financial Snapshot</CardTitle>
              <CardDescription>
                This is the data used for the simulation. (Read-only)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                className="h-80 resize-none font-mono text-xs"
                value={currentFinancials}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Define a Scenario</CardTitle>
              <CardDescription>
                Describe a change you want to simulate. Be specific for the best results.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="scenario">What if I...</Label>
                <Textarea
                  id="scenario"
                  placeholder="e.g., save BWP 500 more per month, or what if my side hustle income increases by 20%?"
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  className="h-24"
                />
              </div>
              <Button onClick={handleSimulate} disabled={isPending || !scenario}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Bot className="mr-2 h-4 w-4" />
                )}
                Run Simulation
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Simulation Result</CardTitle>
            <CardDescription>
              Here's the predicted outcome of your scenario.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isPending && (
              <div className="space-y-3">
                <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse" />
                <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse w-5/6" />
                <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse w-3/4" />
                <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse w-4/6" />
                 <div className="h-5 bg-muted-foreground/10 rounded-md animate-pulse w-5/6" />
              </div>
            )}
            {prediction && !isPending && (
              <div className="prose prose-sm max-w-none text-foreground/90">
                 <p>{prediction}</p>
              </div>
            )}
            {!prediction && !isPending && (
              <p className="text-sm text-muted-foreground">
                Your prediction will appear here after you run a simulation.
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
