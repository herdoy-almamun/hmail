import AuthLayoutProvider from "@/components/auth-layout-provider";
import InboxMails from "@/app/inbox-mails";
import Header from "./header";
const Home = () => {
  return (
    <AuthLayoutProvider>
      <Header />
      <div className="p-2">
        <InboxMails />
      </div>
    </AuthLayoutProvider>
  );
};

export default Home;
