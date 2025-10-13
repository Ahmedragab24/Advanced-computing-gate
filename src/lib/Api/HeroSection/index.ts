import { LangType } from "@/types";
import { HeroSectionResponseType } from "@/types/Hero";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getHeroSectionData(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/hero-section?lang=${lang}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: HeroSectionResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
