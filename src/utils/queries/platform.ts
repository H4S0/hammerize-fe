import { queryOptions } from '@tanstack/react-query';
import {
  fetchInviteUrls,
  fetchPlatformById,
  fetchServerById,
  fetchUserPlatformsChat,
} from '../api/platform';

export const platformChatsOptions = queryOptions({
  queryKey: ['user-platform-chat'],
  queryFn: () => fetchUserPlatformsChat(),
});

export const serverOptions = (serverId: string) =>
  queryOptions({
    queryKey: ['server', serverId],
    queryFn: () => fetchServerById(serverId),
  });

export const inviteUrlsOptions = queryOptions({
  queryKey: ['inviteUrls'],
  queryFn: async () => fetchInviteUrls(),
  staleTime: Infinity,
});

export const platformChatOptions = (id: string) =>
  queryOptions({
    queryKey: ['user-platform-chat'],
    queryFn: () => fetchPlatformById(id),
  });
