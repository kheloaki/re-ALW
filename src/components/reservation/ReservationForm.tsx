"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import type { Dictionary } from "@/i18n/types";

const INPUT_CLASS =
  "w-full rounded-xl border border-[#c59a54]/65 bg-[#5a544c]/85 px-4 text-[#f8e8c0] placeholder:text-[#d6c7aa]/90 outline-none transition focus:border-[#e4c47a]/80 focus:ring-2 focus:ring-[#d6ad63]/25";

type ReservationFormProps = {
  labels: Dictionary["reservation"];
};

type FormStatus = "idle" | "sending" | "success" | "error";

export function ReservationForm({ labels }: ReservationFormProps) {
  const { locale, dict } = useLocale();
  const f = dict.reservationForm;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const minDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Casablanca",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("company") ?? "").trim()) return;

    setStatus("sending");
    setErrorCode(null);

    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      date: String(data.get("date") ?? ""),
      time: String(data.get("time") ?? ""),
      guests: Number(data.get("guests")),
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
      form.reset();
    } catch {
      setErrorCode("network");
      setStatus("error");
    }
  }

  const errorMessage =
    errorCode === "not_configured"
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
      noValidate={false}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="col-span-full sm:col-span-2">
          <span className="sr-only">{labels.name}</span>
          <input
            className={`${INPUT_CLASS} h-11 sm:h-12 lg:h-[50px]`}
            type="text"
            name="name"
            placeholder={labels.name}
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            disabled={status === "sending"}
          />
        </label>
        <label>
          <span className="sr-only">{labels.phone}</span>
          <input
            className={`${INPUT_CLASS} h-11 sm:h-12 lg:h-[50px]`}
            type="tel"
            name="phone"
            placeholder={labels.phone}
            autoComplete="tel"
            required
            minLength={8}
            maxLength={32}
            disabled={status === "sending"}
          />
        </label>
        <label>
          <span className="sr-only">{labels.date}</span>
          <input
            className={`${INPUT_CLASS} h-11 sm:h-12 lg:h-[50px]`}
            type="date"
            name="date"
            min={minDate}
            required
            disabled={status === "sending"}
          />
        </label>
        <label>
          <span className="sr-only">{labels.time}</span>
          <input
            className={`${INPUT_CLASS} h-11 sm:h-12 lg:h-[50px]`}
            type="time"
            name="time"
            required
            disabled={status === "sending"}
          />
        </label>
        <label>
          <span className="sr-only">{labels.guests}</span>
          <input
            className={`${INPUT_CLASS} h-11 sm:h-12 lg:h-[50px]`}
            type="number"
            name="guests"
            min={1}
            max={30}
            placeholder={labels.guests}
            required
            disabled={status === "sending"}
          />
        </label>
        <label className="col-span-full">
          <span className="sr-only">{labels.specialRequests}</span>
          <textarea
            className={`${INPUT_CLASS} min-h-[5.5rem] resize-none sm:min-h-[5.75rem] lg:min-h-[5.25rem]`}
            name="specialRequests"
            placeholder={labels.specialRequests}
            rows={3}
            maxLength={2000}
            disabled={status === "sending"}
          />
        </label>
        <label className="sr-only" aria-hidden tabIndex={-1}>
          <input type="text" name="company" autoComplete="off" tabIndex={-1} />
        </label>
      </div>

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
        disabled={status === "sending" || status === "success"}
      >
        {status === "sending" ? f.sending : labels.confirm}
      </button>
    </form>
  );
}
