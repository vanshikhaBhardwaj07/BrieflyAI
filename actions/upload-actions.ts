"use server";

import { getDbConnection } from "@/lib/db";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromOpenAI } from "@/lib/openai";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/* ================= TYPES ================= */

interface PdfSummaryType {
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}

interface UploadResponse {
  serverData: {
    userId: string;
    file: {
      ufsUrl: string;
      name: string;
    };
  };
}

/* ================= GENERATE SUMMARY ================= */

export async function generatePdfSummary(
  uploadResponse: UploadResponse[]
) {
  if (!uploadResponse || uploadResponse.length === 0) {
    return { success: false, message: "File upload failed", data: null };
  }

  const {
    serverData: {
      file: { ufsUrl: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl) {
    return { success: false, message: "Invalid PDF URL", data: null };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    const summary = await generateSummaryFromOpenAI(pdfText || "");

    return {
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
        title: fileName.replace(".pdf", ""),
        fileName,
        fileUrl: pdfUrl,
      },
    };
  } catch (error) {
    console.error("Error generating summary", error);
    return { success: false, message: "Failed to generate summary", data: null };
  }
}

/* ================= SAVE TO DATABASE ================= */

async function savePdfSummary({
  userId,
  fileUrl,
  summary,
  title,
  fileName,
}: {
  userId: string;
  fileUrl: string;
  summary: string;
  title: string;
  fileName: string;
}) {
  const sql = await getDbConnection();

  const [savedSummary] = await sql`
    INSERT INTO pdf_summaries (
      user_id,
      original_file_url,
      summary_text,
      status,
      title,
      file_name
    )
    VALUES (
      ${userId},
      ${fileUrl},
      ${summary},
      'completed',
      ${title},
      ${fileName}
    )
    RETURNING id;
  `;

  return savedSummary;
} // ✅ Fixed missing closing brace

export async function storePdfSummaryAction({
  fileUrl,
  summary,
  title,
  fileName,
}: PdfSummaryType) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, message: "User not authenticated" };
    }

    const saved = await savePdfSummary({
      userId,
      fileUrl,
      summary,
      title,
      fileName,
    });

    if (!saved?.id) {
      return { success: false, message: "Failed to save summary" };
    }

    const insertedId = saved.id;

    // ✅ Correct cache revalidation
    revalidatePath("/dashboard");
    revalidatePath(`/summaries/${insertedId}`);

    return {
      success: true,
      message: "Summary saved successfully",
      data: {
        id: insertedId,
      },
    };
  } catch (error) {
    console.error("Error storing PDF summary", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error saving PDF summary",
    };
  }
}
