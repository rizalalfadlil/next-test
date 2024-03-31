"use client";
import React, { useState, useEffect } from "react";
import config from "../../../config.json";
import axios from "axios";
import LayoutBase from "@/components/layout";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from "@/components/ui/form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  password: z.string().min(5).max(50),
});

export default function ViewUser({ params }: any) {
  const [data, setData] = useState({ id: "", username: "", name: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: data.username,
      name: data.name,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    try{
        const res = await axios.patch(`${config.db}api/collections/users/records/${params.id}`, values,{
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log(res)
    }catch(e){
        console.error(e)
    }
  }
  const getUsers = async (id: any) => {
    try {
      const res = await axios.get(
        `${config.db}api/collections/users/records/${id}`
      );
      console.log(res);
      console.log('updating to target ' + `${config.db}api/collections/users/records/${id}`)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUsers(params.id);
  }, []);
  return (
    <LayoutBase>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/users">users</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data?.id}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <p className="my-8">User info</p>
      <p className="text-xs font-light">id</p>
      <p className="text-xl font-medium mb-4">{data.id}</p>
      <p className="text-xs font-light">username</p>
      <p className="text-xl font-medium mb-4">{data.username}</p>
      <p className="text-xs font-light">name</p>
      <p className="text-xl font-medium mb-8">{data.name}</p>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Edit</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="mb-8">Edit user</SheetTitle>
          </SheetHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" className="w-full mt-8">Simpan</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </LayoutBase>
  );
}
