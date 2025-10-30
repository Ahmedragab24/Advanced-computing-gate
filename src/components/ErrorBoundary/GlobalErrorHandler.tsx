"use client";

import { useEffect } from "react";

export function GlobalErrorHandler() {
  useEffect(() => {
    // معالج للأخطاء غير المعالجة
    const handleError = (event: ErrorEvent) => {
      console.error("Unhandled error:", event.error);
      // يمكنك إرسال الخطأ إلى خدمة تسجيل الأخطاء هنا
    };

    // معالج لرفض الوعود غير المعالجة
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      // يمكنك إرسال الخطأ إلى خدمة تسجيل الأخطاء هنا
      // منع الخطأ الافتراضي من الظهور في Console
      event.preventDefault();
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  return null;
}
