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
import { useState } from 'react';

const InviteMemberModal = ({ workspaceId }: { workspaceId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <InviteMemberForm workspaceId={workspaceId} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default InviteMemberModal;
