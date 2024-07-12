import { Button } from "@nextui-org/button";
import Map from "../../Map";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";

const getAllMaps = async () => {
  try {
    const results = await fetch("https://valorant-api.com/v1/maps", {
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

interface MapProps {
  uuid: string;
  displayName: string;
  tacticalDescription: string;
  coordinates: string;
  listViewIcon: string;
  displayIcon: string;
}

export default async function Page() {
  const data = await getAllMaps();

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
      label: "maps",
      path: "/valorant-101/maps",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.status === 200 && data.data.length > 0 ? (
            data.data.map((item: MapProps, index: number) => {
              return (
                <Map
                  key={`${index}-${item.uuid}`}
                  uuid={item.uuid}
                  displayName={item.displayName}
                  tacticalDescription={item.tacticalDescription}
                  coordinates={item.coordinates}
                  listViewIcon={item.listViewIcon}
                  displayIcon={item.displayIcon}
                />
              );
            })
          ) : (
            <Button size="sm">no map found</Button>
          )}
        </div>
      </div>
    </main>
  );
}