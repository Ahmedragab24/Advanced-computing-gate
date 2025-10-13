"use client";

import React, { useEffect, useState } from "react";
import { MessageCircleMore, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { getContactInfo } from "@/lib/Api/Contact";
import { ContactInfoResponseType } from "@/types/Contact";

interface Props {
  itemVariants: Variants;
}

const ContactBtns = ({ itemVariants }: Props) => {
  const t = useTranslations("hero");
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
  const whatsappLink = phone ? `https://wa.me/${phone}` : "#";

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6"
    >
      <a href={telLink}>
        <Button
          size="lg"
          variant="tech"
          className="group text-lg px-8 py-4 h-auto shadow-md hover:shadow-lg transition-all duration-200 font-serif"
          aria-label="phone"
        >
          {t("call")}
          <PhoneCall className="mx-2 w-5 h-5 group-hover:scale-110 transition-transform" />
        </Button>
      </a>

      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        <Button
          size="lg"
          variant="outline"
          className="group text-lg px-8 py-4 h-auto text-green-500 glass-effect border-primary/30 hover:text-green-600 hover:bg-primary/5 hover:border-primary/50 hover:shadow-lg transition-all duration-200 font-serif"
          aria-label="whatsapp"
        >
          {t("whatsapp")}
          <MessageCircleMore className="mx-2 w-5 h-5  group-hover:scale-110 transition-transform" />
        </Button>
      </a>
    </motion.div>
  );
};

export default ContactBtns;
