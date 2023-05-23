import { isValid, parseISO } from 'date-fns';

function isValidDate(date: string): boolean {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (!date.match(regEx)) return false; // Invalid format
  const d = parseISO(date);
  if (!isValid(d)) return false; // Invalid date
  return true;
}

export { isValidDate };
