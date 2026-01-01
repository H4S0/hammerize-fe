import { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import z from 'zod';
import {
  unlinkAndChangeEmail,
  UnlinkAndChangeEmailSchema,
} from '@/utils/api/user';
import NewPasswordStepContent from '../forms/user-update-forms/new-password-content';
import NewEmailStepContent from '../forms/user-update-forms/new-email-content';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isApiResponse } from '@/utils/axios-config/axios';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/utils/auth/auth';

export type UnlinkAndNewCredentialsFields = z.infer<
  typeof UnlinkAndChangeEmailSchema
>;

const UnlinkAndNewCredentialsModal = () => {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const form = useForm<UnlinkAndNewCredentialsFields>({
    resolver: zodResolver(UnlinkAndChangeEmailSchema),
  });

  const onSubmit: SubmitHandler<UnlinkAndNewCredentialsFields> = async (
    data
  ) => {
    try {
      const res = await unlinkAndChangeEmail(data);
      toast.success(res.message);
      await logout();
      navigate({ to: '/login' });
    } catch (err) {
      if (isApiResponse(err)) {
        const apiError = err;

        toast.error(
          apiError.message || 'Something went wrong please try again'
        );
      } else {
        toast.error('Something went wrong please,check your connection');
      }
    }
  };

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
            onSubmit={form.handleSubmit(onSubmit)}
            form={form}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UnlinkAndNewCredentialsModal;
