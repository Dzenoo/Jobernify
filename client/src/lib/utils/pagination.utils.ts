/**
 * Returns an array of page numbers (and string '...') to render for truncated pagination.
 *
 * @param currentPage - The current active page.
 * @param totalPages - The total number of pages.
 * @param maxVisible - The maximum number of page buttons you want to show (default: 10).
 * @returns An array containing page numbers and possibly '...' strings.
 */
export function getTruncatedPageRange(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 10,
): (number | string)[] {
  const pages: (number | string)[] = [];

  if (totalPages <= maxVisible) {
    return [...Array(totalPages)].map((_, i) => i + 1);
  }

  const siblingCount = 2;
  const firstPage = 1;
  const lastPage = totalPages;

  pages.push(firstPage);

  let leftBound = Math.max(currentPage - siblingCount, 2);
  let rightBound = Math.min(currentPage + siblingCount, totalPages - 1);

  if (leftBound > 2) {
    pages.push('...');
  }

  for (let i = leftBound; i <= rightBound; i++) {
    pages.push(i);
  }

  if (rightBound < totalPages - 1) {
    pages.push('...');
  }

  pages.push(lastPage);

  return pages;
}
