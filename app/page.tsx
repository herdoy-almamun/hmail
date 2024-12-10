"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import InboxMails from "@/components/inbox-mails";
import useMails from "@/hooks/use-mails";
const Home = () => {
  const { inboxMails } = useMails();
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <InboxMails mails={inboxMails} />
      </div>
    </AuthLayoutProvider>
  );
};

export default Home;
