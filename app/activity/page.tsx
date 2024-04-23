"use client";
/* eslint-disable react/jsx-key */
import LayoutBase from "@/components/layout";
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
import { useEffect, useState } from "react";
import config from "../../config.json";
import dayjs from "dayjs";
import "dayjs/locale/id";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Loading } from "@/components/Loading";
import CheckAccess from "@/components/CheckAccess";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
dayjs.extend(customParseFormat);
dayjs.locale("id");
const showedFormat = "DD MMMM YYYY";
export default function Activities({ params }: any) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${config.db}api/collections/users/records?page=1&perPage=30`
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const getActivities = async (page:string|number) => {
    try {
      const res = await axios.get(
        `${config.db}api/collections/activity/records?page=${page}&perPage=10&sort=-created`
      );
      console.log("activity", res);
      setTotalPages(res?.data.totalPages);
      setData(res?.data.items);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const parameter = window.location.search;
    const queryParameter = new URLSearchParams(parameter);
    const pageParam = queryParameter.get("page");
    setPage(parseInt(pageParam ? pageParam : "1"));
    getUsers();
    getActivities(pageParam ? pageParam : "1");
    console.log('page : ' +  pageParam)
  }, []);

  return (
    <LayoutBase>
      {CheckAccess(
        ["manajer", "admin"],
        <>
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
                      <TableCell>
                        {dayjs(a?.created).format(showedFormat)}
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
          <Pagination className="pt-4">
            <PaginationContent>
              {page > 1 && (
                <>
                  <PaginationItem>
                    <PaginationPrevious href={`/activity?page=${page - 1}`} />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href={`/activity?page=1`}>1</PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationLink isActive href="#">
                  {page}
                </PaginationLink>
              </PaginationItem>

              {page < totalPages && (
                <>
                  <PaginationItem>
                    <PaginationLink href={`/activity?page=${totalPages}`}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href={`/activity?page=${page + 1}`} />
                  </PaginationItem>
                </>
              )}
            </PaginationContent>
          </Pagination>
          {loading && (
            <div className="flex my-4 justify-center">
              <span className="me-2">memuat data</span>
              <Loading />
            </div>
          )}
        </>
      )}
    </LayoutBase>
  );
}
