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
    loader: ({ context }) =>
      context.queryClient.ensureQueryData(platformChatsOptions),
  }
);

function RouteComponent() {
  const { data } = useSuspenseQuery(platformChatsOptions);

  const servers = data?.data?.servers ?? [];
  const others = data?.data?.others ?? [];

  const discordServerCount = servers.length;
  const otherBotsCount = others.length;

  const hasAnyPlatforms = discordServerCount > 0 || otherBotsCount > 0;

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

      <section className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Discord Integrations</h2>
          <Badge>
            {discordServerCount}{' '}
            {discordServerCount === 1 ? 'server' : 'servers'}
          </Badge>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {discordServerCount > 0 ? (
            servers.map((server) => (
              <ServerCard key={server._id} server={server} />
            ))
          ) : (
            <EmptyText>No Discord servers connected.</EmptyText>
          )}
        </div>
      </section>

      <Separator className="my-5" />

      <section className="mb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold">Telegram & Slack</h2>
          <Badge variant="secondary">
            {otherBotsCount} active {otherBotsCount === 1 ? 'chat' : 'chats'}
          </Badge>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {otherBotsCount > 0 ? (
            others.map((platformChat) => (
              <PlatformCard
                key={platformChat._id}
                platformChat={platformChat}
                canManage
              />
            ))
          ) : (
            <EmptyText>No Telegram or Slack chats connected.</EmptyText>
          )}
        </div>
      </section>

      {!hasAnyPlatforms && (
        <CustomEmptyCard
          title="No platform linked"
          description="Invite your bot and link your first platform to receive amazing summaries."
          button={<LinkBotModal />}
        />
      )}
    </div>
  );
}

function EmptyText({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-500">{children}</p>;
}
