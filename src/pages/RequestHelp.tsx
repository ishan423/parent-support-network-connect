
import MainLayout from "@/components/layout/MainLayout";
import { useToast } from "@/components/ui/use-toast";
import EmergencyHelpCard from "@/components/help/EmergencyHelpCard";
import MedicalHelpCard from "@/components/help/MedicalHelpCard";
import CommunityHelpCard from "@/components/help/CommunityHelpCard";
import LocationShareCard from "@/components/help/LocationShareCard";

const RequestHelp = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Request Assistance</h1>
          <p className="text-muted-foreground mb-8">
            Select the type of help you need. We'll connect you with nearby assistance.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EmergencyHelpCard />
            <LocationShareCard />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <MedicalHelpCard />
            <CommunityHelpCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RequestHelp;
