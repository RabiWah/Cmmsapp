import * as React from "react";
import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
  time?: string;
  setTime: (time: string) => void;
}

export function TimePicker({ time, setTime }: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const [selectedHour, setSelectedHour] = React.useState<string>(
    time ? time.split(":")[0] : "09",
  );
  const [selectedMinute, setSelectedMinute] = React.useState<string>(
    time ? time.split(":")[1] : "00",
  );

  React.useEffect(() => {
    const formattedHour = selectedHour.padStart(2, "0");
    const formattedMinute = selectedMinute.padStart(2, "0");
    setTime(`${formattedHour}:${formattedMinute}`);
  }, [selectedHour, selectedMinute, setTime]);

  return (
    <div className="flex items-center space-x-2">
      <Button variant={"outline"} size="icon" className="w-8 h-8 p-0" disabled>
        <Clock className="h-4 w-4" />
      </Button>
      <Select
        value={selectedHour}
        onValueChange={(value) => setSelectedHour(value)}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Hour" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          {hours.map((hour) => (
            <SelectItem key={hour} value={hour.toString().padStart(2, "0")}>
              {hour.toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm">:</span>
      <Select
        value={selectedMinute}
        onValueChange={(value) => setSelectedMinute(value)}
      >
        <SelectTrigger className="w-[70px]">
          <SelectValue placeholder="Minute" />
        </SelectTrigger>
        <SelectContent className="max-h-[200px] overflow-y-auto">
          {minutes.map((minute) => (
            <SelectItem key={minute} value={minute.toString().padStart(2, "0")}>
              {minute.toString().padStart(2, "0")}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
