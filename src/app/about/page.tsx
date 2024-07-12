"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Card, CardBody } from "@nextui-org/card";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button size="sm">About Page</Button>

      <Card fullWidth>
        <CardBody>
          {status === "authenticated" ? (
            <p>{JSON.stringify(session)}</p>
          ) : (
            <p>no session.</p>
          )}
        </CardBody>
      </Card>
    </main>
  );
}
