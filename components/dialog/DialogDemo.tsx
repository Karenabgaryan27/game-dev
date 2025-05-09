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
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

type DialogDemoProps = {
  contentClassName?: string;
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode | ((closeDialog: () => void) => ReactNode);
  color?: string;
  iconImage?: string;
  isDialogOpened?: boolean
  callback?: (state: any)=>void
};

export function DialogDemo({
  contentClassName = "",
  trigger = null,
  title = "",
  description = "",
  children = null,
  color = "",
  iconImage = "",
  isDialogOpened = false,
  callback = ()=>{}
}: DialogDemoProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    if(!isDialogOpened) return 
    setIsOpen(true)
  },[isDialogOpened])

  // useEffect(() => {
  //   switch (color) {
  //     case "blue":
  //       setIconImage(knightsImage);
  //       break;
  //     case "success":
  //       setIconImage(elkridersImage);
  //       break;
  //     case "warning":
  //       setIconImage(workelkImage);
  //       break;
  //     case "destructive":
  //       setIconImage(redDragonImage);
  //       break;
  //   }
  // }, []);

  const closeDialog = () => setIsOpen(false);

  const handleDialogChange = (state: boolean) => {
    setIsOpen(state);
    callback(state); // Call the callback
  };

  return (
    <Dialog open={isOpen}  onOpenChange={handleDialogChange}>
      <DialogTrigger asChild>{trigger || <Button variant="outline">Open Dialog</Button>}</DialogTrigger>
      <DialogContent
        color={color}
        className={` sm:max-w-[425px] overflow-y-auto max-h-[calc(100vh-3rem)] ${contentClassName}`}
      >
        {color && <div className={` bg-${color} absolute top-0 left-0 w-full h-[50px] z-[-1]`}></div>}
        {(iconImage || title || description) && (
          <DialogHeader className={`${iconImage ? "mt-[50px]" : ""}  relative`}>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
            {iconImage && (
              <img
                className="absolute bottom-[40px] right-[20px] w-[80px] drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
                src={iconImage}
                alt=""
              />
            )}
          </DialogHeader>
        )}
        <VisuallyHidden.Root>
          <DialogTitle></DialogTitle>
        </VisuallyHidden.Root>
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
