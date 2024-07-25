import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";
import { Image } from "@nextui-org/image";

export const metadata: Metadata = {
  title: "bmkg - gempa bumi",
  description: "wkwk",
};

const getLatestGempaBumiInfo = async () => {
  try {
    const url = "https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json";

    const results = await fetch(url, {
      method: "GET",
    });

    if (!results.ok) {
      return null;
    }

    const data = await results.json();

    return data;
  } catch (error) {}
};

export default async function Page() {
  const breadcrumbItems = [
    {
      label: "home",
      path: "/",
    },
    {
      label: "bmkg",
      path: "/bmkg",
    },
    {
      label: "gempa bumi",
      path: "/gempa-bumi",
    },
  ];

  const data = await getLatestGempaBumiInfo();

  const convertTimestampString = async (timestamp: string) => {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const hour = timestamp.substring(8, 10);
    const minute = timestamp.substring(10, 12);
    const second = timestamp.substring(12, 14);

    const date = new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}Z`
    );
    return date.toLocaleString();
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-5">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="flex flex-col gap-2">
          <Card fullWidth>
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">latest earthquake</p>
                <p className="text-small text-default-500">
                  {`${data.Infogempa.gempa.Tanggal} - ${data.Infogempa.gempa.Jam}`}
                </p>
                <p className="text-small text-default-500">
                  {data.Infogempa.gempa.Coordinates}
                </p>
                <p className="text-small text-default-500">
                  {data.Infogempa.gempa.Lintang}
                </p>
                <p className="text-small text-default-500">
                  {data.Infogempa.gempa.Bujur}
                </p>
                <p className="text-small text-default-500">
                  Magnitudo {data.Infogempa.gempa.Magnitude}
                </p>
                <p className="text-small text-default-500">
                  Kedalaman {data.Infogempa.gempa.Kedalaman}
                </p>
                <p className="text-small text-default-500">
                  {data.Infogempa.gempa.Wilayah}
                </p>
                <p className="text-small text-default-500">
                  {data.Infogempa.gempa.Potensi}
                </p>
                <p className="text-small text-default-500">
                  Dirasakan {data.Infogempa.gempa.Dirasakan}
                </p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Image
                width={500}
                alt="NextUI hero Image"
                src={`https://data.bmkg.go.id/DataMKG/TEWS/${data.Infogempa.gempa.Shakemap}`}
              />
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://data.bmkg.go.id/gempabumi/"
              >
                Credit to Data Terbuka BMKG
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
