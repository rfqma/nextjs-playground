import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Metadata } from "next";
import BreadcrumbsWrapper from "@/components/BreadcrumbsWrapper";
import xmljs from "xml-js";
import { AreaAccordion } from "../../AreaAccordion";
import { JSONModal } from "../../JSONModal";

export const metadata: Metadata = {
  title: "bmkg - prakiraan cuaca",
  description: "wkwk",
};

const getPrakiraanCuacaBangkaBelitung = async () => {
  try {
    const url =
      "https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-BangkaBelitung.xml";

    const results = await fetch(url, {
      method: "GET",
    });

    if (!results.ok) {
      return null;
    }

    const data = await results.text();

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
      label: "prakiraan cuaca",
      path: "/prakiraan-cuaca",
    },
  ];

  const data = await getPrakiraanCuacaBangkaBelitung();

  const parseXML = async (xml: any) => {
    const data = JSON.parse(xmljs.xml2json(xml, { compact: true, spaces: 2 }));
    return data;
  };

  const dataJSON = await parseXML(data);

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
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex flex-col gap-5 w-full">
        <BreadcrumbsWrapper items={breadcrumbItems} />
        <div className="flex flex-col gap-2">
          <Card fullWidth>
            <CardHeader className="flex gap-3">
              <div className="flex flex-col">
                <p className="text-md">bangka belitung forecast</p>
                <p className="text-small text-default-500">issued at</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                {convertTimestampString(
                  dataJSON.data.forecast.issue.timestamp._text
                )}
              </p>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://data.bmkg.go.id/DataMKG/MEWS/DigitalForecast/DigitalForecast-BangkaBelitung.xml"
              >
                Credit to Data Terbuka BMKG
              </Link>
            </CardFooter>
            <JSONModal data={dataJSON} />
          </Card>
          <AreaAccordion items={dataJSON.data.forecast.area} />
        </div>
      </div>
    </main>
  );
}
