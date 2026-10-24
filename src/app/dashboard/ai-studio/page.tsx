"use client";

import React, { Suspense } from "react";
import { AIStudio } from "@/components/dashboard/AIStudio";
import { Loader2 } from "lucide-react";

export default function AIStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <span className="text-xs text-muted-foreground">Initializing AI Content Studio...</span>
        </div>
      }
    >
      <AIStudio />
    </Suspense>
  );
}
