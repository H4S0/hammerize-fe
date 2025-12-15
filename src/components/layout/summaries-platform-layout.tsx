import React, { ReactNode } from 'react';

const SummariesPlatformLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-3">
      {children}
    </div>
  );
};

export default SummariesPlatformLayout;
