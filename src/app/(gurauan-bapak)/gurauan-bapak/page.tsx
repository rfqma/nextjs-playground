"use client";

import GenerateGurauanButton from "../GenerateGurauanButton";
import { useState, useEffect } from "react";

interface DataProps {
  code: number;
  msg: string;
  data: string;
}

const getRandomGurauanBapak = async () => {
  try {
    const baseURL = "https://jokes-bapack2-api.yuana.id";
    const endpoint = "/v1/text/random";
    const query = `?timestamp=${new Date().getTime()}`;

    const results = await fetch(`${baseURL}${endpoint}${query}`, {
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

export default function Page() {
  const [data, setData] = useState<DataProps | null>(null);

  const fetchData = async () => {
    const results = await getRandomGurauanBapak();
    setData(results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-10 items-center p-24">
      <GenerateGurauanButton refreshData={fetchData} />
      {data !== null && data.code === 200 && data.msg === "Success" ? (
        <h3 className="text-2xl text-center italic">{data.data}</h3>
      ) : (
        <h3 className="text-2xl text-center italic">fetch failed, try again</h3>
      )}
    </main>
  );
}
