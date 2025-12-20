import { queryOptions } from '@tanstack/react-query';
import { getWorkspaces } from '../api/workspace';

export const workspacesOptions = queryOptions({
  queryKey: ['workspaces'],
  queryFn: () => getWorkspaces(),
});
