export type FilterCounts = {
  [key: string]: {
    _id: string;
    count: number;
  }[];
}[];

export type FilterGroup = {
  id: string;
  title: string;
  description: string;
  data: {
    id: string;
    title: string;
    value: string;
    type: string;
    count?: number;
  }[];
};
