import { Button } from "@nextui-org/button";
import City from "../../City";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";

const getAllCities = async () => {
  try {
    const tokenResults = await fetch("https://api.tix.id/v1/token", {
      method: "POST",
      headers: {
        "Client-Secret": "123456",
      },
    });

    if (!tokenResults.ok) {
      return null;
    }

    const tokenData = await tokenResults.json();

    if (tokenData === null) {
      return null;
    }

    const token = tokenData.results.token;
    const results = await fetch("https://api.tix.id/v1/cities", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!results.ok) {
      return null;
    }

    const data = await results.json();

    // if (data.success === false) {
    //   return null;
    // }

    return data;
  } catch (error) {
    console.error("network response was not ok: ", error);
    return null;
  }
};

interface CityProps {
  id: string;
  name: string;
}

export default async function Page() {
  const data = await getAllCities();

  const breadcrumbItems = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "tiks-aidi",
      path: "/tiks-aidi",
    },
    {
      label: "now-playing",
      path: "/tiks-aidi/now-playing",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.results.length > 0 ? (
            data.results.map((item: CityProps, index: number) => {
              return (
                <City
                  key={`${index}-${item.id}`}
                  id={item.id}
                  name={item.name}
                  accessedByIsNowPlaying={true}
                />
              );
            })
          ) : (
            <Button size="sm">no city found</Button>
          )}
        </div>
      </div>
    </main>
  );
}
