import InvitedMemberCard from '@/components/card/invited-member-card';
import UpdateWorkspaceForm from '@/components/forms/update-workspace-form';
import SummariesPlatformLayout from '@/components/layout/summaries-platform-layout';
import InviteMemberModal from '@/components/modal/invite-member-modal';
import PageHeader from '@/components/typography/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomEmptyCard from '@/components/ui/custom-empty-card';
import { Separator } from '@/components/ui/separator';
import { platformChatsOptions } from '@/utils/queries/platform';
import { workspaceByIdOptions } from '@/utils/queries/workspace';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { CirclePlus, Network, UserPlus } from 'lucide-react';

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/workspace/certain-workspace/$workspaceId'
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return Promise.all([
      context.queryClient.ensureQueryData(
        workspaceByIdOptions(params.workspaceId)
      ),
      context.queryClient.ensureQueryData(platformChatsOptions),
    ]);
  },
});

function RouteComponent() {
  const { workspaceId } = Route.useParams();

  const {
    data: workspaceRes,
    isLoading: isWorkspaceLoading,
    isError: isWorkspaceError,
  } = useQuery(workspaceByIdOptions(workspaceId));

  const { data: platformsRes, isLoading: isPlatformsLoading } =
    useQuery(platformChatsOptions);

  if (isWorkspaceLoading || isPlatformsLoading) {
    return <WorkspaceSkeleton />;
  }

  if (isWorkspaceError || !workspaceRes?.data) {
    return (
      <CustomEmptyCard
        title="Workspace not found"
        description="Unable to load workspace data."
        icon={<Network />}
      />
    );
  }

  const workspace = workspaceRes.data;
  const platforms = platformsRes?.data;
  const acceptedMembers =
    workspace.invitedMembers?.filter((m) => m.status === 'accepted') ?? [];

  return (
    <div>
      <PageHeader
        icon={<Network size={20} />}
        iconLabel="Workspace"
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

      <SummariesPlatformLayout>
        <div>left</div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="px-3 py-3">
              <CardTitle>Workspace settings</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <UpdateWorkspaceForm
                workspaceId={workspaceId}
                name={workspace.name}
                description={workspace.description}
                platforms={platforms?.others ?? []}
                platformChatIds={workspace.platformChatIds.map((p) => p)}
              />
            </CardContent>
          </Card>

          {workspace.invitedMembers.length > 0 ? (
            <Card>
              <CardHeader className="px-3 py-3">
                <CardTitle>
                  Members limit ({acceptedMembers.length}/3)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                {workspace.invitedMembers.map((invMember) => (
                  <InvitedMemberCard
                    key={invMember._id}
                    member={invMember}
                    workspaceId={workspaceId}
                  />
                ))}
              </CardContent>
            </Card>
          ) : (
            <CustomEmptyCard
              title="No members yet"
              description="Invite your first teammate to collaborate."
              button={<InviteMemberModal workspaceId={workspaceId} />}
              icon={<UserPlus />}
            />
          )}
        </div>
      </SummariesPlatformLayout>
    </div>
  );
}

function WorkspaceSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-64 bg-muted rounded-md animate-pulse" />
      <div className="h-48 bg-muted rounded-xl animate-pulse" />
      <div className="h-48 bg-muted rounded-xl animate-pulse" />
    </div>
  );
}
