/* eslint-disable react/jsx-key */
"use client";
import LayoutBase from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { User, Activity, LogIn, Coffee, NotebookTabs } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const navigateTo = (url: string) => {
  window.location.href = url;
};

const adminPage = [
  {
    title: "Users",
    target: "users",
    icon: <User className="w-full size-12 my-4" />,
  },
  {
    title: "Aktivitas",
    target: "activity",
    icon: <Activity className="w-full size-12 my-4" />,
  },
  {
    title: "Log-out",
    target: "login",
    icon: <LogIn className="w-full size-12 my-4" />,
  },
];
const managerPage = [
  {
    title: "menu",
    target: "menu",
    icon: <Coffee className="w-full size-12 my-4" />,
  },
  {
    title: "Aktivitas",
    target: "activity",
    icon: <Activity className="w-full size-12 my-4" />,
  },
  {
    title: "Pesanan",
    target: "order",
    icon: <NotebookTabs className="w-full size-12 my-4" />,
  },
  {
    title: "Log-out",
    target: "login",
    icon: <LogIn className="w-full size-12 my-4" />,
  },
];
const kasirPage = [
  {
    title: "Pesanan",
    target: "order",
    icon: <NotebookTabs className="w-full size-12 my-4" />,
  },
  {
    title: "Log-out",
    target: "login",
    icon: <LogIn className="w-full size-12 my-4" />,
  },
];

interface UserInterface {
  id: string;
  username: string;
  name: string;
  type: string;
}
export default function Home() {
  const [userData, setUserData] = useState("");
  const parsedUser: UserInterface = JSON.parse(userData || "{}");

  
  useEffect(() => {
    const user: string = localStorage.getItem("user")!;
    setUserData(user);
  }, []);

  let showedPage;
  if (parsedUser.type === "admin") showedPage = adminPage;
  else if (parsedUser.type === "manajer") showedPage = managerPage;
  else showedPage = kasirPage;

  const menuButtons = showedPage.map((p) => (
    <Card
      className="p-2 text-center grid content-center hover:cursor-pointer hover:bg-slate-200/50"
      onClick={() => navigateTo(p.target)}
    >
      {p.icon}
      <Button className="text-md" variant="link">
        {p.title}
      </Button>
    </Card>
  ));

  return (
    <LayoutBase>
      <div className="grid gap-4 ">
        <div
          className="w-full h-48 rounded-lg bg-cover bg-slate-200 bg-center flex items-center"
          style={{ backgroundImage: "url('')" }}
        >
          <div
            className="h-full aspect-square bg-contain"
            style={{ backgroundImage: "url('./logo.png')" }}
          ></div>
          <p className="text-5xl md:text-6xl ms-4 md:ms-8 font-medium tracking-wide mt-3">
            Bisa Ngopi
          </p>
        </div>
        <p className="text-lg">
          Halo,{" "}
          <span className="font-semibold capitalize">
            {parsedUser.type} {parsedUser.name}
          </span>
        </p>
        <div className="grid grid-cols-2  md:grid-cols-4 2xl:grid-cols-8 gap-4">
          {menuButtons}
        </div>
      </div>
    </LayoutBase>
  );
}
