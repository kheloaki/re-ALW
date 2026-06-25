export type PageDimensions = {
  width: number;
  height: number;
};

export type FlipbookLayout = PageDimensions & {
  usePortrait: boolean;
};

/** Vertical chrome (header + controls) reserved when fitting the book. */
export function getLayoutChrome(): number {
  if (typeof window === "undefined") return 132;
  return window.innerWidth < 768 ? 104 : 132;
}

export function getViewportSize(): PageDimensions {
  if (typeof window === "undefined") {
    return { width: 390, height: 844 };
  }
  const vv = window.visualViewport;
  return {
    width: Math.round(vv?.width ?? window.innerWidth),
    height: Math.round(vv?.height ?? window.innerHeight),
  };
}

function fitPageInBox(
  aspect: number,
  availWidth: number,
  availHeight: number,
): PageDimensions {
  let height = availHeight;
  let width = height * aspect;

  if (width > availWidth) {
    width = availWidth;
    height = width / aspect;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}

/** Fit one page to the viewport (cover / solo page). */
export function fitPageToViewport(
  pageWidth: number,
  pageHeight: number,
  chrome = 148,
): PageDimensions {
  const { width: vw, height: vh } = getViewportSize();
  return fitPageInBox(pageWidth / pageHeight, vw, Math.max(vh - chrome, 320));
}

/**
 * Fit a two-page spread in the viewport.
 * Returns the size of a single page; book width = width × 2.
 */
export function fitSpreadToViewport(
  pageWidth: number,
  pageHeight: number,
  chrome = 148,
): PageDimensions {
  const { width: vw, height: vh } = getViewportSize();
  const availWidth = vw;
  const availHeight = Math.max(vh - chrome, 280);
  const aspect = pageWidth / pageHeight;

  let height = availHeight;
  let width = height * aspect;
  const spreadWidth = width * 2;

  if (spreadWidth > availWidth) {
    width = availWidth / 2;
    height = width / aspect;
  }

  if (height > availHeight) {
    height = availHeight;
    width = height * aspect;
  }

  return {
    width: Math.round(width),
    height: Math.round(height),
  };
}

export function resolvePageDimensions(
  pages: Array<{ width?: number; height?: number }>,
  fallback: PageDimensions = { width: 595, height: 841 },
): PageDimensions {
  const measured = pages.find((page) => page.width && page.height && page.width > 0 && page.height > 0);
  if (measured?.width && measured?.height) {
    return { width: measured.width, height: measured.height };
  }
  return fallback;
}
