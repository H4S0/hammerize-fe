import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import PlatformLinkForm from '../forms/platform-link-form';
import { useState } from 'react';

const LinkBotModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger>
        <Button variant="outline" size="sm" className="w-28">
          Link Bot
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

        <PlatformLinkForm setIsModalOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default LinkBotModal;
