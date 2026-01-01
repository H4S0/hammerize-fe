import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import NewPasswordStepContent from '../forms/user-update-forms/new-password-content';
import UnlinkPasswordContent from '../forms/user-update-forms/unlink-password-content';

const UnlinkPlatformModal = () => {
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
              <DialogTitle>Set password</DialogTitle>
              <DialogDescription>
                You need to set a password before unlinking your social
                provider.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-end gap-3 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setStep('password')} size="sm">
                Yes, proceed
              </Button>
            </div>
          </>
        ) : (
          <UnlinkPasswordContent onCancle={() => setStep('confirm')} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UnlinkPlatformModal;
