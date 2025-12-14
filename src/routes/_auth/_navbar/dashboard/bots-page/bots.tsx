import PlatformCard from '@/components/card/platform-card';
import ServerCard from '@/components/card/server-card';
import LinkBotModal from '@/components/modal/link-bot-modal';
import NewBotSection from '@/components/sections/new-bot-section';
import PageHeader from '@/components/typography/page-header';
import { Badge } from '@/components/ui/badge';
import CustomEmptyCard from '@/components/ui/custom-empty-card';
import { Separator } from '@/components/ui/separator';
import { platformChatsOptions } from '@/utils/queries/platform';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Bot } from 'lucide-react';

export const Route = createFileRoute('/_auth/_navbar/dashboard/bots-page/bots')(
  {
    component: RouteComponent,
    loader: ({ context }) => {
      return context.queryClient.ensureQueryData(platformChatsOptions);
    },
  }
);

function RouteComponent() {
  const platformChatQuery = useSuspenseQuery(platformChatsOptions);
  const { servers = [], others = [] } = platformChatQuery.data?.data || {};

  const discordServerCount = servers.length || 0;
  const otherBotsCount = others.length || 0;
  const hasPlatforms = discordServerCount > 0 || otherBotsCount > 0;

  return (
    <div>
      <PageHeader
        icon={<Bot size={20} />}
        iconLabel="Bot Management"
        title="Manage Your Bots"
        description="Connect platforms and manage bot integrations"
      />

      <NewBotSection />
      <Separator className="my-5" />

      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Discord Integrations</h2>
          <Badge>
            {discordServerCount}{' '}
            {discordServerCount === 1 ? 'server' : 'servers'}
          </Badge>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servers.length > 0 ? (
            servers.map((server) => (
              <ServerCard key={server._id} server={server} />
            ))
          ) : (
            <p className="text-gray-500">No Discord servers connected.</p>
          )}
        </div>
      </div>

      <Separator className="my-5" />

      <div className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Telegram & Slack</h2> 
          <Badge variant="secondary">
            {otherBotsCount} active {otherBotsCount === 1 ? 'chat' : 'chats'}
          </Badge>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {others.length > 0 ? (
            others.map((platformChat) => (
              <PlatformCard
                key={platformChat._id}
                platformChat={platformChat}
              />
            ))
          ) : (
            <p className="text-gray-500">
              No Telegram or Slack chats connected.
            </p>
          )}
        </div>
      </div>
      {!hasPlatforms && (
        <CustomEmptyCard
          title="No platform linked"
          description="Invite you bot and link your first platform, to recive amaizing summaries"
          button={<LinkBotModal />}
        />
      )}
    </div>
  );
}
