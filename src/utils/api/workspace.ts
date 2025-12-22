import z from 'zod';
import { api } from '../axios-config/axios';

export const CreateWorkspaceSchema = z.object({
  name: z.string(),
  description: z.string(),
  platformChatIds: z.array(z.string()).optional(),
});

export async function createWorkspace(
  data: z.infer<typeof CreateWorkspaceSchema>
) {
  const res = await api.post('/workspace/create-workspace', data);
  return res.data;
}

export type WorkspaceRes = {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  memberIds: string[];
  platformChatIds: string[];
  createdAt: Date;
};

export async function getWorkspaces() {
  const res = await api.get<WorkspaceRes[]>('/workspace/get-workspaces');
  return res.data;
}

export async function getWorkspaceById(workspaceId: string) {
  const res = await api.get<WorkspaceRes>(
    `/workspace/get-workspace/${workspaceId}`
  );

  return res.data;
}
