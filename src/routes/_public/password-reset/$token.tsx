import PasswordResetForm from '@/components/forms/auth-forms/password-reset-form';
import AuthLayout from '@/components/layout/auth-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/password-reset/$token')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout type="new-password">
      <PasswordResetForm />
    </AuthLayout>
  );
}
