import { cancleInvitation, InvitedMembers } from '@/utils/api/workspace';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { isApiResponse } from '@/utils/axios-config/axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

const InvitedMemberCard = ({
  member,
  workspaceId,
}: {
  member: InvitedMembers;
  workspaceId: string;
}) => {
  const queryClient = useQueryClient();
  return (
    <Card>
      <CardContent className="py-2 flex flex-row justify-between items-center px-2">
        <div className="flex flex-col items-start gap-1">
          <CardTitle>{member.email}</CardTitle>
          <div className="flex items-center gap-2">
            <CardDescription>{member.role}</CardDescription>
            <CardDescription>
              {new Date(member.createdAt).toLocaleDateString()}
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge
            variant={
              member.status === 'pending'
                ? 'outline'
                : member.status === 'accepted'
                  ? 'default'
                  : 'destructive'
            }
          >
            {member.status}
          </Badge>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => {
              try {
                const res = await cancleInvitation(member._id);
                toast.success(res.message);
                queryClient.invalidateQueries({
                  queryKey: ['workspace', workspaceId],
                });
              } catch (err) {
                if (isApiResponse(err)) {
                  const apiError = err;

                  toast.error(
                    apiError.message || 'Something went wrong please try again'
                  );
                } else {
                  toast.error(
                    'Something went wrong please,check your connection'
                  );
                }
              }
            }}
          >
            <Trash2 />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvitedMemberCard;
