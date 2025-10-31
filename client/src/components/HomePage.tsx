import { Prayer, prayers } from "@shared/schema";
import PrayerButton from "./PrayerButton";
import caliphLogo from "@assets/generated_images/Caliph_Islamic_school_logo_7e9afe23.png";

interface HomePageProps {
  onPrayerSelect: (prayer: Prayer) => void;
}

export default function HomePage({ onPrayerSelect }: HomePageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-12 px-4">
      <div className="w-full max-w-4xl flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-6">
          <img
            src={caliphLogo}
            alt="Caliph Logo"
            className="w-32 h-32 md:w-40 md:h-40"
            style={{ filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.15))" }}
            data-testid="img-caliph-logo"
          />
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
              Caliph Attendance
            </h1>
            <p className="text-lg text-muted-foreground">
              Select a prayer to mark attendance
            </p>
          </div>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prayers.map((prayer) => (
            <PrayerButton
              key={prayer}
              prayer={prayer}
              onClick={() => onPrayerSelect(prayer)}
            />
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground mt-8">
          <p>{new Date().toLocaleDateString("en-US", { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })}</p>
        </div>
      </div>
    </div>
  );
}
