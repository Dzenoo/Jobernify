declare type ServerResponse<T = {}> = {
  statusCode: number;
  message?: string;
} & T;

declare module '*md' {
  const content: string;
  export default content;
}

declare module 'tailwindcss/lib/util/flattenColorPalette' {
  export default function flattenColorPalette(
    colors: any,
  ): Record<string, string>;
}
