import z from 'zod';
import { api } from '../axios-config/axios';

const PlatformSchema = z.enum(['discord', 'telegram', 'slack']);

export const LinkPlatformSchema = z.object({
  linkToken: z.string('Link must be inserted'),
  platform: PlatformSchema,
});

export async function linkPlatform(data: z.infer<typeof LinkPlatformSchema>) {
  const res = await api.put('/platform/link-platform', data);
  return res.data;
}

type PlatformSchema = z.infer<typeof PlatformSchema>;
type SummaryMode = 'short-term' | 'digest-mode';

export type Platform = {
  _id: string;
  chatId: string;
  platform: Exclude<PlatformSchema, 'discord'>;
  chatName: string;
  isActive: boolean;
  lastProcessAt: Date;
  adminUserId: string;
  summaryMode: SummaryMode;
  summariesCount: number;
};

export type Server = {
  _id: string;
  serverId: string;
  serverName: string;
  serverImage: string;
  members: number;
  channelCount: number;
  platformChatIds: string[];
};

type PlatformsChatRes = {
  others: Platform[];
  servers: Server[];
};

export async function fetchUserPlatformsChat() {
  const res = await api.get<PlatformsChatRes>('/platform/all-platforms');
  return res.data;
}

type DeletePlatformOpts = {
  platformChatId?: string;
  serverId?: string;
};

export async function deletePlatform({
  platformChatId,
  serverId,
}: DeletePlatformOpts) {
  const query = new URLSearchParams();

  if (platformChatId) query.append('platformChatId', platformChatId);

  if (serverId) {
    query.append('isServer', 'true');
    query.append('serverId', serverId);
  }

  const res = await api.delete(`/platform/delete-platform?${query.toString()}`);

  return res.data;
}

type InviteUrlRes = {
  discord: string;
  telegram: string;
  slack: string;
};

export async function fetchInviteUrls() {
  const res = await api.get<InviteUrlRes>('/platform/invite-urls');
  return res.data;
}

type ServerRes = {
  server: Server;
  channels: Platform[];
};

export async function fetchServerById(serverId: string) {
  const res = await api.get<ServerRes>(`/platform/get-server/${serverId}`);
  return res.data;
}

export const UpdateServerSchema = z.object({
  serverName: z.string(),
});

export async function updateServer(
  serverId: string,
  data: z.infer<typeof UpdateServerSchema>
) {
  const res = await api.put(`/platform/update-server/${serverId}`, data);
  return res.data;
}

export const UpdatePlatformSchema = z.object({
  chatName: z.string().optional(),
  isActive: z.boolean().optional(),
  modes: z.enum(['short-term', 'digest-mode']).optional(),
});

export async function updatePlatform(
  platformChatId: string,
  data: z.infer<typeof UpdatePlatformSchema>
) {
  const res = await api.put(
    `/platform/update-platform/${platformChatId}`,
    data
  );
  return res.data;
}

export async function fetchPlatformById(id: string) {
  const res = await api.get<Platform>(`/platform/get-platform/${id}`);
  return res.data;
}
