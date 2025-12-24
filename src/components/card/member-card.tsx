import {
  PopulatedMemberIds,
  removeMemberFromWorkspace,
  Role,
} from '@/utils/api/workspace';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';
import { isApiResponse } from '@/utils/axios-config/axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

type MemberCardProps = {
  populatedData: PopulatedMemberIds;
  _id: string;
  role: Role;
  userWorkspaceRole: Role;
  workspaceId: string;
};

const MemberCard = ({
  populatedData,
  role,
  _id,
  userWorkspaceRole,
  workspaceId,
}: MemberCardProps) => {
  const queryClient = useQueryClient();

  return (
    <Card>
      <CardContent className="py-2 flex flex-row justify-between items-center px-2">
        <div className="flex flex-col items-start gap-1">
          <CardTitle>{populatedData.email}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </div>
        <div className="flex items-center gap-1">
          {userWorkspaceRole === 'admin' && (
            <Button
              variant="destructive"
              size="sm"
              onClick={async () => {
                try {
                  const res = await removeMemberFromWorkspace(_id);
                  toast.success(res.message);
                  queryClient.invalidateQueries({
                    queryKey: ['workspace', workspaceId],
                  });
                } catch (err) {
                  if (isApiResponse(err)) {
                    const apiError = err;

                    toast.error(
                      apiError.message ||
                        'Something went wrong please try again'
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
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
