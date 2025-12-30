
export type Language = 'en' | 'te' | 'hi' | 'ta' | 'kn';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
  category: string;
  image: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
}

export interface AstrologyToolResult {
  zodiacSign?: string;
  moonPhase?: string;
  numerologyNumber?: number;
  luckyNumber?: number;
  luckyColor?: string;
  aiReport?: string;
  compatibility?: string;
}
