"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, ChevronLeft, ChevronRight, EyeIcon } from "lucide-react";
import ParticipantDialog from "./participant-dialog/ParticipantDialog";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ButtonDemo, SelectScrollable, CarouselDemo, TabsDemo, RecordCard } from "@/components/index.js";
import { useApiContext } from "@/contexts/ApiContext";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type IncludedProps = {
  details?: any;
  pointsIndex?: any;
};

export function DataTableDemo<TData extends IncludedProps, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([
    {
      id: "points",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [expandedRows, setExpandedRows] = React.useState<string[]>([]);

  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: 100, // Set the default number of rows per page here
        // pageIndex: 1
      },
    },
    // manualPagination: true,
    // pageCount: calculateDynamicPageCount()
  });

  const toggleExpandedRow = (rowId: string) => {
    setExpandedRows((prev) => (prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]));
  };



  return (
    <div className={`w-full `}>
      <div className="flex items-center py-4 justify-between gap-10">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md ">
        <Table className="">
          {/* border-separate border-spacing-y-[7px] */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead className="">
                  <EyeIcon className="w-4 h-4 mx-3 text-gray-500" />
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={`${expandedRows.includes(row.id) ? "" : ""} 
                    ${
                      "!bg-blue-400"
                      // row.original.pointsIndex == 1
                      //   ? "!bg-yellow-500"
                      //   : row.original.pointsIndex == 2
                      //   ? "!bg-purple-500"
                      //   : row.original.pointsIndex == 3
                      //   ? "!bg-green-500"
                      //     : "!bg-blue-400"
                    }  
                    `}
                  >
                    <TableCell
                      className={`text-white ${
                        ""
                        // row.original.pointsIndex == 1
                        //   ? "py-6"
                        //   : row.original.pointsIndex == 2
                        //   ? "py-4"
                        //   : row.original.pointsIndex == 3
                        //   ? "py-3"
                        //   : ""
                      } `}
                    >
                      <Button
                        variant="ghost"
                        className="rounded-full w-[35px] h-[35px] cursor-pointer"
                        onClick={() => toggleExpandedRow(row.id)}
                      >
                        <ChevronDown className={`transition-transform duration-200 `} />
                      </Button>
                    </TableCell>
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={cell.id} className={`px-5 ${index === 2 ? "w-full" : ""} text-white`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>

                  {expandedRows.includes(row.id) && <ExpandedRow row={row.original} columns={columns} />}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex gap-[30px] items-center justify-center justify-md-end space-x-2 py-4 flex-wrap">
        <SelectScrollable
          triggerClassName="w-[80px]"
          contentClassName="min-w-[0px]"
          defaultItems={[5, 10, 20, 50, 100].map((size) => {
            return {
              label: size,
              value: size,
              isSelected: table.getState().pagination.pageSize === size,
            };
          })}
          callback={(item: { value: string | number }) => table.setPageSize(Number(item.value))}
        />
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length}{" "}
          row(s) selected.
        </div>

        <div className="space-x-2">
          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button> */}
          <div className="flex items-center space-x-2">
            <ButtonDemo
              size="sm"
              text="First"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              variant="outline"
            />
            <ButtonDemo
              icon={<ChevronLeft />}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              size="sm"
              variant="outline"
            />

            <span>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>

            <ButtonDemo
              icon={<ChevronRight />}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              size="sm"
              variant="outline"
            />

            <ButtonDemo
              size="sm"
              text="Last"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              variant="outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type ItemsProps = {
  label: string;
  value: string;
  content?: React.ReactNode;
};

const ExpandedRow = ({ row = [], columns = [] }: { row: any; columns: any }) => {
  const [records, setRecords] = React.useState(row.recordsList);

  const items: ItemsProps[] = [
    {
      label: "Records",
      value: "records",
      content: (
        <div className="md:px-10">
          <CarouselDemo
            className="data-table-carousel  "
            items={records?.length ? records : [{}]}
            itemClassName="basis-1/6  lg:basis-1/10"
          >
            {({ item, index }) => {
              return (
                <ParticipantDialog
                  record={item}
                  recordRest={{ name: row.name, avatar: row.avatar }}
                  trigger={
                    <div>
                      <RecordCard {...item} index={index} />
                    </div>
                  }
                />
              );
            }}
          </CarouselDemo>
        </div>
      ),
    },
  ];

  return (
    <tr className="">
      <td colSpan={columns.length + 1} className="overflow-hidden">
        <div className="p-4 shadow bg-blue-50">
          <div className="flex items-center space-x-3">
            <EyeIcon className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-semibold text-gray-700">Details</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <div className="mt-3 text-sm text-gray-500">
              <div className=" w-full lg:flex gap-10 ">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs gap-5  px-3 border-b-1  border-dashed border-blue-300  mb-3">
                    <div className="font-bold">All Points:</div>
                    <div>{row.points || 0}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs gap-5  px-3 border-b-1  border-dashed border-blue-300  mb-3">
                    <div className="font-bold">Custom Points:</div>
                    <div>{row.customPoints || 0}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs gap-5  px-3 border-b-1  border-dashed border-blue-300  mb-3">
                    <div className="font-bold">Behemoth Points:</div>
                    <div>{row.behemothPoints || 0}</div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs gap-5  px-3 border-b-1  border-dashed border-blue-300  mb-3">
                    <div className="font-bold">Caravan Points:</div>
                    <div>{row.caravanPoints || 0}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs gap-5  px-3 border-b-1  border-dashed border-blue-300  mb-3">
                    <div className="font-bold">Donation Points:</div>
                    <div>{row.resourceDonation || "0"}</div>
                  </div>
                  <div className="flex items-center justify-between text-xs gap-5  px-3 border-b-1  border-dashed border-blue-300  mb-3">
                    <div className="font-bold">Gates Points:</div>
                    <div>{row.gatesPoints || 0}</div>
                  </div>
                </div>
              </div>
            </div>
            <TabsDemo items={items} />
          </div>
        </div>
      </td>
    </tr>
  );
};
