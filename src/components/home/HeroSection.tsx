
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin, Heart, HelpCircle } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="hero-gradient py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Parent Support Network <span className="text-primary">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Connecting parents with nearby help when they need it most
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-medical hover:bg-medical-dark"
              onClick={() => navigate("/request-help")}
            >
              <MapPin className="mr-2 h-5 w-5" />
              Request Medical Assistance
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-community text-community hover:bg-community/10"
              onClick={() => navigate("/request-help")}
            >
              <Heart className="mr-2 h-5 w-5" />
              Ask for Community Help
            </Button>
          </div>
          <div className="mt-12">
            <div className="p-4 bg-white/80 rounded-lg shadow-sm inline-block">
              <div className="flex items-center">
                <HelpCircle className="mr-3 h-8 w-8 text-primary" />
                <p className="text-sm md:text-base font-medium">
                  Need immediate assistance? <br />
                  <span className="text-muted-foreground">
                    Our network connects you with help nearby.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
