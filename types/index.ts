export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  tech_stack: string[];
  demo_url?: string | null;
  repo_url?: string | null;
  display_order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  created_at: string;
}

export interface AboutContent {
  id: string;
  bio: string;
  tagline: string;
  cv_url?: string | null;
  updated_at: string;
}

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isWhitelisted: boolean;
}
