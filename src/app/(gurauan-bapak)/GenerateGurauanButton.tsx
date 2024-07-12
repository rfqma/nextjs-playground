"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GenerateGurauanButton() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Button
      color="secondary"
      size="sm"
      onClick={() => {
        setLoading(true);
        router.refresh();
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }}
      isLoading={loading}
    >
      generate gurauan bapak
    </Button>
  );
}
