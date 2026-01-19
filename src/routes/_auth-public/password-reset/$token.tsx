import PasswordResetForm from '@/components/forms/auth-forms/password-reset-form';
import AuthLayout from '@/components/layout/auth-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-public/password-reset/$token')({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = Route.useParams();

  return (
    <AuthLayout type="new-password">
      <PasswordResetForm token={token} />
    </AuthLayout>
  );
}
