"use client"
import LayoutBase from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import axios from 'axios'
import config from "../../config.json";
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loading } from '@/components/Loading'
const formSchema = z.object({
    email: z.string(),
    saran: z.string()
  });

interface Saran{
    email:string,
    saran:string
}
export default function Page() {
    const [finish, setFinish] = useState(false)
    const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      saran:""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try{
        const response = await axios.post(`${config.db}api/collections/feedback/records`, values, {
            headers:{
                "content-type":"application/json"
            }
        })
        console.log(response)
        
    }catch(e){
        console.error(e)
    }finally{
        setFinish(true)
        setLoading(false)
    }
  }
  return (
    <LayoutBase>
        <div className='p-4 h-full'>
            {finish?(
                <div className='h-full w-full grid place-content-center text-center gap-4'>
                    <p className='capitalize text-green-600 text-2xl'>terimakasih atas saran anda</p>
                    <p>kritik dan saran anda sangat bermanfaat bagi kami</p>
                    <Button onClick={()=>window.location.href='/'}>Kembali</Button>
                </div>
            ):(
                <Form {...form}>
                <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                 <FormField
                  control={form.control}
                  name="email"
                  render={({field})=>(
                     <FormItem>
                     <Label>Email</Label>
                     <Input placeholder='tulis email anda disini' type='email' {...field}/>
                 </FormItem>
                  )}/>
                 <FormField
                  control={form.control}
                  name="saran"
                  render={({field})=>(
                     <FormItem>
                     <Label>Saran</Label>
                     <Textarea placeholder='tulis saran anda disini' className='resize-none line-clamp-5' {...field}/>
                 </FormItem>
                  )}/>
                 <Button className='mt-4' type='submit'>{loading?<Loading/>:'Kirim'}</Button>
                </form>
             </Form>
            )}
        </div>
    </LayoutBase>
  )
}
