import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_public/auth/oauth/error-oatuh-response',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/auth/oauth/error-oatuh-response"!</div>
}
