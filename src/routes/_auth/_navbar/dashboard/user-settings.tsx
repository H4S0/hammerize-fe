import UpdateEmailForm from '@/components/forms/user-update-forms/update-email-form';
import UpdatePasswordForm from '@/components/forms/user-update-forms/update-password-form';
import UpdateUsernameForm from '@/components/forms/user-update-forms/update-username-form';
import PageHeader from '@/components/typography/page-header';
import { Separator } from '@/components/ui/separator';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { UserCog } from 'lucide-react';

export const Route = createFileRoute('/_auth/_navbar/dashboard/user-settings')({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.auth?.user) {
      throw redirect({ to: '/login' });
    }

    return context.auth.user;
  },
});

function RouteComponent() {
  const user = Route.useLoaderData();

  return (
    <div>
      <PageHeader
        icon={<UserCog size={20} />}
        iconLabel="User settings"
        title="Main user profile settings"
        description="Update your username, email etc..Also view what platform do you connect (discord, google)"
      />

      <Separator className="my-3" />

      <div className="grid grid-cols-1 gap-4 max-w-2xl">
        <UpdateUsernameForm username={user.username} />
        <UpdateEmailForm />
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
