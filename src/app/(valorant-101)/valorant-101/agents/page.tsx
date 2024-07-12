import { Button } from "@nextui-org/button";
import Agent from "../../Agent";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";

const getAllAgents = async () => {
  try {
    const results = await fetch("https://valorant-api.com/v1/agents", {
      method: "GET",
    });

    if (!results.ok) {
      return null;
    }

    const data = await results.json();

    return data;
  } catch (error) {
    console.error("network response was not ok: ", error);
    return null;
  }
};

interface AgentProps {
  uuid: string;
  displayName: string;
  isPlayableCharacter: boolean;
  displayIconSmall: string;
  fullPortrait: string;
  background: string;
  description: string;
  role: {
    displayName: string;
  };
  abilities: {
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
  }[];
}

export default async function Page() {
  const data = await getAllAgents();

  const breadcrumbItems = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "valorant-101",
      path: "/valorant-101",
    },
    {
      label: "agents",
      path: "/valorant-101/agents",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.status === 200 && data.data.length > 0 ? (
            data.data
              .filter((item: AgentProps) => item.isPlayableCharacter === true)
              .map((item: AgentProps, index: number) => {
                return (
                  <Agent
                    key={`${index}-${item.uuid}`}
                    uuid={item.uuid}
                    displayName={item.displayName}
                    displayIconSmall={item.displayIconSmall}
                    description={item.description}
                    role={item.role}
                    abilities={item.abilities}
                    fullPortrait={item.fullPortrait}
                    background={item.background}
                  />
                );
              })
          ) : (
            <Button size="sm">no agent found</Button>
          )}
        </div>
      </div>
    </main>
  );
}
