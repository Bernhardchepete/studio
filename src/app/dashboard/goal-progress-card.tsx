
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";
import type { Goal } from '@/lib/types';
import { Target, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export function GoalProgressCard({ goal }: { goal: Goal }) {
  const goalImage = PlaceHolderImages.find(p => p.id === goal.imageId);
  const progress = (goal.saved / goal.target) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target />
          Goal Progress
        </CardTitle>
        <CardDescription>Your top priority financial goal.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
        {goalImage && (
          <div className="relative w-full sm:w-1/3 h-32 sm:h-full rounded-lg overflow-hidden">
            <Image
              src={goalImage.imageUrl}
              alt={goal.name}
              fill
              className="object-cover"
              data-ai-hint={goalImage.imageHint}
            />
          </div>
        )}
        <div className="w-full sm:w-2/3 space-y-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">{goal.name}</h3>
            <p className="text-sm text-muted-foreground">{goal.description}</p>
          </div>
          <div className="space-y-2">
            <Progress value={progress} />
            <div className="flex justify-between text-sm font-medium">
              <span>{formatCurrency(goal.saved)}</span>
              <span className="text-muted-foreground">{formatCurrency(goal.target)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="secondary" className="w-full sm:w-auto" asChild>
            <Link href="/dashboard/goals">
                View All Goals <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
