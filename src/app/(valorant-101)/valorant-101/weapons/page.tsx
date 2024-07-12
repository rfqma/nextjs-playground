import { Button } from "@nextui-org/button";
import Weapon from "../../Weapon";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";

const getAllWeapons = async () => {
  try {
    const results = await fetch("https://valorant-api.com/v1/weapons", {
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

interface WeaponProps {
  uuid: string;
  displayName: string;
  category: string;
  displayIcon: string;
  shopData: {
    cost: number;
    category: string;
    categoryText: string;
  };
}

export default async function Page() {
  const data = await getAllWeapons();

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
      label: "weapons",
      path: "/valorant-101/weapons",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.status === 200 && data.data.length > 0 ? (
            data.data.map((item: WeaponProps, index: number) => {
              return (
                <Weapon
                  key={`${index}-${item.uuid}`}
                  uuid={item.uuid}
                  displayName={item.displayName}
                  category={item.category}
                  displayIcon={item.displayIcon}
                  shopData={item.shopData}
                />
              );
            })
          ) : (
            <Button size="sm">no weapon found</Button>
          )}
        </div>
      </div>
    </main>
  );
}
