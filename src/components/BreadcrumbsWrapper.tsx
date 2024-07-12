"use client";

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";

interface BreadcrumbItemProps {
  label: string;
  path: string;
}

interface BreadcrumbsWrapperProps {
  items: BreadcrumbItemProps[];
}

export default function BreadcrumbsWrapper({ items }: BreadcrumbsWrapperProps) {
  return (
    <Breadcrumbs size="sm">
      {items.map((item: BreadcrumbItemProps, index: number) => {
        return (
          <BreadcrumbItem key={`${item.label}-${index}`} href={item.path}>
            {item.label}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumbs>
  );
}
