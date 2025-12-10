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

export type Platform = {
  _id: string;
  chatId: string;
  platform: z.infer<typeof PlatformSchema>;
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
