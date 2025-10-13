"use client";

import { useLocale, useTranslations } from "next-intl";
import { navItems } from "@/constants/MenuLinks";
import { useEffect, useState } from "react";
import { ContactInfoResponseType } from "@/types/Contact";
import { getContactInfo } from "@/lib/Api/Contact";
import SocialLinks from "../Buttons/SocialLinks";
import { AboutSectionResponseType } from "@/types/About";
import { getAboutSectionData } from "@/lib/Api/AboutSection";
import { LangType } from "@/types";
import PrivacyPolicyDialog from "../Dialogs/PrivacyPolicyDialog";
import TermsDialog from "../Dialogs/TermsDialog";
import Logo from "./Logo";

export function Footer() {
  const lang = useLocale() as LangType;
  const t = useTranslations("footer");
  const tMenu = useTranslations("navigation");
  const currentYear = new Date().getFullYear();
  const [ContactInfo, setContactInfo] = useState<ContactInfoResponseType>();
  const [AboutData, setAboutData] = useState<AboutSectionResponseType>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getContactInfo();
      setContactInfo(data || undefined);

      const about = await getAboutSectionData(lang);
      setAboutData(about || undefined);
    };
    fetchData();
  }, [lang]);

  return (
    <footer
      className="bg-gradient-to-t from-background to-background/50 border-t border-border/50 relative z-20"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Logo size="lg" />
            <p className="text-muted-foreground mb-6 max-w-md">
              {AboutData?.data?.description}
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t("quickLinks")}</h3>
            <ul className="space-y-2">
              {navItems.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tMenu(link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t("contactTitle")}</h3>
            <div className="space-y-2 text-muted-foreground md:!max-w-[200px]">
              {ContactInfo?.data?.email && <p>{ContactInfo.data.email}</p>}
              {ContactInfo?.data?.phone && <p>{ContactInfo.data.phone}</p>}
              {ContactInfo?.data?.address && <p>{ContactInfo.data.address}</p>}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {t("companyName")}. {t("rights")}
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <PrivacyPolicyDialog />
            <TermsDialog />
          </div>
        </div>
      </div>
    </footer>
  );
}
