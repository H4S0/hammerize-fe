import React, { ReactNode } from 'react';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Button } from './button';

type CustomEmptyCardProps = {
  title: string;
  description: string;
  button?: ReactNode;
  icon?: ReactNode;
};

const CustomEmptyCard = ({
  icon,
  title,
  description,
  button,
}: CustomEmptyCardProps) => {
  return (
    <Empty className="border">
      <EmptyHeader>
        {icon && <EmptyMedia variant="icon">{icon}</EmptyMedia>}
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{description}</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{button && button}</EmptyContent>
    </Empty>
  );
};

export default CustomEmptyCard;
