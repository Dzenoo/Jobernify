'use client';

import React from 'react';

import { Control } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { marked } from 'marked';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/utilities/popover';
import { Calendar } from '@/components/ui/utilities/calendar';
import { Input } from '@/components/ui/form/input';
import { Button } from '@/components/ui/buttons/button';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type OverviewProps = {
  control: Control<any>;
};

const Overview: React.FC<OverviewProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Write a detailed description</FormLabel>
            <FormControl className="max-w-4xl max-h-96 overflow-auto">
              <ReactQuill
                value={marked(field.value) as any}
                onChange={field.onChange}
                modules={{
                  toolbar: [
                    ['bold', 'italic'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                  ],
                }}
                formats={['bold', 'italic', 'list', 'bullet']}
              />
            </FormControl>
            <FormDescription>
              Provide a comprehensive description between 30 to 600 characters.
              Include details about the role's responsibilities, qualifications,
              and any special requirements.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="expiration_date"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Add expiration date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP')
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  fromYear={1900}
                  toYear={new Date().getFullYear()}
                  captionLayout="dropdown-buttons"
                  mode="single"
                  selected={field.value as any}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date < new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Select the date when the job posting will close. Applications will
              not be accepted after this date. Ensure you choose a date that is
              today or in the future.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="salary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>What is the salary for this job?</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter the salary amount (e.g., 50000)"
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Specify the salary for the job in USD per month. Ensure it is a
              positive number, and the minimum should be $100.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Overview;
