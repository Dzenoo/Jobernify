'use client';

import React from 'react';

import { useSearchParams } from '@/hooks/core/useSearchParams.hook';

import { Input } from '@/components/ui/input';

type SearchSeekersProps = {
  query: string;
};

const SearchSeekers: React.FC<SearchSeekersProps> = ({ query }) => {
  const { updateSearchParams, debounce } = useSearchParams();

  const handleInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateSearchParams('query', e.target.value);
    },
    300,
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="shadow-lg rounded-lg w-full h-full bg-gradient-to-br from-[#0c39b3] via-[#02fcfc8c] to-indigo-700">
        <div className="flex flex-col gap-3 bg-black/20 p-8 rounded-md">
          <h1 className="text-white font-semibold text-xl">
            Find Your Ideal Candidate
          </h1>
          <div className="max-w-lg mt-2">
            <p className="text-white">
              Discover and connect with top talent that matches your company's
              needs. Start your search today!
            </p>
          </div>
        </div>
      </div>
      <div className="basis-full">
        <Input
          defaultValue={query}
          placeholder="Name, headline, or skills..."
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default SearchSeekers;
