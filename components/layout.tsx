/* eslint-disable react/jsx-key */
"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import {
  Activity,
  BookUser,
  Coffee,
  LogIn,
  Menu,
  MessageSquareShare,
  Moon,
  NotebookTabs,
  Sun,
  User,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { Loading } from "./Loading";

const navigateTo = (url: string) => {
  window.location.href = url;
};
const adminPage = [
  {
    title: "Users",
    target: "users",
    icon: <User />,
  },
  {
    title: "Aktivitas",
    target: "activity",
    icon: <Activity />,
  },
  {
    title: "Log-out",
    target: "login",
    icon: <LogIn />,
  },
];
const managerPage = [
  {
    title: "menu",
    target: "menu",
    icon: <Coffee />,
  },
  {
    title: "Aktivitas",
    target: "activity",
    icon: <Activity />,
  },
  {
    title: "Pesanan",
    target: "order",
    icon: <NotebookTabs />,
  },
  {
    title: "Feedback",
    target: "feedback/result",
    icon: <BookUser />,
  },
  {
    title: "Log-out",
    target: "login",
    icon: <LogIn />,
  },
];
const kasirPage = [
  {
    title: "Pesanan",
    target: "order",
    icon: <NotebookTabs />,
  },
  {
    title: "Log-out",
    target: "login",
    icon: <LogIn />,
  },
];
const guestPage = [
  {
    title: "Anda staff? klik disini",
    target: "login",
    icon: <LogIn />,
  },
  {
    title: "Anda memiliki saran? klik disini",
    target: "feedback",
    icon: <MessageSquareShare />,
  },
];

interface UserInterface {
  id: string;
  username: string;
  name: string;
  type: string;
}
export default function LayoutBase({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");
  const [userData, setUserData] = useState("");
  const parsedUser: UserInterface = JSON.parse(userData || "{}");

  useEffect(() => {
    const user: string = localStorage.getItem("user")!;
    setUserData(user);
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  let showedPage;
  if (parsedUser.type === "admin") showedPage = adminPage;
  else if (parsedUser.type === "manajer") showedPage = managerPage;
  else if (parsedUser.type === "kasir") showedPage = kasirPage;
  else showedPage = guestPage;

  const navigationButtons = showedPage.map((p) => (
    <Button
      variant="link"
      className="py-8 content-start lg:border hover:bg-muted"
      onClick={() => navigateTo(`/${p.target}`)}
    >
      {p.icon} <span className="ms-4 text-wrap">{p.title}</span>
    </Button>
  ));

  return isClient ? (
    <div className="md:grid grid-cols-10" suppressHydrationWarning>
      <div className="col-span-2 hidden md:block border-e relative">
        <div className="sticky top-0">
          <p className="font-bold text-3xl my-4 px-4 pt-4">
            <a href="/" className="flex justify-center items-center">
              <div
                className="size-20 bg-contain bg-center bg-no-repeat"
                style={{ backgroundImage: "url('./logo.png')" }}
              ></div>
              <span className="mt-3 ms-4">Bisa Ngopi</span>
            </a>
          </p>
          <div className="px-4 pb-4 grid place-content-center">
            {parsedUser.type && <Badge>{parsedUser.type}</Badge>}
          </div>
          <Separator />
          <div className="p-4 grid gap-2">
            {navigationButtons}
            {/* <Button
              variant="link"
              onClick={() => {
                setTheme(currentTheme === "light" ? "dark" : "light");
                setCurrentTheme(currentTheme === "light" ? "dark" : "light");
              }}
            >
              {currentTheme === "light" ? <Moon /> : <Sun />}{" "}
              <span className="ms-4">
                {currentTheme === "light" ? "Mode gelap" : "mode Terang"}
              </span>
            </Button> */}
          </div>
        </div>
      </div>
      <div className="h-screen col-span-8 mt-16 md:mt-0">
        <div className="flex flex-col h-full">
          <div className="grow md:p-4 p-2 bg-muted">
            <div className="md:p-4 p-2 bg-background border rounded-lg">
              {children}
            </div>
          </div>
          <div className="h-48 flex-none grid bg-primary text-white text-center align-middle text-lg p-8">
            <p>2024 - Hafidz Rizal Al-Fadlil</p>
            <p className="">
              <a
                href="https://bisa-ngopi-docs.vercel.app"
                className="border-b hover:border-0 me-8"
              >
                docs
              </a>
              <a
                href="https://github.com/rizalalfadlil/next-test"
                className="border-b hover:border-0"
              >
                github
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute w-full top-0 bg-white/50 gap-2 p-2 md:hidden">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger></AccordionTrigger>
            <AccordionContent className="grid backdrop-blur-sm">
              <span className="text-center bg-green-500/20 rounded-sm text-green-800 font-bold py-2">
                {parsedUser.type}
              </span>
              {navigationButtons}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  ) : (
    <div className="w-screen h-screen grid place-content-center"><div className="grid justify-items-center"><Loading/><p>memuat halaman</p></div></div>
  );
}
