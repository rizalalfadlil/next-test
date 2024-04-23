"use client"
import CheckAccess from '@/components/CheckAccess'
import LayoutBase from '@/components/layout'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import config from "../../../config.json";
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Loading } from '@/components/Loading'
interface Fedback{
    email:string,
    saran:string
}
export default function Page() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const getData = async () =>{
        try{
            const response = await axios.get(`${config.db}api/collections/feedback/records`)
            setData(response.data.items)
        }catch(e){
            console.error(e)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getData()
    },[])
  return (
    <LayoutBase>
        {CheckAccess('manajer',(
            <div className='p-4 w-full'>
                Feedback
                <div className='py-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-4'>
                    {!loading? data.map((d:Fedback, index)=>(
                        <Card key={index} className='overflow-scroll h-48 relative'>
                            <CardTitle className='text-xs p-4 bg-gradient-to-b from-white to-white/50 font-medium sticky top-0 left-0'>{d.email}</CardTitle>
                            <CardDescription className='p-4 text-md'>{d.saran}</CardDescription>
                        </Card>
                    )) : <Loading/>}
                </div>
            </div>
        ))}
    </LayoutBase>
  )
}
