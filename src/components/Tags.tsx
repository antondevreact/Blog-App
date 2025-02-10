import { FC } from "react";
import { cn } from "@/lib/utils";

interface IProps {
  tags?: string[];
}

export const Tags: FC<IProps> = ({ tags = [] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className={cn(
          "text-sm px-2 py-1 rounded-full font-medium bg-gray-200 text-gray-700"
        )}
        aria-label={`Tag: ${tag}`}
      >
        {tag}
      </span>
    ))}
  </div>
);
