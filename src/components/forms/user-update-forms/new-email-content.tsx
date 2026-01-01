import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
  EmailUpdateSchema,
  UnlinkAndChangeEmailSchema,
} from '@/utils/api/user';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import InstantFieldError from '../instant-field-error';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NewEmailFormFields } from '@/components/modal/new-email-modal';

type NewEmailStepContentProps = {
  form: UseFormReturn<NewEmailFormFields>;
  onNext: () => void;
  onCancel: () => void;
};

const NewEmailStepContent = ({
  form,
  onNext,
  onCancel,
}: NewEmailStepContentProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Set new email</DialogTitle>
        <DialogDescription>
          Enter your new email address below.
        </DialogDescription>
      </DialogHeader>

      <Alert variant="destructive">
        <CircleAlert size={16} />
        <AlertTitle>Important!</AlertTitle>
        <AlertDescription>
          Changing your email will unlink your account from the current
          platform.
        </AlertDescription>
      </Alert>

      <form id="form-email-step" className="space-y-4 py-4">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Current email</FieldLabel>
                <Input placeholder="text@example.com" {...field} />
                <InstantFieldError fieldState={fieldState} />
              </Field>
            )}
          />

          <Controller
            name="confirmEmail"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>New email</FieldLabel>
                <Input placeholder="new@example.com" {...field} />
                <InstantFieldError fieldState={fieldState} />
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <DialogFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onNext} size="sm">
          Next
        </Button>
      </DialogFooter>
    </>
  );
};

export default NewEmailStepContent;
