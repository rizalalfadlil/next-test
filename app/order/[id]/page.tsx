/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import config from "../../../config.json";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import LayoutBase from "@/components/layout";
import { Label } from "@radix-ui/react-label";
import { Loading } from "@/components/Loading";
import CheckAccess from "@/components/CheckAccess";
import { Button } from "@/components/ui/button";
import ReactToPrint from "react-to-print";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const formatRupiah = (number: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export default function page({ params }: any) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    id: "",
    pelanggan: "",
    pesanan: "",
    total: 0,
    userId: "",
    created: "",
  });
  const getOrder = async (id: any) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${config.db}api/collections/orders/records/${id}`
      );
      console.log(res);
      setData(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrder(params.id);
  }, []);
  const printRef = useRef(null)
  return (
    <LayoutBase>
      {CheckAccess(
        ["kasir", "manajer"],
        <>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/order">orders</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.id}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="grid gap-4">
          <div ref={printRef} className="p-4 ">
          <p className="text-4xl md:text-6xl pb-4 border-b-2 border-primary mb-8 font-medium tracking-wide mt-3">
                Bisa Ngopi
              </p>
            <div>
              <Label className="text-xs font-bold">id</Label>
              <p className="text-xl">{data.id}</p>
            </div>
            <div>
              <Label className="text-xs font-bold">nama pelanggan</Label>
              <p className="text-xl">{data.pelanggan}</p>
            </div>
            <div>
              <Label className="text-xs font-bold">pesanan</Label>
              <Table className="text-xl border">
                <TableHeader >
                  <TableRow>
                    <TableHead className="w-[100px]">No</TableHead>
                    <TableHead>Pesanan</TableHead>
                    <TableHead>Jumlah</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.pesanan.split(',').map((p, index)=>(
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      {p.split(' × ').map((r, index)=>(
                        <TableCell key={index}>{r}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <Label className="text-xs font-bold">total</Label>
              <p className="text-xl">{formatRupiah(data.total)}</p>
            </div>
            <div>
              <Label className="text-xs font-bold">tanggal</Label>
              <p className="text-xl">{data.created.slice(0, -5)}</p>
            </div>
          </div>
          <ReactToPrint
          trigger={()=><Button className="w-fit">Cetak</Button>}
          content={()=> printRef.current}/>
          </div>
          {loading && (
            <div className="flex my-4 justify-center">
              <span className="me-2">memuat data</span>
              <Loading />
            </div>
          )}
        </>
      )}
    </LayoutBase>
  );
}
