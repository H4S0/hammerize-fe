import WorkspaceCard from '@/components/card/workspace-card';
import CreateWorkspaceModal from '@/components/modal/create-workspace-modal';
import PageHeader from '@/components/typography/page-header';
import { Separator } from '@/components/ui/separator';
import { workspacesOptions } from '@/utils/queries/workspace';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { CirclePlus, Network, Inbox } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const Route = createFileRoute('/_auth/_navbar/dashboard/workspace/')({
  component: RouteComponent,
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(workspacesOptions);
  },
});

function RouteComponent() {
  const { data, isPending, isError } = useQuery(workspacesOptions);
  const workspaces = data?.data || [];

  return (
    <div className="container mx-auto pb-10">
      <PageHeader
        icon={<Network size={20} />}
        iconLabel="Workspace"
        title="Manage Your Workspaces"
        description="Add new platforms to your workspace, manage members, and control privacy."
      />

      <div className="mt-10 flex items-center gap-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CirclePlus size={20} />
          <p className="text-2xl font-medium">Create new workspace</p>
        </div>
        <Separator orientation="vertical" className="h-8" />
        <CreateWorkspaceModal />
      </div>

      <Separator className="my-5" />

      {isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-50 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!isPending && workspaces.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl border-muted">
          <div className="p-4 bg-muted rounded-full mb-4">
            <Inbox className="h-10 w-10 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-xl font-semibold">No workspaces found</h3>
          <p className="text-muted-foreground max-w-xs text-center">
            You don't have any workspaces yet. Click the plus button above to
            create your first one.
          </p>
        </div>
      )}

      {!isPending && workspaces.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace._id} workspace={workspace} />
          ))}
        </div>
      )}
    </div>
  );
}
