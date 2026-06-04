import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { getPlaceLocalSeo } from "@/lib/googlePlaceLocal";
import { getGoogleMapsPlaceUrl, getGoogleMapsReviewUrl, LOCAL } from "@/lib/local";
import { getLocalMapCopy } from "@/lib/seo/local";
import { getOpeningHoursSchedule } from "@/lib/openingHours";
import { getVenueDirectionsUrl, getGoogleMapsEmbedSrc, VENUE } from "@/lib/venue";

export async function RestaurantMapSection({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const m = dict.map;
  const localCopy = getLocalMapCopy(locale);
  const place = getPlaceLocalSeo(locale);
  const embedSrc = getGoogleMapsEmbedSrc();
  const directionsUrl = getVenueDirectionsUrl();
  const mapsUrl = place.mapsUrl || getGoogleMapsPlaceUrl();
  const hoursSchedule = getOpeningHoursSchedule(dict, place.openingHoursText);

  return (
    <section
      id="contact"
      className="border-t border-[#d6ad63]/25 bg-[#1a1714] py-10 sm:py-14"
      aria-labelledby="restaurant-map-heading"
    >
      <div className="section-shell px-4 sm:px-6 lg:px-10">
        <h2
          id="restaurant-map-heading"
          className="text-center font-display text-2xl text-[#d6ad63] sm:text-3xl lg:text-4xl"
        >
          {m.joinTitle}
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-center text-sm leading-relaxed text-[#d8cbb0] sm:text-base">
          {m.subtitle}
        </p>
        <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-[#c4b8a4] sm:text-[15px]">
          {localCopy.localIntro}
        </p>

        <div className="map-info-grid mx-auto mt-10 max-w-2xl sm:max-w-4xl">
          <article className="map-info-card">
            <h3 className="map-info-card__label">{m.addressLabel}</h3>
            <address className="map-info-card__body not-italic">
              <span className="map-info-card__line">{LOCAL.streetAddress}</span>
              <span className="map-info-card__line">{LOCAL.addressLine2}</span>
              <span className="map-info-card__line">
                {LOCAL.postalCode} {LOCAL.locality}, {LOCAL.countryName}
              </span>
            </address>
          </article>

          <article className="map-info-card">
            <h3 className="map-info-card__label">{m.phoneLabel}</h3>
            <a
              href={`tel:${LOCAL.phoneTel}`}
              className="venue-phone-link venue-phone-link--plain map-info-card__phone"
            >
              {LOCAL.phone}
            </a>
            {place.rating != null && place.reviewCount != null && (
              <p className="map-info-card__rating">
                <span className="text-[#f0d78c]">★ {place.rating.toFixed(1)}</span>
                <span className="text-[#9a8f78]"> — Google ({place.reviewCount})</span>
              </p>
            )}
          </article>

          <article className="map-info-card map-info-card--hours">
            <h3 className="map-info-card__label">{m.hoursLabel}</h3>
            <p className="map-info-card__hours-summary">{m.hours}</p>
            <ul className="map-opening-hours">
              {hoursSchedule.map((row) => (
                <li key={row.day} className="map-opening-hours__row">
                  <span className="map-opening-hours__day">{row.day}</span>
                  <span className="map-opening-hours__time">{row.hours}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="map-areas-note mx-auto mt-8 max-w-3xl text-center">
          {localCopy.areasTitle}:{" "}
          {LOCAL.areasServed.map((area, i) => (
            <span key={area}>
              {i > 0 ? " · " : null}
              <span className="text-[#c4b8a4]">{area}</span>
            </span>
          ))}
        </p>

        <div className="mx-auto mt-8 max-w-[1000px] overflow-hidden rounded-2xl border border-[#d6ad63]/40 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
          <div className="relative aspect-[4/3] w-full min-h-[240px] sm:aspect-video sm:min-h-[320px]">
            <iframe
              title={`${m.mapIframeTitle} — ${VENUE.name}, ${LOCAL.locality}`}
              src={embedSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="map-cta-row mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn map-cta-btn inline-flex min-h-12 items-center justify-center px-7 text-sm font-semibold sm:min-h-[52px] sm:px-10 sm:text-base"
          >
            {m.directionsFromMe}
          </a>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-outline-btn map-cta-btn inline-flex min-h-12 items-center justify-center px-7 text-sm font-semibold sm:min-h-[52px] sm:px-10 sm:text-base"
          >
            {localCopy.viewOnGoogle}
          </a>
          <a
            href={getGoogleMapsReviewUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="map-cta-btn map-cta-btn--ghost inline-flex min-h-12 items-center justify-center rounded-full border border-[#d6ad63]/35 px-7 text-sm font-semibold text-[#e1cfac] transition hover:border-[#d6ad63]/55 hover:text-[#f3dfb5] sm:min-h-[52px] sm:px-10 sm:text-base"
          >
            {localCopy.reviewOnGoogle}
          </a>
        </div>
      </div>
    </section>
  );
}
