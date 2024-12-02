"use client";

import React from "react";

import { companySizes, industries, locations } from "@/constants";

import useSearchParams from "@/hooks/defaults/useSearchParams.hook";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

type SearchEmployersProps = {
  searchParams: { [key: string]: string };
};

const SearchEmployers: React.FC<SearchEmployersProps> = ({ searchParams }) => {
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

  const getUpdatedData = (
    label: string,
    data: {
      value: string;
      label: string;
    }[]
  ) => {
    const updatedData = [
      { value: "all", label: `All ${label}` },
      ...data.map((object) => ({
        ...object,
      })),
    ];

    return updatedData;
  };

  return (
    <div className="flex justify-between gap-3 max-sm:flex-col">
      <div className="basis-full max-sm:basis-full">
        <Input
          defaultValue={searchParams.query}
          placeholder="Search Employers..."
          onChange={handleInputChange}
        />
      </div>
      <div className="basis-1/2 max-sm:basis-full">
        <Select
          onValueChange={(value) => handleSelectChange(value, "industry")}
          defaultValue={searchParams.industry}
        >
          <SelectTrigger>
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {getUpdatedData("Industries", industries).map((industry) => (
              <SelectItem key={industry.label} value={industry.value}>
                {industry.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="basis-1/2 max-sm:basis-full">
        <Select
          onValueChange={(value) => handleSelectChange(value, "size")}
          defaultValue={searchParams.size}
        >
          <SelectTrigger>
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {getUpdatedData("Sizes", companySizes).map((size) => (
              <SelectItem key={size.label} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="basis-1/2 max-sm:basis-full">
        <Select
          onValueChange={(value) => handleSelectChange(value, "location")}
          defaultValue={searchParams.location}
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {getUpdatedData("Locations", locations).map((location) => (
              <SelectItem key={location.label} value={location.value}>
                {location.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="basis-1/2 max-sm:basis-full">
        <Select
          onValueChange={(value) => handleSelectChange(value, "sort")}
          defaultValue={searchParams.sort}
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Default</SelectItem>
            <SelectItem value="followers">Most Followers</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchEmployers;
