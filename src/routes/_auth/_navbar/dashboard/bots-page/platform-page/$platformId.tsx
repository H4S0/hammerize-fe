import PlatformSettingsCard from '@/components/card/platform-settings-card';
import EditPlatformForm from '@/components/forms/edit-platform-form';
import SummariesPlatformLayout from '@/components/layout/summaries-platform-layout';
import DeletePlatformModal from '@/components/modal/delete-platform-modal';
import PageHeader from '@/components/typography/page-header';
import { Separator } from '@/components/ui/separator';
import { summariesByChatIdOptions } from '@/utils/queries/summaries';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { TextInitial } from 'lucide-react';

export const Route = createFileRoute(
  '/_auth/_navbar/dashboard/bots-page/platform-page/$platformId'
)({
  component: RouteComponent,
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData(
      summariesByChatIdOptions(params.platformId)
    );
  },
});

function RouteComponent() {
  const { platformId } = Route.useParams();
  const summariesQuery = useQuery(summariesByChatIdOptions(platformId));

  console.log('summaries', summariesQuery.data);
  return (
    <div>
      <PageHeader
        icon={<TextInitial size={20} />}
        iconLabel="Platform summaries management"
        title="Manage all of your summaries"
      />

      <Separator className="my-5" />

      <SummariesPlatformLayout>
        <div></div>

        <PlatformSettingsCard
          title="Edit this summary platform"
          form={<EditPlatformForm platformChatId={platformId} />}
          deleteModal={<DeletePlatformModal platformChatId={platformId} />}
        />
      </SummariesPlatformLayout>
    </div>
  );
}
