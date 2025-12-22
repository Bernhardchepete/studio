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
import { ArrowUpRight, ArrowDownLeft, PlusCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { transactions as initialTransactions } from "@/lib/data";
import type { Transaction } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
import { MoreHorizontal } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = React.useState<Transaction[]>(initialTransactions);
  const [isSendDialogOpen, setSendDialogOpen] = React.useState(false);

  const handleSendMoney = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

    setTransactions([newTransaction, ...transactions]);
    setSendDialogOpen(false);
  };


  return (
    <div className="flex flex-1 flex-col">
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
          <CardContent>
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
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
