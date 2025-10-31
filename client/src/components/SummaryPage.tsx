import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { prayers, classes } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SummaryPageProps {
  onBack: () => void;
}

export default function SummaryPage({ onBack }: SummaryPageProps) {
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);

  const dailySummary = prayers.map(prayer => ({
    prayer,
    present: Math.floor(Math.random() * 80) + 10,
    absent: Math.floor(Math.random() * 10),
    total: 90,
  }));

  const classSummary = classes.map(className => ({
    className,
    present: Math.floor(Math.random() * 13) + 2,
    total: 15,
  }));

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
          <h2 className="text-2xl font-semibold text-foreground flex-1 text-center">
            Attendance Summary
          </h2>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <Tabs defaultValue="daily" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily" data-testid="tab-daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly" data-testid="tab-weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" data-testid="tab-monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="material-icons text-lg">calendar_today</span>
              <span>{new Date(selectedDate).toLocaleDateString("en-US", { 
                weekday: "long", 
                month: "long", 
                day: "numeric", 
                year: "numeric" 
              })}</span>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Prayer Attendance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailySummary.map(({ prayer, present, absent, total }) => (
                  <Card key={prayer} className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">{prayer}</h4>
                      <span className="text-2xl font-bold text-primary">
                        {present}/{total}
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(present / total) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                      <span>{present} present</span>
                      <span>{absent} absent</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Class Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {classSummary.map(({ className, present, total }) => (
                  <Card key={className} className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="material-icons text-primary">school</span>
                      <h4 className="font-semibold">{className}</h4>
                    </div>
                    <div className="text-2xl font-bold text-foreground">
                      {present}/{total}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.round((present / total) * 100)}% attendance
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6 mt-6">
            <Card className="p-8 text-center">
              <span className="material-icons text-6xl text-muted-foreground mb-4">date_range</span>
              <h3 className="text-xl font-semibold mb-2">Weekly Summary</h3>
              <p className="text-muted-foreground">
                View attendance trends across the week
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6 mt-6">
            <Card className="p-8 text-center">
              <span className="material-icons text-6xl text-muted-foreground mb-4">event</span>
              <h3 className="text-xl font-semibold mb-2">Monthly Summary</h3>
              <p className="text-muted-foreground">
                Comprehensive monthly attendance reports
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
