import PageHeader from '@/components/typography/page-header';
import { createFileRoute } from '@tanstack/react-router';
import { Bot } from 'lucide-react';

export const Route = createFileRoute('/_auth/_navbar/dashboard/bots')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader
        icon={<Bot size={20} />}
        iconLabel="Bot Management"
        title="Manage Your Bots"
        description="Connect platforms and manage bot integrations"
      />
    </div>
  );
}
