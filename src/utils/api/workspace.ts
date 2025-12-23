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

export type Role = 'admin' | 'member';

export type InvitedMembers = {
  _id: string;
  email: string;
  role: Role;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
};

type PopulatedMemberIds = {
  _id: string;
  email: string;
  username: string;
};

export type WorkspaceRes = {
  _id: string;
  ownerId: string;
  name: string;
  description: string;
  memberIds: {
    id: PopulatedMemberIds;
    _id: string;
    role: Role;
  }[];
  platformChatIds: string[];
  createdAt: Date;
  invitedMembers: InvitedMembers[];
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

export const InviteMemberSchema = z.object({
  email: z.email(),
  role: z.enum(['member', 'admin']),
});

export async function inviteMemeberToWorkspace(
  workspaceId: string,
  data: z.infer<typeof InviteMemberSchema>
) {
  const res = await api.put(`/workspace/invite-member/${workspaceId}`, data);
  return res.data;
}

export async function cancleInvitation(id: string) {
  const res = await api.put(`/workspace/remove-invite/${id}`);
  return res.data;
}

export const UpdateWorkspaceSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  platformChatIds: z.array(z.string()).optional(),
});

export async function updateWorkspace(
  id: string,
  data: z.infer<typeof UpdateWorkspaceSchema>
) {
  const res = await api.put(`/workspace/update-workspace/${id}`, data);
  return res.data;
}

const UpdateInvitationStatusSchema = z.object({
  status: z.enum(['accepted', 'declined']),
});

export async function updateWorkspaceInvitationStatus(
  token: string,
  data: z.infer<typeof UpdateInvitationStatusSchema>
) {
  const res = await api.put(
    `/workspace/update-invitation-status/${token}`,
    data
  );
  return res.data;
}
