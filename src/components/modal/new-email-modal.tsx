import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { EmailUpdateSchema, updateEmail } from '@/utils/api/user';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { isApiResponse } from '@/utils/axios-config/axios';
import { toast } from 'sonner';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import InstantFieldError from '../forms/instant-field-error';
import { Spinner } from '../ui/spinner';
import { Input } from '../ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';
import NewPasswordModal from './new-password-modal';

const NewEmailModal = () => {
  const form = useForm<z.infer<typeof EmailUpdateSchema>>({
    resolver: zodResolver(EmailUpdateSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof EmailUpdateSchema>> = async (
    data
  ) => {
    try {
      const res = await updateEmail(data);
      toast.success(res.message);
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Change email</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set new email</DialogTitle>
          <DialogDescription>
            Enter you new email address below.
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <CircleAlert />
          <AlertTitle>Important!</AlertTitle>
          <AlertDescription>
            Changing your email will unlink your account from Google. You can
            only use this new email to sign in going forward.
          </AlertDescription>
        </Alert>
        <form id="form-rhf-new-email" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="oldEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Current email</FieldLabel>
                  <Input placeholder="text@example.ha" {...field} />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />

            <Controller
              name="newEmail"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>New email</FieldLabel>
                  <Input placeholder="text@example.ha" {...field} />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        <DialogFooter>
          <NewPasswordModal
            title="Set password"
            description="You need to set a password for your new email address."
            triggerLabel="Next"
          />
          <DialogClose asChild>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewEmailModal;
