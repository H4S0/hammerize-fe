import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_public/auth/oauth/success-oauth-response',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/auth/oauth/success-oauth-response"!</div>
}
