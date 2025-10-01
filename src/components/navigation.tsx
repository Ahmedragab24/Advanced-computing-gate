"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    window.location.href = `/${newLocale}`;
  };

  const navItems = [
    { key: "home", href: `/${locale}` },
    { key: "about", href: `/${locale}#about` },
    { key: "services", href: `/${locale}#services` },
    { key: "portfolio", href: `/${locale}#portfolio` },
    { key: "contact", href: `/${locale}#contact` },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 tech-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CG</span>
              </div>
              <span className="text-xl font-bold tech-text-gradient">
                ComputingGate
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-accent/50"
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLocale}
              className="glass-effect hover:bg-accent/50"
            >
              <Globe className="h-4 w-4" />
              <span className="sr-only">Toggle language</span>
            </Button>
            <ThemeToggle />
            <Button variant="tech" className="ml-2 text-sm px-4 py-2">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLocale}
              className="glass-effect hover:bg-accent/50"
            >
              <Globe className="h-4 w-4" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="glass-effect hover:bg-accent/50"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-effect border-t border-border/50">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-accent/50"
                onClick={() => setIsOpen(false)}
              >
                {t(item.key)}
              </a>
            ))}
            <div className="pt-4">
              <Button variant="tech" className="w-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
