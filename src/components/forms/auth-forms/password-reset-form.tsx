import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { newPassword, NewPasswordSchema } from '@/utils/api/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import InstantFieldError from '../instant-field-error';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { isApiResponse } from '@/utils/axios-config/axios';

const PasswordResetForm = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const handleSubmit: SubmitHandler<z.infer<typeof NewPasswordSchema>> = async (
    data
  ) => {
    try {
      const res = await newPassword(token, data);

      toast.success(res.message);

      form.reset();
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

  return (
    <Card>
      <CardContent className="pt-6">
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          id="form-rhf-new-password"
        >
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
        </form>
      </CardContent>

      <CardFooter>
        <Button form="form-rhf-new-password">Submit</Button>
      </CardFooter>
    </Card>
  );
};

export default PasswordResetForm;
