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
  taskAssignment: TaskAssignmentProps[];
  mentions: string[];
};

const ViewSummaryMentionsModal = ({
  taskAssignment,
  mentions,
}: ViewSummaryMentionsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <SummaryIconCard
            icon={<Tags size={17} />}
            text={`${mentions.length || 0} mentions`}
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>All mentions and task assignment</DialogTitle>
          <DialogDescription>
            Here are all of mentions and task assignemnt
          </DialogDescription>
        </DialogHeader>
        <DialogTitle className="text-md">Only mentions</DialogTitle>
        <div className="flex flex-row gap-2 flex-wrap">
          {mentions.length > 0 ? (
            mentions.map((mention) => <Badge>{mention}</Badge>)
          ) : (
            <DialogDescription>There is not mentions</DialogDescription>
          )}
        </div>
        <Separator />
        <DialogTitle className="text-md">Task assignment</DialogTitle>
        <div className="flex flex-col gap-2">
          {taskAssignment.length > 0 ? (
            taskAssignment.map((task) => (
              <Card>
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
              description="There is no assigned tasks in this summary"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewSummaryMentionsModal;
