import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter as TableFoot,
} from "@/components/ui/table";
import { assets, liabilities } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

export default function AssetsAndDebtsPage() {
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce(
    (sum, liability) => sum + liability.amount,
    0
  );

  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader title="Assets & Debts" />
      <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Assets</CardTitle>
              <CardDescription>
                Everything you own that has value.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Asset
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="font-medium">{asset.name}</TableCell>
                    <TableCell>{asset.type}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(asset.value)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFoot>
                <TableRow>
                  <TableCell colSpan={2} className="font-bold">Total Assets</TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(totalAssets)}</TableCell>
                </TableRow>
              </TableFoot>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Debts</CardTitle>
              <CardDescription>
                Money you owe to others.
              </CardDescription>
            </div>
             <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              Add Debt
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liabilities.map((liability) => (
                  <TableRow key={liability.id}>
                    <TableCell className="font-medium">{liability.name}</TableCell>
                    <TableCell>{liability.type}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(liability.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFoot>
                <TableRow>
                  <TableCell colSpan={2} className="font-bold">Total Debts</TableCell>
                  <TableCell className="text-right font-bold">{formatCurrency(totalLiabilities)}</TableCell>
                </TableRow>
              </TableFoot>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
