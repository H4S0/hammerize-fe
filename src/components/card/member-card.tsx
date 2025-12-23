import { PopulatedMemberIds, Role } from '@/utils/api/workspace';
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

type MemberCardProps = {
  populatedData: PopulatedMemberIds;
  _id: string;
  role: Role;
  userWorkspaceRole: Role;
};

const MemberCard = ({
  populatedData,
  role,
  _id,
  userWorkspaceRole,
}: MemberCardProps) => {
  return (
    <Card>
      <CardContent className="py-2 flex flex-row justify-between items-center px-2">
        <div className="flex flex-col items-start gap-1">
          <CardTitle>{populatedData.email}</CardTitle>
          <CardDescription>{role}</CardDescription>
        </div>
        <div className="flex items-center gap-1">
          {userWorkspaceRole === 'admin' && (
            <Button variant="destructive" size="sm">
              <Trash2 />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
