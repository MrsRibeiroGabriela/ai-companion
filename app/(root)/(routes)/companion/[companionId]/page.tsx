import prismadb from "@/lib/prismadb";
import { auth, redirectToSignIn } from "@clerk/nextjs";

import { CompanionForm } from "./components/companion-form";


interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  //TODO: Check subscription
  const { userId } = auth();

  if(!userId) {
    return redirectToSignIn();
  }

  //server component
  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    //client component
    <CompanionForm
    initialData={companion}
    categories={categories}
    />
  );
};

export default CompanionIdPage;
