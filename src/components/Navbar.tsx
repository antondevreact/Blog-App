"use client";

import { FC } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { NAV_LINKS } from "@/common";
import { Loader } from "./Loader";

const ThemeSwitch = dynamic(
  () => import("./ThemeSwitch").then((m) => m.ThemeSwitch),
  {
    ssr: false,
    loading: () => <Loader className="h-0 mt-0" sizeClass="h-4 w-4" />,
  }
);

export const Navbar: FC = () => (
  <nav className="flex py-7 px-[110px] items-center justify-end flex-wrap">
    <div className="flex items-center gap-5">
      <ul className="flex gap-5 text-lg items-center">
        {NAV_LINKS.map(({ label, path }) => (
          <li key={path}>
            <Link href={path}>{label}</Link>
          </li>
        ))}
      </ul>
      <ThemeSwitch />
    </div>
  </nav>
);
