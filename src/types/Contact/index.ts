export interface SendMessageType {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export type SocialType =
  | "facebook"
  | "twitter"
  | "linkedin"
  | "instagram"
  | "tiktok";

export interface SocialLinkType {
  platform: SocialType;
  url: string;
}

export interface ContactInfoResponseType {
  data: {
    email: string;
    phone: string;
    address: string;
    business_hours: string;
  };
  message: string;
  status_code: number;
}

export interface SocialLinksResponseType {
  code: number;
  message: string;
  data: {
    items: [
      {
        platform: "facebook";
        url: string;
      },
      {
        platform: "twitter";
        url: string;
      },
      {
        platform: "linkedin";
        url: string;
      },
      {
        platform: "instagram";
        url: string;
      },
      {
        platform: "tiktok";
        url: string;
      }
    ];
  };
}
