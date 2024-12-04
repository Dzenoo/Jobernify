import React from "react";

type AddJobTextProps = {
  title: string;
  description: string;
  step: number;
};

const Text: React.FC<AddJobTextProps> = ({ title, description, step }) => {
  const steps = ["Details", "Overview", "Skills", "Scope"];

  return (
    <div className="flex flex-col gap-3 max-w-xl">
      <div>
        <span className="text-initial-gray">
          {step + 1} / 4 {steps[step]}
        </span>
      </div>
      <div>
        <h1 className="text-3xl text-[#00388C] font-bold dark:text-[#4883dc]">
          {title}
        </h1>
      </div>
      <div>
        <p className="text-initial-gray">{description}</p>
      </div>
    </div>
  );
};

export default Text;
