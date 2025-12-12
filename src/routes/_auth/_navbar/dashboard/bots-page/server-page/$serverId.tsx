import PlatformCard from '@/components/card/platform-card';
import EditServerForm from '@/components/forms/edit-server-form';
import PageHeader from '@/components/typography/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlatformCardSkeleton } from '@/components/ui/platform-card-skeleton';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { serverOptions } from '@/utils/queries/platform';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { ServerCog } from 'lucide-react';

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/bots-page/server-page/$serverId'
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(serverOptions(params.serverId));
  },
});

function RouteComponent() {
  const { serverId } = Route.useParams();
  const serverQuery = useQuery(serverOptions(serverId));

  const { data, isLoading, isError } = serverQuery;

  const server = data?.data?.server;
  const channels = data?.data?.channels ?? [];

  return (
    <div>
      <PageHeader
        icon={<ServerCog size={20} />}
        iconLabel="Server channel management"
        title="Manage Your Channel"
      />

      <Separator className="my-5" />

      {isLoading && (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />

          <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-3 mt-4">
            <div className="flex flex-col gap-3">
              {[...Array(3)].map((_, i) => (
                <PlatformCardSkeleton key={i} />
              ))}
            </div>
            <div>
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      )}

      {isError && (
        <p className="text-red-500 mt-4">Failed to load server data.</p>
      )}

      {!isLoading && !isError && (
        <>
          {!server ? (
            <p className="text-muted-foreground">No server found.</p>
          ) : (
            <div className="mb-4">
              <h2 className="font-semibold text-xl">{server.serverName}</h2>
              <p className="text-muted-foreground">Members: {server.members}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-3">
            <div className="flex flex-col gap-3">
              {channels.length === 0 ? (
                <p className="text-muted-foreground">
                  This server has no channels yet.
                </p>
              ) : (
                channels.map((channel) => (
                  <PlatformCard key={channel._id} platformChat={channel} />
                ))
              )}
            </div>

            <div className="flex flex-col gap-3">
              <Card>
                <CardHeader>
                  <CardTitle>Edit this server</CardTitle>
                </CardHeader>
                <CardContent>
                  <EditServerForm />
                </CardContent>
              </Card>
              <Card>
                <CardContent>delete server goes here</CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
