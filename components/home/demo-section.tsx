import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        {/* Background gradient shape */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-xl -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-6xl"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.1%, 74.1% 44.1%)",
            }}
          ></div>
        </div>

        {/* Centered Pizza Icon */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center justify-center p-6 rounded-2xl bg-gray-100/80 backdrop-blur-xs border border-gray-500/20 w-20 h-20 shadow-md">
            <Pizza className="w-10 h-10 text-[#b76e79]" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-16">
          <h3 className="font-bold text-3xl max-w-2xl mx-auto px-6">
            Watch how BrieflyAI transforms{" "}
            <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
              This Next.js course PDF
            </span>
          </h3>
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6"> 
           {/**Summary Viewer */}
        </div>
      </div>
    </section>
  );
}
