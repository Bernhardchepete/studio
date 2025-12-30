'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { demoUsers } from "@/lib/demo-data";
import { useDemoUser } from "@/contexts/demo-user-context";
import { Wallet, LogIn, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function LoginPage() {
  const router = useRouter();
  const { login } = useDemoUser();
  const [selectedUserId, setSelectedUserId] = useState<string | undefined>(demoUsers[0].id);

  const handleLogin = () => {
    if (selectedUserId) {
        login(selectedUserId);
        router.push('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto">
        <div className="flex justify-center mb-8">
            <div className="bg-primary p-4 rounded-full shadow-lg">
                <Wallet className="h-10 w-10 text-primary-foreground" />
            </div>
        </div>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">,ThuoX Demo</CardTitle>
            <CardDescription>Select a user profile to explore the app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                    <SelectTrigger className="w-full h-11 text-base md:text-sm" id="email">
                        <SelectValue placeholder="Select a user profile..." />
                    </SelectTrigger>
                    <SelectContent>
                        {demoUsers.map(user => (
                            <SelectItem key={user.id} value={user.id}>
                                <div className="flex flex-col">
                                    <span className="font-medium">{user.name} ({user.persona})</span>
                                    <span className="text-muted-foreground text-xs">{user.email}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" value="demopassword" disabled />
                <p className="text-xs text-muted-foreground">Passwords are disabled for this demo environment.</p>
            </div>
            <Button onClick={handleLogin} className="w-full" size="lg" disabled={!selectedUserId}>
                <LogIn className="mr-2 h-4 w-4" /> Sign In
            </Button>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-muted-foreground mt-6">
            This is a sandboxed demo. No real data is used.
        </p>
      </div>
    </div>
  );
}
