"use client"
import LayoutBase from '@/components/layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from '../../config.json'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
import { Button } from '@/components/ui/button'

const navigateTo = (url: string) => {
    window.location.href = url;
  };

export default function OrderList() {
    const [data, setData] = useState([])
    const getOrderData = async ()=>{
        try{
            const res = await axios.get(`${config.db}api/collections/orders/records`)
            setData(res.data.items)
            console.log(res.data)
        }catch(e){
            console.error(e)
        }
    }
    useEffect(()=>{
        getOrderData()
    },[])
  return (
    <LayoutBase>
        <div>OrderList</div>
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
            {data?.map(
              (d: { id: string; userId: string; pelanggan: string, pesanan:string, created:string, total:string }) => {
                return (
                  <TableRow>
                    <TableCell>{d?.id}</TableCell>
                    <TableCell>{d?.userId}</TableCell>
                    <TableCell>{d?.pelanggan}</TableCell>
                    <TableCell>{d?.pesanan}</TableCell>
                    <TableCell>{d?.total}</TableCell>
                    <TableCell>{d?.created}</TableCell>
                    <TableCell>
                    <Button onClick={()=>navigateTo(`/order/${d.id}`)}>Lihat</Button>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
        <Button className='mt-4' onClick={()=>navigateTo('/order/new')}>Buat pesanan baru</Button>
    </LayoutBase>
  )
}
