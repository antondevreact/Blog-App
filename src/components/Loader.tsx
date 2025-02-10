import { FC } from "react";
import { Loader as Circular } from "lucide-react";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
  sizeClass?: string;
}

export const Loader: FC<IProps> = ({ className, sizeClass = "h-8 w-8" }) => (
  <div className={cn("flex justify-center items-center h-48", className)}>
    <Circular className={`animate-spin mt-[25%] text-primary ${sizeClass}`} />
  </div>
);
