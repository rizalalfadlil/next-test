/* eslint-disable react/jsx-key */
"use client";
import React, { useState } from "react";
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
  Coffee,
  LogIn,
  Menu,
  Moon,
  NotebookTabs,
  Sun,
  User,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

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
export default function LayoutBase({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState("light");
  const userData = localStorage.getItem("user");
  const parsedUser: {
    id: string;
    username: string;
    name: string;
    type: string;
  } = JSON.parse(userData || "{}");

  let showedPage;
  if (parsedUser.type === "admin") showedPage = adminPage;
  else if (parsedUser.type === "manajer") showedPage = managerPage;
  else showedPage = kasirPage;

  const navigationButtons = showedPage.map((p) => (
    <Button variant="link" onClick={() => navigateTo(`/${p.target}`)}>
      {p.icon} <span className="ms-4">{p.title}</span>
    </Button>
  ));

  return (
    <div className="md:grid grid-cols-10">
      <div className="col-span-2 hidden md:block border-e">
        <p className="font-semibold text-2xl my-4 px-8 pt-8 font-serif">
          Cafe Bisa Ngopi
        </p>
        <div className="px-8 pb-8">
          <Badge>{parsedUser.type}</Badge>
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
      <div className="h-screen col-span-8 mt-16 md:mt-0">
        <div className="flex flex-col h-full overflow-y-scroll">
          <div className="grow md:p-8 p-4">{children}</div>
          <div className="h-48 flex-none grid gap-2 bg-slate-500 text-white text-center align-middle text-lg p-8">
            <p>2024 - Hafidz Rizal Al-Fadlil</p>
            <p>
              using |{" "}
              <span>
                <a
                  href="https://nextjs.org/"
                  className="border-b hover:border-0"
                >
                  next.js
                </a>{" "}
                |{" "}
                <a
                  href="https://vercel.com/templates/next.js/nextjs-boilerplate"
                  className="border-b hover:border-0"
                >
                  create-next-app
                </a>{" "}
                |{" "}
                <a
                  href="https://tailwindcss.com/"
                  className="border-b hover:border-0"
                >
                  tailwindcss
                </a>{" "}
                |{" "}
                <a
                  href="https://ui.shadcn.com/"
                  className="border-b hover:border-0"
                >
                  shadcn
                </a>{" "}
                |{" "}
                <a
                  href="https://lucide.dev/guide/packages/lucide-react"
                  className="border-b hover:border-0"
                >
                  lucide react
                </a>{" "}
                |
              </span>
            </p>
            <p className="">
              <a
                href="https://github.com/rizalalfadlil/next-test"
                className="border-b hover:border-0"
              >
                GitHub Repository (currently in private) →
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
  );
}
