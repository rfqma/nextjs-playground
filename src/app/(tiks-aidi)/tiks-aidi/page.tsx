import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";

export const metadata: Metadata = {
  title: "tiks aidi",
  description: "wkwk",
};

export default async function Page() {
  const breadcrumbItems = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "tiks-aidi",
      path: "/tiks-aidi",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="flex flex-col gap-2">
          <Button
            as={Link}
            href="/tiks-aidi/listed-cities"
            size="sm"
            color="secondary"
          >
            listed cities
          </Button>
          <Button
            as={Link}
            href="/tiks-aidi/now-playing"
            size="sm"
            color="secondary"
          >
            now playing
          </Button>
          <Button
            as={Link}
            href="/tiks-aidi/upcoming"
            size="sm"
            color="secondary"
            isDisabled
          >
            upcoming
          </Button>
          <Button
            as={Link}
            href="/tiks-aidi/theaters"
            size="sm"
            color="secondary"
            isDisabled
          >
            theaters
          </Button>
        </div>
      </div>
    </main>
  );
}
