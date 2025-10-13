"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navItems } from "@/constants/MenuLinks";
import { ContactInfoResponseType } from "@/types/Contact";
import { getContactInfo } from "@/lib/Api/Contact";

import Logo from "./Logo";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("navigation");
  const locale = useLocale();
  const [contactInfo, setContactInfo] = useState<ContactInfoResponseType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactInfo();
      if (data) setContactInfo(data);
    };

    fetchData();
  }, []);

  const phone = contactInfo?.data?.phone?.replace(/\s|\+/g, "") || "";
  const telLink = phone ? `tel:${phone}` : "#";

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";
    window.location.href = `/${newLocale}`;
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50 h-fit py-1"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-fit">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-baseline gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-foreground/80 hover:text-foreground px-3 py-2 rounded-md text-sm md:text-lg font-medium transition-colors duration-200 hover:bg-accent/80 hover:shadow-sm"
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLocale}
              aria-label={t("toggleLanguage")}
              className="glass-effect hover:bg-accent/50"
            >
              <Globe className="h-4 w-4" />
            </Button>

            <ThemeToggle />

            <Button
              variant="tech"
              className="hidden lg:flex text-sm px-4 py-2 ms-2"
            >
              {t("getStarted")}
            </Button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={t("toggleMenu")}
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
      </div>

      {/* Mobile Navigation with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden relative top-full left-0 right-0 !glass-effect z-50 border-t border-border/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-foreground/80 hover:text-foreground block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-accent/50"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="pt-4 px-3">
                <Link href={telLink}>
                  <Button variant="tech" className="w-full">
                    {t("getStarted")}
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
