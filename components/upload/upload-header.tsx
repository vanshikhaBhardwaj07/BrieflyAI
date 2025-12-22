import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';


export default function UploadHeader() {
   return (
      <div className="flex flex-col items-center gap-8 text-center">

          {/* AI Badge */}
          <div className="p-px rounded-full overflow-hidden bg-gradient-to-r from-rose-900 via-black to-rose-800 animate-gradient-x shadow-xl">
            <Badge className="flex items-center gap-2 px-6 py-2 bg-white text-rose-900 border border-rose-900 rounded-full font-medium">
              <Sparkles className="h-5 w-5 text-rose-700 animate-pulse" />
              <span>AI-Powered Content Creation</span>
            </Badge>
          </div>

          {/* ✔ Now Text is Black so it shows perfectly */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight leading-snug">
            Start Uploading{" "}
            <span className="relative">
              <span className="relative z-10 text-black font-extrabold">PDFs</span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-rose-600/40 -rotate-1 rounded-md blur-[2px]"
              />
            </span>
            {" "}Today
          </h1>

          <p className="text-lg text-gray-800 max-w-xl">
            Upload your PDF and let our AI create summaries instantly ✨
          </p>

        </div>
   )
}