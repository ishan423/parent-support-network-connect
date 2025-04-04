
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-primary mr-2" />
            <span className="font-semibold text-lg">ParentConnect</span>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>© 2025 ParentConnect. All rights reserved.</p>
            <p>Supporting parents when they need it most.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-primary">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
