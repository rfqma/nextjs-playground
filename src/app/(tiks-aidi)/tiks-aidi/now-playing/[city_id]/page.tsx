import { Button } from "@nextui-org/button";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";

const getAllNowPlayingsByCity = async (city_id: string) => {
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
    const results = await fetch(
      `https://api.tix.id//v1/movies/now_playing?city_id=${city_id}&tz=7`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!results.ok) {
      return null;
    }

    const data = await results.json();

    if (data.success === false) {
      return null;
    }

    return data;
  } catch (error) {
    console.error("network response was not ok: ", error);
    return null;
  }
};

export default async function Page(params: { params: { city_id: string } }) {
  const data = await getAllNowPlayingsByCity(params.params.city_id);

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
    {
      label: params.params.city_id,
      path: `/tiks-aidi/now-playing/${params.params.city_id}`,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {data.success === true && data.results.length > 0 ? (
            data.results.map((item: any, index: number) => {
              return (
                <Card
                  className="py-4"
                  as={Link}
                  href={item.trailer_path}
                  target={"_blank"}
                  key={index}
                >
                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">
                      {item.genre_ids[0].name}
                    </p>
                    <small className="text-default-500">
                      {item.duration} minutes
                    </small>
                    <h4 className="font-bold text-large">{item.title}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl aspect-square"
                      src={item.poster_path}
                      width={270}
                    />
                  </CardBody>
                </Card>
              );
            })
          ) : (
            <Button size="sm">no movie found</Button>
          )}
        </div>
      </div>
    </main>
  );
}
