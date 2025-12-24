import { queryOptions } from '@tanstack/react-query';
import {
  fetchWorkspaceSummariesByPlatform,
  getPlatformsByWorkspaceId,
  getWorkspaceById,
  getWorkspaces,
} from '../api/workspace';
import { fetchSummariesByPlatformChatId } from '../api/summary';

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

export const workspaceSummariesByPlatform = (
  workspaceId: string,
  platformChatId: string
) =>
  queryOptions({
    queryKey: ['workspace-summaries', workspaceId, platformChatId],
    queryFn: () =>
      fetchWorkspaceSummariesByPlatform(platformChatId, workspaceId),
  });
