"use client";

import React from "react";
import Link from "next/link";

import useSearchParams from "@/hooks/defaults/useSearchParams.hook";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";

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
    <div className="flex justify-between gap-3 items-center max-sm:flex-wrap">
      <div className="basis-full w-96">
        <Input
          defaultValue={query}
          placeholder="Job title, description, or location..."
          onChange={handleInputChange}
        />
      </div>
      <div className="max-sm:basis-full">
        <Select
          onValueChange={(value) => handleSelectChange(value, "sort")}
          defaultValue={sort}
        >
          <SelectTrigger className="w-[180px] max-sm:w-full">
            <SelectValue placeholder="Sort By Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="all">Default</SelectItem>
              <SelectItem value="asc">Oldest First</SelectItem>
              <SelectItem value="desc">Newest First</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="max-sm:basis-full">
        <Link href="/dashboard/jobs/new">
          <Button className="w-full" variant="default">
            Add New Job
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SearchJobs;
