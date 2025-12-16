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
import { CalendarDays, RectangleEllipsis, ScrollText } from 'lucide-react';
import { Separator } from '../ui/separator';
import SummaryIconCard from '../ui/summary-icon-card';

const SummaryCard = ({ summary }: { summary: SummaryRes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crucial Themes</CardTitle>
        <div className="flex items-center gap-2">
          {summary.crucialThemes.map((theme) => (
            <Badge>{theme}</Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{summary.summaryText}</CardDescription>
        <div className="flex flex-col items-start gap-3 mt-5">
          <CardDescription className="flex items-center gap-2">
            <RectangleEllipsis />
            Crucial Words
          </CardDescription>
          <div className="flex items-center gap-2">
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
      </CardFooter>
    </Card>
  );
};

export default SummaryCard;
