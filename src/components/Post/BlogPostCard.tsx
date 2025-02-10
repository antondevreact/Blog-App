import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { IPost as IProps } from "@/interface/post";
import { truncateDescription } from "@/lib/utils";
import { ROUTE_PATH } from "@/common";
import { Tags } from "../Tags";

export const BlogPostCard: FC<IProps> = ({
  id,
  image,
  date,
  author,
  title,
  description,
  tags,
}) => (
  <Link
    href={`${ROUTE_PATH.BLOG}/${id}`}
    className="block hover:opacity-80 transition-all"
  >
    <div className="flex flex-col gap-6">
      <div className="relative w-full h-[300px] overflow-hidden rounded-sm">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 transform hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold text-customPurple">{date}</span>
          <span>&#8226;</span>
          <span className="font-semibold">{author}</span>
        </div>

        <div className="flex items-center w-full justify-between">
          <h3 className="font-semibold text-2xl truncate max-[820px]:text-xl">
            {title}
          </h3>
          <ArrowUpRight size={24} />
        </div>
        <p className="text-base text-lightGray">
          {truncateDescription(description, 70)}
        </p>
        <Tags tags={tags} />
      </div>
    </div>
  </Link>
);
