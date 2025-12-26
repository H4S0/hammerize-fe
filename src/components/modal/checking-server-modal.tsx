import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { serverOptions } from '@/utils/queries/platform';
import PlatformCard from '../card/platform-card';
import CustomEmptyCard from '../ui/custom-empty-card';
import { Plus } from 'lucide-react';

type CheckingServerModalProps = {
  serverName: string;
  serverId: string;
  selectedIds: string[];
  onToggleOne: (id: string, checked: boolean) => void;
};

const CheckingServerModal = ({
  serverName,
  serverId,
  selectedIds,
  onToggleOne,
}: CheckingServerModalProps) => {
  const { data, isLoading, isError } = useQuery(serverOptions(serverId));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="w-full" variant="outline">
          View platforms
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage channels</DialogTitle>
          <DialogDescription>
            Select which channels from <b>{serverName}</b> should belong to this
            workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {isLoading && (
            <p className="text-sm text-muted-foreground">Loading channels…</p>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              Failed to load server channels
            </p>
          )}

          {data?.data?.channels?.length
            ? data.data.channels.map((channel) => (
                <PlatformCard
                  key={channel._id}
                  platformChat={channel}
                  checkbox
                  checked={selectedIds.includes(channel._id)}
                  canManage
                  onCheckedChange={(checked) =>
                    onToggleOne(channel._id, checked)
                  }
                />
              ))
            : !isLoading && (
                <CustomEmptyCard
                  icon={<Plus />}
                  title="0 linked channels"
                  description="This server doesn't have any linked channels yet."
                />
              )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckingServerModal;
