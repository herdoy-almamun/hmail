import AuthLayoutProvider from "@/components/auth-layout-provider";
import Inboxs from "@/components/inboxs";
const Home = () => {
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <Inboxs />
      </div>
    </AuthLayoutProvider>
  );
};

export default Home;
