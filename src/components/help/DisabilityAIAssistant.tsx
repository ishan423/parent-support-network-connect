
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mic, Send, RefreshCw, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DisabilityAIAssistant = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! I'm your accessibility assistant. How can I help you today?" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: "user", content: message }]);
    setIsProcessing(true);
    
    // In a real application, this would call an actual AI API
    // This is a simulated response for demonstration
    setTimeout(() => {
      let response = "";
      
      // Simple pattern matching for demo purposes
      if (message.toLowerCase().includes("wheelchair")) {
        response = "I can help you find wheelchair accessible locations nearby. Would you like me to show places with ramp access?";
      } else if (message.toLowerCase().includes("blind") || message.toLowerCase().includes("vision")) {
        response = "I can activate screen reading features or provide audio descriptions. Would you like me to enable these accessibility features?";
      } else if (message.toLowerCase().includes("deaf") || message.toLowerCase().includes("hearing")) {
        response = "I can provide text captions or visual alerts. Would you like me to enable these features?";
      } else if (message.toLowerCase().includes("medicine") || message.toLowerCase().includes("medication")) {
        response = "I can set up medication reminders or connect you with pharmacy services. What specific help do you need with your medication?";
      } else {
        response = "I'm here to assist with accessibility needs. Could you tell me more about what specific help you require?";
      }
      
      setConversation(prev => [...prev, { role: "assistant", content: response }]);
      setIsProcessing(false);
      setMessage("");
    }, 1000);
  };

  const handleVoiceInput = () => {
    toast({
      title: "Voice Recognition",
      description: "Voice input feature would activate here. This is a placeholder for speech-to-text functionality.",
    });
  };

  const resetConversation = () => {
    setConversation([
      { role: "assistant", content: "Hello! I'm your accessibility assistant. How can I help you today?" }
    ]);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-indigo-50 dark:bg-indigo-950 rounded-t-lg">
        <CardTitle className="text-indigo-700 dark:text-indigo-300">AI Accessibility Assistant</CardTitle>
        <CardDescription>
          Personalized help for people with disabilities. Ask about accessibility features, medication reminders, or assistance services.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4 h-[300px] overflow-y-auto p-2 border rounded-md">
          {conversation.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-muted flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Thinking...</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex w-full gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleVoiceInput}
            aria-label="Use voice input"
          >
            <Mic className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question here..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <Button onClick={handleSendMessage} disabled={isProcessing || !message.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
        <Button variant="ghost" size="sm" onClick={resetConversation} className="self-end">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset conversation
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DisabilityAIAssistant;
