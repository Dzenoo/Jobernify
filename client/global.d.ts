declare type ResponseMessageTypes = {
  statusCode: number;
  message: string;
  [key: string]: any;
};

declare module '*md' {
  const content: string;
  export default content;
}

declare module 'tailwindcss/lib/util/flattenColorPalette' {
  export default function flattenColorPalette(
    colors: any,
  ): Record<string, string>;
}
