"use client";

import type { BookableDateOption } from "@/lib/reservationSlots";

type ReservationDatePickerProps = {
  label: string;
  todayLabel: string;
  value: string;
  options: BookableDateOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
};

export function ReservationDatePicker({
  label,
  todayLabel,
  value,
  options,
  onChange,
  disabled = false,
}: ReservationDatePickerProps) {
  return (
    <div className="reservation-field col-span-full sm:col-span-1">
      <span className="reservation-field__label mb-2 block text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#d6c7aa]">
        {label}
      </span>
      <div
        className="reservation-date-picker"
        role="radiogroup"
        aria-label={label}
      >
        <div className="reservation-date-picker__track">
          {options.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={disabled}
                className={`reservation-date-picker__chip${selected ? " is-selected" : ""}`}
                onClick={() => onChange(option.value)}
              >
                <span className="reservation-date-picker__weekday">
                  {option.isToday ? todayLabel : option.weekday}
                </span>
                <span className="reservation-date-picker__day">{option.day}</span>
                <span className="reservation-date-picker__month">{option.month}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
