/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import config from '../../../config.json';
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
    BreadcrumbPage,
  } from "@/components/ui/breadcrumb";
import LayoutBase from '@/components/layout';
import { Label } from '@radix-ui/react-label';

const formatRupiah = (number: number) => {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(number);
};

export default function page({ params }: any) {
    const [data, setData] = useState({ id: "", pelanggan: "", pesanan: "", total:0, userId:"", created:"" });
    const getOrder = async (id: any) => {
        try {
          const res = await axios.get(
            `${config.db}api/collections/orders/records/${id}`
          );
          console.log(res);
          setData(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      useEffect(() => {
        getOrder(params.id);
      }, []);

  return (
    <LayoutBase>
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
      <div className='pt-4 grid gap-4'>
      <div>
        <Label className='text-xs font-bold'>id</Label>
        <p className='text-xl'>{data.id}</p>
      </div>
      <div>
        <Label className='text-xs font-bold'>nama pelanggan</Label>
        <p className='text-xl'>{data.pelanggan}</p>
      </div>
      <div>
        <Label className='text-xs font-bold'>pesanan</Label>
        <p className='text-xl'>{data.pesanan}</p>
      </div>
      <div>
        <Label className='text-xs font-bold'>total</Label>
        <p className='text-xl'>{formatRupiah(data.total)}</p>
      </div>
      <div>
        <Label className='text-xs font-bold'>tanggal</Label>
        <p className='text-xl'>{data.created.slice(0, -5)}</p>
      </div>
      </div>
      </LayoutBase>
  )
}
