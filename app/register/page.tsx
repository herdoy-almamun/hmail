import { Box, Flex, Heading, Link } from "@radix-ui/themes";
import Image from "next/image";
import RegisterForm from "./register-form";

const Register = () => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      py="8"
      gap="6"
      px="3"
    >
      <Image src="/logo.png" width={70} height={70} alt="Logo" />
      <Box
        px="5"
        py="4"
        className="border shadow-lg rounded-2xl w-full md:max-w-[450px]"
      >
        <Heading as="h1" align="center" mb="4" size="7">
          Register
        </Heading>
        <RegisterForm />
        <Box className="space-y-3" mt="3">
          <p className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold">
              Login.
            </Link>{" "}
          </p>
        </Box>
      </Box>
    </Flex>
  );
};

export default Register;
