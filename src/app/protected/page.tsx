"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button
        as={Link}
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUJcmlja3JvbGxc"
        target="_blank"
        size="sm"
      >
        Protected Page
      </Button>
    </main>
  );
}
