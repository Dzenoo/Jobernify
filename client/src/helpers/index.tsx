import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

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
      <TooltipProvider key={id} delayDuration={0.1}>
        <Tooltip>
          <div key={id} className="flex items-center gap-3">
            <TooltipTrigger>{icon}</TooltipTrigger>
            <div>
              <p className="text-initial-gray cursor-default">{data}</p>
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
        <p className="text-initial-gray cursor-default">{data}</p>
      </div>
    </div>
  );
};

export const renderSkills = <
  T extends {
    [key: string]: string[];
  }
>(
  categorizedSkills: T
) => {
  return (
    <div className="py-3 flex gap-6 flex-wrap">
      {Object.entries(categorizedSkills).map(
        ([category, skills]) =>
          skills.length > 0 && (
            <div key={category} className="flex flex-col gap-3">
              <div>
                <h1 className="font-bold">{category}</h1>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Button variant="outline" key={index}>
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};
