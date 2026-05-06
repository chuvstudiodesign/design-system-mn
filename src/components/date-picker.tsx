"use client";

import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  disabledDates?: (date: Date) => boolean;
}

function DatePicker({
  date,
  onDateChange,
  placeholder = "Selecionar data",
  disabled = false,
  className,
  disabledDates,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={<Button variant="outline" disabled={disabled} className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground", className)} />}>
          <CalendarIcon className="mr-2 size-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-[30px]" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            onDateChange?.(d);
            setOpen(false);
          }}
          disabled={disabledDates}
          locale={ptBR}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
