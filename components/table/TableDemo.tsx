import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import localData from "@/localData";
import { ButtonDemo } from "@/components/index";
import Link from "next/link";

const { penImage } = localData.svgs;
// const invoices = [
//   {
//     invoice: "INV001",
//     paymentStatus: "Paid",
//     totalAmount: "$250.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV002",
//     paymentStatus: "Pending",
//     totalAmount: "$150.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV003",
//     paymentStatus: "Unpaid",
//     totalAmount: "$350.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV004",
//     paymentStatus: "Paid",
//     totalAmount: "$450.00",
//     paymentMethod: "Credit Card",
//   },
//   {
//     invoice: "INV005",
//     paymentStatus: "Paid",
//     totalAmount: "$550.00",
//     paymentMethod: "PayPal",
//   },
//   {
//     invoice: "INV006",
//     paymentStatus: "Pending",
//     totalAmount: "$200.00",
//     paymentMethod: "Bank Transfer",
//   },
//   {
//     invoice: "INV007",
//     paymentStatus: "Unpaid",
//     totalAmount: "$300.00",
//     paymentMethod: "Credit Card",
//   },
// ]

type InvoicesProps = {
  invoices: {
    invoice: string;
    name: string;
    href: string;
    isDisabled?: boolean;
  }[];
};

export function TableDemo({ invoices = [] }: InvoicesProps) {
  return (
    <div className="rounded-md border overflow-hidden">
      <Table className="">
        {/* <TableCaption className="mb-5">A list of your recent invoices.</TableCaption> */}
        <TableHeader className="">
          <TableRow className="bg-neutral-800  hover:bg-neutral-800">
            <TableHead className="px-5 py-[10px] w-[100px] text-white">#</TableHead>
            <TableHead className="px-5 py-[10px] text-white">Name</TableHead>
            <TableHead className="px-5 py-[10px] text-right text-white">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <TableRow
              key={invoice.invoice}
              className={`${index % 2 !== 0 ? "bg-secondary" : ""} ${
                invoice.isDisabled ? "opacity-20 pointer-events-none" : ""
              } hover:bg-current-color`}
            >
              <TableCell className="font-medium px-5 py-[10px]">{invoice.invoice}</TableCell>
              <TableCell className=" px-5 py-[10px]">{invoice.name}</TableCell>
              <TableCell className="text-right px-5 ">
                <Link href={invoice.href}>
                  <ButtonDemo icon={penImage} variant="ghost" size="icon" className="h-auto w-auto  " />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-white hover:bg-white">
            <TableCell colSpan={4} className="text-center px-3 py-[10px]">
              A list of your sections.
            </TableCell>
            {/* <TableCell colSpan={3}>Total</TableCell> */}
            {/* <TableCell className="text-right">$2,500.00</TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
