import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type PlatformSettingsCardProps = {
  title: string;
  form: ReactNode;
  deleteModal: ReactNode;
};

const PlatformSettingsCard = ({
  title,
  form,
  deleteModal,
}: PlatformSettingsCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>

        <CardContent>{form}</CardContent>
      </Card>
      {deleteModal}
    </div>
  );
};

export default PlatformSettingsCard;
