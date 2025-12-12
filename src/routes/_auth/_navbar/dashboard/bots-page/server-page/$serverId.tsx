import { serverOptions } from '@/utils/queries/platform';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

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
  const serverQueryData = useQuery(serverOptions(serverId));

  console.log(serverQueryData.data);

  return <div>Hello "/_auth/_navbar/dashboard/bots-page/$serverId"!</div>;
}
