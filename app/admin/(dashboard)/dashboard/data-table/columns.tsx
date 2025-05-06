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

const { avatarImage } = localData.svgs;

export type Payment = {
  inGameID?: string;
  avatar?: string | React.ReactNode;
  name?: string;
  email?: string;
  mainTroop?: string;
  troopLvl?: string;
  status?: "active" | "inactive";
  details?: any;
};

export const columns: ColumnDef<Payment>[] = [
  // {
  //   id: "expand",
  //   header: () => <EyeIcon className="w-4 h-4 mx-3 text-gray-500" />,
  //   cell: ({ row }) => (
  //     <Button
  //       variant="ghost"
  //       className="rounded-full w-[35px] h-[35px] cursor-pointer"
  //       onClick={row.getToggleExpandedHandler()}
  //     >
  //       <ChevronDown className={`transition-transform duration-200 `} />
  //     </Button>
  //   ),
  // },
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="cursor-pointer"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="cursor-pointer"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "inGameID",
    header: "In-Game ID",
    cell: ({ row }) => <div className="capitalize ">{row.getValue("inGameID") || '-'}</div>,
  },
  {
    accessorKey: "photoURL",
    header: "Avatar",
    cell: ({ row }) => (
      <div className="relative">
        {/* <img src={row.getValue("avatar")} alt="" /> */}

        <Avatar className="h-8 w-8 rounded-full border">
          <AvatarImage src={row.getValue("photoURL")} alt='avatar' />
          <AvatarFallback className="rounded-full">{avatarImage}</AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("displayName")}</div>,
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "mainTroopType",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Main Troop
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize ">{row.getValue("mainTroopType") || '-'}</div>,
  },
  {
    accessorKey: "troopLevel",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Troop Lvl
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize ">{row.getValue("troopLevel") || '-'}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize ">{row.getValue("status")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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
              {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>
                Copy payment ID
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
              {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
