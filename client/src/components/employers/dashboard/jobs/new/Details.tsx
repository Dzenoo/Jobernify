import React from 'react';
import { Control } from 'react-hook-form';

import { locations } from '@/constants';

import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

type DetailsProps = {
  control: Control<any>;
};

const Details: React.FC<DetailsProps> = ({ control }) => {
  return (
    <>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Write a title for your job post</FormLabel>
            <FormControl>
              <Input placeholder="Senior Software Engineer" {...field} />
            </FormControl>
            <FormDescription>
              Ensure your job title is concise, descriptive, and between 3 to 30
              characters long. This helps attract the right candidates.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="overview"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Write a brief overview about this job</FormLabel>
            <FormControl>
              <Textarea
                className="h-52 resize-none"
                maxLength={300}
                minLength={30}
                placeholder="Provide a summary of the job responsibilities, required qualifications, and what makes this role unique."
                {...field}
              />
            </FormControl>
            <FormDescription>
              Provide a concise overview of 30 to 300 characters that gives
              potential applicants a snapshot of the role. This is your
              opportunity to spark interest.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select the location for your job post</FormLabel>
            <FormControl>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.value} value={location.value}>
                      {location.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>
              Choose a location that accurately reflects where the job is based.
              It helps in filtering and matching with candidates looking in
              specific areas.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default Details;
