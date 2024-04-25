/* eslint-disable react/jsx-key */
"use client";
import LayoutBase from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { formatRupiah } from "@/util/format";
import axios from "axios";
import {
  User,
  Activity,
  LogIn,
  Coffee,
  NotebookTabs,
  Mail,
  PhoneCall,
  Facebook,
  Instagram,
  Linkedin,
  LinkedinIcon,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { string } from "zod";
import config from "../config.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
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

  return parsedUser.name ? (
    <LayoutBase>
      <div className="grid gap-4">
        <div
          className="w-full h-48 rounded-lg bg-cover bg-slate-200 bg-center flex items-center"
          style={{ backgroundImage: "url('')" }}
        >
          <div
            className="h-4/5 aspect-square bg-contain"
            style={{
              backgroundImage:
                "url('https://raw.githubusercontent.com/rizalalfadlil/next-test/master/public/logo.png')",
            }}
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
      </div>
    </LayoutBase>
  ) : (
    <GuestPage />
  );
}
interface Menu {
  collectionId: string;
  collectionName: string;
  created: Date;
  jenis: string;
  foto: string;
  harga: string;
  id: string;
  nama: string;
  updated: Date;
}

const GuestPage = () => {
  const [daftarMenu, setDaftarMenu] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDaftarMenu = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${config.db}api/collections/menu/records`);
      console.log(res.data.items);
      setDaftarMenu(res.data.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDaftarMenu();
  }, []);
  const makanan = daftarMenu.filter((d: Menu) => d.jenis === "makanan");
  const minuman = daftarMenu.filter((d: Menu) => d.jenis === "minuman");
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="bg-muted w-screen overflow-hidden">
      <div className="bg-primary h-screen grid md:grid-cols-2">
        <div className="grid w-full place-content-center text-background gap-4 p-8 md:p-20">
          <p className="text-2xl md:text-4xl xl:text-7xl font-extrabold">Large Text</p>
          <p className="text-sm xl:text-lg">
            small Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            quidem fugiat harum consectetur excepturi, deserunt, sed nulla quis
            eaque, assumenda animi dignissimos impedit commodi repudiandae
            alias? Porro, enim. Eveniet, enim!
          </p>
        </div>
        <div
        style={{backgroundImage:`url('./kopi.png')`}}
        className='bg-center bg-contain bg-no-repeat mb-20 md:mb-0 xl:size-1/2 xl:place-self-center'></div>
      </div>
      <main className="md:py-40 p-8 bg-background md:px-20 lg:px-40 2xl:px-80 w-full overflow-x-hidden grid gap-8">
        <p className="text-lg md:text-3xl 2xl:text-5xl font-semibold">Menu unggulan</p>
        <Carousel plugins={[plugin.current]} className="w-full">
          <CarouselContent>
            {loading ? (
              <CarouselItem>
                <Card>
                  <Skeleton className="rounded-lg border bg-cover bg-no-repeat bg-center h-48 md:h-80"></Skeleton>
                </Card>
              </CarouselItem>
            ) : (
              daftarMenu
                .map((m: Menu, index) => (
                  <CarouselItem key={index}>
                    <Card>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        style={{
                          backgroundImage: `url('${config.db}api/files/${m.collectionId}/${m.id}/${m.foto}?')`,
                        }}
                        className="rounded-lg border bg-cover bg-no-repeat bg-center h-48 md:h-80"
                      >
                        <div className="w-full h-full relative bg-gradient-to-t from-black/80 rounded-lg">
                          <div className="absolute bottom-0 text-background p-4">
                            <p className="text-xs">{m.nama}</p>
                            <p className="text-lg">
                              {formatRupiah(parseInt(m.harga))}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Card>
                  </CarouselItem>
                ))
                .slice(0, 3)
            )}
          </CarouselContent>
        </Carousel>
        <p className="text-lg md:text-3xl 2xl:text-5xl font-semibold">Makanan</p>
        <div className="flex flex-row w-full overflow-x-scroll md:overflow-x-hidden md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 md:grid-rows-1 overflow-y-hidden gap-4">
          {loading ? (
            <CardSkeleton />
          ) : (
            makanan.map((m: Menu, index) => (
              <motion.div
                className="flex-1 min-w-full"
                initial={{ opacity: 0, x: 100 + 100 * index }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Card className="flex-1 min-w-full">
                  <div
                    style={{
                      backgroundImage: `url('${config.db}api/files/${m.collectionId}/${m.id}/${m.foto}?')`,
                    }}
                    className="w-full rounded-t-lg border bg-cover bg-no-repeat bg-center h-48"
                  />
                  <CardContent className="p-4">
                    <p className="text-sm">{m.nama}</p>
                    <p className="font-bold">
                      {formatRupiah(parseInt(m.harga))}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
        <p className="text-lg md:text-3xl 2xl:text-5xl font-semibold">Minuman</p>
        <div className="flex flex-row w-full overflow-x-scroll md:overflow-x-hidden md:grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 md:grid-rows-1 overflow-y-hidden gap-4">
          {loading ? (
            <CardSkeleton />
          ) : (
            minuman.map((m: Menu, index) => (
              <motion.div
                className="flex-1 min-w-full"
                initial={{ opacity: 0, x: 100 + 100 * index }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <Card className="flex-1 min-w-full">
                  <div
                    style={{
                      backgroundImage: `url('${config.db}api/files/${m.collectionId}/${m.id}/${m.foto}?')`,
                    }}
                    className="w-full rounded-t-lg border bg-cover bg-no-repeat bg-center h-48"
                  />
                  <CardContent className="p-4">
                    <p className="text-sm">{m.nama}</p>
                    <p className="font-bold">
                      {formatRupiah(parseInt(m.harga))}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </main>

      <footer className="bg-primary md:px-20 lg:px-40 2xl:px-80 p-4 md:p-10 pt-20 text-primary-foreground grid overflow-x-hidden gap-4">
        <p className="text-4xl mb-8">Cafe Bisa Ngopi</p>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-semibold my-8 md:mt-0">Kunjungi Kami</p>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31685.76247697569!2d107.7133011!3d-6.923999349999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68dd3a88525f8d%3A0x3a18da16bc7d382!2sAlun-Alun%20Ujung%20Berung!5e0!3m2!1sid!2sid!4v1714044762330!5m2!1sid!2sid"
              loading="lazy"
              className="rounded-lg w-full h-60 border"
            ></iframe>
          </div>
          <div className="">
            <p className="text-lg mb-8 font-semibold">Kontak Kami</p>
            <div className="grid gap-4 content-center">
            <div className="flex gap-2">
              <Mail />
              <span>bisangopi@gmail.com</span>
            </div>
            <div className="flex gap-2">
              <PhoneCall />
              <span>0812-3456-7890</span>
            </div>
            <div className="mt-4 flex gap-4">
              <a href="https://www.facebook.com">
                <Facebook className="bg-blue-800 p-2 size-10 rounded-lg" />
              </a>
              <a href="https://www.instagram.com">
                <Instagram className="bg-gradient-to-b from-purple-500 to-red-500 p-2 size-10 rounded-lg" />
              </a>
              <a href="https://www.linkedin.com">
                <LinkedinIcon className="bg-white text-blue-500 p-2 size-10 rounded-lg" />
              </a>
              <a href="https://www.twitter.com">
                <Twitter className="bg-blue-500 p-2 size-10 rounded-lg" />
              </a>
            </div>
            </div>
          </div>
          <div>
            <p className=" font-semibold text-lg mb-8">Navigasi</p>
            <ul className=" leading-10">
              <li><a href="/login">anda staff? klik disini</a></li>
              <li><a href="/feedback">punya saran? klik disini</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

function CardSkeleton({}) {
  return (
    <Card className="flex-1 min-w-full">
      <Skeleton className="w-full rounded-t-lg border bg-cover bg-no-repeat bg-center h-48" />
      <CardContent className="p-4 space-y-4">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </CardContent>
    </Card>
  );
}
