import type { Locale } from "@/i18n/config";

export type SeoFaqItem = { question: string; answer: string };

export type SeoGeoProfile = {
  region: string;
  city: string;
  country: string;
  neighborhood: string;
  servesCuisine: string;
  priceRange: string;
};

const FAQ: Record<Locale, SeoFaqItem[]> = {
  fr: [
    {
      question: "Où se trouve le restaurant Al Walima à Agadir ?",
      answer:
        "Al Walima est situé au Jardin Lalla Meryem, Bloc 1, Rue de Marrakech, à Agadir, Maroc. Vous pouvez obtenir l’itinéraire via Google Maps ou nous appeler au +212 6 27 71 15 14.",
    },
    {
      question: "Quel type de cuisine propose Al Walima ?",
      answer:
        "Al Walima est un restaurant marocain à Agadir proposant tajines, couscous (chaque vendredi), grillades, pastilla, salades, pizzas, desserts et thé à la menthe traditionnel.",
    },
    {
      question: "Comment réserver une table chez Al Walima ?",
      answer:
        "Réservez par téléphone au +212 6 27 71 15 14 ou via le formulaire de réservation sur le site. Nous recommandons de réserver à l’avance les soirs et le week-end.",
    },
    {
      question: "Le couscous est-il servi tous les jours ?",
      answer:
        "Le couscous est préparé chaque vendredi, conformément à la tradition marocaine. Les autres jours, la carte propose tajines, grillades, plats marocains et plus.",
    },
    {
      question: "Quels sont les plats signatures d’Al Walima ?",
      answer:
        "Parmi nos signatures : tajine de poulet à la marocaine, couscous royal, mixte grillé Al Walima et thé marocain. Consultez la carte complète en ligne.",
    },
    {
      question: "Les prix sont-ils en dirhams ?",
      answer:
        "Oui, tous les prix affichés sur la carte sont en dirhams marocains (DH), de 15 DH pour les entrées jusqu’aux plats premium et formats familiaux.",
    },
    {
      question: "Al Walima convient-il aux familles et aux groupes ?",
      answer:
        "Oui. Nous accueillons familles, couples et groupes dans un cadre élégant au cœur d’Agadir. Contactez-nous pour les réservations de groupe.",
    },
    {
      question: "Comment venir au restaurant depuis le centre d’Agadir ou la plage ?",
      answer:
        "Al Walima est au Jardin Lalla Meryem, Rue de Marrakech — accessible en voiture ou taxi depuis le centre-ville, Talborjt, Founty et la corniche. Utilisez le bouton « Itinéraire » sur cette page ou Google Maps.",
    },
    {
      question: "Restaurant marocain à Agadir près de Lalla Meryem ?",
      answer:
        "Al Walima est une adresse locale pour la cuisine marocaine authentique (tajines, couscous du vendredi, grillades) au Jardin Lalla Meryem. Réservation : +212 6 27 71 15 14.",
    },
  ],
  es: [
    {
      question: "¿Dónde está el restaurante Al Walima en Agadir?",
      answer:
        "Al Walima está en Jardin Lalla Meryem, Bloque 1, Rue de Marrakech, Agadir, Marruecos. Indicaciones en Google Maps o llame al +212 6 27 71 15 14.",
    },
    {
      question: "¿Qué cocina ofrece Al Walima?",
      answer:
        "Al Walima es un restaurante marroquí en Agadir con tajines, cuscús los viernes, parrilladas, pastela, ensaladas, pizzas, postres y té a la menta tradicional.",
    },
    {
      question: "¿Cómo reservo una mesa en Al Walima?",
      answer:
        "Reserve por teléfono al +212 6 27 71 15 14 o con el formulario de reserva del sitio web. Recomendamos reservar con antelación los fines de semana y por la noche.",
    },
    {
      question: "¿Se sirve cuscús todos los días?",
      answer:
        "El cuscús se prepara cada viernes. El resto de días la carta incluye tajines, parrilladas y otros platos marroquíes.",
    },
    {
      question: "¿Cuáles son los platos estrella de Al Walima?",
      answer:
        "Entre nuestras especialidades: tajine de pollo marroquí, cuscús real, parrillada mixta Al Walima y té marroquí. Consulte la carta completa en línea.",
    },
    {
      question: "¿Los precios están en dirhams?",
      answer:
        "Sí, todos los precios de la carta están en dirhams marroquíes (DH), desde 15 DH en entrantes hasta platos premium y formatos familiares.",
    },
    {
      question: "¿Al Walima es adecuado para familias y grupos?",
      answer:
        "Sí. Recibimos familias, parejas y grupos en un entorno elegante en el corazón de Agadir. Contáctenos para reservas de grupo.",
    },
    {
      question: "¿Cómo llegar desde el centro de Agadir o la playa?",
      answer:
        "Estamos en Jardin Lalla Meryem, Rue de Marrakech — en coche o taxi desde el centro, Talborjt, Founty y la cornisa. Use «Cómo llegar» en esta página o Google Maps.",
    },
    {
      question: "¿Restaurante marroquí cerca de Lalla Meryem, Agadir?",
      answer:
        "Al Walima ofrece cocina marroquí auténtica (tajines, cuscús del viernes, parrilladas) en Jardin Lalla Meryem. Reserva: +212 6 27 71 15 14.",
    },
  ],
  en: [
    {
      question: "Where is Al Walima restaurant located in Agadir?",
      answer:
        "Al Walima is at Jardin Lalla Meryem, Block 1, Rue de Marrakech, Agadir, Morocco. Get directions on Google Maps or call +212 6 27 71 15 14.",
    },
    {
      question: "What cuisine does Al Walima serve?",
      answer:
        "Al Walima is a Moroccan restaurant in Agadir serving tagines, Friday couscous, grills, pastilla, salads, pizzas, desserts and traditional mint tea.",
    },
    {
      question: "How do I book a table at Al Walima?",
      answer:
        "Book by phone at +212 6 27 71 15 14 or use the reservation form on our website. We recommend booking ahead for weekends and dinner service.",
    },
    {
      question: "Is couscous served every day?",
      answer:
        "Couscous is served every Friday. On other days the menu includes tagines, grills, Moroccan dishes and more.",
    },
    {
      question: "What are Al Walima’s signature dishes?",
      answer:
        "Signatures include Moroccan chicken tagine, royal couscous, Al Walima mixed grill and Moroccan mint tea. See the full menu online.",
    },
    {
      question: "Are prices in Moroccan dirhams?",
      answer:
        "Yes, all menu prices are in Moroccan dirhams (DH), from appetizers at 20 DH to premium and family-size dishes.",
    },
    {
      question: "Is Al Walima good for families and groups?",
      answer:
        "Yes. We welcome families, couples and groups in an elegant setting in central Agadir. Contact us for group bookings.",
    },
    {
      question: "How do I get there from downtown Agadir or the beach?",
      answer:
        "We are at Jardin Lalla Meryem, Rue de Marrakech — easy by car or taxi from downtown, Talborjt, Founty and the corniche. Use Directions on this page or Google Maps.",
    },
    {
      question: "Moroccan restaurant near Lalla Meryem, Agadir?",
      answer:
        "Al Walima serves authentic Moroccan food (tagines, Friday couscous, grills) in Jardin Lalla Meryem. Book at +212 6 27 71 15 14.",
    },
  ],
  ar: [
    {
      question: "أين يقع مطعم الوليمة في أكادير؟",
      answer:
        "يقع مطعم الوليمة في حديقة للا مريم، المبنى 1، شارع مراكش، أكادير، المغرب. للاتجاهات استخدم خرائط Google أو اتصل على +212 6 27 71 15 14.",
    },
    {
      question: "ما نوع المطبخ في الوليمة؟",
      answer:
        "مطبخ مغربي أصيل: طاجين، كسكس (كل جمعة)، مشاوي، بسطيلة، سلطات، بيتزا، حلويات وشاي بالنعناع.",
    },
    {
      question: "كيف أحجز طاولة في الوليمة؟",
      answer:
        "احجز هاتفياً على +212 6 27 71 15 14 أو عبر نموذج الحجز في الموقع. ننصح بالحجز مسبقاً في عطلة نهاية الأسبوع.",
    },
    {
      question: "هل الكسكس متاح كل يوم؟",
      answer: "الكسكس يُحضَّر كل يوم جمعة. باقي الأيام تشمل طاجين ومشاوي وأطباق مغربية أخرى.",
    },
    {
      question: "ما هي الأطباق المميزة؟",
      answer: "طاجين الدجاج، كسكس رويال، مشاوي الوليمة والشاي المغربي. راجع القائمة الكاملة على الموقع.",
    },
    {
      question: "هل الأسعار بالدرهم؟",
      answer: "نعم، جميع الأسعار بالدرهم المغربي (DH).",
    },
    {
      question: "هل المطعم مناسب للعائلات؟",
      answer: "نعم، نرحب بالعائلات والمجموعات في أجواء راقية في قلب أكادير.",
    },
    {
      question: "كيف أصل من وسط أكادير أو الشاطئ؟",
      answer:
        "العنوان: حديقة للا مريم، شارع مراكش — بالسيارة أو التاكسي من وسط المدينة وطلبرجت وفونتي. استخدم «الاتجاهات» أو خرائط Google.",
    },
    {
      question: "مطعم مغربي قرب حديقة للا مريم؟",
      answer: "الوليمة مطعم مغربي أصيل (طاجين، كسكس الجمعة، مشاوي). حجز: +212 6 27 71 15 14.",
    },
  ],
  pl: [
    {
      question: "Gdzie znajduje się restauracja Al Walima w Agadirze?",
      answer:
        "Al Walima: Jardin Lalla Meryem, Blok 1, Rue de Marrakech, Agadir, Maroko. Trasa w Google Maps lub telefon +212 6 27 71 15 14.",
    },
    {
      question: "Jaką kuchnię serwuje Al Walima?",
      answer:
        "Kuchnia marokańska: tagine, kuskus w piątki, grill, pastilla, sałatki, pizza, desery i miętowa herbata.",
    },
    {
      question: "Jak zarezerwować stolik?",
      answer: "Telefon +212 6 27 71 15 14 lub formularz rezerwacji na stronie. W weekendy zalecamy wcześniejszą rezerwację.",
    },
    {
      question: "Czy kuskus jest codziennie?",
      answer: "Kuskus w każdy piątek. W pozostałe dni tagine, grill i inne dania marokańskie.",
    },
    {
      question: "Jakie są dania signature?",
      answer: "Tagine z kurczakiem, kuskus królewski, grill mieszany Al Walima i herbata marokańska.",
    },
    {
      question: "Czy ceny są w dirhamach?",
      answer: "Tak, wszystkie ceny w marokańskich dirhamach (DH).",
    },
    {
      question: "Czy restauracja jest dla rodzin?",
      answer: "Tak, zapraszamy rodziny i grupy w eleganckim otoczeniu w Agadirze.",
    },
    {
      question: "Jak dojechać z centrum Agadiru lub plaży?",
      answer:
        "Jardin Lalla Meryem, Rue de Marrakech — samochodem lub taksówką z centrum, Talborjt, Founty. Użyj przycisku trasy lub Google Maps.",
    },
    {
      question: "Restauracja marokańska przy Lalla Meryem?",
      answer: "Al Walima — autentyczna kuchnia marokańska. Rezerwacja: +212 6 27 71 15 14.",
    },
  ],
  de: [
    {
      question: "Wo liegt Restaurant Al Walima in Agadir?",
      answer:
        "Al Walima: Jardin Lalla Meryem, Block 1, Rue de Marrakech, Agadir, Marokko. Route über Google Maps oder Anruf +212 6 27 71 15 14.",
    },
    {
      question: "Welche Küche bietet Al Walima?",
      answer:
        "Marokkanische Küche: Tajines, Couscous freitags, Grill, Pastilla, Salate, Pizza, Desserts und Minztee.",
    },
    {
      question: "Wie reserviere ich einen Tisch?",
      answer: "Telefon +212 6 27 71 15 14 oder Reservierungsformular auf der Website. Am Wochenende früh buchen.",
    },
    {
      question: "Gibt es Couscous täglich?",
      answer: "Couscous jeden Freitag. An anderen Tagen Tajines, Grill und weitere marokkanische Gerichte.",
    },
    {
      question: "Was sind Signature-Gerichte?",
      answer: "Hähnchen-Tajine, königlicher Couscous, Al-Walima-Grillplatte und marokkanischer Tee.",
    },
    {
      question: "Sind die Preise in Dirham?",
      answer: "Ja, alle Preise in marokkanischen Dirham (DH).",
    },
    {
      question: "Geeignet für Familien?",
      answer: "Ja, wir begrüßen Familien und Gruppen in elegantem Ambiente in Agadir.",
    },
    {
      question: "Anfahrt vom Zentrum oder Strand?",
      answer:
        "Jardin Lalla Meryem, Rue de Marrakech — mit Auto oder Taxi aus dem Zentrum, Talborjt, Founty. Route auf dieser Seite oder Google Maps.",
    },
    {
      question: "Marokkanisches Restaurant nahe Lalla Meryem?",
      answer: "Al Walima — authentische marokkanische Küche. Reservierung: +212 6 27 71 15 14.",
    },
  ],
};

const GEO: Record<Locale, SeoGeoProfile> = {
  fr: {
    region: "Souss-Massa",
    city: "Agadir",
    country: "Maroc",
    neighborhood: "Jardin Lalla Meryem",
    servesCuisine: "Cuisine marocaine",
    priceRange: "€€",
  },
  en: {
    region: "Souss-Massa",
    city: "Agadir",
    country: "Morocco",
    neighborhood: "Jardin Lalla Meryem",
    servesCuisine: "Moroccan cuisine",
    priceRange: "€€",
  },
  es: {
    region: "Souss-Massa",
    city: "Agadir",
    country: "Marruecos",
    neighborhood: "Jardin Lalla Meryem",
    servesCuisine: "Cocina marroquí",
    priceRange: "€€",
  },
  ar: {
    region: "سوس ماسة",
    city: "أكادير",
    country: "المغرب",
    neighborhood: "حديقة للا مريم",
    servesCuisine: "مطبخ مغربي",
    priceRange: "€€",
  },
  pl: {
    region: "Souss-Massa",
    city: "Agadir",
    country: "Maroko",
    neighborhood: "Jardin Lalla Meryem",
    servesCuisine: "Kuchnia marokańska",
    priceRange: "€€",
  },
  de: {
    region: "Souss-Massa",
    city: "Agadir",
    country: "Marokko",
    neighborhood: "Jardin Lalla Meryem",
    servesCuisine: "Marokkanische Küche",
    priceRange: "€€",
  },
};

const SEO_UI: Record<Locale, { faqTitle: string; faqSubtitle: string }> = {
  fr: { faqTitle: "Questions fréquentes", faqSubtitle: "Tout savoir avant votre visite à Agadir" },
  en: { faqTitle: "Frequently asked questions", faqSubtitle: "Everything you need before visiting us in Agadir" },
  es: { faqTitle: "Preguntas frecuentes", faqSubtitle: "Todo lo que necesita saber antes de visitarnos en Agadir" },
  ar: { faqTitle: "أسئلة شائعة", faqSubtitle: "معلومات قبل زيارتكم في أكادير" },
  pl: { faqTitle: "Często zadawane pytania", faqSubtitle: "Przed wizytą w Agadirze" },
  de: { faqTitle: "Häufige Fragen", faqSubtitle: "Vor Ihrem Besuch in Agadir" },
};

export function getSeoFaq(locale: Locale): SeoFaqItem[] {
  return FAQ[locale];
}

export function getSeoGeo(locale: Locale): SeoGeoProfile {
  return GEO[locale];
}

export function getSeoFaqUi(locale: Locale) {
  return SEO_UI[locale];
}
