import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { UseFormReturn, Controller } from 'react-hook-form';
import InstantFieldError from '../instant-field-error';
import { Spinner } from '@/components/ui/spinner';
import { UnlinkAndNewCredentialsFields } from '@/components/modal/unlink-credentials-modal';

interface BasePasswordStepProps {
  form: UseFormReturn<UnlinkAndNewCredentialsFields>;
  onBack: () => void;
  onSubmit: () => void;
}

const NewPasswordStepContent = ({
  form,
  onBack,
  onSubmit,
}: BasePasswordStepProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Create new password</DialogTitle>
        <DialogDescription>
          Enter a secure password for your account.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input {...field} placeholder="••••••••" type="password" />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Confirm password</FieldLabel>
              <Input {...field} placeholder="••••••••" type="password" />
              <InstantFieldError fieldState={fieldState} />
            </Field>
          )}
        />
      </div>

      <div className="flex items-center gap-4 justify-end mt-4">
        <Button variant="outline" size="sm" onClick={onBack} type="button">
          Back
        </Button>

        <Button
          onClick={onSubmit}
          disabled={form.formState.isSubmitting}
          size="sm"
        >
          {form.formState.isSubmitting ? <Spinner /> : 'Save & Unlink'}
        </Button>
      </div>
    </>
  );
};

export default NewPasswordStepContent;
