"use client";
import InboxMails from "@/app/inbox-mails";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import Pagination from "@/components/pagination";
import useMails from "@/hooks/use-mails";
import { countInboxMail } from "@/lib/actions";
import { useMailQueryStory } from "@/store";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth-provider";
import Header from "./header";
const Home = () => {
  const [itemsCount, setItemsCount] = useState(0);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    countInboxMail(user?.email!).then((res) => setItemsCount(res));
  }, [user]);
  const { inboxMails } = useMails();
  const currentPage = useMailQueryStory((s) => s.pageNumberInboxMail);
  if (!inboxMails) return null;
  return (
    <AuthLayoutProvider>
      <Header />
      <div className="p-2">
        <InboxMails mails={inboxMails} />
        <Pagination
          mails="inbox"
          pageSize={10}
          itemsCount={itemsCount}
          currentPage={currentPage}
        />
      </div>
    </AuthLayoutProvider>
  );
};

export default Home;
