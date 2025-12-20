import z from 'zod';
import { api } from '../axios-config/axios';

export const CreateWorkspaceSchema = z.object({
  name: z.string(),
  platformChatIds: z.array(z.string()).optional(),
});

export async function createWorkspace(
  data: z.infer<typeof CreateWorkspaceSchema>
) {
  const res = await api.post('/workspace/create-workspace', data);
  return res.data;
}
