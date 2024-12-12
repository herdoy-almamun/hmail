import { create } from "zustand";

interface MailQuery {
  subjectInboxMail: string;
  subjectSentMail: string;
  pageNumberInboxMail: string;
  pageNumberSentMail: string;
  setSubjectInboxMail: (subject: string) => void;
  setSubjectSentMail: (subject: string) => void;
  setPageNumberInboxMail: (subject: string) => void;
  setPageNumberSentMail: (subject: string) => void;
}

export const useMailQueryStory = create<MailQuery>((set) => ({
  subjectInboxMail: "",
  subjectSentMail: "",
  pageNumberInboxMail: "",
  pageNumberSentMail: "",
  setSubjectInboxMail: (subjectInboxMail: string) =>
    set(() => ({ subjectInboxMail })),
  setSubjectSentMail: (subjectSentMail: string) =>
    set(() => ({ subjectSentMail })),
  setPageNumberInboxMail: (pageNumberInboxMail: string) =>
    set(() => ({ pageNumberInboxMail })),
  setPageNumberSentMail: (pageNumberSentMail: string) =>
    set(() => ({ pageNumberSentMail })),
}));
