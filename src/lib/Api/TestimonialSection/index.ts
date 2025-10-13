import { LangType } from "@/types";
import { TestimonialsResponseType } from "@/types/Testimonial";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTestimonialsData(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/testimonials?lang=${lang}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: TestimonialsResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
