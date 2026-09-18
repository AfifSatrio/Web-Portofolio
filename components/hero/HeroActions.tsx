import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { ArrowUpRight } from "lucide-react";
export function HeroActions() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full sm:w-auto">
      <Link href="/projects" className={buttonStyles({ size: "lg" })}>
        See my projects <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      <Link
        href="/contact"
        className={buttonStyles({ size: "lg", variant: "outline" })}
      >
        Discuss a project
      </Link>
    </div>
  );
}
