"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import SentMails from "@/components/sent-mails";
import useMails from "@/hooks/use-mails";
const SentMailsPage = () => {
  const { sentMails } = useMails();
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <SentMails mails={sentMails} />
      </div>
    </AuthLayoutProvider>
  );
};

export default SentMailsPage;
