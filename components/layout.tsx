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

const pages = ["data", "users", "login"];
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
  return (
    <div className="md:grid grid-cols-10">
      <div className="col-span-2 hidden md:block border-e">
        <p className="font-bold text-xl my-4 p-8">AppName</p>
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
              {navigationButtons}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
