import SummaryCard from '@/components/card/summary-card';
import SummariesPlatformLayout from '@/components/layout/summaries-platform-layout';
import PageHeader from '@/components/typography/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { workspaceSummariesByPlatform } from '@/utils/queries/workspace';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TextInitial } from 'lucide-react';

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/workspace/certain-workspace/$workspaceId/platform/$platformId'
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      workspaceSummariesByPlatform(params.workspaceId, params.platformId)
    );
  },
});

function RouteComponent() {
  const { workspaceId, platformId } = Route.useParams();

  const summariesQuery = useQuery(
    workspaceSummariesByPlatform(workspaceId, platformId)
  );

  if (summariesQuery.isPending) {
    return (
      <div className="p-6 text-muted-foreground">Loading platform data...</div>
    );
  }

  if (summariesQuery.isError) {
    return (
      <div className="p-6 text-destructive">
        Failed to load platform. Please try again later.
      </div>
    );
  }

  const platform = summariesQuery.data?.data?.platform;
  const summaries = summariesQuery.data?.data?.summaries ?? [];

  if (!platform) {
    return <div className="p-6 text-muted-foreground">Platform not found.</div>;
  }

  return (
    <div>
      <PageHeader
        icon={<TextInitial size={20} />}
        iconLabel="Workspace / Platform"
        title="Manage Your Platform"
      />

      <Separator className="my-3" />

      <SummariesPlatformLayout>
        <div className="flex flex-col gap-3">
          {summaries.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No summaries yet for this platform.
            </p>
          ) : (
            summaries.map((summary) => (
              <SummaryCard key={summary._id} summary={summary} />
            ))
          )}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {platform.chatName}

              <span
                className={`text-xs px-2 py-1 rounded-md ${
                  platform.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {platform.isActive ? 'Active' : 'Inactive'}
              </span>
            </CardTitle>

            <CardDescription>{platform.platform}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Summary mode:</span>{' '}
              {platform.summaryMode}
            </div>

            <div>
              <span className="text-muted-foreground">Total summaries:</span>{' '}
              {platform.summariesCount}
            </div>

            <div>
              <span className="text-muted-foreground">Last processed:</span>{' '}
              {platform.lastProcessAt
                ? new Date(platform.lastProcessAt).toLocaleString()
                : 'Never'}
            </div>
          </CardContent>
        </Card>
      </SummariesPlatformLayout>
    </div>
  );
}
