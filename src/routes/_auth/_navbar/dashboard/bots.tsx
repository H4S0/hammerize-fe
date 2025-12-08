import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_navbar/dashboard/bots')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/_navbar/dashboard/bots"!</div>
}
