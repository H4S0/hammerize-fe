import { WorkspaceRes } from '@/utils/api/workspace';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Folder, Users } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Link } from '@tanstack/react-router';

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceRes }) => {
  return (
    <Link
      to="/dashboard/workspace/certain-workspace/$workspaceId"
      params={{ workspaceId: workspace._id }}
    >
      <Card className="hover:border-primary">
        <CardHeader>
          <CardTitle>{workspace.name}</CardTitle>
          <CardDescription>{workspace.description}</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Users size={15} /> {workspace.memberIds.length}
            </div>
            <Separator orientation="vertical" className="py-3" />
            <div className="flex items-center gap-2 text-sm">
              <Folder size={15} /> {workspace.platformChatIds.length}
            </div>
            <Separator orientation="vertical" className="py-3" />
            <CardDescription>
              Owner: {workspace.ownerId.username}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default WorkspaceCard;
