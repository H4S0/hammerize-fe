import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

type NewPasswordsModalProps = {
  title: string;
  description: string;
  triggerLabel: string;
};

const NewPasswordModal = ({
  title,
  description,
  triggerLabel,
}: NewPasswordsModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        pasword form
      </DialogContent>
    </Dialog>
  );
};

export default NewPasswordModal;
