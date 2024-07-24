"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";

export const AreaAccordion = ({ items }: { items: any }) => {
  const convertTimestampString = (timestamp: string) => {
    const year = timestamp.substring(0, 4);
    const month = timestamp.substring(4, 6);
    const day = timestamp.substring(6, 8);
    const hour = timestamp.substring(8, 10);
    const minute = timestamp.substring(10, 12);

    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}Z`);
    return date.toLocaleString();
  };

  const generateWeatherByCode = (code: string) => {
    switch (code) {
      case "0":
        return "Cerah";
      case "1":
        return "Cerah Berawan";
      case "2":
        return "Cerah Berawan";
      case "3":
        return "Berawan";
      case "4":
        return "Berawan Tebal";
      case "5":
        return "Udara Kabur";
      case "10":
        return "Asap";
      case "45":
        return "Kabut";
      case "60":
        return "Hujan Ringan";
      case "61":
        return "Hujan Sedang";
      case "63":
        return "Hujan Lebat";
      case "80":
        return "Hujan Lokal";
      case "95":
        return "Hujan Petir";
      case "97":
        return "Hujan Petir";
      default:
        return "Unknown code";
    }
  };

  const generateWindDirectionByCode = (code: string) => {
    switch (code) {
      case "N":
        return "North";
      case "NNE":
        return "North-Northeast";
      case "NE":
        return "Northeast";
      case "ENE":
        return "East-Northeast";
      case "E":
        return "East";
      case "ESE":
        return "East-Southeast";
      case "SE":
        return "Southeast";
      case "SSE":
        return "South-Southeast";
      case "S":
        return "South";
      case "SSW":
        return "South-Southwest";
      case "SW":
        return "Southwest";
      case "WSW":
        return "West-Southwest";
      case "W":
        return "West";
      case "WNW":
        return "West-Northwest";
      case "NW":
        return "Northwest";
      case "NNW":
        return "North-Northwest";
      case "VARIABLE":
        return "Tidak tentu";
      default:
        return "Unknown code";
    }
  };

  return (
    <Accordion>
      {items.map((item: any, index: number) => {
        return (
          <AccordionItem
            key={index + 1}
            aria-label={item._attributes.description}
            title={item._attributes.description}
          >
            <Card fullWidth>
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">{item._attributes.description}</p>
                  <p className="text-sm">{item.name[1]._text}</p>
                  <p className="text-small text-default-500">
                    latitude: {item._attributes.latitude}
                  </p>
                  <p className="text-small text-default-500">
                    longitude: {item._attributes.longitude}
                  </p>
                  <p className="text-small text-default-500">
                    coordinate: {item._attributes.coordinate}
                  </p>
                  <p className="text-small text-default-500">
                    type: {item._attributes.type}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <Tabs aria-label="Options">
                  {item.parameter ? (
                    item.parameter.map((item: any, index: number) => {
                      return (
                        <Tab
                          key={item._attributes.id}
                          title={item._attributes.description}
                        >
                          <Card>
                            <CardHeader>
                              this parameter type is {item._attributes.type},
                              tap/hover button to see the value.
                            </CardHeader>
                            <CardBody className="flex flex-col gap-3">
                              {item.timerange.map(
                                (item: any, index: number) => {
                                  const isArray = Array.isArray(item.value);

                                  return (
                                    <Tooltip
                                      key={index + 1}
                                      showArrow={true}
                                      content={
                                        isArray
                                          ? item.value.map(
                                              (item: any, index: number) => {
                                                return (
                                                  <span key={index + 1}>
                                                    {item._attributes.unit ===
                                                    "CARD"
                                                      ? `from ${generateWindDirectionByCode(
                                                          item._text
                                                        )}`
                                                      : `${item._text} ${item._attributes.unit}`}
                                                  </span>
                                                );
                                              }
                                            )
                                          : item.value._attributes.unit ===
                                            "icon"
                                          ? generateWeatherByCode(
                                              item.value._text
                                            )
                                          : `${item.value._text} ${item.value._attributes.unit}`
                                      }
                                      color="secondary"
                                    >
                                      <Button variant="flat" color="success">
                                        {convertTimestampString(
                                          item._attributes.datetime
                                        )}
                                      </Button>
                                    </Tooltip>
                                  );
                                }
                              )}
                            </CardBody>
                          </Card>
                        </Tab>
                      );
                    })
                  ) : (
                    <>no parameter in this area</>
                  )}
                </Tabs>
              </CardBody>
              <Divider />
              <CardFooter></CardFooter>
            </Card>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
