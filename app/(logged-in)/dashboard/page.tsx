import BgGradient from "@/components/common/bg-gradient";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SummaryCard from "@/components/summaries/summary-card";
import { getSummaries } from "@/lib/summary";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptySummaryState from "@/components/summaries/empty-summary-state";

export default async function DashBoardPage() {
  const user = await currentUser();
  const userId = user?.id;

  if (!userId) return redirect("/sign-in");

  const uploadLimit = 5;
  const summaries = await getSummaries(userId);

  return (
    <main className="min-h-screen relative bg-gray-50">
      {/* Background Gradient */}
      <BgGradient className="absolute inset-0 -z-10 from-emerald-200 via-teal-200 to-cyan-200" />

      <div className="container mx-auto flex flex-col gap-8 py-16 px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Your Summaries
            </h1>
            <p className="text-gray-600 max-w-lg">
              Transform your PDFs into concise, actionable insights
            </p>
          </div>

          {/* New Summary Button */}
          <Button
            variant="default"
            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <Link href="/upload" className="flex items-center gap-2">
              New Summary
            </Link>
          </Button>
        </div>

        {/* Upload Limit Banner */}
        <div className="w-full">
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 text-rose-800 shadow-sm">
            <p className="text-center text-base font-medium">
              You have reached the limit of {uploadLimit} uploads on the Basic
              plan.{" "}
              <Link
                href="/#pricing"
                className="text-rose-800 underline font-semibold underline-offset-4 inline-flex items-center gap-1"
              >
                Click here to upgrade to Pro <ArrowRight className="w-4 h-4" />
              </Link>{" "}
              for unlimited uploads
            </p>
          </div>
        </div>

        {summaries.length === 0 ? (
          <EmptySummaryState/>
        ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {summaries.map((summary, index) => (
            <SummaryCard key={index} summary={summary} />
          ))}
        </div>
        )}
      </div>
    </main>
  );
}
