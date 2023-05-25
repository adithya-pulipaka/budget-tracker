import { Timestamp } from "firebase/firestore";
import { format } from "date-fns";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const YEARS = [2022, 2023, 2024, 2025, 2026];

export function convertTimestampToDate(timestampObj) {
  const { seconds, nanoseconds } = timestampObj;
  const date = new Timestamp(seconds, nanoseconds).toDate();
  return date;
}

export function convertTimestampToDateStr(timestampObj) {
  const { seconds, nanoseconds } = timestampObj;
  const date = new Timestamp(seconds, nanoseconds).toDate();
  return formatDate(date);
  // return date.toISOString();
}

export function formatDate(date) {
  if (typeof date === "object") {
    return format(date, "MM/dd/yyyy");
  } else if (typeof date === "string") {
    const d = new Date();
    return format(d, "MM/dd/yyyy");
  }
}

export function formatAsHTMLDate(date) {
  return format(date, "yyyy-MM-dd");
}
