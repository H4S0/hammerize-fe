import OAuthStatusCard from '@/components/card/oauth-status-card';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

const OAuthErrorSearchSchema = z.object({
  message: z.string().optional(),
});

export const Route = createFileRoute(
  '/_auth-public/auth/oauth/error-oauth-response'
)({
  component: RouteComponent,
  validateSearch: (search) => {
    const validationResult = OAuthErrorSearchSchema.safeParse(search);

    if (!validationResult.success) {
      return { message: 'Unknown error occurred during OAuth process.' };
    }

    return validationResult.data;
  },
});

function RouteComponent() {
  const search = Route.useSearch();

  const title = 'Authentication Failed';
  const description =
    search.message ||
    'We could not link your account with the external provider. Please try logging in with your email or contact support.';

  return (
    <div className="flex items-center justify-center min-h-screen">
      <OAuthStatusCard title={title} description={description} type="fail" />
    </div>
  );
}
