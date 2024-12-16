"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import Pagination from "@/components/pagination";
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
  if (!data) return null;
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
