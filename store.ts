import { create } from "zustand";

interface InboxMailQuery {
  subject: string;
  pageSize: number;
  page: number;
  setSubject: (subject: string) => void;
  setPage: (subject: number) => void;
}

export const useInboxMailQueryStory = create<InboxMailQuery>((set) => ({
  subject: "",
  pageSize: 5,
  page: 1,
  setSubject: (subject: string) => set(() => ({ subject: subject, page: 1 })),
  setPage: (pageNumberInboxMail: number) =>
    set(() => ({ page: pageNumberInboxMail })),
}));

interface sentMailQuery {
  subject: string;
  pageSize: number;
  page: number;
  setSubject: (subject: string) => void;
  setPage: (subject: number) => void;
}

export const useSentMailQueryStory = create<sentMailQuery>((set) => ({
  subject: "",
  pageSize: 5,
  page: 1,
  setSubject: (subject: string) => set(() => ({ subject: subject, page: 1 })),
  setPage: (pageNumberInboxMail: number) =>
    set(() => ({ page: pageNumberInboxMail })),
}));
