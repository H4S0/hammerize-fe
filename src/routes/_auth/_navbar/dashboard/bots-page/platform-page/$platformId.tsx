import PlatformSettingsCard from '@/components/card/platform-settings-card';
import EditPlatformForm from '@/components/forms/edit-platform-form';
import SummariesPlatformLayout from '@/components/layout/summaries-platform-layout';
import DeletePlatformModal from '@/components/modal/delete-platform-modal';
import ErrorParagraph from '@/components/typography/error-paragraph';
import PageHeader from '@/components/typography/page-header';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { platformChatOptions } from '@/utils/queries/platform';
import { summariesByChatIdOptions } from '@/utils/queries/summaries';
import { useQueries, useSuspenseQueries } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TextInitial } from 'lucide-react';

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/bots-page/platform-page/$platformId'
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return Promise.all([
      context.queryClient.ensureQueryData(
        summariesByChatIdOptions(params.platformId)
      ),
      context.queryClient.ensureQueryData(
        platformChatOptions(params.platformId)
      ),
    ]);
  },
});

function RouteComponent() {
  const { platformId } = Route.useParams();

  const [summariesQuery, platformChatQuery] = useSuspenseQueries({
    queries: [
      summariesByChatIdOptions(platformId),
      platformChatOptions(platformId),
    ],
  });

  const isLoading = summariesQuery.isLoading || platformChatQuery.isLoading;

  const isError = summariesQuery.isError || platformChatQuery.isError;

  const platformChat = platformChatQuery.data?.data;
  const summaries = summariesQuery.data?.data ?? [];

  return (
    <div>
      <PageHeader
        icon={<TextInitial size={20} />}
        iconLabel="Platform summaries management"
        title="Manage all of your summaries"
      />

      <Separator className="my-5" />

      {isLoading && (
        <SummariesPlatformLayout>
          <div className="flex flex-col gap-3">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-32 w-full" />
          </div>

          <Skeleton className="h-40 w-full" />
        </SummariesPlatformLayout>
      )}

      {isError && <ErrorParagraph text="Failed to load platform data" />}

      {!isLoading && !isError && !platformChat && (
        <ErrorParagraph text="Platform not found" />
      )}

      {!isLoading && !isError && platformChat && (
        <SummariesPlatformLayout>
          <div>
            {summaries.length === 0 ? (
              <p className="text-muted-foreground">
                No summaries yet for this platform.
              </p>
            ) : (
              <div>summaries data goes here</div>
            )}
          </div>

          <PlatformSettingsCard
            title="Edit this summary platform"
            form={<EditPlatformForm platformData={platformChat} />}
            deleteModal={
              <DeletePlatformModal platformChatId={platformChat._id} />
            }
          />
        </SummariesPlatformLayout>
      )}
    </div>
  );
}
