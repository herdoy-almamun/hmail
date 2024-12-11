import { Mail } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | Date): string {
  if (!input) return "loading...";
  const date = typeof input === "string" ? new Date(input) : input;
  return date.toDateString();
}

export function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; SameSite=Strict`;
}

export function searchInboxMails(
  mails: Mail[],
  subject: string,
  mail: string
): Mail[] {
  const inboxMails = mails.filter((m) => m.sender !== mail);
  if (!subject) return inboxMails;
  return inboxMails.filter((m) =>
    m.subject.toLocaleLowerCase().startsWith(subject.toLocaleLowerCase())
  );
}

export function searchSentMails(
  mails: Mail[],
  subject: string,
  mail: string
): Mail[] {
  const sentMails = mails.filter((m) => m.sender === mail);
  if (!subject) return sentMails;
  return sentMails.filter((m) =>
    m.subject.toLocaleLowerCase().startsWith(subject.toLocaleLowerCase())
  );
}
