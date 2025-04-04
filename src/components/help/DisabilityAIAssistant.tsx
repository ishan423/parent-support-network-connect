
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mic, Send, RefreshCw, Loader2, MessageSquare, Coffee, MapPin, Pill, Brain } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

// Categories for the assistant
const categories = [
  { id: "mobility", label: "Mobility", icon: <MapPin className="h-4 w-4 mr-2" /> },
  { id: "cognitive", label: "Cognitive", icon: <Brain className="h-4 w-4 mr-2" /> },
  { id: "vision", label: "Vision", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  { id: "hearing", label: "Hearing", icon: <Coffee className="h-4 w-4 mr-2" /> },
  { id: "medication", label: "Medication", icon: <Pill className="h-4 w-4 mr-2" /> },
];

// Common questions per category for suggestions
const suggestedQuestions = {
  mobility: [
    "Where can I find wheelchair accessible locations nearby?",
    "How do I report an accessibility barrier?",
  ],
  cognitive: [
    "Can you help me remember my daily routine?",
    "I need simple step-by-step instructions",
  ],
  vision: [
    "Can you describe what's around me?",
    "Enable screen reader features please",
  ],
  hearing: [
    "I need text captions for audio content",
    "How do I access sign language interpretation?",
  ],
  medication: [
    "Remind me about my medication schedule",
    "Where is the nearest pharmacy?",
  ],
};

const DisabilityAIAssistant = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Hello! I'm your accessibility assistant. How can I help you today?" }
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: "user", content: message }]);
    setIsProcessing(true);
    
    // Simulated AI response with improved pattern matching
    setTimeout(() => {
      let response = "";
      const lowerCaseMessage = message.toLowerCase();
      
      // Enhanced pattern matching with more detailed responses
      if (lowerCaseMessage.includes("wheelchair") || lowerCaseMessage.includes("mobility")) {
        response = "I can help you find wheelchair accessible locations nearby. Based on your location, I've identified 3 accessible venues within 0.5 miles. Would you like me to show you directions to these places?";
      } else if (lowerCaseMessage.includes("blind") || lowerCaseMessage.includes("vision")) {
        response = "I've activated enhanced screen reading features. I can describe your surroundings or read content aloud. Would you like me to enable high contrast mode for better visibility?";
      } else if (lowerCaseMessage.includes("deaf") || lowerCaseMessage.includes("hearing")) {
        response = "I've enabled real-time text captions for audio content. Would you like me to connect you with a sign language interpreter through our virtual service? The estimated wait time is 2 minutes.";
      } else if (lowerCaseMessage.includes("medicine") || lowerCaseMessage.includes("medication")) {
        response = "I can set up medication reminders for you. What medications do you need to track, and when do you need to take them? I can also locate the nearest pharmacy that delivers.";
      } else if (lowerCaseMessage.includes("help") || lowerCaseMessage.includes("assistance")) {
        response = "I'm here to assist with various accessibility needs. I can help with navigation, reading assistance, medication reminders, or connecting you with specialized support services. What specific type of help do you need today?";
      } else if (lowerCaseMessage.includes("emergency")) {
        response = "If you're experiencing an emergency, I recommend using the Emergency Help service on this page. Would you like me to connect you with emergency services immediately?";
      } else {
        response = "I'm here to assist with accessibility needs. Could you tell me more about what specific help you require? For example, I can help with mobility issues, vision assistance, hearing support, or medication reminders.";
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
    setSelectedCategory(null);
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Show a suggestion from this category
    const suggestions = suggestedQuestions[categoryId as keyof typeof suggestedQuestions];
    if (suggestions && suggestions.length > 0) {
      setMessage(suggestions[0]);
    }
  };

  const handleSuggestionClick = (question: string) => {
    setMessage(question);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-indigo-50 dark:bg-indigo-950 rounded-t-lg">
        <CardTitle className="text-indigo-700 dark:text-indigo-300">AI Accessibility Assistant</CardTitle>
        <CardDescription>
          Personalized help for people with disabilities. Ask about accessibility features, medication reminders, or assistance services.
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {categories.map(category => (
            <Badge 
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors"
              onClick={() => handleCategorySelect(category.id)}
            >
              <span className="flex items-center">
                {category.icon}
                {category.label}
              </span>
            </Badge>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4 h-[300px] overflow-y-auto p-2 border rounded-md" aria-live="polite">
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
        
        {selectedCategory && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions[selectedCategory as keyof typeof suggestedQuestions].map((question, idx) => (
                <Badge 
                  key={idx} 
                  variant="outline" 
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => handleSuggestionClick(question)}
                >
                  {question}
                </Badge>
              ))}
            </div>
          </div>
        )}
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
            aria-label="Message input"
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={isProcessing || !message.trim()}
            aria-label="Send message"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
        <div className="flex justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setMessage("")} 
            className="text-muted-foreground"
            disabled={!message.trim()}
          >
            Clear input
          </Button>
          <Button variant="ghost" size="sm" onClick={resetConversation} className="text-muted-foreground">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset conversation
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DisabilityAIAssistant;
