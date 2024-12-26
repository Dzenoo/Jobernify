declare type ResponseMessageTypes = {
  statusCode: number;
  message: string;
  [key: string]: any;
};

declare module '*md' {
  const content: string;
  export default content;
}
