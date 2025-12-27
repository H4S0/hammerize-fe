import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Inbox, ScrollText, X, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useDebounce } from 'use-debounce';
import SummaryCard from '@/components/card/summary-card';
import PageHeader from '@/components/typography/page-header';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { allSummariesOptions } from '@/utils/queries/summaries';
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
  const searchParams = Route.useSearch();
  const navigate = Route.useNavigate();
  const [localSearch, setLocalSearch] = useState(searchParams.search || '');
  const [debouncedSearch] = useDebounce(localSearch, 400);

  useEffect(() => {
    navigate({
      search: (prev) => ({
        ...prev,
        search: debouncedSearch || undefined,
      }),
      replace: true,
    });
  }, [debouncedSearch, navigate]);

  const summaryQuery = useQuery({
    ...allSummariesOptions({
      search: searchParams.search,
      platform: searchParams.platform,
    }),
    placeholderData: (prev) => prev,
  });

  const summaries = summaryQuery.data?.data || [];

  const handlePlatformChange = (value: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        platform: value === 'all' ? undefined : (value as any),
      }),
    });
  };

  return (
    <div className="container mx-auto pb-10">
      <PageHeader
        icon={<ScrollText size={20} />}
        iconLabel="Summaries"
        title="All generated summaries"
        description="Search through your digital brain and filter by platform."
      />

      <Separator className="my-5" />

      <div className="flex flex-col md:flex-row items-center w-full gap-4 my-7">
        <div className="relative w-full">
          <Input
            placeholder="Search for summary text, themes or words..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pr-10 h-11"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <Select
          value={searchParams.platform || 'all'}
          onValueChange={handlePlatformChange}
        >
          <SelectTrigger className="w-full md:w-56 h-11">
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

      {/* Indikator učitavanja (samo kada se radi tihi refetch) */}
      <div className="h-6 mb-2 flex items-center">
        {summaryQuery.isFetching && !summaryQuery.isPending && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground animate-in fade-in">
            <Loader2 size={14} className="animate-spin" />
            Updating results...
          </div>
        )}
      </div>

      {summaryQuery.isPending && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
        </div>
      )}

      {!summaryQuery.isPending && summaries.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed rounded-3xl border-muted bg-muted/20 animate-in zoom-in-95 duration-300">
          <div className="p-5 bg-muted rounded-full mb-4">
            <Inbox className="h-12 w-12 text-muted-foreground opacity-40" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            No summaries found
          </h3>
          <p className="text-muted-foreground max-w-sm text-center mt-2 px-4">
            We couldn't find any summaries matching your current search or
            filters. Try adjusting your keywords.
          </p>
          {(localSearch || searchParams.platform) && (
            <button
              onClick={() => {
                setLocalSearch('');
                handlePlatformChange('all');
              }}
              className="mt-6 text-sm font-medium text-primary hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}

      {!summaryQuery.isPending && summaries.length > 0 && (
        <div className="grid grid-cols-1 animate-in fade-in duration-500">
          {summaries.map((summary) => (
            <SummaryCard key={summary._id} summary={summary} canDelete />
          ))}
        </div>
      )}
    </div>
  );
}
