import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowDownRight } from "lucide-react";

export const HeroActions = () => {
  return (
    <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-1">
      <Link href="/projects">
        <Button size="lg" variant="primary" className="w-full sm:w-auto">
          <span>See My Projects</span>
          <ArrowDownRight className="w-5 h-5" />
        </Button>
      </Link>

      <Link href="/contact">
        <Button size="lg" variant="outline" className="w-full sm:w-auto">
          <span>Contact Me</span>
        </Button>
      </Link>
    </div>
  );
};
