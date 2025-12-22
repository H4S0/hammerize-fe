import { workspaceByIdOptions } from '@/utils/queries/workspace';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/workspace/certain-workspace/$workspaceId'
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      workspaceByIdOptions(params.workspaceId)
    );
  },
});

function RouteComponent() {
  const { workspaceId } = Route.useParams();
  const workspaceQuery = useQuery(workspaceByIdOptions(workspaceId));

  return (
    <div>
      Hello "/_auth/_navbar/dashboard/workspace/certain-workspace/$workspaceId"!
    </div>
  );
}
