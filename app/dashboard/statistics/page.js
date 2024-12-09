import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import DataTable from "@/app/dashboard/statistics/data-table";
import { columns } from "@/app/dashboard/statistics/columns";
import { Lexend } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "FPL Mstr Stats",
  description: "Statistics of all FPL players.",
};

async function getData() {
  // Fetch data from your API here.
  try {
    const res = await fetch(`${process.env.API}/api/players`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTHORIZATION,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch players data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching players data:", error.message);
    throw error; // Re-throw the error for the closest error boundary
  }
}

export default async function Statistics() {
  const session = await getServerSession(authOptions);
  if (session === null) {
    return (
      <p>
        No session found, please go to <a href="/signin">this page</a> to log in
      </p>
    );
  }
  const name = session?.user.name;
  const data = await getData();

  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2
              className={`text-xl font-bold ${lexend.className} tracking-tight`}
            >
              Hello {name}!
            </h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of all the players
            </p>
          </div>
          <div className="flex items-center space-x-2">{/* <UserNav /> */}</div>
        </div>
        <DataTable data={data.players} columns={columns} />
      </div>
    </div>
  );
}
