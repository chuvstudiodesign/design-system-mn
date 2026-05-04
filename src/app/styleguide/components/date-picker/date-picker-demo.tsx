"use client";

import * as React from "react";
import { DatePicker } from "@/components/date-picker";

export function DatePickerBasicDemo() {
  const [date, setDate] = React.useState<Date | undefined>();
  return (
    <div className="flex flex-col gap-2">
      <DatePicker date={date} onDateChange={setDate} />
      <p className="font-mono text-[12px] text-muted-foreground">
        Selecionado: {date ? date.toLocaleDateString("pt-BR") : "nenhum"}
      </p>
    </div>
  );
}

export function DatePickerDisabledPastDemo() {
  const [date, setDate] = React.useState<Date | undefined>();
  return (
    <DatePicker
      date={date}
      onDateChange={setDate}
      placeholder="A partir de hoje"
      disabledDates={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
    />
  );
}
