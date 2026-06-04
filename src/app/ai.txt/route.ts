import { buildLlmsTxt } from "@/lib/seo/llms";

export const dynamic = "force-static";

/** Miroir ai.txt pour agents IA (convention émergente, alignée sur llms.txt). */
export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
