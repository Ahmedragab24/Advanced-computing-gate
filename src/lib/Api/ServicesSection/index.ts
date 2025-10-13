import { LangType } from "@/types";
import { ServicesResponseType } from "@/types/Services";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServicesData(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/services?lang=${lang}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ServicesResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
