import { LangType } from "@/types";
import { AboutSectionResponseType } from "@/types/About";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAboutSectionData(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/about-section?lang=${lang}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: AboutSectionResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
