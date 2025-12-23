'use client';

import * as React from 'react';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Camera,
    Upload,
    MoreVertical,
    Search,
    X,
    Receipt,
    Calendar,
    Tag,
    Landmark
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Receipt as ReceiptType } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useDemoUser } from '@/contexts/demo-user-context';

const InsightWidget = ({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
);

const CameraScanner = () => {
    const videoRef = React.useRef<HTMLVideoElement>(null);
    const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | undefined>(undefined);
    const { toast } = useToast();
  
    React.useEffect(() => {
      const getCameraPermission = async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('Camera API not available.');
            setHasCameraPermission(false);
            return;
        }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          setHasCameraPermission(true);
  
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings to scan receipts.',
          });
        }
      };
  
      getCameraPermission();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
      }
    }, [toast]);
  
    return (
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Scan Receipt</DialogTitle>
          <DialogDescription>Position the receipt within the frame. The capture will be automatic.</DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video bg-muted rounded-md overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
            {hasCameraPermission === false && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center p-4">
                    <Alert variant="destructive">
                        <Camera className="h-4 w-4" />
                        <AlertTitle>Camera Access Required</AlertTitle>
                        <AlertDescription>
                            Please allow camera access in your browser to use this feature.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
             {hasCameraPermission === undefined && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center p-4">
                    <p>Requesting camera permission...</p>
                </div>
            )}
            <div className="absolute inset-4 border-2 border-dashed border-white/50 rounded-lg"/>
        </div>
      </DialogContent>
    );
};
  

export default function ReceiptsPage() {
    const { data } = useDemoUser();
    const [receipts, setReceipts] = React.useState<ReceiptType[]>([]);

    React.useEffect(() => {
        if (data) {
            setReceipts(data.receipts);
        }
    }, [data]);
    
    if (!data) return null;

    const totalSpend = receipts.reduce((sum, r) => sum + r.total, 0);

  return (
    <div className="flex flex-1 flex-col h-full">
      <DashboardHeader title="Receipts & Spend Intelligence" />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <InsightWidget title="This Month's Spend" value={formatCurrency(totalSpend)} icon={Receipt}/>
            <InsightWidget title="Top Category" value="Food" icon={Tag}/>
            <InsightWidget title="Top Merchant" value="Shoprite" icon={Landmark}/>
        </div>
        
        <Card>
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <CardTitle>Your Receipts</CardTitle>
                    <CardDescription>A list of all your captured receipts.</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full sm:w-auto">
                                <Camera className="mr-2 h-4 w-4" />
                                Scan Receipt
                            </Button>
                        </DialogTrigger>
                        <CameraScanner />
                    </Dialog>
                    <Button variant="secondary" className="w-full sm:w-auto">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by merchant, item, or category..." className="pl-10" />
                </div>
                <div className="space-y-4">
                    {receipts.map(receipt => (
                        <Card key={receipt.id} className="overflow-hidden">
                            <CardHeader className="p-4 bg-muted/50">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold">{receipt.merchant}</h3>
                                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                                            <Calendar className="h-3 w-3"/>
                                            {new Date(receipt.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <Badge variant="outline">{receipt.category}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                               <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Item</TableHead>
                                            <TableHead className="text-center">Qty</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {receipt.items.map((item, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell className="text-center">{item.quantity}</TableCell>
                                                <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                               </Table>
                               <div className="mt-4 pt-4 border-t space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatCurrency(receipt.subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>{formatCurrency(receipt.tax)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-base">
                                        <span>Total</span>
                                        <span>{formatCurrency(receipt.total)}</span>
                                    </div>
                               </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
