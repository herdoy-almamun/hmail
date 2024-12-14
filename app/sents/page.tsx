import AuthLayoutProvider from "@/components/auth-layout-provider";
import Pagination from "@/components/pagination";
import { getUser } from "@/lib/actions";
import prisma from "@/prisma/client";
import SentMails from "./sent-mails";

type SearchParams = Promise<{ page: string; subject: string }>;

const SentItems = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 5;
  const subject = searchParams.subject;

  const fetchUser = await getUser();
  const user = fetchUser.user;
  const itemsCount = await prisma.mail.count({
    where: {
      sender: user?.email,
      subject: {
        startsWith: subject ? subject : undefined,
        mode: "insensitive",
      },
    },
  });
  const sentMails = await prisma.mail.findMany({
    where: {
      subject: { startsWith: subject, mode: "insensitive" },
      sender: user?.email ? user.email : undefined,
    },
    skip: (page - 1) * 1,
    take: pageSize,
  });

  return (
    <AuthLayoutProvider>
      <div className="p-2">
        <SentMails mails={sentMails} />
        <Pagination
          pageSize={pageSize}
          itemsCount={itemsCount}
          currentPage={page}
        />
      </div>
    </AuthLayoutProvider>
  );
};

export default SentItems;
