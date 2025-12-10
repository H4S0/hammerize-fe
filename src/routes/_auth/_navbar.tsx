import DashboardMainNavbar from '@/components/navbar/dashboard-main-navbar';
import DashboardTopNavbar from '@/components/navbar/dashboard-top-navbar';
import { Separator } from '@/components/ui/separator';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_auth/_navbar')({
  component: RouteComponent,
  loader: ({ context }) => {
    if (!context.auth?.user) {
      throw redirect({ to: '/login' });
    }
    return context.auth.user;
  },
});

function RouteComponent() {
  const ctx = Route.useLoaderData();

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full bg-muted/30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto w-full px-2 sm:px-5 lg:px-2">
          <DashboardTopNavbar />
        </div>
      </div>

      <Separator className="w-full" />

      <div className="w-full bg-muted/30 backdrop-blur-md">
        <div className="max-w-5xl mx-auto w-full px-2 sm:px-5 lg:px-2">
          <DashboardMainNavbar />
        </div>
      </div>

      <Separator className="w-full" />

      <div className="max-w-5xl mx-auto w-full mt-6 px-2 sm:px-5 lg:px-2 flex-1">
        <Outlet />
      </div>
    </div>
  );
}
