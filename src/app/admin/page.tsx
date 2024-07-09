"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else {
      if (session !== undefined && session?.user.role !== "admin") {
        router.push("/");
      }
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
        Admin Protected Page
      </Button>
    </main>
  );
}
