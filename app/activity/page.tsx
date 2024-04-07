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
  const [filteredData, setFilteredData] = useState(data);
  const [filteredDate, setFilteredDate] = useState(data);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectDate = (date: any) => {
    setDate(date);
    console.log("tanggal", dayjs(date).format(showedFormat))
    // selectUser(selectedUser)
    setFilteredDate(
      filteredData.filter((d: { id: string; userId: string, created:string }) => {
        return dayjs(d.created).format(showedFormat) === dayjs(date).format(showedFormat);
      })
    );
  };

  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${config.db}api/collections/users/records?page=1&perPage=30`
      );
      console.log(res);
      setUsers(res?.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const selectUser = (id: string) => {
    setSelectedUser(selectedUser);
    console.log("selected", id);
    setDate(undefined)
    setSelectedUser(id)
    setFilteredData(
      data.filter((d: { id: string; userId: string }) => {
        return d.userId === id;
      })
    );
  };
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
    getUsers();
    getActivities();
  }, []);

  return (
    <LayoutBase>
      <p className="font-bold text-lg my-8">Daftar Aktivitas</p>
      <div className="p-4 grid md:grid-cols-2 gap-4">
        <Select
          onValueChange={(e) => {
            selectUser(e);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="pilih user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {users.map((m: { id: string; name: string }) => (
                <SelectItem value={m.id}>{m.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarSearch className="me-4" /> Pilih Tanggal
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar mode="single" selected={date} onSelect={selectDate}/>
          </PopoverContent>
        </Popover>
      </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>log</TableHead>
              <TableHead>user</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDate?.map(
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
