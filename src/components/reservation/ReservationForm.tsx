"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { ReservationDatePicker } from "@/components/reservation/ReservationDatePicker";
import {
  DEFAULT_PHONE_REGION,
  ReservationPhoneField,
} from "@/components/reservation/ReservationPhoneField";
import { ReservationTimePicker } from "@/components/reservation/ReservationTimePicker";
import type { Dictionary } from "@/i18n/types";
import { findCountryByRegion, formatPhoneForSubmit } from "@/lib/phoneCountries";
import {
  getBookableDateOptions,
  getCasablancaDateString,
  getMaxReservationDateString,
  GUEST_COUNT_OPTIONS,
} from "@/lib/reservationSlots";

const INPUT_CLASS =
  "w-full rounded-xl border border-[#c59a54]/65 bg-[#5a544c]/85 px-4 text-[#f8e8c0] placeholder:text-[#d6c7aa]/90 outline-none transition focus:border-[#e4c47a]/80 focus:ring-2 focus:ring-[#d6ad63]/25";

const SELECT_CLASS = `${INPUT_CLASS} reservation-field__select appearance-none`;

type ReservationFormProps = {
  labels: Dictionary["reservation"];
};

type FormStatus = "idle" | "sending" | "success" | "error";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="reservation-field__label mb-1.5 block text-left text-xs font-semibold uppercase tracking-[0.08em] text-[#d6c7aa]">
      {children}
    </span>
  );
}

const INITIAL_FORM = {
  countryRegion: DEFAULT_PHONE_REGION,
  localPhone: "",
  selectedTime: "",
  guests: "",
};

export function ReservationForm({ labels }: ReservationFormProps) {
  const { locale, dict } = useLocale();
  const f = dict.reservationForm;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [countryRegion, setCountryRegion] = useState(INITIAL_FORM.countryRegion);
  const [localPhone, setLocalPhone] = useState(INITIAL_FORM.localPhone);
  const [selectedDate, setSelectedDate] = useState(() => getCasablancaDateString());
  const [selectedTime, setSelectedTime] = useState(INITIAL_FORM.selectedTime);
  const [guests, setGuests] = useState(INITIAL_FORM.guests);

  const minDate = useMemo(() => getCasablancaDateString(), []);
  const maxDate = useMemo(() => getMaxReservationDateString(), []);

  const dateOptions = useMemo(
    () => getBookableDateOptions(locale, minDate, maxDate),
    [locale, minDate, maxDate],
  );

  const disabled = status === "sending" || status === "success";

  function resetForm(form: HTMLFormElement) {
    form.reset();
    setCountryRegion(INITIAL_FORM.countryRegion);
    setLocalPhone(INITIAL_FORM.localPhone);
    setSelectedDate(getCasablancaDateString());
    setSelectedTime(INITIAL_FORM.selectedTime);
    setGuests(INITIAL_FORM.guests);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim()) return;

    const phone = formatPhoneForSubmit(
      findCountryByRegion(countryRegion).code,
      localPhone,
    );
    if (!phone || !selectedDate || !selectedTime || !guests) {
      setErrorCode("validation");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setErrorCode(null);

    const payload = {
      name: String(data.get("name") ?? ""),
      phone,
      date: selectedDate,
      time: selectedTime,
      guests: Number(guests),
      specialRequests: String(data.get("specialRequests") ?? ""),
      locale,
      company: "",
    };

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => null)) as { error?: string } | null;
        setErrorCode(json?.error ?? "send_failed");
        setStatus("error");
        return;
      }

      setStatus("success");
      resetForm(form);
    } catch {
      setErrorCode("network");
      setStatus("error");
    }
  }

  const errorMessage =
    errorCode === "validation"
      ? f.errorValidation
      : errorCode === "not_configured"
        ? f.errorNotConfigured
        : errorCode === "rate_limited"
          ? f.errorRateLimited
          : errorCode === "network"
            ? f.errorNetwork
            : f.errorGeneric;

  return (
    <form
      className="mx-auto mt-4 w-full max-w-[560px] rounded-[20px] bg-[#4b463f]/94 p-4 sm:mt-5 sm:rounded-[22px] sm:p-6 lg:mt-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="reservation-field col-span-full">
          <FieldLabel>{labels.name}</FieldLabel>
          <input
            className={`${INPUT_CLASS} h-11 sm:h-12 lg:h-[50px]`}
            type="text"
            name="name"
            placeholder={labels.namePlaceholder}
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            disabled={disabled}
          />
        </label>

        <div className="col-span-full">
          <ReservationPhoneField
            countryRegion={countryRegion}
            localPhone={localPhone}
            onCountryRegionChange={setCountryRegion}
            onLocalPhoneChange={setLocalPhone}
            label={labels.phone}
            placeholder={labels.phonePlaceholder}
            searchPlaceholder={labels.countrySearch}
            disabled={disabled}
          />
        </div>

        <label className="reservation-field col-span-full sm:col-span-1">
          <FieldLabel>{labels.guests}</FieldLabel>
          <select
            className={`${SELECT_CLASS} h-11 sm:h-12 lg:h-[50px]`}
            name="guests"
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
            required
            disabled={disabled}
          >
            <option value="" disabled>
              {labels.guestsPlaceholder}
            </option>
            {GUEST_COUNT_OPTIONS.map((count) => (
              <option key={count} value={count}>
                {count === 1
                  ? labels.guestSingular
                  : labels.guestPlural.replace("{count}", String(count))}
              </option>
            ))}
          </select>
        </label>

        <ReservationDatePicker
          label={labels.date}
          todayLabel={labels.today}
          value={selectedDate}
          options={dateOptions}
          onChange={setSelectedDate}
          disabled={disabled}
        />

        <ReservationTimePicker
          label={labels.time}
          placeholder={labels.timePlaceholder}
          hourLabel={labels.hour}
          minuteLabel={labels.minute}
          value={selectedTime}
          onChange={setSelectedTime}
          disabled={disabled}
        />

        <label className="reservation-field col-span-full">
          <FieldLabel>{labels.specialRequests}</FieldLabel>
          <textarea
            className={`${INPUT_CLASS} min-h-[5.5rem] resize-none sm:min-h-[5.75rem] lg:min-h-[5.25rem]`}
            name="specialRequests"
            placeholder={labels.specialRequestsPlaceholder}
            rows={3}
            maxLength={2000}
            disabled={disabled}
          />
        </label>

        <label className="sr-only" aria-hidden tabIndex={-1}>
          <input type="text" name="company" autoComplete="off" tabIndex={-1} />
        </label>
      </div>

      <p className="mt-3 text-center text-xs leading-relaxed text-[#c4b8a4]/90">{labels.hoursHint}</p>

      {status === "success" ? (
        <p
          className="mt-4 rounded-xl border border-[#8fbc6a]/50 bg-[#3d4a32]/90 px-4 py-3 text-center text-sm leading-relaxed text-[#e8f4d8] sm:text-base"
          role="status"
        >
          {f.success}
        </p>
      ) : null}

      {status === "error" ? (
        <p
          className="mt-4 rounded-xl border border-[#c45c5c]/45 bg-[#4a3232]/90 px-4 py-3 text-center text-sm leading-relaxed text-[#f5d4d4] sm:text-base"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className="gold-btn reservation-form__submit mt-4 w-full sm:mt-5"
        disabled={disabled}
      >
        {status === "sending" ? f.sending : labels.confirm}
      </button>
    </form>
  );
}
