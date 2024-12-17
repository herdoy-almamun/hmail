import AuthLayoutProvider from "@/components/auth-layout-provider";
import Empty from "@/components/empty";

const Drafts = () => {
  return (
    <AuthLayoutProvider>
      <Empty page="Drafts" />
    </AuthLayoutProvider>
  );
};

export default Drafts;
