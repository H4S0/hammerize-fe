import z from 'zod';
import { api } from '../axios-config/axios';

export const LinkPlatformSchema = z.object({
  linkToken: z.string('Link must be inserted'),
  platform: z.enum(['discord', 'telegram', 'slack']),
});

export async function linkPlatform(data: z.infer<typeof LinkPlatformSchema>) {
  const res = await api.put('/platform/link-platform', data);
  return res.data;
}
