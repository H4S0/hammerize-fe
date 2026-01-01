import { useState } from 'react';
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
import UnlinkPasswordContent from '../forms/user-update-forms/unlink-password-content';
import { ProviderOpts } from '../forms/user-update-forms/email-methods';

const UnlinkPlatformModal = ({ provider }: { provider: ProviderOpts }) => {
  const [step, setStep] = useState<'confirm' | 'password'>('confirm');
  const [open, setOpen] = useState(false);

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) setStep('confirm');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <X size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        {step === 'confirm' ? (
          <>
            <DialogHeader>
              <DialogTitle>Unlink social account</DialogTitle>
              <DialogDescription>
                Are you sure you want to unlink {provider} from your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </DialogClose>

              <Button onClick={() => setStep('password')} size="sm">
                Yes, proceed
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Set password</DialogTitle>
              <DialogDescription>
                You need to set a password before unlinking your social
                provider.
              </DialogDescription>
            </DialogHeader>
            <UnlinkPasswordContent setIsOpen={setOpen} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UnlinkPlatformModal;
