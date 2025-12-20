import { WorkspaceRes } from '@/utils/api/workspace';
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';

const WorkspaceCard = ({ workspace }: { workspace: WorkspaceRes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{workspace.name}</CardTitle>
        <CardDescription>{workspace.name}</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default WorkspaceCard;
