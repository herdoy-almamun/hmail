import AuthLayoutProvider from "@/components/auth-layout-provider";
import SentMails from "@/app/sents/sent-mails";
import Header from "./header";
const SentMailsPage = () => {
  return (
    <AuthLayoutProvider>
      <Header />
      <div className="p-2">
        <SentMails />
      </div>
    </AuthLayoutProvider>
  );
};

export default SentMailsPage;
