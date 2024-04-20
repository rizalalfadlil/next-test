/* eslint-disable react/jsx-key */
"use client";
import LayoutBase from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { formatRupiah } from "@/util/format";
import axios from "axios";
import { User, Activity, LogIn, Coffee, NotebookTabs } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { string } from "zod";
import config from "../config.json";
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
const guestPage = [
  {
    title: "Login",
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
  else if (parsedUser.type === "kasir") showedPage = kasirPage;
  else showedPage = guestPage;

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
        {parsedUser.name ? (
          <>
            <div
              className="w-full h-48 rounded-lg bg-cover bg-slate-200 bg-center flex items-center"
              style={{ backgroundImage: "url('')" }}
            >
              <div
                className="h-4/5 aspect-square bg-contain"
                style={{ backgroundImage: "url('./logo.png')" }}
              ></div>
              <p className="text-4xl md:text-6xl ms-4 md:ms-8 font-medium tracking-wide mt-3">
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
          </>
        ) : (
          <GuestPage />
        )}
      </div>
    </LayoutBase>
  );
}
interface Menu {
  collectionId: string;
  collectionName: string;
  created: Date;
  foto: string;
  harga: string;
  id: string;
  nama: string;
  updated: Date;
}

const GuestPage = () => {
  const [daftarMenu, setDaftarMenu] = useState([]);
  const getDaftarMenu = async () => {
    try {
      const res = await axios.get(`${config.db}api/collections/menu/records`);
      console.log(res.data.items);
      setDaftarMenu(res.data.items);
    } catch (e) {}
  };
  useEffect(() => {
    getDaftarMenu();
  }, []);
  return (
    <div className="p-4 grid gap-4">
      <p className="text-lg font-semibold">Makanan</p>
      <div className="flex flex-row w-full overflow-x-scroll md:overflow-x-hidden md:grid md:grid-cols-3 2xl:grid-cols-6 md:grid-rows-1 overflow-y-hidden gap-4">
      {daftarMenu.map((m:Menu) => (
        <Card className="flex-1 min-w-full">
          <div
            style={{
              backgroundImage: `url('${config.db}api/files/${m.collectionId}/${m.id}/${m.foto}?')`,
            }}
            className="w-full rounded-t-lg border bg-cover bg-no-repeat bg-center h-48"
          />
          <CardContent className="p-4">
            <p className="text-sm">{m.nama}</p>
            <p className="font-bold">{formatRupiah(parseInt(m.harga))}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  );
};
