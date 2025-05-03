"use client";

import * as React from "react";
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
import {
  ButtonDemo,
  SelectScrollable,
  CarouselDemo,
  HeroCard,
  TabsDemo,
  CustomParallaxCard,
} from "@/components/index.js";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type IncludedProps = {
  details: any;
};

export function DataTableDemo<TData extends IncludedProps, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
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
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
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
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                <TableHead>
                  <EyeIcon className="w-4 h-4 mx-3 text-gray-500" />
                </TableHead>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                    className={`${expandedRows.includes(row.id) ? "!bg-gray-100 " : ""}`}
                  >
                    <TableCell className="w-0">
                      <Button
                        variant="ghost"
                        className="rounded-full w-[35px] h-[35px] cursor-pointer"
                        onClick={() => toggleExpandedRow(row.id)}
                      >
                        <ChevronDown className={`transition-transform duration-200 `} />
                      </Button>
                    </TableCell>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
  const items: ItemsProps[] = [
    {
      label: "Heroes",
      value: "heroes",
      content: (
        <div className="md:px-10">
          <CarouselDemo
            className="data-table-carousel  "
            items={row.details.heroes}
            itemClassName="basis-1/2 sm:basis-1/4 lg:basis-1/7"
          >
            {({ item, index }) => <HeroCard {...item} index={index} />}
          </CarouselDemo>
        </div>
      ),
    },
    {
      label: "Artifacts",
      value: "artifacts",
      content: (
        <div className="md:px-10">
          <CarouselDemo
            className="data-table-carousel  "
            items={row.details.artifacts}
            itemClassName="basis-1/2 sm:basis-1/4 lg:basis-1/7"
          >
            {({ item, index }) => <HeroCard {...item} index={index} />}
          </CarouselDemo>
        </div>
      ),
    },
    {
      label: "Custom Arsenal",
      value: "customArsenal",
      content: (
        <div className="md:px-10">
          <CarouselDemo
            className="data-table-carousel  "
            items={row.details.customArsenal}
            itemClassName="basis-1/2 sm:basis-1/4 lg:basis-1/7 p-3"
          >
            {({ item, index }) => <CustomParallaxCard {...item} index={index} />}
          </CarouselDemo>
        </div>
      ),
    },
  ];

  return (
    <tr>
      <td colSpan={columns.length + 1 + 1}>
        <div className="p-4   border-gray-200 bg-gray-50 mb-5 shadow">
          <div className="flex items-center space-x-3">
            <EyeIcon className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-semibold text-gray-700">Details</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            <div className="mt-3 text-sm text-gray-500">
              <div className=" w-full lg:flex gap-10 ">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">ID:</div>
                    <div>#2432r32</div>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">Name:</div>
                    <div>John Doe</div>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">Email:</div>
                    <div>johndoe@gmail.com</div>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">Country:</div>
                    <div>USA</div>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">Languages</div>
                    <div>English, French</div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">Faction:</div>
                    <div>League of Order</div>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">Game Time (UTC):</div>
                    <div>18:00 UTC – 20:30 UTC</div>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">Main Troop Type:</div>
                    <div>Mage</div>
                  </div>
                  <div className="flex items-center justify-between text-sm gap-5  px-3 border-b-1  mb-3">
                    <div className="font-bold">Troop Level:</div>
                    <div>T4</div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />

            <TabsDemo items={items} />
          </div>
        </div>
      </td>
    </tr>
  );
};
