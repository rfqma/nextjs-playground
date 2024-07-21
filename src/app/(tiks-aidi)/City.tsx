"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

interface CityProps {
  id: string;
  name: string;
  accessedByIsNowPlaying?: boolean;
}

export default function City(item: CityProps) {
  return (
    <>
      <Button
        as={item.accessedByIsNowPlaying ? Link : "button"}
        href={
          item.accessedByIsNowPlaying
            ? `/tiks-aidi/now-playing/${item.id}`
            : undefined
        }
        color={item.accessedByIsNowPlaying ? "secondary" : "default"}
        fullWidth
        size="lg"
        className="flex items-center justify-between"
      >
        {item.name}
      </Button>
    </>
  );
}
