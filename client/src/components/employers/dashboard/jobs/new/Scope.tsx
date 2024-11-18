import React from "react";
import { Control } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

type ScopeProps = {
  control: Control<any>;
};

const Scope: React.FC<ScopeProps> = ({ control }) => {
  const levels = [
    {
      value: "Junior",
      title: "Junior",
      description:
        "Ideal for those new to the profession, with limited experience in the field.",
    },
    {
      value: "Medior",
      title: "Medior",
      description:
        "Suited for professionals with a moderate level of experience and skill.",
    },
    {
      value: "Senior",
      title: "Senior",
      description: "Designed for highly experienced and skilled professionals.",
    },
    {
      value: "Lead",
      title: "Lead",
      description:
        "Leadership position for candidates with significant experience and leadership skills.",
    },
  ];

  const positions = [
    {
      value: "Remote",
      title: "Remote",
      description:
        "Fully remote position with no requirement to work from a physical office.",
    },
    {
      value: "Hybrid",
      title: "Hybrid",
      description:
        "Position that allows for a combination of remote and in-office work.",
    },
    {
      value: "On-Site",
      title: "On-Site",
      description:
        "Position that requires the employee to work from a physical office location.",
    },
  ];

  const types = [
    {
      value: "Full-Time",
      title: "Full-Time",
      description: "Standard full-time position with regular working hours.",
    },
    {
      value: "Internship",
      title: "Internship",
      description:
        "Position designed for students and recent graduates to gain hands-on experience.",
    },
    {
      value: "Part-Time",
      title: "Part-Time",
      description:
        "Position with reduced working hours, typically less than 40 hours per week.",
    },
    {
      value: "Freelance",
      title: "Freelance",
      description:
        "Contract-based position where the worker is self-employed, often on a project basis.",
    },
  ];

  return (
    <>
      <FormField
        control={control}
        name="level"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Specify the desired candidate experience level
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-4"
              >
                {levels.map(({ value, title, description }) => (
                  <div key={value}>
                    <RadioGroupItem value={value} id={value} />
                    <label htmlFor={value} className="ml-2 font-medium">
                      {title}
                    </label>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={control}
        name="position"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specify the job location type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-4"
              >
                {positions.map(({ value, title, description }) => (
                  <div key={value}>
                    <RadioGroupItem value={value} id={value} />
                    <label htmlFor={value} className="ml-2 font-medium">
                      {title}
                    </label>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
      <Separator />
      <FormField
        control={control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specify the employment type for this job</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="flex flex-col gap-4"
              >
                {types.map(({ value, title, description }) => (
                  <div key={value}>
                    <RadioGroupItem value={value} id={value} />
                    <label htmlFor={value} className="ml-2 font-medium">
                      {title}
                    </label>
                    <FormMessage />
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
};

export default Scope;
