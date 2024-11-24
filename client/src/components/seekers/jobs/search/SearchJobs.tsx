"use client";

import React from "react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import useSearchParams from "@/hooks/defaults/useSearchParams.hook";

type SearchJobsProps = {
  query: string;
  sort: string;
};

const SearchJobs: React.FC<SearchJobsProps> = ({ query, sort }) => {
  const { updateSearchParams, debounce } = useSearchParams();

  const handleInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchParams("query", e.target.value);
    },
    300
  );

  const handleSelectChange = (value: string, key: string) => {
    if (value === "all") {
      updateSearchParams(key, "");
    } else {
      updateSearchParams(key, value);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="shadow-lg rounded-lg w-full h-full bg-gradient-to-br from-[#0c39b3] via-[#02fcfc8c] to-[#035770]">
        <div className="flex flex-col gap-3 p-8 rounded-md backdrop-brightness-75">
          <h1 className="text-white font-bold text-xl">
            Unlock Your Dream Career
          </h1>
          <div className="max-w-lg mt-2">
            <p className="text-white">
              Explore a wide range of job opportunities tailored to your skills
              and interests. Start your journey today!
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-3 max-sm:flex-wrap">
        <div className="basis-full">
          <Input
            defaultValue={query}
            placeholder="Search Jobs..."
            onChange={handleInputChange}
          />
        </div>
        <div className="basis-1/2 max-sm:basis-full">
          <Select
            onValueChange={(value) => handleSelectChange(value, "sort")}
            defaultValue={sort}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort By Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Default</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
              <SelectItem value="desc">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
