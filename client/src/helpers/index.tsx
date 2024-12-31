import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/info/tooltip';

import { Button } from '@/components/ui/buttons/button';

type RenderIconTextDefault = {
  data: string | number;
  icon: React.JSX.Element;
  id: string;
};

type RenderIconTextProps =
  | ({
      tooltip?: true;
      tooltipContent?: string;
    } & RenderIconTextDefault)
  | ({
      tooltip?: false;
      tooltipContent?: null;
    } & RenderIconTextDefault);

export const renderIconText = ({
  tooltip,
  tooltipContent,
  icon,
  data,
  id,
}: RenderIconTextProps) => {
  if (tooltip) {
    return (
      <TooltipProvider key={id} delayDuration={400}>
        <Tooltip>
          <div key={id} className="flex items-center gap-3">
            <TooltipTrigger>{icon}</TooltipTrigger>
            <div>
              <p className="text-muted-foreground cursor-default">{data}</p>
            </div>
          </div>
          <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div key={id} className="flex items-center gap-3">
      <div>{icon}</div>
      <div>
        <p className="text-muted-foreground cursor-default">{data}</p>
      </div>
    </div>
  );
};

export const renderSkills = <
  T extends {
    [key: string]: string[];
  },
>(
  categorizedSkills: T,
) => {
  return (
    <div className="py-3 flex gap-6 flex-wrap">
      {Object.entries(categorizedSkills).map(
        ([category, skills]) =>
          skills.length > 0 && (
            <div key={category} className="flex flex-col gap-3">
              <div>
                <h1 className="font-semibold">{category}</h1>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Button
                    className="max-sm:whitespace-break-spaces"
                    variant="outline"
                    key={index}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          ),
      )}
    </div>
  );
};

type FieldGroupProps = {
  title: string;
  value: string | number;
  href?: boolean;
};

export const FieldGroup: React.FC<FieldGroupProps> = ({
  title,
  value,
  href,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <h2>{title}</h2>
      </div>
      <div>
        {href && value.toString().includes('http') ? (
          <a
            href={value as string}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 dark:text-blue-500"
          >
            {value}
          </a>
        ) : (
          <p className="text-muted-foreground text-base truncate">{value}</p>
        )}
      </div>
    </div>
  );
};
