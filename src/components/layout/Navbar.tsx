
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Heart, MapPin, User, LogOut, List } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const { toast } = useToast();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
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
            
            {isAuthenticated && (
              <>
                <Link to="/request-help">
                  <Button variant="ghost" className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Request Help
                  </Button>
                </Link>
                <Link to="/my-requests">
                  <Button variant="ghost" className="flex items-center">
                    <List className="mr-2 h-4 w-4" />
                    My Requests
                  </Button>
                </Link>
              </>
            )}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    {user?.name?.split(' ')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-requests" className="w-full cursor-pointer">My Requests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
            )}
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
