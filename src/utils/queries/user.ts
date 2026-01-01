import { queryOptions } from '@tanstack/react-query';
import { fetchUserInfo } from '../api/user';

export const userInfoQueryOptions = queryOptions({
  queryKey: ['user-info'],
  queryFn: () => fetchUserInfo(),
});
