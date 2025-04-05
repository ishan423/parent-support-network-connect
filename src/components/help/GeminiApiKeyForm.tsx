
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { setGeminiApiKey, getGeminiApiKey } from "@/services/geminiAiService";
import { useToast } from "@/components/ui/use-toast";

interface GeminiApiKeyFormProps {
  onApiKeySet: () => void;
}

const GeminiApiKeyForm: React.FC<GeminiApiKeyFormProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Gemini API key",
        variant: "destructive",
      });
      return;
    }

    setGeminiApiKey(apiKey);
    toast({
      title: "API Key Set",
      description: "Your Gemini API key has been set successfully",
    });
    onApiKeySet();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-indigo-700 dark:text-indigo-300">
          Connect to Gemini AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is not stored on our servers and is only used for this session.
            </p>
          </div>
          <Button type="submit" className="w-full">
            Connect to Gemini AI
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeminiApiKeyForm;
