import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Field, FieldLabel } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InstantFieldError from '../instant-field-error';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { EmailUpdateSchema, updateEmail } from '@/utils/api/user';
import z from 'zod';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';

const UpdateUserEmailForm = () => {
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
    <div>
      <DialogHeader>
        <DialogTitle>Update your email</DialogTitle>
        <DialogDescription>
          Enter a new uniqe email for your account
        </DialogDescription>
      </DialogHeader>

      <form id="update-email-form" className="space-y-4 py-4">
        <Controller
          name="newEmail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>New email address</FieldLabel>
              <Input {...field} placeholder="text@example.ha" />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />

        <Controller
          name="confirmNewEmail"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Confirm new email address</FieldLabel>
              <Input {...field} placeholder="text@example.ha" />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />
      </form>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" size="sm">
            Close
          </Button>
        </DialogClose>

        <Button
          disabled={form.formState.isSubmitting}
          size="sm"
          form="update-email-form"
        >
          {form.formState.isSubmitting ? <Spinner /> : 'Save & Unlink'}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default UpdateUserEmailForm;
