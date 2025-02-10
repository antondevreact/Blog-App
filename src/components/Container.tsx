import { FC, PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

export const Container: FC<PropsWithChildren<IProps>> = ({
  className,
  children,
}) => {
  return (
    <section className={cn("mx-auto py-7 px-[110px]", className)}>
      {children}
    </section>
  );
};
