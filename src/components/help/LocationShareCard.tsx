
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

interface LocationShareCardProps {
  onLocationShared?: (location: { latitude?: number; longitude?: number; address?: string }) => void;
}

export function LocationShareCard({ onLocationShared }: LocationShareCardProps) {
  const { toast } = useToast();
  const [isLocationShared, setIsLocationShared] = useState(false);
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<{ latitude?: number; longitude?: number; address?: string }>({});
  
  const handleShareLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Accessing location",
        description: "Please allow location access when prompted.",
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          
          setLocation(newLocation);
          setIsLocationShared(true);
          
          if (onLocationShared) {
            onLocationShared(newLocation);
          }
          
          toast({
            title: "Location shared",
            description: "Your location has been shared with helpers.",
          });
        },
        (error) => {
          // Error
          toast({
            title: "Location access denied",
            description: "Please enter your address manually below.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Please enter your address manually below.",
        variant: "destructive",
      });
    }
  };

  const handleManualAddress = () => {
    if (!address) {
      toast({
        title: "Address required",
        description: "Please enter your address to continue.",
        variant: "destructive",
      });
      return;
    }
    
    const newLocation = { address };
    setLocation(newLocation);
    setIsLocationShared(true);
    
    if (onLocationShared) {
      onLocationShared(newLocation);
    }
    
    toast({
      title: "Address saved",
      description: "Your address has been shared with helpers.",
    });
  };

  const handleUpdateLocation = () => {
    setIsLocationShared(false);
    setLocation({});
    
    if (onLocationShared) {
      onLocationShared({});
    }
  };

  return (
    <Card>
      <CardHeader className="bg-primary text-white">
        <CardTitle className="flex items-center">
          <MapPin className="mr-2 h-6 w-6" />
          Location Sharing
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6">
          Share your location so help can reach you quickly. Your location will only be shared with matched helpers.
        </p>
        
        {!isLocationShared ? (
          <div className="space-y-4">
            <Button
              className="w-full"
              onClick={handleShareLocation}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Share My Current Location
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or enter manually
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Input 
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={handleManualAddress}
              >
                Use This Address
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-primary/10 rounded-md border border-primary flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary mr-3"></div>
              <p className="text-sm font-medium">
                Location successfully shared with helpers
              </p>
            </div>
            {location.address && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm"><span className="font-semibold">Address:</span> {location.address}</p>
              </div>
            )}
            {(location.latitude && location.longitude) && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm"><span className="font-semibold">GPS coordinates shared</span></p>
              </div>
            )}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleUpdateLocation}
            >
              Update Location
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default LocationShareCard;
