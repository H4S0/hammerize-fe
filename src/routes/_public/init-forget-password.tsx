import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/init-forget-password')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_public/init-forget-password"!</div>
}
