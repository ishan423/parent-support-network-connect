
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { setGeminiApiKey, getGeminiApiKey, isGeminiApiKeyValid } from "@/services/geminiAiService";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { InfoIcon, Key, Eye, EyeOff, Loader2 } from "lucide-react";

interface GeminiApiKeyFormProps {
  onApiKeySet: () => void;
}

const GeminiApiKeyForm: React.FC<GeminiApiKeyFormProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState("");
  const [rememberKey, setRememberKey] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  // Check if API key is stored in localStorage
  useEffect(() => {
    const storedKey = localStorage.getItem("geminiApiKey");
    if (storedKey) {
      setApiKey(storedKey);
      setRememberKey(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter a valid Gemini API key",
        variant: "destructive",
      });
      return;
    }

    // Validate the API key
    setIsValidating(true);
    
    try {
      // Store API key in memory
      setGeminiApiKey(apiKey);
      
      // Test if the API key works
      const isValid = await isGeminiApiKeyValid();
      
      if (!isValid) {
        toast({
          title: "Invalid API Key",
          description: "The provided API key doesn't seem to be valid",
          variant: "destructive",
        });
        setIsValidating(false);
        return;
      }
      
      // Store in localStorage if remember is checked
      if (rememberKey) {
        localStorage.setItem("geminiApiKey", apiKey);
      } else {
        localStorage.removeItem("geminiApiKey");
      }

      toast({
        title: "API Key Verified",
        description: "Your Gemini API key has been set successfully",
      });
      onApiKeySet();
    } catch (error) {
      console.error("Error validating API key:", error);
      toast({
        title: "Validation Error",
        description: "Could not validate your API key. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
          <Key className="h-5 w-5" />
          Connect to Gemini AI
        </CardTitle>
        <CardDescription>
          Enter your Gemini API key to access the Accessibility Assistant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <div className="relative">
              <Input
                id="apiKey"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="w-full pr-10"
                disabled={isValidating}
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon"
                className="absolute right-0 top-0"
                onClick={toggleShowApiKey}
                disabled={isValidating}
              >
                {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <InfoIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>
                You can get a Gemini API key from the{" "}
                <a 
                  href="https://ai.google.dev/tutorials/setup" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  Google AI Studio
                </a>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="remember-key" 
              checked={rememberKey}
              onCheckedChange={setRememberKey}
              disabled={isValidating}
            />
            <Label htmlFor="remember-key" className="text-sm">Remember my API key on this device</Label>
          </div>
          
          <Button type="submit" className="w-full" disabled={isValidating}>
            {isValidating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Connect to Gemini AI"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GeminiApiKeyForm;
