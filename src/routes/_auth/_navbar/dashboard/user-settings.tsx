import EmailMethods from '@/components/forms/user-update-forms/email-methods';
import UpdatePasswordForm from '@/components/forms/user-update-forms/update-password-form';
import UpdateUsernameForm from '@/components/forms/user-update-forms/update-username-form';
import PageHeader from '@/components/typography/page-header';
import { Separator } from '@/components/ui/separator';
import { userInfoQueryOptions } from '@/utils/queries/user';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { UserCog } from 'lucide-react';

export const Route = createFileRoute('/_auth/_navbar/dashboard/user-settings')({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.auth?.user) {
      throw redirect({ to: '/login' });
    }

    return context.queryClient.ensureQueryData(userInfoQueryOptions);
  },
});

function RouteComponent() {
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery(userInfoQueryOptions);

  if (isPending) {
    return (
      <div>
        <PageHeader
          icon={<UserCog size={20} />}
          iconLabel="User settings"
          title="Main user profile settings"
          description="Update your username, email etc..Also view what platform do you connect (discord, google)"
        />

        <Separator className="my-3" />
        <UserSettingsSkeleton />
      </div>
    );
  }

  if (isError || !user.data) {
    return (
      <div className="text-destructive">
        Failed to load user settings
        {error instanceof Error && (
          <p className="text-sm mt-1">{error.message}</p>
        )}
      </div>
    );
  }

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
        <UpdateUsernameForm username={user.data.username} />
        <EmailMethods
          currentEmail={user.data.email}
          provider={user.data.provider}
        />
        {!user.data.provider && <UpdatePasswordForm />}
      </div>
    </div>
  );
}

function UserSettingsSkeleton() {
  return (
    <div className="space-y-4 max-w-2xl">
      <div className="h-6 w-48 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
      <div className="h-32 bg-muted rounded" />
    </div>
  );
}
