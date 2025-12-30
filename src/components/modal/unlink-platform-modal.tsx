import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import NewPasswordModal from './new-password-modal';

const UnlinkPlatformModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <X />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set password</DialogTitle>
          <DialogDescription>
            You need to set a password before unlinking your social provider.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <NewPasswordModal
            title="Set password"
            description="You need to set a password before unlinking your social provider."
            triggerLabel="Yes,proceed"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UnlinkPlatformModal;
