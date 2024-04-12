"use client";
import { Loading } from "@/components/Loading"
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
import config from "../../config.json";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader, LoaderCircle } from "lucide-react";

const formSchema = z.object({
  identity: z.string().min(2).max(50),
  password: z.string().min(5).max(50),
});

export default function Login() {
  const [loading, setLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identity: "",
      password: "",
    },
  });
  const [failedMessage, setFailedmessage] = useState(false);
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    register(values);
  }
  const register = async (data: { identity: string; password: string }) => {
    const registerData = {
      ...data,
    };
    console.log("register", registerData);
    try {
      setLoading(true)
      const res = await axios.post(
        `${config.db}api/collections/users/auth-with-password`,
        registerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data.record))
      localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    } catch (e) {
      console.error(e);
      setFailedmessage(true)
    }finally{
      setLoading(false)
    }
  };
  return (
    <div className="grid p-4 h-screen w-screen place-items-center">
      <div className="md:border rounded-lg p-4 w-full md:w-1/2 xl:w-1/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <p className="font-semibold">Login</p>
            {failedMessage && (
              <Alert variant="destructive" onClick={()=>setFailedmessage(false)}>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Gagal</AlertTitle>
                <AlertDescription>
                  Username atau Password salah
                </AlertDescription>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="identity"
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
            <Button type="submit" className="w-full">
              {loading? <Loading/> : "Login"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
