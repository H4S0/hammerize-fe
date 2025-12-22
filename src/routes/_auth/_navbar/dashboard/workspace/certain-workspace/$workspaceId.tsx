import InvitedMemberCard from '@/components/card/invited-member-card';
import SummariesPlatformLayout from '@/components/layout/summaries-platform-layout';
import InviteMemberModal from '@/components/modal/invite-member-modal';
import PageHeader from '@/components/typography/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomEmptyCard from '@/components/ui/custom-empty-card';
import { Separator } from '@/components/ui/separator';
import { workspaceByIdOptions } from '@/utils/queries/workspace';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { CirclePlus, Network, UserPlus } from 'lucide-react';

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

  const acceptedMembers = workspaceQuery.data?.data?.invitedMembers.filter(
    (m) => m.status === 'accepted'
  );

  console.log(workspaceQuery.data?.data);
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

      <SummariesPlatformLayout>
        <div>left</div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="px-3 py-3">Workspace settings</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
          </Card>
          {workspaceQuery.data?.data?.invitedMembers.length > 0 ? (
            <Card>
              <CardHeader className="px-3 py-3">
                <CardTitle>
                  Members limit ({acceptedMembers?.length}/3)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                {workspaceQuery.data?.data?.invitedMembers.map((invMember) => (
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
              title="No platform linked"
              description="Invite you bot and link your first platform, to recive amaizing summaries"
              button={<InviteMemberModal workspaceId={workspaceId} />}
              icon={<UserPlus />}
            />
          )}
        </div>
      </SummariesPlatformLayout>
    </div>
  );
}
