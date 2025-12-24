import InvitedMemberCard from '@/components/card/invited-member-card';
import MemberCard from '@/components/card/member-card';
import PlatformCard from '@/components/card/platform-card';
import UpdateWorkspaceForm from '@/components/forms/update-workspace-form';
import SummariesPlatformLayout from '@/components/layout/summaries-platform-layout';
import InviteMemberModal from '@/components/modal/invite-member-modal';
import PageHeader from '@/components/typography/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CustomEmptyCard from '@/components/ui/custom-empty-card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/utils/auth/auth';
import { getWorkspaceRole } from '@/utils/helper/get-workspace-role';
import { platformChatsOptions } from '@/utils/queries/platform';
import {
  platformByWorkspaceOptions,
  workspaceByIdOptions,
} from '@/utils/queries/workspace';
import { useQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { CirclePlus, Network, UserPlus } from 'lucide-react';

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/workspace/certain-workspace/$workspaceId/$workspaceId'
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return Promise.all([
      context.queryClient.ensureQueryData(
        workspaceByIdOptions(params.workspaceId)
      ),
      context.queryClient.ensureQueryData(platformChatsOptions),
      context.queryClient.ensureQueryData(
        platformByWorkspaceOptions(params.workspaceId)
      ),
    ]);
  },
});

function RouteComponent() {
  const { workspaceId } = Route.useParams();
  const { user } = useAuth();

  const [workspaceQuery, platformsQuery, platformsByWorkspaceQuery] =
    useQueries({
      queries: [
        workspaceByIdOptions(workspaceId),
        platformChatsOptions,
        platformByWorkspaceOptions(workspaceId),
      ],
    });

  const isLoading =
    workspaceQuery.isLoading ||
    platformsQuery.isLoading ||
    platformsByWorkspaceQuery.isLoading;

  const isError =
    workspaceQuery.isError ||
    platformsQuery.isError ||
    platformsByWorkspaceQuery.isError;

  if (isLoading) {
    return <WorkspaceSkeleton />;
  }

  if (isError || !workspaceQuery.data?.data) {
    return (
      <CustomEmptyCard
        title="Workspace not found"
        description="Unable to load workspace data."
        icon={<Network />}
      />
    );
  }

  const workspace = workspaceQuery.data.data;
  const platforms = platformsQuery.data?.data;
  const platformsByWorkspace = platformsByWorkspaceQuery.data?.data;
  const acceptedMembers =
    workspace.invitedMembers?.filter((m) => m.status === 'accepted') ?? [];
  const notAccepted =
    workspace.invitedMembers?.filter((m) => m.status !== 'accepted') ?? [];
  const userWorkspaceRole = getWorkspaceRole(workspace, user?._id);

  console.log(platformsByWorkspace);

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

        {userWorkspaceRole !== 'member' && (
          <InviteMemberModal workspaceId={workspaceId} />
        )}
      </div>

      <Separator className="my-3" />

      <SummariesPlatformLayout>
        <div className="space-y-3">
          {platformsByWorkspace?.platformChatIds.length === 0 ? (
            <CustomEmptyCard
              title="No platforms connected"
              description="This workspace does not have any platforms yet. Connect a platform to start generating summaries."
              icon={<Network />}
            />
          ) : (
            platformsByWorkspace?.platformChatIds.map((platform) => (
              <PlatformCard
                key={platform._id}
                platformChat={platform}
                workspaceId={workspaceId}
                view
              />
            ))
          )}
        </div>

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
                platformChatIds={workspace.platformChatIds}
                userWorkspaceRole={userWorkspaceRole}
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
                {workspace.memberIds.map((member) => (
                  <MemberCard
                    key={member._id}
                    role={member.role}
                    populatedData={member.id}
                    _id={member._id}
                    workspaceId={workspaceId}
                    userWorkspaceRole={userWorkspaceRole}
                  />
                ))}

                {notAccepted.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <CardDescription className="mb-1">
                      Invited members
                    </CardDescription>
                    {notAccepted.map((invMember) => (
                      <InvitedMemberCard
                        key={invMember._id}
                        member={invMember}
                        workspaceId={workspaceId}
                        userWorkspaceRole={userWorkspaceRole}
                      />
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <CustomEmptyCard
              title="No members yet"
              description="Invite your first teammate to collaborate."
              button={
                userWorkspaceRole !== 'member' ? (
                  <InviteMemberModal workspaceId={workspaceId} />
                ) : null
              }
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
