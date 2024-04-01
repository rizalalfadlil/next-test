"use client";
import LayoutBase from "@/components/layout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Trash2, FilePenLine } from "lucide-react";
import { useEffect, useState } from "react";
import config from "../../config.json";

const navigateTo = (url: string) => {
  window.location.href = url;
};
export default function Activities() {
  const [data, setData] = useState([]);
  const getActivities = async () => {
    try {
      const res = await axios.get(
        `${config.db}api/collections/activity/records?page=1&perPage=30`
      );
      console.log(res);
      setData(res?.data.items);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getActivities();
  }, []);

  return (
    <LayoutBase>
      <p className="font-bold text-lg my-8">List of Activities</p>
      <ScrollArea className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>log</TableHead>
              <TableHead>user</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              (a: { log: string; userId: string; created: string }) => {
                return (
                  <TableRow>
                    <TableCell>{a?.log}</TableCell>
                    <TableCell>{a?.userId}</TableCell>
                    <TableCell>{a?.created.slice(0, -5)}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </LayoutBase>
  );
}
