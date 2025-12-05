import RegisterForm from '@/components/forms/auth-forms/register-form';
import AuthLayout from '@/components/layout/auth-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_public/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout type="register">
      <RegisterForm />
    </AuthLayout>
  );
}
