"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import Mails from "@/components/mails";
import useMail from "@/hooks/use-mail";
const SentMails = () => {
  const { sentMails } = useMail();
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <Mails mails={sentMails} />
      </div>
    </AuthLayoutProvider>
  );
};

export default SentMails;
