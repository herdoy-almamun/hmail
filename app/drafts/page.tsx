import AuthLayoutProvider from "@/components/auth-layout-provider";
import Header from "./header";

const Drafts = () => {
  return (
    <AuthLayoutProvider>
      <Header />
      Drafts
    </AuthLayoutProvider>
  );
};

export default Drafts;
