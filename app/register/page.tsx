"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import config from '../../config.json'
import axios from "axios";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  name: z.string().min(2).max(50),
  password: z.string().min(5).max(50),
});

export default function Login() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name:"",
      password: "",
    },
  });
  
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    register(values)
  }
  const register = async (data: { username: string; name: string; password: string; }) =>{
    

    const registerData = {
        ...data,
        'passwordConfirm': data.password
    }
    console.log('register', registerData)
    try{
        const res = await axios.post(`${config.db}api/collections/users/records`, registerData, {
            headers:{
                'Content-Type':'application/json'
            }
        })
        console.log(res)

    }catch(e){
        console.error(e)
    }
  }
  return (
    <div className="grid p-4 h-screen w-screen place-items-center">
      <div className="md:border rounded-lg p-4 w-full md:w-1/2 xl:w-1/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <p className="font-semibold">Register</p>
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>
              Already have account? <a href="/login" className="font-bold">Login</a>
            </p>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
