import { api } from '../axios-config/axios';

type SummaryRes = {
  _id: string;
  chatId: string;
  summaryText: string;
  messageCount: number;
  createdAt: Date;
};

export async function fetchSummariesByPlatformChatId(id: string) {
  const res = await api.get<SummaryRes[]>(`/summary/get-summaries/${id}`);
  return res.data;
}
