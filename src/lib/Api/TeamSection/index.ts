import { LangType } from "@/types";
import { TeamResponseType } from "@/types/Team";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getTeamData(lang: LangType) {
  try {
    const res = await fetch(`${API_BASE_URL}/team-members?lang=${lang}`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: TeamResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
