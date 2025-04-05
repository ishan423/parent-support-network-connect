
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital, User, ArrowRight } from "lucide-react";
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
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function MedicalHelpCard() {
  const { toast } = useToast();
  const [isRequestActive, setIsRequestActive] = useState(false);
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [assignedHelper, setAssignedHelper] = useState<null | {
    name: string;
    role: string;
    distance: string;
    arrivalTime: string;
    image: string;
  }>(null);
  const [showHelperDetails, setShowHelperDetails] = useState(false);

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
      const helper = {
        name: "Sarah Johnson",
        role: "Registered Nurse",
        distance: "1.2 miles away",
        arrivalTime: "Estimated arrival: 12-15 minutes",
        image: "/placeholder.svg" // Using placeholder image
      };
      
      setAssignedHelper(helper);
      
      toast({
        title: "Medical helper found",
        description: `${helper.name}, a ${helper.role} ${helper.distance} has accepted your request.`,
      });
    }, 3000);
  };

  const handleCancelRequest = () => {
    setIsRequestActive(false);
    setIssueType("");
    setDescription("");
    setAssignedHelper(null);
    setShowHelperDetails(false);
    toast({
      title: "Request cancelled",
      description: "Your medical help request has been cancelled.",
    });
  };

  const issueTypes = [
    { value: "minor_injury", label: "Minor injury or wound" },
    { value: "child_illness", label: "Illness symptoms" },
    { value: "medication_help", label: "Medication assistance" },
    { value: "blood_pressure", label: "Blood pressure check" },
    { value: "first_aid", label: "First aid assistance" },
    { value: "other", label: "Other medical concern" },
  ];

  return (
    <Card className={isRequestActive ? "border-medical border-2" : ""}>
      <CardHeader className="bg-medical text-white">
        <CardTitle className="flex items-center justify-between text-xl">
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
        <p className="mb-6 text-base">
          Get help from medical professionals nearby for non-emergency situations like medication assistance, 
          minor injuries, or health checks.
        </p>
        {!isRequestActive ? (
          <div className="space-y-5">
            <div>
              <label className="block text-lg font-medium mb-2">What type of medical help do you need?</label>
              <Select onValueChange={setIssueType} value={issueType}>
                <SelectTrigger className="text-base p-6">
                  <SelectValue placeholder="Select issue type" />
                </SelectTrigger>
                <SelectContent>
                  {issueTypes.map((issue) => (
                    <SelectItem key={issue.value} value={issue.value} className="text-base py-3">
                      {issue.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Please describe your situation (optional)</label>
              <Textarea 
                placeholder="Example: I need help changing a bandage..." 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="text-base p-3"
              />
            </div>
            <Button
              className="w-full bg-medical hover:bg-medical-dark text-lg py-6"
              onClick={handleMedicalRequest}
              size="lg"
            >
              <Hospital className="mr-2 h-5 w-5" />
              Request Medical Help
            </Button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="p-4 bg-medical/10 rounded-md border border-medical flex items-center">
              <div className="h-4 w-4 rounded-full bg-medical mr-4 animate-pulse"></div>
              <p className="text-lg font-medium">
                {assignedHelper ? "Medical professional assigned" : "Finding medical help nearby..."}
              </p>
            </div>
            
            {assignedHelper && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center mb-3">
                  <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                    <User className="h-8 w-8 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{assignedHelper.name}</h3>
                    <p className="text-base text-gray-700">{assignedHelper.role}</p>
                  </div>
                </div>
                <p className="text-base mb-1">
                  <span className="font-medium">Location:</span> {assignedHelper.distance}
                </p>
                <p className="text-base mb-3">{assignedHelper.arrivalTime}</p>
                <Button 
                  variant="outline" 
                  className="flex items-center justify-center w-full border-medical text-medical"
                  onClick={() => setShowHelperDetails(true)}
                >
                  <span>View Helper Details</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            <div className="p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold text-lg mb-2">Your Request</h3>
              <p className="text-base mb-1"><span className="font-medium">Issue type:</span> {issueType.replace("_", " ")}</p>
              {description && (
                <p className="text-base"><span className="font-medium">Description:</span> {description}</p>
              )}
            </div>
            
            <Button
              variant="outline"
              className="w-full border-medical text-medical text-lg py-5"
              onClick={handleCancelRequest}
            >
              Cancel Medical Request
            </Button>
          </div>
        )}

        {/* Helper details dialog */}
        <Dialog open={showHelperDetails} onOpenChange={setShowHelperDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Medical Helper Information</DialogTitle>
              <DialogDescription>
                This professional has been assigned to help with your medical needs
              </DialogDescription>
            </DialogHeader>
            
            {assignedHelper && (
              <div className="space-y-4 py-2">
                <div className="flex flex-col items-center justify-center">
                  <div className="bg-gray-200 rounded-full w-24 h-24 flex items-center justify-center mb-3">
                    <User className="h-16 w-16 text-gray-700" />
                  </div>
                  <h3 className="text-xl font-bold">{assignedHelper.name}</h3>
                  <p className="text-lg text-gray-700">{assignedHelper.role}</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-md space-y-3">
                  <p className="text-lg"><span className="font-medium">Distance:</span> {assignedHelper.distance}</p>
                  <p className="text-lg">{assignedHelper.arrivalTime}</p>
                  <p className="text-lg"><span className="font-medium">Credentials:</span> Licensed medical professional</p>
                  <p className="text-lg"><span className="font-medium">Languages:</span> English, Spanish</p>
                </div>
                
                <div className="space-y-2">
                  <p className="text-base text-gray-700">Medical professionals in our network are verified and background-checked for your safety.</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default MedicalHelpCard;
