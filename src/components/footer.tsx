"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const t = useTranslations("navigation");

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:info@computinggate.com", label: "Email" },
  ];

  const quickLinks = [
    { key: "home", href: "/" },
    { key: "about", href: "/#about" },
    { key: "services", href: "/#services" },
    { key: "contact", href: "/#contact" },
  ];

  return (
    <footer className="bg-gradient-to-t from-background to-background/80 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 tech-gradient rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">CG</span>
              </div>
              <span className="text-xl font-bold tech-text-gradient">
                ComputingGate
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering businesses with cutting-edge technology solutions. We
              specialize in software development, cloud computing, digital
              transformation, and enterprise technical support.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>info@computinggate.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Tech Street</p>
              <p>Tech City, TC 12345</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} ComputingGate. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
