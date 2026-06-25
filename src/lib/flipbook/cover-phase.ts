/** Front/back cover is solo; inner pages use a two-page spread. */
export function isSoloCoverSpread(pageIndex: number, pageCount: number): boolean {
  if (pageCount <= 0) return false;
  if (pageIndex === 0) return true;
  if (pageCount > 1 && pageIndex === pageCount - 1 && (pageCount - 1) % 2 === 1) {
    return true;
  }
  return false;
}
