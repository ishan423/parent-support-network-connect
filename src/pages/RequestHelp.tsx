
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/components/ui/use-toast";
import EmergencyHelpCard from "@/components/help/EmergencyHelpCard";
import MedicalHelpCard from "@/components/help/MedicalHelpCard";
import CommunityHelpCard from "@/components/help/CommunityHelpCard";
import LocationShareCard from "@/components/help/LocationShareCard";
import DisabilityAIAssistant from "@/components/help/DisabilityAIAssistant";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

const RequestHelp = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Request Assistance</h1>
          <p className="text-muted-foreground mb-8">
            Select the type of help you need. We'll connect you with nearby assistance.
          </p>
          
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
                  <LocationShareCard />
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
