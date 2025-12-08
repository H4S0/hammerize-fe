import OAuthStatusCard from '@/components/card/oauth-status-card';
import { UserSchema } from '@/utils/api/user';
import { useAuth } from '@/utils/auth/auth';
import { setStoredUser } from '@/utils/auth/auth-storage';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { BadgeCheck } from 'lucide-react';
import { useEffect } from 'react';

export const Route = createFileRoute(
  '/_public/auth/oauth/success-oauth-response'
)({
  component: RouteComponent,
  validateSearch: (search) => {
    const loginRes = UserSchema.safeParse(search);

    if (!loginRes) {
      return null;
    }

    return loginRes.data;
  },
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!search?.accessToken || !search._id) {
      return;
    }

    setStoredUser(search);
    navigate({ to: '/dashboard' });
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen">
      <OAuthStatusCard
        title="Connected Successfully"
        description="Your account has been linked with the provider."
      />
    </div>
  );
}
