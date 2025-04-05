
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/services/api";
import EmergencyHelpCard from "@/components/help/EmergencyHelpCard";
import MedicalHelpCard from "@/components/help/MedicalHelpCard";
import CommunityHelpCard from "@/components/help/CommunityHelpCard";
import LocationShareCard from "@/components/help/LocationShareCard";
import DisabilityAIAssistant from "@/components/help/DisabilityAIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const RequestHelp = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [locationShared, setLocationShared] = useState<{
    latitude?: number;
    longitude?: number;
    address?: string;
  } | null>(null);
  
  // This function will be called when a user requests help from any card
  const handleHelpRequest = async (type: "emergency" | "medical" | "community", details: Record<string, any>) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to request help.",
        variant: "destructive",
      });
      return;
    }
    
    if (!locationShared) {
      toast({
        title: "Location required",
        description: "Please share your location before requesting help.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const helpRequest = await apiService.createHelpRequest({
        userId: user.id,
        type,
        description: details.description || `${type.charAt(0).toUpperCase() + type.slice(1)} help requested`,
        location: locationShared,
        helpDetails: details,
      });
      
      toast({
        title: "Help request sent",
        description: "Your request has been submitted successfully.",
      });
      
      // Redirect to my requests page after a brief delay
      setTimeout(() => {
        navigate("/my-requests");
      }, 1500);
    } catch (error) {
      console.error("Failed to create help request:", error);
      toast({
        title: "Request failed",
        description: "Unable to process your help request. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Update location from LocationShareCard
  const handleLocationShared = (location: { latitude?: number; longitude?: number; address?: string }) => {
    setLocationShared(location);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Request Assistance</h1>
              <p className="text-muted-foreground">
                Select the type of help you need. We'll connect you with nearby assistance.
              </p>
            </div>
            {user && (
              <div className="hidden md:block">
                <Card className="px-4 py-2 bg-primary/10">
                  <p className="text-sm font-medium">Logged in as {user.name}</p>
                </Card>
              </div>
            )}
          </div>
          
          <Tabs defaultValue="services" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="services">Support Services</TabsTrigger>
              <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
            </TabsList>
            
            <TabsContent value="services" className="mt-4 space-y-8">
              <Card className="p-4 bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800">
                <h2 className="text-xl font-semibold mb-4 text-rose-700 dark:text-rose-300">Emergency Assistance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EmergencyHelpCard />
                  <LocationShareCard onLocationShared={handleLocationShared} />
                </div>
              </Card>
              
              <Card className="p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">Health & Community Support</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MedicalHelpCard />
                  <CommunityHelpCard />
                </div>
              </Card>
            </TabsContent>
            
            <TabsContent value="ai-assistant" className="mt-4">
              <DisabilityAIAssistant />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default RequestHelp;
