
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CallToAction() {
  const navigate = useNavigate();
  
  return (
    <div className="py-16 bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Join Our Parent Support Network
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you need help or can provide assistance to others, become part of our growing community of supportive parents.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate("/request-help")}
            >
              Request Help Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
