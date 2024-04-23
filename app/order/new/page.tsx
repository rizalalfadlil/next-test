"use client";
import React, { useEffect, useState } from "react";
import LayoutBase from "@/components/layout";
import axios from "axios";
import config from "../../../config.json";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/Loading";
import CheckAccess from "@/components/CheckAccess";
import { Plus } from "lucide-react";

interface MenuItem {
  nama: string;
  harga: number;
  foto: string;
}

interface PesananItem extends MenuItem {
  jumlah: number;
}

const formatRupiah = (number: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};
interface UserInterface {
  id: string;
  username: string;
  name: string;
  type: string;
}
export default function Order() {
  const [namaPemesan, setNamaPemesan] = useState("");
  const [jumlahBayar, setJumlahBayar] = useState(0)
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [daftarMenu, setDaftarMenu] = useState<MenuItem[]>([]);
  const [pesanan, setPesanan] = useState<PesananItem[]>([]);
  const [rincianPesanan, setRincianPesanan] = useState("");

  const getMenu = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${config.db}api/collections/menu/records?`);
      setDaftarMenu(res.data.items);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    updateRincianPesanan();
  }, [pesanan]);

  const tambahPesanan = (menu: MenuItem) => {
    const existingItem = pesanan.find((item) => item.nama === menu.nama);
    if (existingItem) {
      setPesanan((prevState) =>
        prevState.map((item) =>
          item.nama === menu.nama ? { ...item, jumlah: item.jumlah + 1 } : item
        )
      );
    } else {
      setPesanan((prevState) => [...prevState, { ...menu, jumlah: 1 }]);
    }
  };

  const hapusPesanan = (index: number) => {
    const newPesanan = [...pesanan];
    newPesanan.splice(index, 1);
    setPesanan(newPesanan);
  };

  const hitungTotalHarga = () => {
    return pesanan.reduce((total, item) => total + item.harga * item.jumlah, 0);
  };

  const updateRincianPesanan = () => {
    const rincian = pesanan
      .map((item) => `${item.nama} ×${item.jumlah} (${item.harga * item.jumlah})`)
      .join(", ");
    setRincianPesanan(rincian);
  };
  const [userData, setUserData] = useState("");
  const parsedUser: UserInterface = JSON.parse(userData || "{}");
  useEffect(() => {
    const user: string = localStorage.getItem("user")!;
    setUserData(user);
  }, []);
  const buatPesanan = async () => {
    const order = {
      pelanggan: namaPemesan,
      pesanan: rincianPesanan,
      total: hitungTotalHarga(),
      userId: parsedUser.id,
      bayar:jumlahBayar
    };
    
    try {
      setBtnLoading(true);
      const res = await axios.post(
        `${config.db}api/collections/orders/records`,
        order,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("pesanan", res);
      const res2 = await axios.post(
        `${config.db}api/collections/activity/records`,
        {
          log: `membuat transaksi baru : ${res.data.id}`,
          userId: parsedUser.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res2);
      window.location.href = `/order/${res.data.id}`
    } catch (e) {
      console.error(e);
    } finally {
      setBtnLoading(false);
    }
    setPesanan([]);
  };
  const kembalian = (hitungTotalHarga() - jumlahBayar) *-1
  return (
    <LayoutBase>
      {CheckAccess(
        "kasir",
        <>
          <p className="text-xl font-bold">Buat Pesanan Baru</p>
          <div className="p-4 grid gap-4">
            <div>
              <Label className="text-lg pb-4">Nama pemesan</Label>
              <Input
                type="text"
                value={namaPemesan}
                onChange={(e) => setNamaPemesan(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-lg pb-4">Daftar menu</Label>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                {daftarMenu.map((m: MenuItem) => (
                  <Card key={m.nama} className="p-4">
                    <CardTitle>{m.nama}</CardTitle>
                    <CardDescription className="my-4">
                      {formatRupiah(m.harga)}
                    </CardDescription>
                    <Button
                     className="w-full"
                      onClick={() => tambahPesanan(m)}
                      disabled={pesanan.some((item) => item.nama === m.nama)}
                    >
                      Tambah
                    </Button>
                  </Card>
                ))}
              </div>
              {loading && (
                <div className="flex my-4 justify-center">
                  <span className="me-2">memuat data</span>
                  <Loading />
                </div>
              )}
            </div>
            <div>
              <Label className="text-lg pb-4">Pesanan</Label>
              <div className="grid gap-4">
                {pesanan.map((item, index) => (
                  <Card key={index} className="p-4 grid md:grid-cols-4 gap-4">
                    <span>{item.nama}</span>
                    <div className="grid grid-cols-2 md:text-end gap-2">
                      <span>Jumlah :</span>
                      <Input
                        type="number"
                        value={item.jumlah}
                        onChange={(e) => {
                          const updatedPesanan = [...pesanan];
                          updatedPesanan[index].jumlah = parseInt(
                            e.target.value
                          );
                          setPesanan(updatedPesanan);
                        }}
                      />
                    </div>
                    <span>{formatRupiah(item.harga * item.jumlah)}</span>
                    <Button
                      variant="destructive"
                      onClick={() => hapusPesanan(index)}
                    >
                      Hapus
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-lg pb-4">Rincian Pesanan:</Label>
              <p>{rincianPesanan}</p>
            </div>
            <div>
              <Label className="text-lg pb-4">
                Total Harga : {formatRupiah(hitungTotalHarga())}
              </Label>
            </div>
            <div>
              <Label className="text-lg pb-4">Total Bayar</Label>
              <Input
                type="number"
                value={jumlahBayar}
                onChange={(e) => setJumlahBayar(parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label className={`text-lg pb-4 ${kembalian < 0 && 'text-red-500'}`}>
                {(jumlahBayar !== 0 && kembalian !== 0) && (<>Kembali : {formatRupiah(kembalian) + " " + (kembalian < 0 ? '(uang tidak cukup)' : '')}</>)}
              </Label>
            </div>
            <Button
              onClick={buatPesanan}
              disabled={pesanan.length == 0 || namaPemesan == "" || jumlahBayar < hitungTotalHarga()}
            >
              {btnLoading ? <Loading /> : "Buat Pesanan"}
            </Button>
          </div>
        </>
      )}
    </LayoutBase>
  );
}
