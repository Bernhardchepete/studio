'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { demoUsers } from "@/lib/demo-data";
import { useDemoUser } from "@/contexts/demo-user-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Wallet } from "lucide-react";

export default function AccountSwitcherPage() {
  const router = useRouter();
  const { login } = useDemoUser();

  const handleLogin = (userId: string) => {
    login(userId);
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex justify-center mb-8">
            <div className="bg-primary p-4 rounded-full">
                <Wallet className="h-10 w-10 text-primary-foreground" />
            </div>
        </div>
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Welcome to the WealthWise Demo</CardTitle>
            <CardDescription>Select a user profile to explore tailored financial experiences.</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoUsers.map((user) => {
                const avatar = PlaceHolderImages.find(p => p.id === user.avatarId);
                return (
                    <Card key={user.id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    {avatar && <AvatarImage src={avatar.imageUrl} alt={user.name} data-ai-hint={avatar.imageHint} />}
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{user.name}</CardTitle>
                                    <CardDescription>{user.persona}</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-sm text-muted-foreground">{user.description}</p>
                        </CardContent>
                        <CardContent>
                             <Button onClick={() => handleLogin(user.id)} className="w-full">
                                View Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
      </div>
    </div>
  );
}
