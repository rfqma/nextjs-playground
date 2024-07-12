"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-2">
        <Button
          as={Link}
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmlja3JvbGxc"
          target="_blank"
          size="sm"
        >
          ???
        </Button>
        <Button as={Link} href="/gurauan-bapak" size="sm" color="primary">
          gurauan-bapak
        </Button>
        <Button as={Link} href="/valorant-101" size="sm" color="primary">
          valorant-101
        </Button>
      </div>

      <Card fullWidth>
        <CardBody>
          {status === "authenticated" ? (
            <p className="text-sm">{JSON.stringify(session)}</p>
          ) : (
            <p>no session.</p>
          )}
        </CardBody>
      </Card>
    </main>
  );
}
