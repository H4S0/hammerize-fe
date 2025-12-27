import { queryOptions } from '@tanstack/react-query';
import {
  fetchAllSummaries,
  fetchSummariesByPlatformChatId,
  FilteredSummariesOptions,
} from '../api/summary';

export const summariesByChatIdOptions = (id: string) =>
  queryOptions({
    queryKey: ['summaries-by-chat', id],
    queryFn: () => fetchSummariesByPlatformChatId(id),
  });

export const allSummariesOptions = ({
  search,
  platform,
}: FilteredSummariesOptions) =>
  queryOptions({
    queryKey: ['all-summaries', search, platform],
    queryFn: () => fetchAllSummaries({ search, platform }),
  });
