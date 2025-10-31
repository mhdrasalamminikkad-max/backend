import { Card } from "@/components/ui/card";
import { ClassName } from "@shared/schema";

interface ClassCardProps {
  className: ClassName;
  studentCount: number;
  onClick: () => void;
  lastMarked?: boolean;
}

export default function ClassCard({ className, studentCount, onClick, lastMarked }: ClassCardProps) {
  return (
    <Card
      className="p-6 cursor-pointer hover-elevate active-elevate-2"
      onClick={onClick}
      data-testid={`card-class-${className.toLowerCase().replace(" ", "-")}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold text-foreground">{className}</h3>
          <p className="text-sm text-muted-foreground">{studentCount} students</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="material-icons text-primary text-3xl">school</span>
          {lastMarked && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="material-icons text-sm text-primary">check_circle</span>
              <span>Marked today</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
