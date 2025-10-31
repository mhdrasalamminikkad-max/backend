import { Prayer } from "@shared/schema";
import { Button } from "@/components/ui/button";

interface PrayerButtonProps {
  prayer: Prayer;
  onClick: () => void;
}

const prayerIcons: Record<Prayer, string> = {
  Fajr: "wb_twilight",
  Dhuhr: "wb_sunny",
  Asr: "access_time",
  Maghrib: "brightness_3",
  Isha: "nightlight",
};

const prayerTimes: Record<Prayer, string> = {
  Fajr: "Before sunrise",
  Dhuhr: "Midday",
  Asr: "Afternoon",
  Maghrib: "Sunset",
  Isha: "Night",
};

export default function PrayerButton({ prayer, onClick }: PrayerButtonProps) {
  return (
    <Button
      variant="default"
      className="flex flex-col items-center justify-center min-h-[88px] w-full gap-2 px-8 py-6 rounded-2xl bg-primary text-primary-foreground border border-primary-border hover-elevate active-elevate-2"
      onClick={onClick}
      data-testid={`button-prayer-${prayer.toLowerCase()}`}
    >
      <span className="material-icons text-4xl">{prayerIcons[prayer]}</span>
      <div className="flex flex-col items-center gap-1">
        <span className="text-xl font-semibold">{prayer}</span>
        <span className="text-sm opacity-80">{prayerTimes[prayer]}</span>
      </div>
    </Button>
  );
}
