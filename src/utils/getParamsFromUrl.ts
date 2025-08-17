import type { SearchParams } from 'next/dist/server/request/search-params';

export const getParamsFromUrl = (
  param: string,
  searchParams: SearchParams = {}
) => {
  return Array.isArray(searchParams[param])
    ? searchParams[param]?.[0]
    : (searchParams[param] ?? '');
};
