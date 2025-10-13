"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { sendMessage } from "@/lib/Api/Contact";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import CustomPhoneInput from "../Inputs/CustomPhoneInput";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "يجب أن يحتوي الاسم على حرفين على الأقل.",
  }),
  email: z.string().email({
    message: "يجب إدخال بريد إلكتروني صالح.",
  }),
  company: z.string().min(2, {
    message: "يجب أن يحتوي اسم الشركة على حرفين على الأقل.",
  }),
  phone: z.object({
    iso_code: z.string(),
    number: z.string().min(7, {
      message: "يجب أن يحتوي رقم الهاتف على 7 أرقام على الأقل.",
    }),
  }),
  message: z.string().min(5, {
    message: "يجب أن تحتوي الرسالة على 5 أحرف على الأقل.",
  }),
});

interface Props {
  variants: Variants;
}

const ContactForm = ({ variants }: Props) => {
  const t = useTranslations("contact.form");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      phone: {
        iso_code: "",
        number: "",
      },
      message: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      name: values.name,
      email: values.email,
      company: values.company,
      phone: values.phone.iso_code + values.phone.number,
      message: values.message,
    };

    try {
      const res = await sendMessage(data);
      if (res) {
        setIsSuccess(true);
        toast.success(t("success"));
        form.reset();
        setTimeout(() => setIsSuccess(false), 4000);
      }
    } catch (error) {
      const errorMessage = error as Error;
      toast.error(errorMessage.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <motion.div variants={variants}>
      <div className="glass-effect rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6">{t("title")}</h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("email")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("company")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("company")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CustomPhoneInput label={t("phone")} field={field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-6">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("message")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("message")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              variant="tech"
              className="w-full group"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Send className="w-5 h-5 mr-2 animate-pulse" />
                  {t("sending")}
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  {t("sent")}
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  {t("submit")}
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
