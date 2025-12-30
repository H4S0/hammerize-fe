import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { PasswordUpdateSchema, updatePassword } from '@/utils/api/user';
import { isApiResponse } from '@/utils/axios-config/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import InstantFieldError from '../instant-field-error';

const UpdatePasswordForm = () => {
  const form = useForm<z.infer<typeof PasswordUpdateSchema>>({
    resolver: zodResolver(PasswordUpdateSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof PasswordUpdateSchema>> = async (
    data
  ) => {
    try {
      const res = await updatePassword(data);
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
    <Card>
      <CardHeader>
        <CardTitle>Password update</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-link" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="oldPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Current password</FieldLabel>
                  <Input {...field} placeholder="••••••••" type="password" />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />

            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>New password</FieldLabel>
                  <Input {...field} placeholder="••••••••" type="password" />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            className="mt-5 w-32"
            size="sm"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? <Spinner /> : 'Update password'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm;
