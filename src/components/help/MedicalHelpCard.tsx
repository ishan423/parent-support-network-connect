
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital } from "lucide-react";
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

export function MedicalHelpCard() {
  const { toast } = useToast();
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const handleMedicalRequest = () => {
    if (!issueType) {
      toast({
        title: "Please select an issue type",
        description: "Select the type of medical assistance you need.",
        variant: "destructive",
      });
      return;
    }

    setIsRequestActive(true);
    toast({
      title: "Medical help request sent",
      description: "Looking for medical professionals in your area...",
    });
    
    // Simulate a response after 3 seconds
    setTimeout(() => {
      toast({
        title: "Medical helper found",
        description: "A registered nurse 1.2 miles away has accepted your request.",
      });
    }, 3000);
  };

  const handleCancelRequest = () => {
    setIsRequestActive(false);
    setIssueType("");
    setDescription("");
    toast({
      title: "Request cancelled",
      description: "Your medical help request has been cancelled.",
    });
  };

  return (
    <Card className={isRequestActive ? "border-medical border-2" : ""}>
      <CardHeader className="bg-medical text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Hospital className="mr-2 h-6 w-6" />
            Medical Assistance
          </div>
          {isRequestActive && (
            <span className="text-sm font-normal animate-pulse">ACTIVE</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6">
          Request assistance from medical professionals in your community for non-emergency situations.
        </p>
        {!isRequestActive ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Type of medical issue</label>
              <Select onValueChange={setIssueType} value={issueType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="minor_injury">Minor injury</SelectItem>
                  <SelectItem value="child_illness">Child illness</SelectItem>
                  <SelectItem value="medication_help">Medication help</SelectItem>
                  <SelectItem value="first_aid">First aid assistance</SelectItem>
                  <SelectItem value="other">Other (specify below)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description (optional)</label>
              <Textarea 
                placeholder="Briefly describe the situation..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            <Button
              className="w-full bg-medical hover:bg-medical-dark"
              onClick={handleMedicalRequest}
            >
              Request Medical Help
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-medical/10 rounded-md border border-medical flex items-center">
              <div className="h-3 w-3 rounded-full bg-medical mr-3 animate-pulse"></div>
              <p className="text-sm font-medium">
                Medical request active - Finding helpers nearby
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-sm"><span className="font-semibold">Issue type:</span> {issueType.replace("_", " ")}</p>
              {description && (
                <p className="text-sm mt-1"><span className="font-semibold">Description:</span> {description}</p>
              )}
            </div>
            <Button
              variant="outline"
              className="w-full border-medical text-medical"
              onClick={handleCancelRequest}
            >
              Cancel Medical Request
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default MedicalHelpCard;
