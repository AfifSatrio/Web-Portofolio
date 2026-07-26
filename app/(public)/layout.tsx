import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgressWidget } from "@/components/ui/ScrollProgressWidget";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col font-sans relative">
      <ScrollProgressWidget />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
