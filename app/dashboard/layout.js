import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { redirect } from "next/navigation";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";

export default async function RootLayout({ children }) {
  const NavItems = [
    {
      title: "You",
      href: `/dashboard`,
    },
    {
      title: "You vs AI",
      href: `/dashboard/youvsai`,
    },
    {
      title: "You vs Top 250",
      href: `/dashboard/top250`,
    },
    {
      title: "FPL Challenge",
      href: `/dashboard/fpl-challenge`,
    },
    {
      title: "Fixtures",
      href: "/dashboard/fixtures",
    },
    {
      title: "All Players",
      href: `/dashboard/statistics`,
    },
  ];
  const session = await getServerSession();
  if (session) {
    return (
      <html lang="en">
        <body>
          <SessionProvider session={session}>
            <NavMenu items={NavItems} />
            <main>{children}</main>
            <Footer />
          </SessionProvider>
        </body>
      </html>
    );
  } else {
    return redirect("/signin");
  }
}
