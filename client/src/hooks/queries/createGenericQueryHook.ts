import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type QueryFunctionMap = Record<string, (...args: any[]) => Promise<any>>;

export function createGenericQueryHook<
  TQueryFunctions extends QueryFunctionMap,
>(domain: string, queryFunctions: TQueryFunctions) {
  type QueryPayloadMap = {
    [K in keyof TQueryFunctions]: Parameters<TQueryFunctions[K]> extends []
      ? { type: K }
      : { type: K; params: Parameters<TQueryFunctions[K]>[0] };
  };
  type QueryPayload = QueryPayloadMap[keyof TQueryFunctions];

  type InferReturnType<T extends QueryPayload> = T extends { type: infer K }
    ? K extends keyof TQueryFunctions
      ? Awaited<ReturnType<TQueryFunctions[K]>>
      : never
    : never;

  function useDomainQuery<T extends QueryPayload>(
    payload: T,
    options?: Omit<
      UseQueryOptions<InferReturnType<T>, Error>,
      'queryKey' | 'queryFn'
    >,
  ) {
    return useQuery({
      queryKey: [domain, payload] as const,
      queryFn: async ({ queryKey }): Promise<InferReturnType<T>> => {
        const [, payload] = queryKey as [string, T];
        const queryFn = queryFunctions[payload.type];
        if ('params' in payload) {
          return queryFn(payload.params) as Promise<InferReturnType<T>>;
        } else {
          return queryFn() as Promise<InferReturnType<T>>;
        }
      },
      ...options,
    });
  }

  return useDomainQuery;
}
