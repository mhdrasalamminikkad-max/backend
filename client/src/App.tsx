import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "@/components/HomePage";
import ClassSelection from "@/components/ClassSelection";
import AttendanceList from "@/components/AttendanceList";
import SummaryPage from "@/components/SummaryPage";
import { Prayer, ClassName } from "@shared/schema";
import { Button } from "@/components/ui/button";

type View = 
  | { type: "home" }
  | { type: "class-selection"; prayer: Prayer }
  | { type: "attendance"; prayer: Prayer; className: ClassName }
  | { type: "summary" };

function App() {
  const [view, setView] = useState<View>({ type: "home" });

  const renderView = () => {
    switch (view.type) {
      case "home":
        return (
          <div className="relative">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="outline"
                onClick={() => setView({ type: "summary" })}
                data-testid="button-view-summary"
                className="gap-2"
              >
                <span className="material-icons text-lg">assessment</span>
                Summary
              </Button>
            </div>
            <HomePage onPrayerSelect={(prayer) => setView({ type: "class-selection", prayer })} />
          </div>
        );
      
      case "class-selection":
        return (
          <ClassSelection
            prayer={view.prayer}
            onClassSelect={(className) => 
              setView({ type: "attendance", prayer: view.prayer, className })
            }
            onBack={() => setView({ type: "home" })}
          />
        );
      
      case "attendance":
        return (
          <AttendanceList
            prayer={view.prayer}
            className={view.className}
            onBack={() => setView({ type: "class-selection", prayer: view.prayer })}
          />
        );
      
      case "summary":
        return <SummaryPage onBack={() => setView({ type: "home" })} />;
      
      default:
        return <HomePage onPrayerSelect={(prayer) => setView({ type: "class-selection", prayer })} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {renderView()}
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
