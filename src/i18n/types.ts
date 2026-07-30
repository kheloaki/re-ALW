export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  stickyCall: {
    label: string;
  };
  stickyMenu: {
    label: string;
  };
  stickyActions: {
    groupLabel: string;
  };
  nav: {
    home: string;
    menu: string;
    reservation: string;
    gallery: string;
    reviews: string;
    contact: string;
    bookTable: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
  hero: {
    imageAlt: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    viewMenu: string;
    bookNow: string;
  };
  welcome: {
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    features: { title: string; description: string; icon: string }[];
  };
  signatures: {
    title: string;
    viewFullMenu: string;
    dishes: {
      tajine: { title: string; description: string };
      couscous: { title: string; description: string };
      brochettes: { title: string; description: string };
      tea: { title: string; description: string };
    };
  };
  reviews: {
    title: string;
    subtitle: string;
    fromGoogle: string;
    googleLink: string;
    disclaimer: string;
    reviewBy: string;
  };
  instagramReels: {
    title: string;
    subtitle: string;
    reelLabel: string;
    followCta: string;
    emptyTitle: string;
    emptyHint: string;
  };
  gallery: {
    title: string;
    alts: {
      tea: string;
      tajinePrunes: string;
      tableSpread: string;
      ambiance: string;
      platter: string;
      seffa: string;
      rfissa: string;
      salad: string;
      instagram: string;
      paella: string;
      teaPour: string;
      beetSalad: string;
      tagineBread: string;
      pastilla: string;
    };
  };
  reservation: {
    sectionTitle: string;
    cardTitle: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    countrySearch: string;
    date: string;
    today: string;
    time: string;
    timePlaceholder: string;
    hour: string;
    minute: string;
    guests: string;
    guestsPlaceholder: string;
    guestSingular: string;
    guestPlural: string;
    message: string;
    specialRequests: string;
    specialRequestsPlaceholder: string;
    hoursHint: string;
    submit: string;
    confirm: string;
    conciergeTitle: string;
    conciergeText: string;
    conciergeService: string;
    phoneBooking: string;
  };
  reservationForm: {
    sending: string;
    success: string;
    errorGeneric: string;
    errorNetwork: string;
    errorNotConfigured: string;
    errorRateLimited: string;
    errorValidation: string;
  };
  map: {
    title: string;
    joinTitle: string;
    subtitle: string;
    addressLabel: string;
    phoneLabel: string;
    hoursLabel: string;
    /** Short fallback when schedule cannot be built */
    hours: string;
    hoursTime: string;
    weekdays: {
      mon: string;
      tue: string;
      wed: string;
      thu: string;
      fri: string;
      sat: string;
      sun: string;
    };
    directions: string;
    call: string;
    directionsFromMe: string;
    openInMaps: string;
    mapIframeTitle: string;
  };
  reservationPage: {
    metaTitle: string;
    metaDescription: string;
  };
  menuPage: {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    title: string;
    intro: string;
    priceNote: string;
    categoriesNav: string;
    scrollHint: string;
    dishColumn: string;
    priceColumn: string;
    signatureBadge: string;
    bookTable: string;
    backHome: string;
  };
  menuFlipbook: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    pageLabel: string;
    previous: string;
    next: string;
    back: string;
    open: string;
    openFlipbook: string;
    zoomReset: string;
    pinchHint: string;
  };
  footer: {
    brandText: string;
    findUs: string;
    info: string;
    call: string;
    directions: string;
    seoTitle: string;
    seoBlurb: string;
    rights: string;
    developedBy: string;
    links: { menu: string; reservations: string; reviews: string; contact: string };
  };
  divider: {
    line1: string;
    line2: string;
  };
};
