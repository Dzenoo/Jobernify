'use client';

import React from 'react';

import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import { Input } from '@/components/ui/form/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/form/select';

type SearchJobsProps = {
  query: string;
  sort: string;
};

const SearchJobs: React.FC<SearchJobsProps> = ({ query, sort }) => {
  const { updateSearchParams, debounce } = useSearchParams();

  const handleInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchParams('query', e.target.value);
    },
    300,
  );

  const handleSelectChange = (value: string, key: string) => {
    if (value === 'all') {
      updateSearchParams(key, '');
    } else {
      updateSearchParams(key, value);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="shadow-lg rounded-lg w-full h-full bg-gradient-to-br from-[#0c39b3] via-[#02fcfc8c] to-indigo-700">
        <div className="flex flex-col p-6 rounded-xl backdrop-brightness-75">
          <h1 className="text-white font-semibold text-xl">
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
            placeholder="Job title, description, or location..."
            onChange={handleInputChange}
          />
        </div>
        <div className="basis-1/2 max-sm:basis-full">
          <Select
            onValueChange={(value) => handleSelectChange(value, 'sort')}
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
        <div className="basis-52 max-sm:basis-full">
          <Select
            onValueChange={(value) => handleSelectChange(value, 'limit')}
            defaultValue={sort}
          >
            <SelectTrigger>
              <SelectValue placeholder="Per Page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="25">25</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default SearchJobs;
