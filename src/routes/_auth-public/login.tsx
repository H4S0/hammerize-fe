import LoginForm from '@/components/forms/auth-forms/login-form';
import AuthLayout from '@/components/layout/auth-layout';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth-public/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthLayout type="login">
      <LoginForm />
    </AuthLayout>
  );
}
