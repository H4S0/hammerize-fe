import { SummaryRes } from '@/utils/api/summary';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import {
  CalendarDays,
  Lightbulb,
  RectangleEllipsis,
  ScrollText,
  Tags,
} from 'lucide-react';
import { Separator } from '../ui/separator';
import SummaryIconCard from '../ui/summary-icon-card';
import SummaryActionDropdown from '../dropdown/summary-action-dropdown';
import ViewSummaryMentionsModal from '../modal/view-summary-mentions-modal';

type SummaryCardProps = {
  summary: SummaryRes;
  canDelete?: boolean;
};

const SummaryCard = ({ summary, canDelete }: SummaryCardProps) => {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex flex-col items-start gap-3">
          <CardTitle className="flex items-center gap-2 font-normal">
            <Lightbulb />
            Crucial Themes
          </CardTitle>
          <div className="flex items-center flex-wrap gap-2">
            {summary.crucialThemes.map((theme) => (
              <Badge>{theme}</Badge>
            ))}
          </div>
        </div>

        <SummaryActionDropdown
          summaryId={summary._id}
          chatId={summary.chatId}
          canDelete={canDelete}
        />
      </CardHeader>
      <CardContent>
        <CardDescription>{summary.summaryText}</CardDescription>
        <div className="flex flex-col items-start gap-3 mt-5">
          <CardDescription className="flex items-center gap-2 text-white">
            <RectangleEllipsis />
            Crucial Words
          </CardDescription>
          <div className="flex items-center flex-wrap gap-2">
            {summary.crucialWords.map((word) => (
              <Badge variant="outline">{word}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <SummaryIconCard
          icon={<ScrollText size={17} />}
          text={`${summary.messageCount} messages`}
        />
        <Separator orientation="vertical" className="py-2" />

        <SummaryIconCard
          icon={<CalendarDays size={17} />}
          text={new Date(summary.createdAt).toUTCString()}
        />
        <Separator orientation="vertical" className="py-2" />

        <ViewSummaryMentionsModal
          taskAssignment={summary.taskAssignment}
          mentions={summary.mentions}
        />
      </CardFooter>
    </Card>
  );
};

export default SummaryCard;
