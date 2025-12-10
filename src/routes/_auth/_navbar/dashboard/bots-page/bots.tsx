import ServerCard from '@/components/card/server-card';
import NewBotSection from '@/components/sections/new-bot-section';
import PageHeader from '@/components/typography/page-header';
import { Badge } from '@/components/ui/badge';
import { platformChatsOptions } from '@/utils/queries/platform';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Bot } from 'lucide-react';

export const Route = createFileRoute('/_auth/_navbar/dashboard/bots-page/bots')({
  component: RouteComponent,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(platformChatsOptions);
  },
});

function RouteComponent() {
  const platformChatQuery = useSuspenseQuery(platformChatsOptions);
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

      <div className="mt-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Discord</h2>
          <Badge>
            {platformChatQuery.data?.data?.servers.length}{' '}
            {platformChatQuery.data?.data?.servers.length > 1
              ? 'servers'
              : 'server'}
          </Badge>
        </div>

        <div className="mt-5">
          {platformChatQuery.data.data?.servers.map((server) => (
            <ServerCard server={server} />
          ))}
        </div>
      </div>
    </div>
  );
}
