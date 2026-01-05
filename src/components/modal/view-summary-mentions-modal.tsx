import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SummaryIconCard from '../ui/summary-icon-card';
import { Tags } from 'lucide-react';
import { TaskAssignmentProps } from '@/utils/api/summary';
import { Button } from '../ui/button';
import CustomEmptyCard from '../ui/custom-empty-card';
import { Card, CardContent, CardDescription, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

type ViewSummaryMentionsModalProps = {
  taskAssignment?: TaskAssignmentProps[];
  mentions?: string[];
};

const ViewSummaryMentionsModal = ({
  taskAssignment = [],
  mentions = [],
}: ViewSummaryMentionsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <SummaryIconCard
            icon={<Tags size={17} />}
            text={`${mentions.length} mentions`}
          />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>All mentions and task assignments</DialogTitle>
          <DialogDescription>
            Here are all mentions and task assignments for this summary.
          </DialogDescription>
        </DialogHeader>

        <DialogTitle className="text-md">Only mentions</DialogTitle>
        <div className="flex flex-row gap-2 flex-wrap">
          {mentions.length > 0 ? (
            mentions.map((mention, index) => (
              <Badge key={`${mention}-${index}`}>{mention}</Badge>
            ))
          ) : (
            <DialogDescription>There are no mentions.</DialogDescription>
          )}
        </div>

        <Separator />

        <DialogTitle className="text-md">Task assignments</DialogTitle>
        <div className="flex flex-col gap-2">
          {taskAssignment.length > 0 ? (
            taskAssignment.map((task, index) => (
              <Card key={`${task.mention}-${index}`}>
                <CardContent className="py-3 px-2 space-y-2">
                  <CardTitle>{task.mention}</CardTitle>
                  <CardDescription>
                    <span className="text-white font-semibold">Task:</span>{' '}
                    {task.task}
                  </CardDescription>
                </CardContent>
              </Card>
            ))
          ) : (
            <CustomEmptyCard
              title="0 assigned tasks"
              description="There are no assigned tasks in this summary."
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSummaryMentionsModal;
