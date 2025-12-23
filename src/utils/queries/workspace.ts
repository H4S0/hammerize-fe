import { queryOptions } from '@tanstack/react-query';
import {
  getPlatformsByWorkspaceId,
  getWorkspaceById,
  getWorkspaces,
} from '../api/workspace';

export const workspacesOptions = queryOptions({
  queryKey: ['workspaces'],
  queryFn: () => getWorkspaces(),
});

export const workspaceByIdOptions = (workspaceId: string) =>
  queryOptions({
    queryKey: ['workspace', workspaceId],
    queryFn: () => getWorkspaceById(workspaceId),
  });

export const platformByWorkspaceOptions = (workspaceId: string) =>
  queryOptions({
    queryKey: ['workspace-platforms', workspaceId],
    queryFn: () => getPlatformsByWorkspaceId(workspaceId),
  });
