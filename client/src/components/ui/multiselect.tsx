import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandInput,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { getSkillNames } from '@/lib/utils';

type MultiSelectOption = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  options: MultiSelectOption[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
};

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options...',
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (value: string) => {
    onChange(
      selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value],
    );
    setSearchQuery('');
  };
  const skillsNames = getSkillNames(selectedValues);

  return (
    <div className="relative w-full">
      <Button
        type="button"
        variant="outline"
        onClick={toggleDropdown}
        className="w-full h-fit flex gap-2 flex-wrap items-start justify-start hover:border-gray-400 hover:bg-gray-100 dark:hover:bg-[#1b1b1b]"
      >
        {skillsNames.length > 0 ? (
          skillsNames.map((value) => (
            <Badge key={value} variant="secondary">
              {value}
            </Badge>
          ))
        ) : (
          <span className=" text-left text-muted-foreground">
            {placeholder}
          </span>
        )}
      </Button>
      {open && (
        <Command className="h-52 absolute top-full left-0 mt-2 w-full z-10 bg-white border rounded-xl shadow-lg dark:bg-[#1b1b1b]">
          <CommandInput
            value={searchQuery}
            onValueChange={setSearchQuery}
            placeholder="Search skills..."
            className="w-full px-3 py-2 border-b dark:bg-[#1b1b1b]"
          />
          <CommandList className="max-h-48 overflow-auto">
            {options.length > 0 ? (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className={`flex justify-between p-2 ${
                      selectedValues.includes(option.value)
                        ? 'bg-blue-100 dark:bg-gray-500'
                        : ''
                    }`}
                  >
                    <span>{option.label}</span>
                    {selectedValues.includes(option.value) && (
                      <span>&#10003;</span>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <div className="p-3 text-center text-muted-foreground dark:text-muted-foreground">
                No results found.
              </div>
            )}
          </CommandList>
        </Command>
      )}
    </div>
  );
};

export default MultiSelect;
