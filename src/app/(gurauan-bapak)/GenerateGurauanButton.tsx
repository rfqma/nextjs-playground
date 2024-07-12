"use client";

import { Button } from "@nextui-org/button";
import { useState } from "react";

interface GenerateGurauanButtonProps {
  refreshData: () => void;
}

export default function GenerateGurauanButton({
  refreshData,
}: GenerateGurauanButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerateGurauanButton = () => {
    setLoading(true);
    refreshData();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Button
      color="secondary"
      size="sm"
      onClick={handleGenerateGurauanButton}
      isLoading={loading}
    >
      generate gurauan bapak
    </Button>
  );
}
