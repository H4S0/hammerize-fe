import FormHeaderCard from '@/components/card/form-header-card';
import FormVideoCard from '@/components/card/form-video-card';
import LoginForm from '@/components/forms/auth-forms/login-form';
import { createFileRoute, Link } from '@tanstack/react-router';
export const Route = createFileRoute('/_public/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-10 gap-6">
      <FormVideoCard />

      <div className="md:w-1/2 flex flex-col justify-center items-center">
        <div className="flex flex-col gap-2 w-full max-w-md">
          <FormHeaderCard
            title="Login to your account"
            description="Already have an account?"
            link="/register"
            linkLabel="Sign up"
          />

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
