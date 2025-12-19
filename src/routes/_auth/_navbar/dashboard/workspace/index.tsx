import CreateWorkspaceModal from '@/components/modal/create-workspace-modal';
import PageHeader from '@/components/typography/page-header';
import { Separator } from '@/components/ui/separator';
import { createFileRoute } from '@tanstack/react-router';
import { CirclePlus, Network } from 'lucide-react';

export const Route = createFileRoute('/_auth/_navbar/dashboard/workspace/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader
        icon={<Network size={20} />}
        iconLabel="Workspace"
        title="Manage Your Workspaces"
        description="Add new platforms to you workspace, same as new members, also you can remove both of them"
      />

      <div className="mt-10 flex items-center gap-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <CirclePlus size={20} />
          <p className="text-2xl"> Create new workspace</p>
        </div>
        <Separator orientation="vertical" className="py-3" />
        <CreateWorkspaceModal />
      </div>

      <Separator className="my-5" />
    </div>
  );
}
