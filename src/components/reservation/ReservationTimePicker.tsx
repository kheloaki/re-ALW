"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  composeReservationTime,
  padTimeUnit,
  parseReservationTime,
  RESERVATION_HOURS,
  RESERVATION_MINUTES,
} from "@/lib/reservationSlots";

const TRIGGER_CLASS =
  "w-full rounded-xl border border-[#c59a54]/65 bg-[#5a544c]/85 px-4 text-[#f8e8c0] outline-none transition focus:border-[#e4c47a]/80 focus:ring-2 focus:ring-[#d6ad63]/25";

type ReservationTimePickerProps = {
  label: string;
  placeholder: string;
  hourLabel: string;
  minuteLabel: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="reservation-field__label mb-1.5 block text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#d6c7aa]">
      {children}
    </span>
  );
}

function TimeColumn({
  label,
  values,
  selected,
  onSelect,
  disabled,
}: {
  label: string;
  values: number[];
  selected: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "center" });
  }, [selected]);

  return (
    <div className="reservation-time-picker__column">
      <span className="reservation-time-picker__column-label">{label}</span>
      <div ref={listRef} className="reservation-time-picker__column-list" role="listbox" aria-label={label}>
        {values.map((unit) => {
          const formatted = padTimeUnit(unit);
          const isSelected = selected === formatted;
          return (
            <button
              key={formatted}
              ref={isSelected ? selectedRef : undefined}
              type="button"
              role="option"
              aria-selected={isSelected}
              disabled={disabled}
              className={`reservation-time-picker__option${isSelected ? " is-selected" : ""}`}
              onClick={() => onSelect(formatted)}
            >
              {formatted}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ReservationTimePicker({
  label,
  placeholder,
  hourLabel,
  minuteLabel,
  value,
  onChange,
  disabled = false,
}: ReservationTimePickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const { hour, minute } = parseReservationTime(value);
  const hasValue = Boolean(hour && minute);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectHour(nextHour: string) {
    onChange(composeReservationTime(nextHour, minute || "00"));
  }

  function selectMinute(nextMinute: string) {
    onChange(composeReservationTime(hour || "00", nextMinute));
  }

  return (
    <div className="reservation-field col-span-full sm:col-span-1">
      <FieldLabel>{label}</FieldLabel>
      <div ref={rootRef} className="reservation-time-picker relative">
        <button
          type="button"
          className={`${TRIGGER_CLASS} reservation-time-picker__trigger flex h-11 items-center justify-between gap-3 sm:h-12 lg:h-[50px] ${
            open ? "border-[#e4c47a]/80 ring-2 ring-[#d6ad63]/25" : ""
          }`}
          aria-label={label}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls={panelId}
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="reservation-time-picker__display flex min-w-0 items-center gap-2">
            {hasValue ? (
              <>
                <span className="reservation-time-picker__value">{hour}</span>
                <span className="reservation-time-picker__separator" aria-hidden>
                  :
                </span>
                <span className="reservation-time-picker__value">{minute}</span>
              </>
            ) : (
              <span className="reservation-time-picker__placeholder">{placeholder}</span>
            )}
          </span>
          <span
            className={`shrink-0 text-[#d6ad63] transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            ▾
          </span>
        </button>

        {open ? (
          <div
            id={panelId}
            className="reservation-time-picker__panel absolute start-0 top-[calc(100%+6px)] z-50 w-full min-w-[15rem] overflow-hidden rounded-xl border border-[#c59a54]/45 bg-[#3d3832]/98 shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-md"
            role="dialog"
            aria-label={label}
          >
            <div className="reservation-time-picker__panel-inner">
              <TimeColumn
                label={hourLabel}
                values={RESERVATION_HOURS}
                selected={hour}
                onSelect={selectHour}
                disabled={disabled}
              />
              <span className="reservation-time-picker__panel-separator" aria-hidden>
                :
              </span>
              <TimeColumn
                label={minuteLabel}
                values={RESERVATION_MINUTES}
                selected={minute}
                onSelect={selectMinute}
                disabled={disabled}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
