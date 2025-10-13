import {
  ContactInfoResponseType,
  SendMessageType,
  SocialLinksResponseType,
} from "@/types/Contact";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getContactInfo() {
  try {
    const res = await fetch(`${API_BASE_URL}/contact-info`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: ContactInfoResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب بيانات التواصل:", error);
    return null;
  }
}

export async function getSocialLinks() {
  try {
    const res = await fetch(`${API_BASE_URL}/social-links`, {
      cache: "force-cache",
    });

    if (!res.ok) throw new Error("فشل في جلب البيانات");

    const data: SocialLinksResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء جلب بيانات التواصل:", error);
    return null;
  }
}

export async function sendMessage(payload: SendMessageType) {
  try {
    const res = await fetch(`${API_BASE_URL}/contact-us`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("فشل في إرسال الرسالة");

    const data : SocialLinksResponseType = await res.json();
    return data;
  } catch (error) {
    console.error("خطأ أثناء إرسال الرسالة:", error);
    return null;
  }
}
