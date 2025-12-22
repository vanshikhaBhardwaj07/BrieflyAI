import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { MotionSection } from "../common/motion-wrapper";
import { containerVariants } from "@/utils/constants";

export default function HeroSection() {
  return (
    <MotionSection 
       variants={containerVariants}
       initial="hidden"
       animate="visible"
    className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
      <div className="flex flex-col items-center gap-6">
        {/* 🔹 Smooth Animated Badge */}
        <Badge
          className="
            relative flex items-center gap-2 px-4 py-2 overflow-hidden rounded-full
            bg-transparent border border-[#b76e79]
            text-[#b76e79] font-semibold shadow-none
            transition-all duration-500 ease-in-out
            hover:bg-[#b76e79]/10 hover:shadow-[0_0_15px_rgba(183,110,121,0.5)]
          "
        >
          <Sparkles className="h-5 w-5 text-[#b76e79] animate-pulse transition-all duration-500 ease-in-out" />
          <p>Powered by AI</p>
        </Badge>

        {/* 🔹 Headings */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 relative leading-tight">
          Transform PDFs into{" "}
          <span className="relative text-[#b76e79] drop-shadow-[0_0_10px_rgba(183,110,121,0.6)] transition-all duration-500 ease-in-out">
            concise
          </span>{" "}
          summaries
        </h1>

        <h2 className="text-lg sm:text-xl text-gray-600 max-w-2xl">
          Get a beautiful summary reel of your document in seconds
        </h2>

        {/* 🔹 Smoother Gradient Button */}
        <Button
  size="lg"
  variant="link"
  className="
    relative overflow-hidden
    text-white mt-4 text-base sm:text-lg lg:text-xl rounded-full px-8 py-6 lg:mt-16
    bg-linear-to-r from-slate-900 via-[#b76e79] to-[#a34e5c]
    bg-size-[200%_200%]
    transition-all duration-800 ease-in-out
    hover:bg-position-[100%_0]
    hover:shadow-[0_0_20px_rgba(183,110,121,0.6)]
    font-bold shadow-md hover:scale-[1.05]
  " 
>
  <Link
    href="/#pricing"
    className="flex gap-2 items-center no-underline hover:no-underline"
  >
    <span>Try BrieflyAI.</span>
    <ArrowRight className="animate-pulse" />
  </Link>
</Button>

      </div>
    </MotionSection>
  );
}
