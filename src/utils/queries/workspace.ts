import { queryOptions } from '@tanstack/react-query';
import { getWorkspaceById, getWorkspaces } from '../api/workspace';

export const workspacesOptions = queryOptions({
  queryKey: ['workspaces'],
  queryFn: () => getWorkspaces(),
});

export const workspaceByIdOptions = (workspaceId: string) =>
  queryOptions({
    queryKey: ['workspace', workspaceId],
    queryFn: () => getWorkspaceById(workspaceId),
  });
