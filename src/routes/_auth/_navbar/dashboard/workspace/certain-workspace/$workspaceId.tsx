import InviteMemberModal from '@/components/modal/invite-member-modal';
import PageHeader from '@/components/typography/page-header';
import { Separator } from '@/components/ui/separator';
import { workspaceByIdOptions } from '@/utils/queries/workspace';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { CirclePlus, Network } from 'lucide-react';

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
      <PageHeader
        icon={<Network size={20} />}
        iconLabel="Workspac"
        title="Manage Your Workspace"
      />

      <div className="mt-10 flex items-center gap-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CirclePlus size={20} />
          <p className="text-2xl font-medium">Invite new members (max 3)</p>
        </div>
        <InviteMemberModal workspaceId={workspaceId} />
      </div>

      <Separator className="my-3" />
    </div>
  );
}
