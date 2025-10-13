export type PageType = "terms" | "about" | "faq" | "privacy" | "all";

export interface  ItemPage {
   id: number
                type: PageType
                title: string
                description: string,
                seo_title: string
                seo_description: string
                created_at: string
                updated_at: string
}

export interface ImportantPagesResponseType {
  data: {
    items: ItemPage[];
  };
  message: string;
  status_code: number;
}

export interface AppInfoResponseType {
  data: {
    name: string;
    android_version: string;
    ios_version: string;
    force_update: boolean;
    support_email: string;
    support_phone: string;
    items: [];
  };
  message: string;
  status_code: number;
}
