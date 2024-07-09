"use client";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Tab, Tabs } from "@nextui-org/tabs";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import bc from "bcryptjs";
import { useSession } from "next-auth/react";

export default function Page() {
  const [selected, setSelected] = useState<any>("login");
  const [loading, setLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleLogin = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: event.currentTarget.email.value,
        password: event.currentTarget.password.value,
        callbackUrl: "/",
      });

      if (!res?.error) {
        router.push("/");
      } else if (res.status === 401) {
        alert(
          `invalid email or password, ok=${res.ok}, status=${res.status}, message=${res.error}`
        );
      } else {
        alert(`ok=${res.ok}, status=${res.status}, message=${res.error}`);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const results = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: event.currentTarget.name.value,
          email: event.currentTarget.email.value,
          password: await bc.hash(event.currentTarget.password.value, 10),
          role: "regular",
        }),
      });

      const response = await results.json();

      if (response.error === null && response.status === 201) {
        setSelected("login");
        alert(`${response.message}`);
      } else if (response.error && response.status === 409) {
        alert(
          `error: ${response.error}, status: ${response.status}, message: ${response.message}`
        );
      } else {
        alert(
          `error: ${response.error}, status: ${response.status}, message: ${response.message}`
        );
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="login" title="Login">
                <form
                  onSubmit={(event) => handleLogin(event)}
                  className="flex flex-col gap-4"
                >
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    name="email"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <p className="text-center text-small">
                    Need to create an account?{" "}
                    <Link size="sm" onPress={() => setSelected("sign-up")}>
                      Sign up
                    </Link>
                  </p>
                  <div className="flex flex-col gap-2 justify-end">
                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      isLoading={loading}
                    >
                      Login
                    </Button>
                    <Button
                      as={Link}
                      href="/"
                      fullWidth
                      color="default"
                      isDisabled={loading}
                    >
                      Continue as Guest
                    </Button>
                  </div>
                </form>
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <form
                  onSubmit={(event) => handleRegister(event)}
                  className="flex flex-col gap-4 h-[300px]"
                >
                  <Input
                    isRequired
                    label="Name"
                    placeholder="Enter your name"
                    type="text"
                    id="name"
                    name="name"
                  />
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    name="email"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    id="password"
                    name="password"
                  />
                  <p className="text-center text-small">
                    Already have an account?{" "}
                    <Link size="sm" onPress={() => setSelected("login")}>
                      Login
                    </Link>
                  </p>
                  <div className="flex flex-col gap-2 justify-end">
                    <Button
                      fullWidth
                      color="primary"
                      type="submit"
                      isLoading={loading}
                    >
                      Sign up
                    </Button>
                    <Button
                      as={Link}
                      href="/"
                      fullWidth
                      color="default"
                      isDisabled={loading}
                    >
                      Continue as Guest
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
