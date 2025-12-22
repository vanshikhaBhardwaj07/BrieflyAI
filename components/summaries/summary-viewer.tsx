'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { NavigationControls } from "./navigation-controls";

import { parseSummary } from "@/lib/summary-helpers";
import ProgressBar from "./progress-bar";

type Section = {
  title: string;
  points: string[];
};

// New ContentSection component
function ContentSection({ title, points }: { title: string; points: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

export function SummaryViewer({ summary }: { summary: string }) {
  const sections = parseSummary(summary);
  const [currentSection, setCurrentSection] = useState(0);

  const section = sections[currentSection];
  if (!section) return <div className="p-4 text-muted-foreground">No summary available.</div>;

  const isPdfTitle = currentSection === 0;
  const visiblePoints = isPdfTitle ? section.points.slice(0, 1) : section.points;

  const handlePrevious = () =>
    setCurrentSection((p) => Math.max(p - 1, 0));

  const handleNext = () =>
    setCurrentSection((p) => Math.min(p + 1, sections.length - 1));

  return (
    <Card className="relative h-[600px] pt-14 w-full xl:w-[600px] overflow-hidden rounded-3xl border border-rose-500/10 bg-linear-to-br from-background via-background/95 to-rose-500/5 shadow-2xl">


      {/* HEADER */}
      <CardHeader className="pb-2 flex flex-col items-center">
        <CardTitle className="text-xl font-semibold text-center">
          {section.title.replace(/^Summary:\s*/, "")}
        </CardTitle>

        {/* Progress bar */}
        <ProgressBar
          sections={sections}
          currentSection={currentSection}
        />
      </CardHeader>

      {/* CONTENT */}
      <CardContent className="h-full overflow-y-auto pb-24 space-y-4">
        {visiblePoints.length > 0 ? (
          <ContentSection title={section.title} points={visiblePoints} />
        ) : (
          <p className="text-muted-foreground">No details for this section.</p>
        )}
      </CardContent>

      {/* NAVIGATION */}
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}

