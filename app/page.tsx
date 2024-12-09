import AuthLayoutProvider from "@/components/auth-layout-provider";
import { Button } from "@/components/ui/button";
const Home = () => {
  return (
    <AuthLayoutProvider>
      <Button>Click Me</Button>
    </AuthLayoutProvider>
  );
};

export default Home;
