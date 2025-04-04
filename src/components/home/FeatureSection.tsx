
import { Heart, MapPin, HelpCircle, PhoneCall } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <PhoneCall className="h-10 w-10 text-medical" />,
      title: "Emergency Assistance",
      description:
        "Request immediate medical or emergency help with the tap of a button.",
    },
    {
      icon: <Heart className="h-10 w-10 text-community" />,
      title: "Community Support",
      description:
        "Connect with other parents in your area who can provide assistance when needed.",
    },
    {
      icon: <MapPin className="h-10 w-10 text-primary" />,
      title: "Location Services",
      description:
        "Share your location with trusted helpers to receive assistance quickly.",
    },
    {
      icon: <HelpCircle className="h-10 w-10 text-medical-dark" />,
      title: "Parent Resources",
      description:
        "Access helpful resources and guidance for common parenting challenges.",
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How ParentConnect Helps</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our network connects parents with the support they need, when they need it most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
