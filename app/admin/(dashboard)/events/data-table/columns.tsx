"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, ChevronDown, EyeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  //   DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import localData from "@/localData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ButtonDemo, DialogDemo, DropdownMenuDemo } from "@/components/index";
import Link from "next/link";
import { useApiContext } from "@/contexts/ApiContext";

const { avatarPlaceholderImage } = localData.images;

export type Payment = {
  avatar?: string;
  points?: any;
  matchUser?: any;

  details?: any;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "index",
    header: () => <div className="px-3 text-center">#</div>,
    enableHiding: false,
    cell: ({ row, table }) => {
      const sortedRows = table.getSortedRowModel().rows;
      const sortedIndex = sortedRows.findIndex((r) => r.id === row.id);

      return (
        <div className="rounded-full shadow-[1px_1px_6px_rgba(0,0,0,0.2)]  flex items-center justify-center w-[20px] h-[20px] font-bold">
          {sortedIndex + 1}
          {/* {row.getValue("pointsIndex")} */}
        </div>
      );
    },
  },
  {
    accessorKey: "avatar",
    header: () => <div className="px-3">Avatar </div>,
    cell: ({ row }) => {
      const original = row.original;
      return (
        <div className="relative rounded-full overflow-hidden border-2 border-gray-200 shadow w-8 h-8">
          <img
            src={original.matchUser.base64PhotoURL || original.matchUser.photoURL || avatarPlaceholderImage}
            alt="avatar"
            className="block object-cover w-full h-full"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "donationPoints",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
         Donation
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      return <div className="capitalize">{row.getValue("donationPoints")}</div>;
    },
  },
  {
    accessorKey: "caravanPoints",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
         Caravan
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      return <div className="capitalize">{row.getValue("caravanPoints")}</div>;
    },
  },
  {
    accessorKey: "behemothPoints",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
         Behemoth
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      return <div className="capitalize">{row.getValue("behemothPoints")}</div>;
    },
  },
  {
    accessorKey: "customPoints",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
         Custom
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      return <div className="capitalize">{row.getValue("customPoints")}</div>;
    },
  },
  {
    accessorKey: "points",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
         All
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }: { row: any }) => {
      return <div className="capitalize">{row.getValue("points")}</div>;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <Actions row={row} />;
    },
  },
];

const Actions = ({ row = {} }: { row: any }) => {
  const { fetchedCurrentUser } = useApiContext();
  const { details } = fetchedCurrentUser;
  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuSeparator />
          {details.uid !== row.original.id && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/admin/users/${row.original.id}`}>Visit Profile</Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
