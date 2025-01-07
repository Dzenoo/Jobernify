import moment from 'moment';
import { format } from 'date-fns';

/**
 * Returns the labels of the last six months including the current month.
 * @returns An array of month names.
 */
export const getMonthsLabels = (): string[] => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentMonth = new Date().getMonth();
  return Array.from(
    { length: 6 },
    (_, i) => monthNames[(currentMonth - 5 + i + 12) % 12],
  );
};

/**
 * Formats a date string to a specified format.
 * @param date - The date to format.
 * @param formatStr - The format string (default: "dd/MM/yyyy").
 * @returns The formatted date string.
 */
export const formatDate = (
  date: Date,
  formatStr: string = 'dd/MM/yyyy',
): string => {
  return date ? format(new Date(date), formatStr) : '';
};

/**
 * Checks if a given date is expired (i.e., is in the past).
 * @param date - The date string to check.
 * @returns True if the date is expired, false otherwise.
 */
export const checkExpired = (date: string): boolean => {
  const currentDateTime = new Date();
  const expirationDateTime = new Date(date);
  return currentDateTime > expirationDateTime;
};

/**
 * Calculates and returns a human-readable time difference from the current time.
 * @param date - The date to compare.
 * @returns A string indicating how long ago the event occurred.
 */
export const getTime = (date: Date): string => {
  const postedDateTime = moment(date);
  const currentDateTime = moment();
  const diffInSeconds = currentDateTime.diff(postedDateTime, 'seconds');
  const diffInMinutes = currentDateTime.diff(postedDateTime, 'minutes');
  const diffInHours = currentDateTime.diff(postedDateTime, 'hours');
  const diffInDays = currentDateTime.diff(postedDateTime, 'days');
  const diffInMonths = currentDateTime.diff(postedDateTime, 'months');
  const diffInYears = currentDateTime.diff(postedDateTime, 'years');

  if (diffInYears >= 1) {
    return `Posted ${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  } else if (diffInMonths >= 1) {
    return `Posted ${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else if (diffInDays >= 1) {
    return `Posted ${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours >= 1) {
    return `Posted ${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes >= 1) {
    return `Posted ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds >= 1) {
    return `Posted ${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;
  } else {
    return `Posted just now`;
  }
};
