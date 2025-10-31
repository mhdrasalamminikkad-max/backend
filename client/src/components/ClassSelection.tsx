import { ClassName, Prayer, classes } from "@shared/schema";
import ClassCard from "./ClassCard";
import { Button } from "@/components/ui/button";

interface ClassSelectionProps {
  prayer: Prayer;
  onClassSelect: (className: ClassName) => void;
  onBack: () => void;
}

export default function ClassSelection({ prayer, onClassSelect, onBack }: ClassSelectionProps) {
  const today = new Date().toLocaleDateString("en-US", { 
    weekday: "long", 
    month: "short", 
    day: "numeric" 
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            data-testid="button-back"
          >
            <span className="material-icons">arrow_back</span>
          </Button>
          <div className="flex flex-col items-center flex-1 px-4">
            <h2 className="text-2xl font-semibold text-foreground">{prayer}</h2>
            <p className="text-sm text-muted-foreground">{today}</p>
          </div>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h3 className="text-xl font-semibold text-foreground mb-6">Select a Class</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {classes.map((className) => (
            <ClassCard
              key={className}
              className={className}
              studentCount={15}
              onClick={() => onClassSelect(className)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
