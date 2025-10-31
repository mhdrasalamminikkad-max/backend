import { useState } from "react";
import { ClassName, Prayer } from "@shared/schema";
import StudentRow from "./StudentRow";
import { Button } from "@/components/ui/button";

interface AttendanceListProps {
  prayer: Prayer;
  className: ClassName;
  onBack: () => void;
}

const dummyStudents = [
  "Ahmed Hassan",
  "Fatima Ali",
  "Omar Khan",
  "Aisha Rahman",
  "Yusuf Ibrahim",
  "Zaynab Malik",
  "Muhammad Farid",
  "Maryam Aziz",
  "Abdullah Syed",
  "Khadija Noor",
  "Hassan Ahmed",
  "Amina Said",
  "Ibrahim Tariq",
  "Safiya Iqbal",
  "Bilal Hussain",
];

export default function AttendanceList({ prayer, className, onBack }: AttendanceListProps) {
  const [attendance, setAttendance] = useState<Record<string, { status: "present" | "absent"; reason?: string }>>({});

  const handleStatusChange = (studentId: string, status: "present" | "absent", reason?: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { status, reason }
    }));
    console.log(`Student ${studentId}: ${status}${reason ? ` - ${reason}` : ""}`);
  };

  const presentCount = Object.values(attendance).filter(a => a.status === "present").length;
  const totalCount = dummyStudents.length;

  const today = new Date().toLocaleDateString("en-US", { 
    weekday: "long", 
    month: "short", 
    day: "numeric" 
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto p-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              data-testid="button-back"
            >
              <span className="material-icons">arrow_back</span>
            </Button>
            <div className="flex flex-col items-center flex-1 px-4">
              <h2 className="text-2xl font-semibold text-foreground">{prayer} - {className}</h2>
              <p className="text-sm text-muted-foreground">{today}</p>
            </div>
            <div className="w-10"></div>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="material-icons text-primary text-sm">people</span>
            <span className="font-medium text-foreground" data-testid="text-attendance-count">
              {presentCount}/{totalCount} present
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {dummyStudents.map((name, index) => (
          <StudentRow
            key={index}
            studentId={`student-${index}`}
            studentName={name}
            onStatusChange={(status, reason) => handleStatusChange(`student-${index}`, status, reason)}
          />
        ))}
      </div>
    </div>
  );
}
