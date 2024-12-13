import { create } from "zustand";

interface MailQuery {
  subjectInboxMail: string;
  subjectSentMail: string;
  pageNumberInboxMail: number;
  pageNumberSentMail: number;
  setSubjectInboxMail: (subject: string) => void;
  setSubjectSentMail: (subject: string) => void;
  setPageNumberInboxMail: (subject: number) => void;
  setPageNumberSentMail: (subject: number) => void;
}

export const useMailQueryStory = create<MailQuery>((set) => ({
  subjectInboxMail: "",
  subjectSentMail: "",
  pageNumberInboxMail: 1,
  pageNumberSentMail: 1,
  setSubjectInboxMail: (subjectInboxMail: string) =>
    set(() => ({ subjectInboxMail })),
  setSubjectSentMail: (subjectSentMail: string) =>
    set(() => ({ subjectSentMail })),
  setPageNumberInboxMail: (pageNumberInboxMail: number) =>
    set(() => ({ pageNumberInboxMail })),
  setPageNumberSentMail: (pageNumberSentMail: number) =>
    set(() => ({ pageNumberSentMail })),
}));
