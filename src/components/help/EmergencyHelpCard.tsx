
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneCall, Ambulance } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function EmergencyHelpCard() {
  const { toast } = useToast();
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);

  const handleEmergencyCall = () => {
    setIsEmergencyActive(true);
    toast({
      title: "Emergency call initiated",
      description: "Connecting you to emergency services...",
      variant: "destructive",
    });
    
    // Simulate a response after 3 seconds
    setTimeout(() => {
      toast({
        title: "Emergency services notified",
        description: "Help is on the way. Stay on the line.",
      });
    }, 3000);
  };

  const handleCancelEmergency = () => {
    setIsEmergencyActive(false);
    toast({
      title: "Emergency call cancelled",
      description: "The emergency request has been cancelled.",
    });
  };

  return (
    <Card className={isEmergencyActive ? "border-emergency border-2" : ""}>
      <CardHeader className="bg-emergency text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Ambulance className="mr-2 h-6 w-6" />
            Emergency Assistance
          </div>
          {isEmergencyActive && (
            <span className="text-sm font-normal animate-pulse">ACTIVE</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6">
          For serious medical emergencies or situations requiring immediate professional help.
        </p>
        {!isEmergencyActive ? (
          <Button
            className="w-full bg-emergency hover:bg-emergency-dark"
            size="lg"
            onClick={handleEmergencyCall}
          >
            <PhoneCall className="mr-2 h-5 w-5" />
            Call Emergency Services
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-emergency/10 rounded-md border border-emergency flex items-center">
              <div className="h-3 w-3 rounded-full bg-emergency mr-3 animate-pulse"></div>
              <p className="text-sm font-medium">
                Emergency request active - Help is on the way
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full border-emergency text-emergency"
              onClick={handleCancelEmergency}
            >
              Cancel Emergency Request
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default EmergencyHelpCard;
