import NewBotSection from '@/components/sections/new-bot-section';
import PageHeader from '@/components/typography/page-header';
import { platformChatsOptions } from '@/utils/queries/platform';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Bot } from 'lucide-react';

export const Route = createFileRoute('/_auth/_navbar/dashboard/bots')({
  component: RouteComponent,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(platformChatsOptions);
  },
});

function RouteComponent() {
  const platformChatQuery = useQuery(platformChatsOptions);
  console.log(platformChatQuery.data?.data);
  return (
    <div>
      <PageHeader
        icon={<Bot size={20} />}
        iconLabel="Bot Management"
        title="Manage Your Bots"
        description="Connect platforms and manage bot integrations"
      />

      <NewBotSection />
    </div>
  );
}
