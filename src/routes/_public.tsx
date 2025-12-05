import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_public')({
  loader({ context }) {
    if (context.auth?.isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  },
});
