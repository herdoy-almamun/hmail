"use client";
import AuthLayoutProvider from "@/components/auth-layout-provider";
import Mails from "@/components/mails";
import useMail from "@/hooks/use-mail";
const Home = () => {
  const { inboxMails } = useMail();
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <Mails mails={inboxMails} />
      </div>
    </AuthLayoutProvider>
  );
};

export default Home;
