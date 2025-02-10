"use client";

import { ChangeEvent, FC, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import useDebounce from "@/hooks/use-debounce";
import { usePostStore } from "@/store/post";
import { Input } from "./ui/input";

export const SearchBar: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasValue, setHasValue] = useState(false);
  const { setSearchQuery } = usePostStore();

  const debouncedSearch = useDebounce((query: string) => {
    setSearchQuery(query);
  }, 500);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHasValue(Boolean(value));
    debouncedSearch(value);
  };

  const handleClearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      setSearchQuery("");
      setHasValue(false);
    }
  };

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

      <Input
        ref={inputRef}
        type="text"
        placeholder="Search posts..."
        className="border border-gray-300 pl-10 pr-4 py-2 w-full focus:outline-none rounded-md"
        onChange={handleInputChange}
        aria-label="Search posts"
      />

      <X
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer transition-opacity duration-200 ${
          hasValue ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClearInput}
        aria-label="Clear search input"
      />
    </div>
  );
};
