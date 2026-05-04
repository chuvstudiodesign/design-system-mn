"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

export function CalendarSingleDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-[10px] bg-card"
      />
      <p className="font-mono text-[12px] text-muted-foreground">
        Selecionado:{" "}
        {date ? date.toLocaleDateString("pt-BR") : "nenhum"}
      </p>
    </div>
  );
}

export function CalendarRangeDemo() {
  const [range, setRange] = React.useState<{
    from: Date | undefined;
    to?: Date | undefined;
  }>({ from: undefined, to: undefined });

  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="range"
        selected={range}
        onSelect={(r) => setRange(r ?? { from: undefined })}
        className="rounded-[10px] bg-card"
      />
      <p className="font-mono text-[12px] text-muted-foreground">
        De:{" "}
        {range.from ? range.from.toLocaleDateString("pt-BR") : "—"} até{" "}
        {range.to ? range.to.toLocaleDateString("pt-BR") : "—"}
      </p>
    </div>
  );
}

export function CalendarMultipleDemo() {
  const [dates, setDates] = React.useState<Date[] | undefined>([]);
  return (
    <div className="flex flex-col gap-3">
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-[10px] bg-card"
      />
      <p className="font-mono text-[12px] text-muted-foreground">
        Selecionados: {dates?.length ?? 0} dia(s)
      </p>
    </div>
  );
}
