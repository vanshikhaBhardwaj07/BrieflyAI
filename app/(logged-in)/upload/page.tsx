import BgGradient from "@/components/common/bg-gradient";
import { Badge } from "@/components/ui/badge";
import UploadForm from "@/components/upload/upload-form";
import UploadHeader from "@/components/upload/upload-header";
import { Sparkles } from "lucide-react";

export default function Page() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BgGradient className="absolute inset-0 -z-10 from-rose-200 via-rose-400/70 to-rose-700/80 animate-gradient-x" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          
          <UploadHeader />

          <div className="w-full flex justify-center">
            <UploadForm />
          </div>

        </div>
      </div>
    </section>
  );
}
