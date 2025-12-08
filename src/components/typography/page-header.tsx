import React, { ReactElement } from 'react';

type PageHeaderProps = {
  icon: ReactElement;
  title: string;
  description?: string;
  iconLabel?: string;
};

const PageHeader = ({
  icon,
  title,
  description,
  iconLabel,
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-2 text-primary">
        {icon}
        <p>{iconLabel}</p>
      </div>
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default PageHeader;
