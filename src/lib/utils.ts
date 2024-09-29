import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum FormatOption {
  LongDate,
  ShortDate,
  AbbreviatedDate,
}

export function formatJoinedDate(
  dateToFormat: string,
  formatOption: FormatOption = 1
) {
  const date = new Date(dateToFormat || "");

  switch (formatOption) {
    case FormatOption.LongDate: // Long Date and Time Format (e.g., "September 29, 2024, 3:45 PM")
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

    case FormatOption.ShortDate: // Short Date with Time (e.g., "09/29/2024, 15:45")
      return date.toLocaleString("en-US", {
        hour12: false,
      });

    case FormatOption.AbbreviatedDate: // Abbreviated Date and Time (e.g., "29 Sep, 2024, 15:45")
      return date.toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      });

    default:
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
  }
}
