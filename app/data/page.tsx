"use client";
import LayoutBase from "@/components/layout";
import { Button } from "@/components/ui/button";

export default function Data() {
    const navigateTo = (url:string) =>{
        window.location.href = url
    }
  return (
    <LayoutBase>
      <p className="text-bold">This is data page</p>
    </LayoutBase>
  )
}
