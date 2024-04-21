"use client";
import LayoutBase from "@/components/layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <LayoutBase>
      <div className="w-full h-full grid gap-2 place-content-center text-center text-red-700">
        <div>
          <p className="text-5xl">404</p>
          <p>not found</p>
        </div>
        <div className="text-black text-lg py-8">
          <p>halaman tidak ditemukan</p>
        </div>
        <Link href="/"><Button >Kembali</Button></Link>
      </div>
    </LayoutBase>
  );
}
