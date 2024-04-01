"use client";
import React, { useEffect, useState } from "react";
import LayoutBase from "@/components/layout";
import axios from "axios";
import config from "../../../config.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const formatRupiah = (number: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
export default function Order() {
  const [daftarMenu, setDaftarMenu] = useState([]);

  const getMenu = async () => {
    try {
      const res = await axios.get(`${config.db}api/collections/menu/records?`);
      console.log(res);
      setDaftarMenu(res.data.items);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <LayoutBase>
      <p className="text-xl font-bold">Buat Pesanan Baru</p>
      <div className="p-4">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih menu" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {daftarMenu.map((m:{nama:string, id:string, harga:number}, index)=>(<SelectItem value={m.id}>{index} {m.nama} {formatRupiah(m.harga)}</SelectItem>))}
          </SelectGroup>
        </SelectContent>
      </Select>
      </div>
    </LayoutBase>
  );
}
