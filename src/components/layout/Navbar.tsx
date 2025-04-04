
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Heart, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Navbar() {
  const { toast } = useToast();

  const handleProfileClick = () => {
    toast({
      title: "Coming Soon",
      description: "Profile settings will be available in the next update.",
    });
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Heart className="h-8 w-8 text-primary mr-2" />
              <span className="font-bold text-xl">ParentConnect</span>
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link to="/">
              <Button variant="ghost" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link to="/request-help">
              <Button variant="ghost" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                Request Help
              </Button>
            </Link>
            <Button variant="outline" onClick={handleProfileClick}>
              Profile
            </Button>
          </nav>
          <div className="md:hidden">
            <Button variant="ghost" size="icon">
              <span className="sr-only">Open menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
