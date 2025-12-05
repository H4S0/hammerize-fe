import InitPasswordResetForm from '@/components/forms/auth-forms/init-password-reset-form';
import AuthLayout from '@/components/layout/auth-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/init-forget-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout type="password-reset">
      <InitPasswordResetForm />
    </AuthLayout>
  );
}
