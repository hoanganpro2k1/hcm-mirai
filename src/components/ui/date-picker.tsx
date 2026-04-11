"use client";

import { format, isValid, parseISO } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: string | Date | null;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    { value, onChange, placeholder = "Chọn ngày", className, disabled },
    ref,
  ) => {
    const dateValue = React.useMemo(() => {
      if (!value) return undefined;
      const d = typeof value === "string" ? parseISO(value) : value;
      return d && isValid(d) ? d : undefined;
    }, [value]);

    return (
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant={"outline"}
              data-empty={!dateValue}
              disabled={disabled}
              className={cn(
                "w-full justify-between text-left font-normal h-8 rounded-lg border-input bg-transparent px-2.5 py-1 data-[empty=true]:text-muted-foreground",
                className,
              )}
            >
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateValue ? (
                  format(dateValue, "dd/MM/yyyy")
                ) : (
                  <span>{placeholder}</span>
                )}
              </div>
              <ChevronDownIcon
                className="size-4 opacity-50"
                data-icon="inline-end"
              />
            </Button>
          }
        />
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={onChange}
            defaultMonth={dateValue}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
