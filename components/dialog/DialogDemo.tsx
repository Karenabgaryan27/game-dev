"use client";

import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
//   DialogClose,
  DialogContent,
  DialogDescription,
//   DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type DialogDemoProps = {
  contentClassName?: string;
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode | ((closeDialog: () => void) => ReactNode);
  color?: string
};

export function DialogDemo({
  contentClassName = "",
  trigger = null,
  title = "",
  description = "",
  children = null,
  color=''
}: DialogDemoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeDialog = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}  >
      <DialogTrigger asChild >{trigger || <Button variant="outline">Open Dialog</Button>}</DialogTrigger>
      <DialogContent className={`${contentClassName} sm:max-w-[425px] overflow-y-auto max-h-screen`}>
      <div className={` bg-${color} absolute top-0 left-0 w-full h-[50px] z-[-1]`}></div>
        <DialogHeader className="mt-[50px]">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="dialog-body">{typeof children === "function" ? children(closeDialog) : children}</div>
        {/* <DialogFooter>
          <DialogClose asChild>
            <Button type="submit">Save changes</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
