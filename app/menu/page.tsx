"use client";
import LayoutBase from "@/components/layout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config.json";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Form, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

const formatRupiah = (number: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export default function menu() {
  const [data, setData] = useState([]);

  const userData = localStorage.getItem('user')
  const parsedUser:{id:string, username:string, name:string, type:string} = JSON.parse(userData || '{}')
  console.log('user info', parsedUser? parsedUser.id : 'not login')

  const getMenuList = async () => {
    try {
      const res = await axios.get(`${config.db}api/collections/menu/records`);
      console.log(res);
      setData(res.data.items);
    } catch (e) {
      console.error(e);
    }
  };
  const [nama, setNama] = useState('');
  const [harga, setHarga] = useState('');
  const [gambar, setGambar] = useState<File | null>(null);
  const [id, setId] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setGambar(selectedFile);
    }
  };

  const addData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('harga', harga);
    // TODO : Fix Image Update
    gambar !== null && formData.append('foto', gambar);

    try {
      const response = await axios.post(`${config.db}api/collections/menu/records`, formData, {
        headers: {
            "Content-Type": "multipart/formData",
          },
      });
      console.log(response)
      const res = await axios.post(`${config.db}api/collections/activity/records`, {log:`menambahkan menu baru : ${nama}`, userId:parsedUser.id}, {
        headers: {
            "Content-Type": "application/json",
          },
      });
      console.log(res)
      getMenuList();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };
  const deleteData = async(id:string) =>{
    try {
        const response = await axios.delete(`${config.db}api/collections/menu/records/${id}`);
        console.log(response)
        const res = await axios.post(`${config.db}api/collections/activity/records`, {log:`menghapus menu dengan id : ${id}`, userId:parsedUser.id}, {
            headers: {
                "Content-Type": "application/json",
              },
          });
          console.log(res)
        getMenuList();
      } catch (error) {
        console.error(error);
      }
  }
  const updateData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('nama', nama);
    formData.append('harga', harga);
    formData.append('foto', gambar);

    try {
      const response = await axios.patch(`${config.db}api/collections/menu/records/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/formData",
          },
      });
      console.log(response)
      const res = await axios.post(`${config.db}api/collections/activity/records`, {log:`memperbarui menu dengan id : ${id}`, userId:parsedUser.id}, {
        headers: {
            "Content-Type": "application/json",
          },
      });
      console.log(res)
      getMenuList();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  useEffect(() => {
    getMenuList();
  }, []);
  return (
    <LayoutBase>
      <div className="h-full">
        <div className="grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2">
          {data.map((d: { nama: string; harga: number, id:string, collectionId:string, foto:string }, index) => (
            <Card>
              <div
                style={{
                  backgroundImage:
                    `url('http://127.0.0.1:8090/api/files/${d.collectionId}/${d.id}/${d.foto}?')`,
                }}
                className="w-full border bg-cover bg-no-repeat bg-center h-48"
              />
              <div className="p-2">
                <p className="font-bold text-xl">{d.nama}</p>
                <p className="text-sm">{formatRupiah(d.harga)}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 p-2">
              <Sheet>
          <SheetTrigger asChild>
            <Button onClick={()=>{setNama(d.nama),setHarga(d.harga.toString()), setGambar(null), setId(d.id)}}>Edit</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Edit {nama}</SheetTitle>
              <SheetDescription>id : {id}</SheetDescription>
            </SheetHeader>
            <form className="grid gap-4 mt-4" onSubmit={updateData}>
              <FormItem>
                <Label>nama</Label>
                <Input type="text" name="nama" id="nama" value={nama} onChange={(event) => {
                        setNama(event.target.value);
                      }}/>
              </FormItem>
              <FormItem>
                <Label>harga</Label>
                <Input type="number" name="harga" id="harga" value={harga} onChange={(event) => {
                        setHarga(event.target.value);
                      }}/>
              </FormItem>
              <FormItem>
                <Label>gambar</Label>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  name="gambar"
                  id="gambar"
                />
              </FormItem>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </form>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
        <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive">
                            Hapus
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteData(d.id)}
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
              </div>
            </Card>
          ))}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="p-4 mt-4 w-full" onClick={()=>{setNama(''),setHarga('')}}>tambah data</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Tambah daftar menu</SheetTitle>
            </SheetHeader>
            <form className="grid gap-4 mt-4" onSubmit={addData}>
              <FormItem>
                <Label>nama</Label>
                <Input type="text" name="nama" id="nama" value={nama} onChange={(event) => {
                        setNama(event.target.value);
                      }}/>
              </FormItem>
              <FormItem>
                <Label>harga</Label>
                <Input type="number" name="harga" id="harga" value={harga} onChange={(event) => {
                        setHarga(event.target.value);
                      }}/>
              </FormItem>
              <FormItem>
                <Label>gambar</Label>
                <Input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  name="gambar"
                  id="gambar"
                />
              </FormItem>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </form>
            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </LayoutBase>
  );
}
