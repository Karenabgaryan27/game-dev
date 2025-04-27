"use client";

import { ReactNode, ReactElement, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import localData from "@/localData";
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
  color?: string;
};

const { elkridersImage, workelkImage, redDragonImage } = localData.images;

export function DialogDemo({
  contentClassName = "",
  trigger = null,
  title = "",
  description = "",
  children = null,
  color = "",
}: DialogDemoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [iconImage, setIconImage] = useState<string | undefined>();

  useEffect(() => {
    switch (color) {
      case "success":
        setIconImage(elkridersImage);
        break;
      case "warning":
        setIconImage(workelkImage);
        break;
      case "destructive":
        setIconImage(redDragonImage);
        break;
    }
  }, []);

  const closeDialog = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger || <Button variant="outline">Open Dialog</Button>}</DialogTrigger>
      <DialogContent className={` sm:max-w-[425px] overflow-y-auto max-h-screen ${contentClassName}`}>
        <div className={` bg-${color} absolute top-0 left-0 w-full h-[50px] z-[-1]`}></div>
        <DialogHeader className="mt-[50px] relative">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
          {iconImage && (
            <img className="absolute bottom-[40px] right-[20px] w-[80px] drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" src={iconImage} alt="" />
          )}
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
