import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/_navbar/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/_navbar/dashboard/"!</div>
}
