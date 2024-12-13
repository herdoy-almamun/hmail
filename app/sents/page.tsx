"use client";
import SentMails from "@/app/sents/sent-mails";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import Pagination from "@/components/pagination";
import useMails from "@/hooks/use-mails";
import { countSentMail } from "@/lib/actions";
import { useMailQueryStory } from "@/store";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth-provider";
import Header from "./header";

const SentMailsPage = () => {
  const [itemsCount, setItemsCount] = useState(0);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    countSentMail(user?.email!).then((res) => setItemsCount(res));
  }, []);
  const { sentMails } = useMails();
  const currentPage = useMailQueryStory((s) => s.pageNumberSentMail);
  if (!sentMails) return null;
  return (
    <AuthLayoutProvider>
      <Header />
      <div className="p-2">
        <SentMails mails={sentMails} />
        <Pagination
          mails="sent"
          pageSize={10}
          itemsCount={itemsCount}
          currentPage={currentPage}
        />
      </div>
    </AuthLayoutProvider>
  );
};

export default SentMailsPage;
