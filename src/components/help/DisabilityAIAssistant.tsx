
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mic, Send, RefreshCw, Loader2, MessageSquare, Coffee, MapPin, Pill, Brain } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { geminiAiService, getGeminiApiKey } from "@/services/geminiAiService";
import GeminiApiKeyForm from "./GeminiApiKeyForm";

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
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { toast } = useToast();

  // Check if API key is already set
  useEffect(() => {
    setIsApiKeySet(!!getGeminiApiKey());
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, { role: "user", content: message }]);
    setIsProcessing(true);
    
    try {
      // Get previous conversation context (last 3 messages)
      const recentConversation = conversation
        .slice(-3)
        .map(msg => `${msg.role}: ${msg.content}`)
        .join("\n");
      
      // Call Gemini AI API
      const response = await geminiAiService.generateResponse(
        message,
        `Recent conversation context:\n${recentConversation}`,
        selectedCategory || undefined
      );
      
      setConversation(prev => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      let errorMessage = "Unable to generate a response. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          setIsApiKeySet(false);
          errorMessage = "API key issue. Please reset your Gemini API key.";
        }
      }
      
      toast({
        title: "AI Response Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Add error message to conversation
      setConversation(prev => [
        ...prev, 
        { 
          role: "assistant", 
          content: "I'm having trouble connecting to my AI services. Please try again or check your internet connection." 
        }
      ]);
    } finally {
      setIsProcessing(false);
      setMessage("");
    }
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

  // If API key is not set, show the form to set it
  if (!isApiKeySet) {
    return <GeminiApiKeyForm onApiKeySet={() => setIsApiKeySet(true)} />;
  }

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
