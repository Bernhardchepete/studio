
'use client';

import { useState, useTransition, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { Bot, Loader2, User, Send, TestTube, ListChecks } from 'lucide-react';
import { simulateFinancialScenario } from '@/ai/flows/financial-scenario-simulator';
import { useDemoUser } from '@/contexts/demo-user-context';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const DigitalTwinContent = () => {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');

  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const [conversation, setConversation] = useState<Message[]>([
    {
        role: 'assistant',
        content: "Hello! I am your financial Digital Twin. Ask me a question or propose a scenario to see the potential financial impact. Try one of the suggestions below!",
    }
  ]);
  const { data } = useDemoUser();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (message: string) => {
    if (!message.trim() || !data) return;

    const userMessage: Message = { role: 'user', content: message };
    setConversation(prev => [...prev, userMessage]);
    setInput('');

    const currentFinancials = JSON.stringify({
      transactions: data.transactions,
      financialGoals: data.goals.map(g => g.description).join(', '),
    }, null, 2);


    startTransition(async () => {
      const result = await simulateFinancialScenario({
        currentFinancials: currentFinancials,
        scenario: message,
      });
      const assistantMessage: Message = { role: 'assistant', content: result.prediction };
      setConversation(prev => [...prev, assistantMessage]);
    });
  };
  
  useEffect(() => {
    if (initialQuery) {
        handleSendMessage(initialQuery);
    }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [conversation]);


  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  }

  return (
    <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
            <ScrollArea className="flex-1 mb-4 pr-4" ref={scrollAreaRef}>
                 <div className="space-y-6">
                    {conversation.map((message, index) => (
                        <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                             {message.role === 'assistant' && (
                                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                                    <AvatarFallback><Bot size={18}/></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={cn(
                                "max-w-[75%] rounded-lg p-3 text-sm",
                                message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                            )}>
                                <p>{message.content}</p>
                            </div>
                            {message.role === 'user' && (
                                <Avatar className="h-8 w-8">
                                    <AvatarFallback><User size={18} /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}
                     {isPending && (
                        <div className="flex items-start gap-3">
                            <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                                <AvatarFallback><Bot size={18}/></AvatarFallback>
                            </Avatar>
                            <div className="bg-muted rounded-lg p-3">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            </div>
                        </div>
                    )}
                </div>
            </ScrollArea>
           
            <div className="mt-auto space-y-4">
                 {!isPending && conversation.length <= 1 && (
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" onClick={() => handleSuggestionClick('What if I save BWP 500 more per month?')} className="w-full justify-start">
                            <TestTube className="mr-2 h-4 w-4" />
                            Simulate a Scenario
                        </Button>
                        <Button variant="outline" onClick={() => handleSuggestionClick('How can I reach my Cape Town goal faster?')} className="w-full justify-start">
                            <ListChecks className="mr-2 h-4 w-4" />
                            Create a Plan
                        </Button>
                    </div>
                 )}
                 <div className="relative">
                    <Input
                        placeholder="e.g., What happens if I save BWP 500 more per month?"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !isPending && handleSendMessage(input)}
                        disabled={isPending}
                        className="pr-12"
                    />
                    <Button 
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                        onClick={() => handleSendMessage(input)}
                        disabled={isPending || !input.trim()}
                    >
                        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4"/>}
                    </Button>
                </div>
            </div>
        </div>
  );
}

export default function DigitalTwinPage() {
  return (
    <div className="flex flex-1 flex-col h-screen">
      <DashboardHeader title="Digital Twin" />
      <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <DigitalTwinContent />
        </Suspense>
      </main>
    </div>
  );
}
