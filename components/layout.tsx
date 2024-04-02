"use client"
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const navigateTo = (url: string) => {
  window.location.href = url;
};

const pages = ["menu", "users", "login", "activity", "order"];
export default function LayoutBase({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationButtons = pages.map((p) => (
    <Button variant="link" onClick={() => navigateTo(`/${p}`)}>
      {p}
    </Button>
  ));
  const userData = localStorage.getItem('user')
  const parsedUser:{id:string, username:string, name:string, type:string} = JSON.parse(userData || '{}')
  return (
    <div className="md:grid grid-cols-10">
      <div className="col-span-2 hidden md:block border-e">
        <p className="font-bold text-xl my-4 p-8">AppName</p>
        <div className="px-8 pb-8 text-xs grid gap-2 grid-cols-2">
        <span>{parsedUser.id}</span><span className="text-center bg-green-500/20 rounded-sm text-green-800 font-bold">{parsedUser.type}</span>
        </div>
        <Separator />
        <div className="p-4 grid gap-2">{navigationButtons}</div>
      </div>
      <div className="p-4 md:p-8 h-screen col-span-8 mt-16 md:mt-0">
        {children}
      </div>
      <div className="absolute w-full top-0 bg-white/50 gap-2 p-2 md:hidden">
      <Accordion type="single" collapsible>
      
          <AccordionItem value="item-1">
            <AccordionTrigger></AccordionTrigger>
            <AccordionContent className="grid backdrop-blur-sm">
              <span className="text-center bg-green-500/20 rounded-sm text-green-800 font-bold py-2">{parsedUser.type}</span>
              {navigationButtons}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
