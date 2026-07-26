import React from "react";
import { Icon } from "@iconify/react";

export type ToolType =
  | "figma"
  | "antigravity"
  | "prisma"
  | "supabase"
  | "laravel"
  | "firebase"
  | "postman"
  | "chrome"
  | "github"
  | "vercel";

const ICON_MAP: Record<ToolType, string> = {
  figma: "solar:figma-bold",
  antigravity: "material-symbols-light:antigravity-outline",
  prisma: "file-icons:prisma",
  supabase: "devicon-plain:supabase",
  laravel: "mdi:laravel",
  firebase: "selfhst:firebase-light",
  postman: "devicon-plain:postman",
  chrome: "simple-icons:googlechrome",
  github: "mdi:github",
  vercel: "ion:logo-vercel",
};

interface ToolIconProps {
  name: ToolType;
  className?: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = "w-7 h-7" }) => {
  const iconName = ICON_MAP[name] || "solar:box-bold-duotone";
  return <Icon icon={iconName} className={className} />;
};
