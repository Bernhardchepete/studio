
'use client';

import { useState, useTransition } from 'react';
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
import {
  Upload,
  FileText,
  Home,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Banknote,
  Loader2,
  AlertCircle
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useDemoUser } from '@/contexts/demo-user-context';
import { Badge } from '@/components/ui/badge';
import { generateLoanEligibility } from '@/ai/flows/generate-loan-eligibility';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

type DocumentType = 'bankStatements' | 'kyc' | 'proofOfWork' | 'proofOfResidence';

const documentConfig = {
    bankStatements: { label: '3 Months Bank Statements', icon: FileText },
    kyc: { label: 'KYC Documents (ID/Passport)', icon: UserCheck },
    proofOfWork: { label: 'Proof of Work (Payslip/Contract)', icon: Briefcase },
    proofOfResidence: { label: 'Proof of Residence (Utility Bill)', icon: Home },
}

export default function LendingPage() {
    const { data, user } = useDemoUser();
    const [isPending, startTransition] = useTransition();
    const [eligibility, setEligibility] = useState(data?.lending.eligibility || null);
    
    if (!data || !user) return null;

    const handleCheckEligibility = () => {
        const totalIncome = data.transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = data.transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

        startTransition(async () => {
            const result = await generateLoanEligibility({
                monthlyIncome: totalIncome,
                monthlyExpenses: totalExpenses,
                creditHistory: 'Good standing, no defaults.', // Mock data
                existingDebt: 0 // Mock data
            });
            setEligibility(result);
        });
    }

    const LoanStatus = () => {
        if (isPending) {
             return (
                <div className="flex items-center justify-center h-48">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            )
        }
        if (!eligibility) {
            return (
                <div className="text-center p-8 space-y-4">
                     <p className="text-muted-foreground">Check your loan eligibility with our AI underwriting agent.</p>
                     <Button onClick={handleCheckEligibility} disabled={isPending}>
                        {isPending ? 'Analyzing...' : 'Check My Eligibility'}
                    </Button>
                </div>
            )
        }

        if (!eligibility.eligible) {
             return (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Not Currently Eligible</AlertTitle>
                    <AlertDescription>{eligibility.explanation}</AlertDescription>
                </Alert>
            )
        }

        return (
            <div className="text-center space-y-4">
                <Badge>Eligible</Badge>
                <p className="text-sm text-muted-foreground">You are eligible for a loan up to</p>
                <p className="text-5xl font-bold text-primary">{formatCurrency(eligibility.maxLoanAmount)}</p>
                <p className="text-sm text-muted-foreground">at an estimated interest rate of <span className="font-semibold text-primary">{eligibility.interestRate}%</span></p>
                <Button>Apply for Loan</Button>
            </div>
        )
    }

    return (
        <div className="flex flex-1 flex-col">
            <DashboardHeader title="Lending" />
            <main className="flex-1 p-4 sm:p-6 grid gap-6 md:grid-cols-1">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ShieldCheck /> Loan Eligibility</CardTitle>
                        <CardDescription>Based on your financial data, our AI has determined your eligibility status.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <LoanStatus />
                    </CardContent>
                </Card>
                
                <div className="grid gap-6 sm:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Banknote /> Active Loans</CardTitle>
                            <CardDescription>You have no active loans with Thuo.</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center text-muted-foreground">
                            <p>Your active loans will appear here.</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Upload /> Document Center</CardTitle>
                            <CardDescription>Upload the required documents to complete your profile for faster loan processing.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.entries(documentConfig).map(([key, {label, icon: Icon}]) => (
                                <div key={key} className="space-y-2">
                                    <Label htmlFor={key} className="flex items-center gap-2"><Icon className="h-4 w-4 text-muted-foreground" /> {label}</Label>
                                    <Input id={key} type="file" />
                                </div>
                            ))}
                            <Button className="w-full">Upload All Documents</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
