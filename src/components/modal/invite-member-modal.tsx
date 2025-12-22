import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import InviteMemberForm from '../forms/invite-member-form';
import { Button } from '../ui/button';

const InviteMemberModal = ({ workspaceId }: { workspaceId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <InviteMemberForm workspaceId={workspaceId} />
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
