import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/bots-page/platform-page/$platformId'
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_auth/_navbar/dashboard/bots-page/platform-page/$platformId"!
    </div>
  );
}
