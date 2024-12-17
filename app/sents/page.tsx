"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import Empty from "@/components/empty";
import Pagination from "@/components/pagination";
import MailsKkeleton from "@/components/skeletons/mails-skeleton";
import { useSentMails } from "@/hooks/use-sent-mails";
import { useSentMailQueryStory } from "@/store";
import { useContext } from "react";
import { AuthContext } from "../auth-provider";
import SentMails from "./sent-mails";

const SentItems = () => {
  const { user } = useContext(AuthContext);
  const page = useSentMailQueryStory((s) => s.page);
  const pageSize = useSentMailQueryStory((s) => s.pageSize);
  const setPage = useSentMailQueryStory((s) => s.setPage);
  const { data } = useSentMails(user?.email!);
  if (!data) return <MailsKkeleton />;
  if (data.count === 0) return <Empty />;
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <SentMails mails={data.data} />
        <Pagination
          itemsCount={data.count}
          pageSize={pageSize}
          currentPage={page}
          setPage={setPage}
        />
      </div>
    </AuthLayoutProvider>
  );
};

export default SentItems;
