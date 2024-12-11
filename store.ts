import { create } from "zustand";

interface MailQuery {
  subject: string;
  setSuject: (subject: string) => void;
}

export const useMailQueryStory = create<MailQuery>((set) => ({
  subject: "",
  setSuject: (subject: string) => set(() => ({ subject })),
}));
