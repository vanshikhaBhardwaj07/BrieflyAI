"use client";

import z from "zod";
import { Button } from "../ui/button";
import UploadFormInput from "./upload-form-input";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";


const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 20 * 1024 * 1024, "File must be less than 20MB")
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { startUpload } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => console.log("Upload successful"),
    onUploadError: (err) => {
      console.error(err);
      toast.error("Upload failed");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      const validated = schema.safeParse({ file });
      if (!validated.success) {
        toast.error(
          validated.error.flatten().fieldErrors.file?.[0] ?? "Invalid file"
        );
        return;
      }

      toast("📁 Uploading PDF...");
      const uploadRes = await startUpload([file]);

      if (!uploadRes) {
        toast.error("Upload failed");
        return;
      }

      toast("🧠 Generating summary...");
      const summaryResult = await generatePdfSummary(uploadRes);

      if (!summaryResult?.success || !summaryResult.data) {
        toast.error("Failed to generate summary");
        return;
      }

      const { summary, title, fileName } = summaryResult.data;

      if (!summary) {
        toast.error("Failed to generate summary");
        return;
      }

      toast("💾 Saving summary...");
      const storeResult = await storePdfSummaryAction({
        fileUrl: uploadRes[0].serverData.file.ufsUrl,
        summary,
        title,
        fileName,
      });

      if (!storeResult.success || !storeResult.data?.id) {
        toast.error("Failed to save summary");
        return;
      }

      toast.success("Summary saved!");
      router.push(`/summaries/${storeResult.data.id}`);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      formRef.current?.reset();
    }
  };

  return (
   <div className="relative">
  <UploadFormInput
    ref={formRef}
    isLoading={isLoading}
    onSubmit={handleSubmit}
  />
  {isLoading && (
    <>
      <div className="absolute inset-0 flex items-center justify-center bg-background/50">
        <div className="border-t border-gray-200 dark:border-gray-800 w-full"></div>
        <span className="absolute bg-background px-3 text-muted-foreground text-sm">
          Processing
        </span>
      </div>
      
    </>
  )}
</div>

  );
}
