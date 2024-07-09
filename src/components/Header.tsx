"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { AcmeLogo } from "./Logos/AcmeLogo";
import { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Skeleton } from "@nextui-org/skeleton";

export default function Header() {
  const { data: session, status }: { data: any; status: string } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { label: "Home", path: "/", protected: false, adminOnly: false },
    { label: "About", path: "/about", protected: false, adminOnly: false },
    {
      label: "Protected",
      path: "/protected",
      protected: true,
      adminOnly: false,
    },
    { label: "Admin", path: "/admin", protected: true, adminOnly: true },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.adminOnly && session?.user.role !== "admin") {
      return false;
    }
    return true;
  });

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">@rfqma/nextjs-playground</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {filteredMenuItems.map((item, index) => (
          <NavbarItem
            isActive={pathname === item.path}
            key={`${item}-${index}`}
          >
            <Link
              href={item.path}
              color={pathname === item.path ? "primary" : "foreground"}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {status === "unauthenticated" ? (
          <div className="flex gap-2">
            <NavbarItem className="hidden lg:flex">
              <Button
                onClick={() => signIn()}
                size="sm"
                color="secondary"
                variant="flat"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                onClick={() => signIn()}
                size="sm"
                color="primary"
                variant="flat"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </div>
        ) : status === "loading" ? (
          <Skeleton className="h-3 w-1/5 rounded-lg" />
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Button
              onClick={() => signOut()}
              size="sm"
              color="danger"
              variant="flat"
            >
              Logout
            </Button>
          </NavbarItem>
        )}
        {status === "loading" ? (
          <Skeleton className="flex rounded-full w-10 h-10" />
        ) : (
          <NavbarItem>
            <Dropdown placement="bottom-end" backdrop="blur">
              <DropdownTrigger>
                <Avatar
                  showFallback
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name={session?.user.name}
                  size="sm"
                  src="https://images.unsplash.com/broken"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-secondary">
                    {status === "authenticated" ? session?.user.email : "Guest"}
                  </p>
                </DropdownItem>
                <DropdownItem key="settings" isDisabled={true}>
                  Settings
                </DropdownItem>
                <DropdownItem key="help_and_feedback" isDisabled={true}>
                  Help & Feedback
                </DropdownItem>
                {status === "unauthenticated" ? (
                  <DropdownItem
                    key="login"
                    color="secondary"
                    className="text-secondary"
                    onClick={() => signIn()}
                  >
                    Login
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    key="logout"
                    color="danger"
                    className="text-danger"
                    onClick={() => signOut()}
                  >
                    Log Out
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {filteredMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={item.path === pathname ? "primary" : "foreground"}
              className="w-full"
              href={item.path}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
