import { NextResponse } from "next/server";
import { parseReservationBody, sendReservationEmail } from "@/lib/reservationEmail";
import { getClientKeyFromRequest, isRateLimited } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isRateLimited(getClientKeyFromRequest(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = parseReservationBody(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.message }, { status: 400 });
  }

  try {
    await sendReservationEmail(parsed.data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown";
    if (message === "RESEND_NOT_CONFIGURED") {
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
