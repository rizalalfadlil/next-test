/* eslint-disable react/jsx-key */
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
import { Trash2, FilePenLine, CalendarSearch } from "lucide-react";
import { useEffect, useState } from "react";
import config from "../../config.json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import dayjs from 'dayjs';
import 'dayjs/locale/id';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
dayjs.locale('id');
const showedFormat = 'DD MMMM YYYY';
const navigateTo = (url: string) => {
  window.location.href = url;
};
export default function Activities() {
  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${config.db}api/collections/users/records?page=1&perPage=30`
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const getActivities = async () => {
    try {
      const res = await axios.get(
        `${config.db}api/collections/activity/records?page=1&perPage=30`
      );
      console.log(res);
      setData(res?.data.items.reverse());
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getUsers();
    getActivities();
  }, []);

  return (
    <LayoutBase>
      <p className="font-bold text-lg my-8">Daftar Aktivitas</p>
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
                    <TableCell>{dayjs(a?.created).format(showedFormat)}</TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
    </LayoutBase>
  );
}
