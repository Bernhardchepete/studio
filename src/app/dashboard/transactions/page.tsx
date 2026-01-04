'use client';

import * as React from 'react';
import { DashboardHeader } from "@/components/dashboard-header";
import {
  Card,
  CardContent,
  CardDescription,
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
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, PlusCircle, MoreHorizontal, ShoppingCart, Bus, MoreVertical } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";
import type { Transaction } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useDemoUser } from '@/contexts/demo-user-context';


const TransactionDetailsDialog = ({ transaction }: { transaction: Transaction }) => {
    if (!transaction.details) {
      return null;
    }
  
    const isFood = transaction.category === 'Food' && transaction.details.items;
    const isTransport = transaction.category === 'Transport' && transaction.details.from && transaction.details.to;
  
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transaction Details</DialogTitle>
          <DialogDescription>
            A detailed breakdown for "{transaction.description}".
          </DialogDescription>
        </DialogHeader>
        <div>
          {isFood && (
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2"><ShoppingCart className="h-4 w-4" /> Purchased Items</h3>
              <ul className="list-disc list-inside space-y-1 text-sm bg-muted/50 p-4 rounded-lg">
                {(transaction.details.items as string[]).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {isTransport && (
             <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2"><Bus className="h-4 w-4" /> Trip Details</h3>
                <div className="text-sm bg-muted/50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">From:</span> {transaction.details.from}</p>
                    <p><span className="font-medium">To:</span> {transaction.details.to}</p>
                </div>
             </div>
          )}
           {!isFood && !isTransport && (
              <p className="text-sm text-muted-foreground">No specific details are available for this transaction type.</p>
           )}
        </div>
      </DialogContent>
    );
  };

const TransactionRow = ({ transaction, onViewDetails }: { transaction: Transaction, onViewDetails: (t: Transaction) => void}) => {
    const isIncome = transaction.type === 'income';
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                <div className={cn("h-10 w-10 rounded-full flex items-center justify-center", isIncome ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900")}>
                    {isIncome ? <ArrowDownLeft className="h-5 w-5 text-green-600 dark:text-green-400"/> : <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400"/>}
                </div>
                <div className="grid gap-0.5">
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()} &middot; {transaction.category}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <p className={cn("font-semibold", isIncome ? "text-green-600" : "")}>{formatCurrency(transaction.amount)}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onSelect={() => onViewDetails(transaction)} disabled={!transaction.details}>
                            View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default function TransactionsPage() {
  const { data, updateData } = useDemoUser();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [isSendDialogOpen, setSendDialogOpen] = React.useState(false);
  const [isDetailsDialogOpen, setDetailsDialogOpen] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<Transaction | null>(null);

  React.useEffect(() => {
    if (data) {
        setTransactions(data.transactions);
    }
  }, [data, updateData]);

  const handleSendMoney = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!data) return;

    const formData = new FormData(e.currentTarget);
    const amount = parseFloat(formData.get('amount') as string);
    const recipient = formData.get('recipient') as string;

    const newTransaction: Transaction = {
      id: (transactions.length + 1).toString(),
      date: new Date().toISOString(),
      description: `Payment to ${recipient}`,
      category: 'Other',
      amount: amount,
      type: 'expense',
    };
    
    const newTransactions = [newTransaction, ...transactions];
    updateData({ transactions: newTransactions });
    setSendDialogOpen(false);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setDetailsDialogOpen(true);
  };

  if (!data) return null;


  return (
    <div className="flex flex-1 flex-col h-full">
      <DashboardHeader title="Transactions" />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="mb-6 space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Pay & Transfer</CardTitle>
                    <CardDescription>Send and receive money with ease.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col sm:flex-row gap-4">
                    <Dialog open={isSendDialogOpen} onOpenChange={setSendDialogOpen}>
                        <DialogTrigger asChild>
                             <Button size="lg" className="w-full">
                                <ArrowUpRight className="mr-2 h-4 w-4" /> Send Money
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Send Money</DialogTitle>
                                <DialogDescription>
                                    Enter the details of your transfer.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSendMoney} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="recipient">Recipient</Label>
                                    <Input id="recipient" name="recipient" placeholder="email@example.com or phone" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount (BWP)</Label>
                                    <Input id="amount" name="amount" type="number" placeholder="0.00" required />
                                </div>
                                <DialogFooter>
                                    <Button type="submit">Send Payment</Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                    <Button size="lg" variant="secondary" className="w-full">
                        <ArrowDownLeft className="mr-2 h-4 w-4" /> Request Money
                    </Button>
                </CardContent>
            </Card>
        </div>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>
                A record of all your income and expenses.
              </CardDescription>
            </div>
            <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add Transaction
              </span>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Dialog open={isDetailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
                {/* Mobile List View */}
                <div className="sm:hidden">
                    {transactions.map(transaction => (
                        <TransactionRow key={transaction.id} transaction={transaction} onViewDetails={handleViewDetails} />
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block">
                    <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>
                            <span className="sr-only">Actions</span>
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell className="font-medium">{transaction.description}</TableCell>
                            <TableCell>
                            <Badge variant="outline">{transaction.category}</Badge>
                            </TableCell>
                            <TableCell>
                            <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>{transaction.type}</Badge>
                            </TableCell>
                            <TableCell
                            className={`text-right font-medium ${
                                transaction.type === "income" ? "text-green-600" : ""
                            }`}
                            >
                            {formatCurrency(transaction.amount)}
                            </TableCell>
                            <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onSelect={() => handleViewDetails(transaction)} disabled={!transaction.details}>
                                    View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                <DropdownMenuItem>Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </div>
                {selectedTransaction && <TransactionDetailsDialog transaction={selectedTransaction} />}
            </Dialog>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

    