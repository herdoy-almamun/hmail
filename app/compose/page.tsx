import AuthLayoutProvider from "@/components/auth-layout-provider";
import { Button } from "@/components/ui/button";
import { Flex, Grid } from "@radix-ui/themes";
import { Paperclip } from "lucide-react";

const Compose = () => {
  return (
    <AuthLayoutProvider>
      <Grid className="h-[calc(100dvh-4rem)] px-2" rows="50px 50px 1fr 50px">
        <input
          className="border-b p-2 focus:outline-none"
          type="email"
          placeholder="To"
        />
        <input
          className="border-b p-2 focus:outline-none"
          type="text"
          placeholder="Subject"
        />

        <textarea className="border-none p-2 focus:outline-none" />
        <Flex align="center" gap="3" className="border-t">
          <Button type="submit">Sent</Button>
          <Button variant="ghost">
            <Paperclip />
          </Button>
        </Flex>
      </Grid>
    </AuthLayoutProvider>
  );
};

export default Compose;
