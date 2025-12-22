'use client';

import React, { forwardRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react"; // Make sure you have this installed

interface UploadFormInputProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
  ({ onSubmit, isLoading = false }, ref) => {
    return (
      <form
        ref={ref}
        onSubmit={onSubmit}
        className="w-full max-w-xl flex items-center justify-center mx-auto"
      >
        <div className="flex items-center gap-3 w-full">
          <Input
            id="file"
            name="file"
            accept="application/pdf"
            required
            type="file"
            disabled={isLoading}
            className={cn(
              "w-full border-2 border-rose-600/60 rounded-xl bg-white/90 text-black file:bg-rose-900 file:text-white file:px-4 file:rounded-l-xl file:hover:bg-black focus:ring-2 focus:ring-rose-700 transition-all",
              isLoading && "opacity-50 cursor-not-allowed"
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="rounded-xl font-semibold px-6 py-5 text-white shadow-lg hover:shadow-rose-900/40 bg-linear-to-r from-rose-900 via-black to-rose-800 hover:from-black hover:via-rose-900 hover:to-black transition-all duration-300"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Processing...
              </span>
            ) : (
              "Upload"
            )}
          </Button>
        </div>
      </form>
    );
  }
);

UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;
