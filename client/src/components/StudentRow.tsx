import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface StudentRowProps {
  studentId: string;
  studentName: string;
  initialStatus?: "present" | "absent" | null;
  initialReason?: string;
  onStatusChange: (status: "present" | "absent", reason?: string) => void;
}

export default function StudentRow({
  studentId,
  studentName,
  initialStatus = null,
  initialReason = "",
  onStatusChange,
}: StudentRowProps) {
  const [status, setStatus] = useState<"present" | "absent" | null>(initialStatus);
  const [reason, setReason] = useState(initialReason);
  const [showReason, setShowReason] = useState(initialStatus === "absent");

  const handlePresent = () => {
    setStatus("present");
    setShowReason(false);
    setReason("");
    onStatusChange("present");
  };

  const handleAbsent = () => {
    setStatus("absent");
    setShowReason(true);
    onStatusChange("absent", reason);
  };

  const handleReasonChange = (value: string) => {
    setReason(value);
    if (status === "absent") {
      onStatusChange("absent", value);
    }
  };

  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between min-h-[72px] px-4 py-3 gap-4">
        <span className="text-lg flex-1" data-testid={`text-student-name-${studentId}`}>
          {studentName}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant={status === "present" ? "default" : "outline"}
            size="default"
            onClick={handlePresent}
            data-testid={`button-present-${studentId}`}
            className={status === "present" ? "bg-primary" : ""}
          >
            <span className="material-icons text-lg mr-1">check</span>
            Present
          </Button>
          <Button
            variant={status === "absent" ? "destructive" : "outline"}
            size="default"
            onClick={handleAbsent}
            data-testid={`button-absent-${studentId}`}
          >
            <span className="material-icons text-lg mr-1">close</span>
            Absent
          </Button>
        </div>
      </div>
      {showReason && (
        <div className="px-4 pb-4" style={{ visibility: showReason ? "visible" : "hidden" }}>
          <Textarea
            placeholder="Optional reason..."
            value={reason}
            onChange={(e) => handleReasonChange(e.target.value)}
            className="resize-none h-20"
            data-testid={`input-reason-${studentId}`}
          />
        </div>
      )}
    </div>
  );
}
