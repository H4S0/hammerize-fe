import { WorkspaceRes } from '../api/workspace';

export function getWorkspaceRole(workspace: WorkspaceRes, userId?: string) {
  if (!userId) return 'member';

  if (workspace.ownerId === userId) {
    return 'admin';
  }

  const member = workspace.memberIds.find((m) => m.id._id === userId);

  return member?.role || 'member';
}
