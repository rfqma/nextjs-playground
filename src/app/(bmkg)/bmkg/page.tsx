import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";

export const metadata: Metadata = {
  title: "bmkg",
  description: "wkwk",
};

export default async function Page() {
  const breadcrumbItems = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "bmkg",
      path: "/bmkg",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="flex flex-col gap-2">
          <Button
            as={Link}
            href="/bmkg/prakiraan-cuaca"
            size="sm"
            color="secondary"
          >
            prakiraan cuaca
          </Button>
          <Button as={Link} href="/bmkg/gempa-bumi" size="sm" color="secondary">
            gempa bumi
          </Button>
        </div>
      </div>
    </main>
  );
}
