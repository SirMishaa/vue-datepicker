export enum WeekDays {
  Dimanche = 0,
  Lundi = 1,
  Mardi = 2,
  Mercredi = 3,
  Jeudi = 4,
  Vendredi = 5,
  Samedi = 6
}
export enum Months {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December
}

/**
 * This will fill array with selected number of items
 * @param {number} numberOfItems
 * @param {number} start
 * @param {boolean} reverse
 */
function fillArray(numberOfItems: number, start = 1, reverse = false) {
  return [...Array(numberOfItems)].map((v, i) =>
    reverse ? start - i : start + i
  );
}
/**
 * Return the number of days in a selected month
 * @param {Months} month
 * @param {number} year - Current year
 */
export function numberOfDaysInMonth(month: Months, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}
/**
 * This gonna build the array of days of previous, current and next month
 * @param {Date} currentDate
 * @return number[]
 */
export function buildDaysArray(currentDate: Date = new Date()): Array<number> {
  const daysInCurrentMonth = numberOfDaysInMonth(
    currentDate.getMonth() + 1,
    currentDate.getFullYear()
  );
  let previousMonth = currentDate.getMonth() - 1;
  const year =
    previousMonth > 0
      ? currentDate.getFullYear()
      : currentDate.getFullYear() - 1;
  previousMonth = previousMonth < 0 ? 11 : previousMonth;
  const daysOfPreviousMonth = numberOfDaysInMonth(previousMonth, year);
  let firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();
  firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  return [
    ...fillArray(firstDayOfMonth, daysOfPreviousMonth, true).reverse(),
    ...fillArray(daysInCurrentMonth),
    ...fillArray(13)
  ].slice(0, 42);
}
/**
 * Return the month if long format
 * @param {Date} currentDate
 */
export function formatMonthName(currentDate: Date): string {
  return currentDate.toLocaleDateString(undefined, {
    month: "long"
  });
}
/**
 * Add the selected number of month to the selected time
 * @param {number} numberOfMonths
 * @param {Date} currentTime
 * @return {Date}
 */
export function addMonths(numberOfMonths: number, currentTime: Date): Date {
  const x = currentTime.getDate();
  currentTime.setMonth(currentTime.getMonth() + numberOfMonths);
  console.log(`Function has been called with : ${currentTime}`);
  if (currentTime.getDate() != x) {
    currentTime.setDate(0);
  }
  return currentTime;
}
/**
 * Subsctract the selected number of months for the selected date
 * @param {number} numberOfMonths
 * @param {Date} currentTime
 * @return {Date}
 */
export function substractMonths(
  numberOfMonths: number,
  currentTime: Date
): Date {
  return addMonths(numberOfMonths * -1, currentTime);
}
