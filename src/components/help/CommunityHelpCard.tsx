
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function CommunityHelpCard() {
  const { toast } = useToast();
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [helpType, setHelpType] = useState("");
  const [description, setDescription] = useState("");

  const handleCommunityRequest = () => {
    if (!helpType) {
      toast({
        title: "Please select help type",
        description: "Select the type of community help you need.",
        variant: "destructive",
      });
      return;
    }

    setIsRequestActive(true);
    toast({
      title: "Community help request sent",
      description: "Looking for helpers in your community...",
    });
    
    // Simulate a response after 3 seconds
    setTimeout(() => {
      toast({
        title: "Community helper found",
        description: "A neighbor 0.8 miles away has accepted your request.",
      });
    }, 3000);
  };

  const handleCancelRequest = () => {
    setIsRequestActive(false);
    setHelpType("");
    setDescription("");
    toast({
      title: "Request cancelled",
      description: "Your community help request has been cancelled.",
    });
  };

  return (
    <Card className={isRequestActive ? "border-community border-2" : ""}>
      <CardHeader className="bg-community text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Heart className="mr-2 h-6 w-6" />
            Community Support
          </div>
          {isRequestActive && (
            <span className="text-sm font-normal animate-pulse">ACTIVE</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6">
          Connect with other parents and community members who can provide assistance with child care, errands, or other needs.
        </p>
        {!isRequestActive ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type of help needed</label>
              <Select onValueChange={setHelpType} value={helpType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select help type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="childcare">Childcare assistance</SelectItem>
                  <SelectItem value="transportation">Transportation</SelectItem>
                  <SelectItem value="meal_help">Meal preparation</SelectItem>
                  <SelectItem value="pickup_dropoff">School pickup/dropoff</SelectItem>
                  <SelectItem value="errands">Running errands</SelectItem>
                  <SelectItem value="other">Other (specify below)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (optional)</label>
              <Textarea 
                placeholder="Briefly describe what you need help with..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <Button
              className="w-full bg-community hover:bg-community-dark"
              onClick={handleCommunityRequest}
            >
              Request Community Help
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-community/10 rounded-md border border-community flex items-center">
              <div className="h-3 w-3 rounded-full bg-community mr-3 animate-pulse"></div>
              <p className="text-sm font-medium">
                Community request active - Finding helpers nearby
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm"><span className="font-semibold">Help type:</span> {helpType.replace("_", " ")}</p>
              {description && (
                <p className="text-sm mt-1"><span className="font-semibold">Description:</span> {description}</p>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full border-community text-community"
              onClick={handleCancelRequest}
            >
              Cancel Community Request
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default CommunityHelpCard;
