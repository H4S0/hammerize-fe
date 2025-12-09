import { queryOptions } from '@tanstack/react-query';
import { fetchUserPlatformsChat } from '../api/platform';

export const platformChatsOptions = queryOptions({
  queryKey: ['user-platform-chat'],
  queryFn: () => fetchUserPlatformsChat(),
});
