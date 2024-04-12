/* eslint-disable react/jsx-key */
"use client";
import LayoutBase from "@/components/layout";
import { Loading } from "@/components/Loading";
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
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([]);
  const getUsers = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${config.db}api/collections/users/records?page=1&perPage=30`
      );
      console.log(res);
      setData(res?.data.items);
    } catch (e) {
      console.log(e);
    }finally{
      setLoading(false)
    }
  };

  async function deleteUser(id: string) {
    console.log("deleting data with id ", id);
    try {
      setLoading(true)
      const res = await axios.delete(
        `${config.db}api/collections/users/records/${id}`
      );
      console.log(res);
      getUsers();
    } catch (e) {
      console.error(e);
    }finally{
      setLoading(false)
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
                              {loading? <Loading/> : 'Hapus'}
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
        {loading && (<div className="flex my-4 justify-center"><span className="me-2">memuat data</span><Loading/></div>)}
        <Button className="mt-4" onClick={()=>navigateTo('/register')}><Plus/></Button>
      </ScrollArea>
    </LayoutBase>
  );
}
