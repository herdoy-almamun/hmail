import AuthLayoutProvider from "@/components/auth-layout-provider";
import Sents from "@/components/sents";
const SentMails = () => {
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <Sents />
      </div>
    </AuthLayoutProvider>
  );
};

export default SentMails;
