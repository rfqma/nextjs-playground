import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";

export const metadata: Metadata = {
  title: "valorant 101",
  description: "wkwk",
};

export default async function Page() {
  const breadcrumbItems = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "valorant-101",
      path: "/valorant-101",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="flex flex-col gap-2">
          <Button
            as={Link}
            href="/valorant-101/agents"
            size="sm"
            color="secondary"
          >
            agents
          </Button>
          <Button
            as={Link}
            href="/valorant-101/maps"
            size="sm"
            color="secondary"
          >
            maps
          </Button>
          <Button
            as={Link}
            href="/valorant-101/weapons"
            size="sm"
            color="secondary"
          >
            weapons
          </Button>
        </div>
      </div>
    </main>
  );
}
