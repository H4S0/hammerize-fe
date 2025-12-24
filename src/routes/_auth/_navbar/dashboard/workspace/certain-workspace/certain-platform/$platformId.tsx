import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/workspace/certain-workspace/certain-platform/$platformId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello
      "/_auth/_navbar/dashboard/workspace/certain-workspace/certain-platform/$platformId"!
    </div>
  )
}
