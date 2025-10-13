import { LangType } from "@/types";
import { ProjectsResponseType } from "@/types/Projects";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProjectsData(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/projects?lang=${lang}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ProjectsResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
