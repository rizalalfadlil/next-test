"use client";
/* eslint-disable react/jsx-key */
import LayoutBase from "@/components/layout";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import config from "../../config.json";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarSearch } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Loading } from "@/components/Loading";
import CheckAccess from "@/components/CheckAccess";
import ReactToPrint from "react-to-print";
const showedFormat = "DD MMMM YYYY";

const formatRupiah = (number: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const navigateTo = (url: string) => {
  window.location.href = url;
};
interface UserInterface {
  id: string;
  username: string;
  name: string;
  type: string;
}

export default function OrderList() {
  const [userData, setUserData] = useState("");
  const parsedUser: UserInterface = JSON.parse(userData || "{}");

  useEffect(() => {
    const user: string = localStorage.getItem("user")!;
    setUserData(user);
  }, []);

  const [data, setData] = useState([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [tglLaporan, setTglLaporan] = useState<Date>();
  const [users, setUsers] = useState([]);
  const [filterDate, setFilterDate] = useState([]);
  const [filterUser, setFilterUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState<String>();
  const [loading, setLoading] = useState(false);
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${config.db}api/collections/users/records?page=1&perPage=30`
      );
      console.log(res);
      setUsers(res?.data.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  const pilihTanggalLaporan = (tgl) => {
    console.log(tgl);
    setTglLaporan(tgl);
  };
  const selectUser = async (id: string) => {
    setSelectedUser(id);
    console.log("selected", id);
    setFilterUser(
      (filterDate ? filterDate : data).filter(
        (d: { id: string; userId: string }) => {
          return d.userId === id;
        }
      )
    );
  };

  const selectDate = (date: any) => {
    setDate(date);
    console.log("tanggal", dayjs(date).format(showedFormat));
    // selectUser(selectedUser)
    setFilterDate(
      data.filter((d: { id: string; userId: string; created: string }) => {
        return (
          dayjs(d.created).format(showedFormat) ===
          dayjs(date).format(showedFormat)
        );
      })
    );

    setFilterUser(
      (selectedUser
        ? data.filter((d: { id: string; userId: string }) => {
            return d.userId === selectedUser;
          })
        : data
      ).filter((d: { id: string; userId: string; created: string }) => {
        return (
          dayjs(d.created).format(showedFormat) ===
          dayjs(date).format(showedFormat)
        );
      })
    );
  };
  const getOrderData = async () => {
    try {
      const res = await axios.get(`${config.db}api/collections/orders/records`);
      setData(res.data.items);
      setFilterDate(res.data.items);
      setFilterUser(res.data.items);
      console.log(res.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getUsers();
    getOrderData();
  }, []);

  const getMonthIncome = () => {
    let number: number = 0;
    const today = new Date();
    const thisMonth = dayjs(tglLaporan).get("month");
    data.map((d: { created: Date; total: string }) => {
      thisMonth === dayjs(d.created).get("month") &&
        (number += parseInt(d?.total));
    });
    return formatRupiah(number);
  };

  const getDateIncome = () => {
    let number: number = 0;
    const today = new Date();
    const thisDate = dayjs(tglLaporan).get("date");
    data.map((d: { created: Date; total: string }) => {
      thisDate === dayjs(d.created).get("date") &&
        (number += parseInt(d?.total));
    });
    return formatRupiah(number);
  };

  const clearFilter = () => {
    window.location.reload();
  };
  return (
    <LayoutBase>
      {CheckAccess(
        ["kasir", "manajer"],
        <>
          <div>OrderList</div>
          <div className="grid md:grid-cols-3 gap-4 py-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarSearch className="me-4" /> Pilih Tanggal
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar mode="single" selected={date} onSelect={selectDate} />
              </PopoverContent>
            </Popover>
            <Select
              onValueChange={(e) => {
                selectUser(e);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="pilih user" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {users.map((m: { id: string; name: string }) => (
                    <SelectItem value={m.id}>{m.name}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={clearFilter}>
              Hapus Filter
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>id</TableHead>
                <TableHead>user id</TableHead>
                <TableHead>pelanggan</TableHead>
                <TableHead>pesanan</TableHead>
                <TableHead>total</TableHead>
                <TableHead>tanggal</TableHead>
                <TableHead>aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filterUser
                ?.map(
                  (d: {
                    id: string;
                    userId: string;
                    pelanggan: string;
                    pesanan: string;
                    created: string;
                    total: string;
                  }) => {
                    return (
                      <TableRow>
                        <TableCell>{d?.id}</TableCell>
                        <TableCell>{d?.userId}</TableCell>
                        <TableCell>{d?.pelanggan}</TableCell>
                        <TableCell>{d?.pesanan}</TableCell>
                        <TableCell>
                          {formatRupiah(parseInt(d?.total))}
                        </TableCell>
                        <TableCell>
                          {dayjs(d?.created).format(showedFormat)}
                        </TableCell>
                        <TableCell>
                          <Button onClick={() => navigateTo(`/order/${d.id}`)}>
                            Lihat
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )
                .reverse()}
            </TableBody>
          </Table>
          {loading && (
            <div className="flex my-4 justify-center">
              <span className="me-2">memuat data</span>
              <Loading />
            </div>
          )}
          
          {parsedUser.type === "kasir" && (
            <Button className="mt-4" onClick={() => navigateTo("/order/new")}>
              Buat pesanan baru
            </Button>
          )}
        </>
      )}
      <Laporan
            cn={cn}
            tglLaporan={tglLaporan}
            format={format}
            pilihTanggalLaporan={pilihTanggalLaporan}
            getMonthIncome={getMonthIncome}
            showedFormat={showedFormat}
            getDateIncome={getDateIncome}
          />
    </LayoutBase>
  );
}

function Laporan({
  cn,
  tglLaporan,
  format,
  pilihTanggalLaporan,
  getMonthIncome,
  showedFormat,
  getDateIncome,
}) {
  const printRef = useRef(null)
  return (
    <>
     <p className="mt-8">Laporan Pendapatan</p>
      <div className="flex gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left my-4 font-normal",
                !tglLaporan && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {tglLaporan ? (
                format(tglLaporan, "PPP")
              ) : (
                <span>Pilih tanggal</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={tglLaporan}
              onSelect={pilihTanggalLaporan}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Drawer>
        <DrawerTrigger><Button>tampilan cetak</Button></DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>cetak laporan</DrawerTitle>
            <div className="text-start p-4" ref={printRef}>
              <p className="text-2xl font-bold">Bisa Ngopi</p>
              <hr  className="border-2 border-primary my-4"/>
              <p>{dayjs(tglLaporan).format(showedFormat)}</p>

              <div className="mt-4">
                <p className="text-sm">Pendapatan harian</p>
                <p className="text-xl font-bold">{getDateIncome()}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm">Pendapatan bulanan</p>
                <p className="text-xl font-bold">{getMonthIncome()}</p>
              </div>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose><ReactToPrint
            trigger={()=>(<Button className="w-full">cetak</Button>)}
            content={()=>printRef.current}/>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
      <div className="grid md:grid-cols-2 w-full gap-4 mb-8">
        <div className="border rounded-md p-4 ">
          <p className="text-lg foont-medium">
            Pendapatan bulanan : {dayjs(tglLaporan).format("MMMM YYYY")}
          </p>
          <p className="text-2xl font-semibold">{getMonthIncome()}</p>
        </div>
        <div className="border rounded-md p-4 ">
          <p className="text-lg foont-medium">
            Pendapatan harian : {dayjs(tglLaporan).format(showedFormat)}
          </p>
          <p className="text-2xl font-semibold">{getDateIncome()}</p>
        </div>
      </div>
    </>
  );
}
