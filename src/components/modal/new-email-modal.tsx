import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import z from 'zod';
import {
  EmailUpdateSchema,
  UnlinkAndChangeEmailSchema,
} from '@/utils/api/user';
import NewPasswordStepContent from '../forms/user-update-forms/new-password-content';
import NewEmailStepContent from '../forms/user-update-forms/new-email-content';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export type NewEmailFormFields = z.infer<typeof UnlinkAndChangeEmailSchema>;

const NewEmailModal = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'email' | 'password'>('email');

  const form = useForm<NewEmailFormFields>({
    resolver: zodResolver(UnlinkAndChangeEmailSchema),
  });

  const handleOpenChange = (val: boolean) => {
    setOpen(val);
    if (!val) {
      setStep('email');
    }
  };

  const handleEmailNext = async () => {
    const isValid = await form.trigger(['email', 'confirmEmail']);

    if (!isValid) return;

    setStep('password');
  };

  const handleFinalSubmit: SubmitHandler<NewEmailFormFields> = async (data) => {
    console.log('data', data);
    setOpen(false);
    form.reset();
    setStep('email');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="link">Change email</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        {step === 'email' ? (
          <NewEmailStepContent
            onNext={handleEmailNext}
            onCancel={() => setOpen(false)}
            form={form}
          />
        ) : (
          <NewPasswordStepContent
            onBack={() => setStep('email')}
            onSubmit={form.handleSubmit(handleFinalSubmit)}
            form={form}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewEmailModal;
