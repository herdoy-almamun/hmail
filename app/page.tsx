import AuthLayoutProvider from "@/components/auth-layout-provider";
import Pagination from "@/components/pagination";
import { getUser } from "@/lib/actions";
import prisma from "@/prisma/client";
import InboxMails from "./inbox-mails";

type SearchParams = Promise<{ page: string; subject: string }>;

const Home = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;
  const subject = searchParams.subject;

  const fetchUser = await getUser();
  const user = fetchUser.user;
  const itemsCount = await prisma.mail.count({
    where: {
      receiver: user?.email,
      subject: { startsWith: subject, mode: "insensitive" },
    },
  });
  const inboxMails = await prisma.mail.findMany({
    where: {
      subject: { startsWith: subject, mode: "insensitive" },
      receiver: user?.email ? user.email : undefined,
    },
    skip: (page - 1) * 1,
    take: pageSize,
  });

  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <InboxMails mails={inboxMails} />
        <Pagination
          pageSize={pageSize}
          itemsCount={itemsCount}
          currentPage={page}
        />
      </div>
    </AuthLayoutProvider>
  );
};

export default Home;
