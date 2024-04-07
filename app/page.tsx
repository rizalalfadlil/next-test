/* eslint-disable react/jsx-key */
"use client";
import LayoutBase from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { User, Activity, LogIn, Coffee, NotebookTabs } from "lucide-react";
import Image from "next/image";

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
    icon: <LogIn  className="w-full size-12 my-4" />,
  },
];
export default function Home() {
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

  const menuButtons = showedPage.map((p) => (
    <Card className="p-2 text-center grid content-center hover:cursor-pointer hover:bg-slate-200/50" onClick={()=> navigateTo(p.target)}>
      {p.icon}
      <Button className="text-md" variant="link">{p.title}</Button>
    </Card>
  ));

  return (
    <LayoutBase>
      <div className="grid gap-4 ">
        <div className="bg-slate-700 w-full h-48 rounded-lg"></div>
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
