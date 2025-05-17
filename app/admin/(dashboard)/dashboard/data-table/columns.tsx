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
import { DeleteUserDialog } from "./delete-user-dialog/DeleteUserDialog";
import { SetupUserDialog } from "./setup-user-dialog/SetupUserDialog";
import Link from "next/link";
import { useApiContext } from "@/contexts/ApiContext";

const { avatarPlaceholderImage } = localData.images;

export type Payment = {
  id?: string;
  uid?: string;
  role?: string;
  inGameID?: string;
  // avatar?: string | React.ReactNode;
  name?: string;
  // email?: string;
  power?: string;
  mainTroop?: string;
  troopLvl?: string;
  status?: "active" | "inactive";
  base64PhotoURL?: string;
  photoURL?: string;
  details?: any;
};

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "index",
    header: () => <div className="px-3 text-center">#</div>,
    enableHiding: false,
    cell: ({ row, table }) => {
      const sortedRows = table.getSortedRowModel().rows;
      const sortedIndex = sortedRows.findIndex((r) => r.id === row.id);

      return (
        // <div className="rounded-full shadow-[1px_1px_6px_rgba(0,0,0,0.1)]  flex items-center justify-center w-[20px] h-[20px] font-bold">
        <div>
          
        { sortedIndex + 1}
          </div> 
        // </div>
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
            src={original.base64PhotoURL || original.photoURL || avatarPlaceholderImage}
            alt="avatar"
            className="block object-cover w-full h-full"
          />
        </div>
      );
    },
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
    accessorKey: "inGameID",
    header: () => <div className="px-2">In-Game ID</div>,
    cell: ({ row }) => <div className="capitalize ">{row.getValue("inGameID") || "-"}</div>,
  },

  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
  //         Email
  //         <ArrowUpDown />
  //       </Button>
  //     );
  //   },
  //   cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  // },
  {
    accessorKey: "power",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Power
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize ">{row.getValue("power") || "-"}</div>,
  },
  {
    accessorKey: "mainUnitType",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Main Unit
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize ">{row.getValue("mainUnitType") || "-"}</div>,
  },
  {
    accessorKey: "unitLevel",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Unit Lvl
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize ">{row.getValue("unitLevel") || "-"}</div>,
  },
  {
    accessorKey: "rank",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Rank
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize ">{row.getValue("rank")}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="px-3">Status </div>,
    cell: ({ row }) => <div className="capitalize ">{row.getValue("status")}</div>,
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
  const payment = row.original;

  // const callback = (items: any) => {
  //   console.log(items);
  // };

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
          {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.id)}>
            Copy payment ID
          </DropdownMenuItem> */}
          <DropdownMenuSeparator />
          {details.uid !== row.original.uid && (
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/admin/users/${row.original.id}`}>Visit Profile</Link>
            </DropdownMenuItem>
          )}

          {canAccessUserSettings(
            { role: details.role, uid: details.uid },
            { role: row.original.role, uid: row.original.uid }
          ) && (
            <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
              <SetupUserDialog user={row.original} />
            </DropdownMenuItem>
          )}
          {details.uid !== row.original.uid &&
            canAccessUserSettings(
              { role: details.role, uid: details.uid },
              { role: row.original.role, uid: row.original.uid }
            ) && (
              <DropdownMenuItem className="cursor-pointer" onSelect={(e) => e.preventDefault()}>
                <DeleteUserDialog id={row.original.id} />
              </DropdownMenuItem>
            )}

          {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

type Role = "user" | "admin" | "superAdmin";
function canAccessUserSettings(
  currentUser: { role: Role; uid: string },
  targetUser: { role: Role; uid: string }
) {
  const isSameUser = currentUser.uid === targetUser.uid;
  const currentRole = currentUser.role;
  const targetRole = targetUser.role;

  if (currentUser.role === "user") {
    return false;
  }

  if (currentRole === "admin") {
    return isSameUser || targetRole === "user";
  }

  if (currentRole === "superAdmin") {
    return isSameUser || ["user", "admin"].includes(targetRole);
  }

  if (currentRole === "user") {
    return isSameUser;
  }

  return false;
}
