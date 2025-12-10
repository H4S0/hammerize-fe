import { queryOptions } from '@tanstack/react-query';
import { fetchInviteUrls, fetchUserPlatformsChat } from '../api/platform';

export const platformChatsOptions = queryOptions({
  queryKey: ['user-platform-chat'],
  queryFn: () => fetchUserPlatformsChat(),
});

export const inviteUrlsOptions = queryOptions({
  queryKey: ['inviteUrls'],
  queryFn: async () => fetchInviteUrls(),
  staleTime: Infinity,
});
