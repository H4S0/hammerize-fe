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

export type Platform = {
  _id: string;
  chatId: string;
  platform: Exclude<PlatformSchema, 'discord'>;
  chatName: string;
  isActive: boolean;
  lastProcessAt: Date;
  adminUserId: string;
};

export type Server = {
  _id: string;
  serverId: string;
  serverName: string;
  serverImage: string;
  members: number;
  channelCount: number;
};

type PlatformsChatRes = {
  others: Platform[];
  servers: Server[];
};

export async function fetchUserPlatformsChat() {
  const res = await api.get<PlatformsChatRes>('/platform/all-platforms');
  return res.data;
}

export async function deletePlatform({
  platformChatId,
  serverId,
}: {
  platformChatId?: string;
  serverId?: string;
}) {
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
