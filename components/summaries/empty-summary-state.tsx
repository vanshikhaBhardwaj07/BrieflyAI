import { FileText } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function EmptySummaryState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16">
      <FileText className="w-16 h-16 text-gray-400 mb-4" />

      <h2 className="text-xl font-semibold text-gray-700">
        No summaries yet
      </h2>

      <p className="text-gray-500 max-w-md mt-2">
        Upload your first PDF to get started with AI-powered summaries.
      </p>

      <Link href="/upload">
        <Button
          variant={"link"}
          className="mt-6 text-white bg-linear-to-r from-rose-500 to-rose-700 
          hover:from-rose-600 hover:to-rose-800 hover:no-underline"
        >
          Create Your First Summary
        </Button>
      </Link>
    </div>
  );
}
