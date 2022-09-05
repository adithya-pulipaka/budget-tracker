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
  return date.toISOString();
}

export function formatDate(date) {
  return format(date, "MM/dd/yyyy");
}
