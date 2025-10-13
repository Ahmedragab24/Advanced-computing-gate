"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocale, useTranslations } from "next-intl";
import { LangType } from "@/types";
import { ImportantPagesResponseType } from "@/types/Setting";
import { getImportPageData } from "@/lib/Api/Setting";

const PrivacyPolicyDialog = () => {
  const t = useTranslations("footer");
  const lang = useLocale() as LangType;
  const [privacyData, setPrivacyData] =
    useState<ImportantPagesResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getImportPageData(lang, "privacy");
        setPrivacyData(data ?? null);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
        setPrivacyData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lang]);

  const description =
    privacyData?.data?.items?.[0]?.description ||
    (loading ? "Loading..." : "Coming Soon!");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">
          {t("privacy")}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("privacy")}</DialogTitle>
          <DialogDescription className="whitespace-pre-line text-sm leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicyDialog;
