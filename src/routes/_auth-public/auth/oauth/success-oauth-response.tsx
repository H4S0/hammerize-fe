import OAuthStatusCard from '@/components/card/oauth-status-card';
import { UserSchema } from '@/utils/api/user';
import { useAuth } from '@/utils/auth/auth';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import z from 'zod';

const OAuthResSchema = z.object({
  accessToken: z.string(),
  user: UserSchema,
});

export const Route = createFileRoute(
  '/_auth-public/auth/oauth/success-oauth-response'
)({
  component: RouteComponent,
  validateSearch: (search) => {
    const loginRes = OAuthResSchema.safeParse(search);

    if (!loginRes) {
      return null;
    }

    return loginRes.data;
  },
});

function RouteComponent() {
  const { setOAuthUser } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!search?.accessToken || !search.user) return;

    setOAuthUser({
      ...search.user,
      accessToken: search.accessToken,
    });

    navigate({ to: '/dashboard' });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <OAuthStatusCard
        type="success"
        title="Connected Successfully"
        description="Your account has been linked with the provider."
      />
    </div>
  );
}
