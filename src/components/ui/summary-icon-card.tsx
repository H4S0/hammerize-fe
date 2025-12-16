import React, { ReactNode } from 'react';

type SummaryIconCardProps = {
  icon: ReactNode;
  text: string;
};

const SummaryIconCard = ({ icon, text }: SummaryIconCardProps) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-xs font-semibold">{text}</p>
    </div>
  );
};

export default SummaryIconCard;
