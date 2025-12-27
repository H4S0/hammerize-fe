import { api } from '../axios-config/axios';

export type SummaryRes = {
  _id: string;
  chatId: string;
  summaryText: string;
  messageCount: number;
  crucialThemes: string[];
  crucialWords: string[];
  createdAt: Date;
};

export async function fetchSummariesByPlatformChatId(id: string) {
  const res = await api.get<SummaryRes[]>(`/summary/get-summaries/${id}`);
  return res.data;
}

export async function deleteSummary(id: string) {
  const res = await api.delete(`/summary/delete-summary/${id}`);
  return res.data;
}

export type FilteredSummariesOptions = {
  search?: string;
  platform?: 'discord' | 'telegram' | 'slack';
};

export async function fetchAllSummaries({
  search,
  platform,
}: FilteredSummariesOptions) {
  const res = await api.get<SummaryRes[]>('/summary/all-summaries', {
    params: {
      search,
      platform,
    },
  });

  return res.data;
}
