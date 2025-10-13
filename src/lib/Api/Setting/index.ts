import { LangType } from "@/types";
import {
  AppInfoResponseType,
  ImportantPagesResponseType,
  PageType,
} from "@/types/Setting";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getAppInfo() {
  try {
    const res = await fetch(`${API_BASE_URL}/settings/app`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: AppInfoResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}

export async function getImportPageData(lang: LangType, type: PageType) {
  try {
    const res = await fetch(
      `${API_BASE_URL}/settings/pages?lang=${lang}&type=${type}`,
      {
        cache: "force-cache",
      }
    );

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ImportantPagesResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب البيانات:", error);
    return null;
  }
}
