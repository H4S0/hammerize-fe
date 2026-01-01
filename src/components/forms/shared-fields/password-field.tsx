import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { NewPasswordSchema } from '@/utils/api/user';
import { Controller, UseFormReturn } from 'react-hook-form';
import z from 'zod';
import InstantFieldError from '../instant-field-error';
import { Input } from '@/components/ui/input';

type FormFields = z.infer<typeof NewPasswordSchema>;

type SharedPlatformFieldsProps = {
  form: UseFormReturn<FormFields>;
};

const SharedPasswordFields = ({ form }: SharedPlatformFieldsProps) => {
  return (
    <FieldGroup>
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
    </FieldGroup>
  );
};

export default SharedPasswordFields;
