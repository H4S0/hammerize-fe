import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { initPasswordReset, InitPasswordResetSchema } from '@/utils/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import type z from 'zod';
import InstantFieldError from '../instant-field-error';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { isApiResponse } from '@/utils/axios-config/axios';
import { Spinner } from '@/components/ui/spinner';

const InitPasswordForgetForm = () => {
  const form = useForm<z.infer<typeof InitPasswordResetSchema>>({
    resolver: zodResolver(InitPasswordResetSchema),
  });

  const handleSubmit: SubmitHandler<
    z.infer<typeof InitPasswordResetSchema>
  > = async (data) => {
    try {
      const res = await initPasswordReset(data);

      toast.success(res.message);
      form.reset();
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
      <CardContent className="pt-6">
        <form id="form-rhf-init" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input placeholder="text@example.ha" {...field} />
                  <InstantFieldError fieldState={fieldState} />
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button form="form-rhf-init" disabled={form.formState.isSubmitting}>
          {' '}
          {form.formState.isSubmitting ? <Spinner /> : 'Send confirmation mail'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InitPasswordForgetForm;
