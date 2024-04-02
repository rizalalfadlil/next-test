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
import { Trash2, FilePenLine, ScanEye, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import config from "../../config.json";

const navigateTo = (url: string) => {
  window.location.href = url;
};
export default function Users() {
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        `${config.db}api/collections/users/records?page=1&perPage=30`
      );
      console.log(res);
      setData(res?.data.items);
    } catch (e) {
      console.log(e);
    }
  };

  async function deleteUser(id: string) {
    console.log("deleting data with id ", id);
    try {
      const res = await axios.delete(
        `${config.db}api/collections/users/records/${id}`
      );
      console.log(res);
      getUsers();
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <LayoutBase>
      <p className="font-bold text-lg my-8">List of users</p>
      <ScrollArea className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Full name</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(
              (users: { id: string; username: string; name: string }) => {
                return (
                  <TableRow>
                    <TableCell>{users?.username}</TableCell>
                    <TableCell>{users?.name}</TableCell>
                    <TableCell>
                      <Button variant="ghost" onClick={()=>navigateTo(`/users/${users.id}`)}>
                        <ScanEye />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" className="text-red-500">
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Data?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteUser(users?.id)}
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
        <Button className="mt-4" onClick={()=>navigateTo('/register')}><Plus/></Button>
      </ScrollArea>
    </LayoutBase>
  );
}
