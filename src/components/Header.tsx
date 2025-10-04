import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About PGM", href: "/about" },
  { name: "Module Objectives", href: "/objectives" },
  { name: "Theory", href: "/theory" },
  { name: "Experiments", href: "/experiments" },
  { name: "Bayes Server", href: "/bayes-server" },
  { name: "Papers", href: "/papers" },
  { name: "Feedback", href: "/feedback" },
  { name: "Projects", href: "/projects" },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Top bar with logo and institution info */}
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10">
          <div className="flex items-center gap-4">
            {/* Logo placeholder - user should add their actual logo */}
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-xs font-bold">
              LOGO
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold tracking-wide">SOMAIYA VIDYAVIHAR</p>
              <p className="text-lg font-bold">K J Somaiya Institute of Technology</p>
              <p className="text-xs opacity-90">
                An Autonomous Institute Permanently Affiliated to the University of Mumbai
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-primary-foreground hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "bg-white/20"
                  : "hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden px-4 py-4 space-y-2 border-t border-white/10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
