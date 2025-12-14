import { queryOptions } from '@tanstack/react-query';
import { fetchSummariesByPlatformChatId } from '../api/summary';

export const summariesByChatIdOptions = (id: string) =>
  queryOptions({
    queryKey: ['summaries-by-chat', id],
    queryFn: () => fetchSummariesByPlatformChatId(id),
  });
