import SummaryCard from '@/components/card/summary-card';
import PageHeader from '@/components/typography/page-header';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { allSummariesOptions } from '@/utils/queries/summaries';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Inbox, ScrollText } from 'lucide-react';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const summariesSearchSchema = z.object({
  search: z.string().optional(),
  platform: z.enum(['discord', 'telegram', 'slack']).optional(),
});

export const Route = createFileRoute('/_auth/_navbar/dashboard/summaries')({
  validateSearch: (search) => summariesSearchSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  const summaryQuery = useQuery(
    allSummariesOptions({ search: search.search, platform: search.platform })
  );
  const summaries = summaryQuery.data?.data || [];

  const handleSearch = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: value || undefined,
      }),
    });
  };

  const handlePlatformChange = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        platform: (value === 'all' ? undefined : value) as any,
      }),
    });
  };

  return (
    <div>
      <PageHeader
        icon={<ScrollText size={20} />}
        iconLabel="Summaries"
        title="All generated summaries"
        description="Manage all of your generated summaries"
      />

      <Separator className="my-5" />

      <div className="flex items-center w-full gap-5 my-7">
        <Input
          placeholder="Search for summary text, themes or words..."
          defaultValue={search.search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        <Select
          value={search.platform || 'all'}
          onValueChange={handlePlatformChange}
        >
          <SelectTrigger className="w-full md:w-45">
            <SelectValue placeholder="Filter by platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Platforms</SelectItem>
            <SelectItem value="discord">Discord</SelectItem>
            <SelectItem value="slack">Slack</SelectItem>
            <SelectItem value="telegram">Telegram</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {summaryQuery.isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-50 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!summaryQuery.isPending && summaries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-xl border-muted">
          <div className="p-4 bg-muted rounded-full mb-4">
            <Inbox className="h-10 w-10 text-muted-foreground opacity-50" />
          </div>
          <h3 className="text-xl font-semibold">No summaries found</h3>
          <p className="text-muted-foreground max-w-xs text-center">
            You don't have any generated summaries yet.
          </p>
        </div>
      )}

      {!summaryQuery.isPending && summaries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map((summary) => (
            <SummaryCard summary={summary} canDelete />
          ))}
        </div>
      )}
    </div>
  );
}
