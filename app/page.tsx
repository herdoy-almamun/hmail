import AuthLayoutProvider from "@/components/auth-layout-provider";
import { Button } from "@/components/ui/button";
const Home = () => {
  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <Button>Click Me</Button>
      </div>
    </AuthLayoutProvider>
  );
};

export default Home;
