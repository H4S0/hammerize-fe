import UpdateEmailForm from '@/components/forms/user-update-forms/update-email-form';
import UpdateUsernameForm from '@/components/forms/user-update-forms/update-username-form';
import PageHeader from '@/components/typography/page-header';
import { Separator } from '@/components/ui/separator';
import { createFileRoute } from '@tanstack/react-router';
import { UserCog } from 'lucide-react';

export const Route = createFileRoute('/_auth/_navbar/dashboard/user-settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <PageHeader
        icon={<UserCog size={20} />}
        iconLabel="Summaries"
        title="All generated summaries"
        description="Search through your digital brain and filter by platform."
      />

      <Separator className="my-3" />

      <div className="grid grid-cols-1 gap-4 max-w-2xl">
        <UpdateUsernameForm />
        <UpdateEmailForm />
      </div>
    </div>
  );
}
